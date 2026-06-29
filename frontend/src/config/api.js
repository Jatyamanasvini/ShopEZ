// Empty string uses same-origin /api (Vite dev proxy or production reverse proxy).
export const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export function apiUrl(path) {
  return `${API_BASE_URL}${path}`;
}
