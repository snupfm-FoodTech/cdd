const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const API_BASE = `${basePath}/api`;

export const getApiBaseUrl = (): string => API_BASE;

export const getFileUrl = (filename: string): string =>
  `${API_BASE}/files/${filename}`;
