import axios from 'axios';
import { ENV } from '../config/env';
import { TOKEN_KEY } from '../providers/authProvider';

const API_BASE = import.meta.env.VITE_API_URL 

export const httpApi = axios.create({
    baseURL: API_BASE,
    withCredentials: false,
})

httpApi.interceptors.request.use((config)=> {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `${ENV.TOKEN_PREFIX} ${token}`;
    } 
    return config;
})

httpApi.interceptors.response.use(
  (res) => res,
  async (error) => {
    // Si el backend devuelve 401/403, puedes limpiar sesión o redirigir
    if ([401, 403].includes(error?.response?.status)) {
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

