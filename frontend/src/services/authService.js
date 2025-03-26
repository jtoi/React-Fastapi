// authService.js
import api from "./api";
import axios from 'axios'; // Importación única
import { jwtDecode } from "jwt-decode";
import * as constants from "../constants";

// Variables para guardar referencia a los interceptores
let requestInterceptor = null;
let responseInterceptor = null;
let interceptorsConfigured = false;

// Funciones auxiliares, por ejemplo:
const getTokens = () => {
  const tokens = {
    accessToken: localStorage.getItem("token"),
    refreshToken: localStorage.getItem("refreshToken"),
    expiresAt: localStorage.getItem("tokenExpiry")
  };
  console.log('authService: Obteniendo tokens:', tokens);
  return tokens;
};

const clearTokens = () => {
  console.log('authService: Limpiando tokens');
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("tokenExpiry");
};

const isTokenExpired = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log('authService: Token no encontrado, se considera expirado');
    return true;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    const isExpired = decodedToken.exp < currentTime;

    if (isExpired) {
      console.log('authService: Token expirado, intentando refrescar...');
      const success = await refreshToken(); // Intenta refrescar el token
      return !success; // Devuelve true si no fue posible refrescar
    }

    return false; // El token aún es válido
  } catch (error) {
    console.error("authService: Error al decodificar el token:", error);
    return true; // Si algo falla, asumimos que está expirado
  }
};

// Función para configurar los interceptores de Axios
export const setupAxiosInterceptors = () => {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

// Puedes definir también funciones de refreshToken, saveTokens, clearInterceptors, logout, etc.
const refreshToken = async () => {
  const { refreshToken } = getTokens();
  
  if (!refreshToken) {
    console.log('authService: No hay refresh token, no se puede refrescar');
    return false;
  }

  try {
    // Usamos axios directamente para evitar interceptores
    const axios_instance = axios.create();
    const response = await axios_instance.post(`${constants.SERVER_URL}auth/refresh`, {
      refresh_token: refreshToken
    });
    
    const { access_token, refresh_token, expires_at } = response.data;
    console.log('authService: Token refrescado con éxito:', { access_token, refresh_token, expires_at });
    saveTokens(access_token, refresh_token, expires_at);
    return true;
  } catch (error) {
    console.error("authService: Error al refrescar token:", error);
    clearTokens();
    return false;
  }
};

const saveTokens = (accessToken, refreshToken, expiresAt) => {
  console.log('authService: Guardando tokens:', { accessToken, refreshToken, expiresAt });
  localStorage.setItem("token", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("tokenExpiry", expiresAt);
};

const clearInterceptors = () => {
  console.log('authService: Limpiando interceptores');
  if (requestInterceptor !== null) {
    api.interceptors.request.eject(requestInterceptor);
    requestInterceptor = null;
  }
  if (responseInterceptor !== null) {
    api.interceptors.response.eject(responseInterceptor);
    responseInterceptor = null;
  }
};

const logout = async () => {
  const { refreshToken } = getTokens();
  if (refreshToken) {
    try {
      await api.post(`auth/logout`, { refresh_token: refreshToken });
      console.log('authService: Logout exitoso');
    } catch (error) {
      console.error("authService: Error al cerrar sesión:", error);
    }
  }
  clearTokens();
  clearInterceptors();
};

const authService = {
  getTokens,
  saveTokens,
  clearTokens,
  isTokenExpired,
  refreshToken,
  setupAxiosInterceptors,
  clearInterceptors,
  logout
};

export default authService;
