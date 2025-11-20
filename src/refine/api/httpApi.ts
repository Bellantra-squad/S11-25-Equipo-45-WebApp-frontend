import axios, { AxiosHeaders } from 'axios';
import { API_BASE, ENV } from '../config/env';
import { TOKEN_KEY } from '../providers/authProvider';

export const httpApi = axios.create({
    baseURL: API_BASE,
    withCredentials: false,
    headers: new AxiosHeaders({
    "Content-Type": "application/json",
  }),
})

httpApi.interceptors.request.use((config)=> {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        (config.headers as AxiosHeaders).set("Authorization", `${ENV.TOKEN_PREFIX} ${token}`);
    }    
    return config;
})

httpApi.interceptors.response.use(
  (res) => res,
  async (error) => {
    // Si el backend devuelve 401/403, puedes limpiar sesión o redirigir
    if ([401, 403].includes(error?.response?.status)) {
      // Opcional: localStorage.removeItem(TOKEN_KEY);
      // Opcional: window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);