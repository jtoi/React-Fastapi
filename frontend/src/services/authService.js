import api from "./api";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import * as constants from "../constants";

// Variables para guardar referencia a los interceptores
let requestInterceptor = null;
let responseInterceptor = null;
let interceptorsConfigured = false;

// Función para guardar los tokens en localStorage
const saveTokens = (accessToken, refreshToken, expiresAt) => {
  console.log('authService: Guardando tokens:', { accessToken, refreshToken, expiresAt });
  localStorage.setItem("token", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("tokenExpiry", expiresAt);
};

// Función para obtener los tokens almacenados
const getTokens = () => {
  const tokens = {
    accessToken: localStorage.getItem("token"),
    refreshToken: localStorage.getItem("refreshToken"),
    expiresAt: localStorage.getItem("tokenExpiry")
  };
  console.log('authService: Obteniendo tokens:', tokens);
  return tokens;
};

// Función para borrar los tokens (logout)
const clearTokens = () => {
  console.log('authService: Limpiando tokens');
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("tokenExpiry");
};

// Verificar si el token ha expirado
const isTokenExpired = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log('authService: Token no encontrado, se considera expirado');
    return true;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Tiempo actual en segundos
    const isExpired = decodedToken.exp < currentTime;
    console.log('authService: Token expirado:', isExpired, 'exp:', decodedToken.exp, 'currentTime:', currentTime);
    return isExpired;
  } catch (error) {
    console.error("authService: Error al decodificar el token:", error);
    return true;
  }
};

// Función para refrescar el token
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

// Configurar interceptores de Axios
const setupAxiosInterceptors = () => {
    console.log('authService: Configurando interceptores de Axios. requestInterceptor estado:', requestInterceptor);

    if (interceptorsConfigured) {
        console.log('authService: Interceptores ya configurados, omitiendo...');
        return;
    }

    interceptorsConfigured = true;

    // Limpiar interceptores existentes si hay
  if (requestInterceptor !== null && typeof requestInterceptor !== 'undefined') {
        api.interceptors.request.eject(requestInterceptor);
    }
    if (responseInterceptor !== null && typeof responseInterceptor !== 'undefined') {
        api.interceptors.response.eject(responseInterceptor);
    }

    // Configurar nuevo interceptor de solicitud
    requestInterceptor = api.interceptors.request.use(
        async (config) => {
            console.log('authService: Interceptor de solicitud, URL:', config.url);
      console.log('authService: Interceptor de solicitud, headers:', config.headers);

            if (config.url && (config.url.includes('auth/token') || config.url.includes('auth/refresh'))) {
                console.log('authService: Endpoint de autenticación, no añadiendo token');
                return config;
            }

            const token = localStorage.getItem('token');
            console.log('authService: Token disponible:', !!token);

            if (token) {
                config.headers = config.headers || {};
                config.headers['Authorization'] = `Bearer ${token}`;
                console.log('authService: Token añadido a la solicitud:', config.headers['Authorization']);
            }

            return config;
        },
        (error) => Promise.reject(error)
    );

    // Configurar nuevo interceptor de respuesta
    responseInterceptor = api.interceptors.response.use(
        (response) => {
            console.log('authService: Interceptor de respuesta, respuesta:', response);
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            console.log('authService: Interceptor de respuesta, error:', error);

            if (
                error.response &&
                error.response.status === 401 &&
                !originalRequest._retry &&
                originalRequest.url &&
                !originalRequest.url.includes('auth/token') &&
                !originalRequest.url.includes('auth/refresh')
            ) {
                originalRequest._retry = true;

                try {
                    const success = await refreshToken();
                    if (success) {
                        const { accessToken } = getTokens();
                        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                        return api(originalRequest);
                    }
                } catch (refreshError) {
                    console.error('authService: Error al refrescar token en interceptor:', refreshError);
                }

                clearTokens();
                window.location.href = '/login';
            }

            return Promise.reject(error);
        }
    );
};

// Función para limpiar interceptores
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

// Función de logout
const logout = async () => {
  const { refreshToken } = getTokens();
  
  if (refreshToken) {
    try {
      await api.post(`auth/logout`, {
        refresh_token: refreshToken
      });
      console.log('authService: Logout exitoso');
    } catch (error) {
      console.error("authService: Error al cerrar sesión:", error);
    }
  }
  
  clearTokens();
  clearInterceptors();
};

// Exportar las funciones
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