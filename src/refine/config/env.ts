export const ENV = {
  API_URL: import.meta.env.VITE_API_URL ?? "https://api.fake-rest.refine.dev",
  API_PREFIX: import.meta.env.VITE_API_PREFIX ?? "/api",
  TOKEN_PREFIX: import.meta.env.VITE_TOKEN_PREFIX ?? "Token",
};

export const API_BASE = `${ENV.API_URL}${ENV.API_PREFIX}`;