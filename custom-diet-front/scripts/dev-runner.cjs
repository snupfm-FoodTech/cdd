const { execFileSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const nextDir = path.join(rootDir, ".next");
const nextBin = path.join(rootDir, "node_modules", "next", "dist", "bin", "next");
const nodemonBin = path.join(rootDir, "node_modules", "nodemon", "bin", "nodemon.js");
const serverEntry = path.join(rootDir, "server.js");
const mode = process.argv[2] === "start" ? "start" : "dev";

const children = [];
let shuttingDown = false;

function runCommand(command, args) {
  return spawn(command, args, {
    cwd: rootDir,
    env: process.env,
    stdio: "inherit",
    windowsHide: false,
    // On Unix, create a new process group so killProcessTree can signal the
    // entire group (Next.js / nodemon spawn their own child workers).
    detached: process.platform !== "win32"
  });
}

function killProcessTree(pid) {
  if (!pid) {
    return;
  }

  try {
    if (process.platform === "win32") {
      execFileSync("taskkill", ["/PID", String(pid), "/T", "/F"], { stdio: "ignore" });
    } else {
      // Negative PID targets the entire process group on Unix.
      process.kill(-pid, "SIGTERM");
    }
  } catch {
    // Ignore processes that already exited.
  }
}

function cleanupStaleWindowsProcesses() {
  if (process.platform !== "win32") {
    return;
  }

  const escapedRoot = rootDir.replace(/'/g, "''");
  const script = `
$root = '${escapedRoot}'.ToLower()
$tokens = @(
  'next\\\\dist\\\\bin\\\\next',
  'next\\\\dist\\\\server\\\\lib\\\\start-server.js',
  'nodemon\\\\bin\\\\nodemon.js',
  'concurrently\\\\dist\\\\bin\\\\concurrently.js',
  'server.js'
)

Get-CimInstance Win32_Process |
  Where-Object {
    $_.ProcessId -ne ${process.pid} -and
    $_.Name -eq 'node.exe' -and
    $_.CommandLine
  } |
  ForEach-Object {
    $commandLine = $_.CommandLine.ToLower()
    if ($commandLine.Contains($root) -and ($tokens | Where-Object { $commandLine.Contains($_.ToLower()) }).Count -gt 0) {
      $_.ProcessId
    }
  }
`;

  try {
    const output = execFileSync(
      "powershell",
      ["-NoProfile", "-Command", script],
      { cwd: rootDir, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
    );

    const stalePids = output
      .split(/\r?\n/)
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) => Number(value))
      .filter((value) => Number.isInteger(value));

    for (const pid of stalePids) {
      killProcessTree(pid);
    }
  } catch (error) {
    console.warn(
      "[dev-runner] Warning: Failed to clean up stale Windows dev processes. Continuing without cleanup.",
      error && error.message ? `Reason: ${error.message}` : ""
    );
  }
}

function resetNextBuildArtifacts() {
  fs.rmSync(nextDir, {
    recursive: true,
    force: true,
    maxRetries: 3,
    retryDelay: 150
  });
}

function shutdown(exitCode = 0) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  const childrenToWaitFor = children.filter(
    (child) => child && !child.killed && typeof child.pid === "number"
  );

  if (childrenToWaitFor.length === 0) {
    process.exit(exitCode);
    return;
  }

  const remainingPids = new Set(childrenToWaitFor.map((child) => child.pid));
  let timeoutId;

  const maybeExit = () => {
    if (remainingPids.size === 0) {
      if (timeoutId) clearTimeout(timeoutId);
      process.exit(exitCode);
    }
  };

  for (const child of childrenToWaitFor) {
    child.once("exit", () => {
      remainingPids.delete(child.pid);
      maybeExit();
    });
    killProcessTree(child.pid);
  }

  timeoutId = setTimeout(() => {
    if (remainingPids.size > 0 && process.platform !== "win32") {
      for (const pid of remainingPids) {
        try {
          process.kill(pid, "SIGKILL");
        } catch {
          // ignore — process may have already exited
        }
      }
    }
    process.exit(exitCode);
  }, 10000);
}

function watchChild(name, child) {
  children.push(child);

  child.on("exit", (code, signal) => {
    if (shuttingDown) {
      return;
    }

    const exitCode = code ?? (signal ? 1 : 0);
    console.error(`[dev-runner] ${name} exited (${signal || exitCode}).`);
    shutdown(exitCode);
  });
}

function main() {
  cleanupStaleWindowsProcesses();
  if (mode === "dev") {
    resetNextBuildArtifacts();
  }

  const nextProcess = runCommand(process.execPath, [nextBin, mode]);
  const serverProcess =
    mode === "dev"
      ? runCommand(process.execPath, [nodemonBin, "server.js"])
      : runCommand(process.execPath, [serverEntry]);

  watchChild("next", nextProcess);
  watchChild(mode === "dev" ? "nodemon" : "server", serverProcess);

  process.on("SIGINT", () => shutdown(0));
  process.on("SIGTERM", () => shutdown(0));
  process.on("uncaughtException", (error) => {
    console.error(error);
    shutdown(1);
  });
  process.on("unhandledRejection", (error) => {
    console.error(error);
    shutdown(1);
  });
}

main();
