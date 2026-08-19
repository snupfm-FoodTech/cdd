const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 4000;

app.use('/public', express.static(path.join(__dirname, 'public'), {}));

// Serve static files from the 'service-page' folder
app.use(express.static(path.join(__dirname, 'service-page')));

// Route => index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'service-page', 'index.html'));
});

app.get('/env.js', (req, res) => {
  // CD_APP_BACKEND is consumed by service-page's browser-side fetch; it must be a client-facing URL.
  // Default to the same-origin path /api (resolved via nginx in deploy, via Next.js rewrites in dev).
  const envVars = {
    CD_APP: process.env.CD_APP || '/',
    CD_APP_ADMIN: process.env.CD_APP_ADMIN || '/cms/',
    CD_APP_BACKEND: process.env.CD_APP_BACKEND || '/api'
  };

  res.setHeader('Content-Type', 'application/javascript');
  res.send(`window.__ENV__ = ${JSON.stringify(envVars)};`);
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
