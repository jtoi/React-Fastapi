import React, { useEffect, useState } from "react";
import axios from "axios";
import authService from '../services/authService';
import * as constants from "../constants";

export const AppInitializer = ({ children }) => {
  const [loading, setLoading] = useState(true); // Añadimos un estado de carga

  useEffect(() => {
    console.log('AppInitializer: Inicializando aplicación');

    // Verificar si el token existe y no ha expirado
    const tokens = authService.getTokens();
    const token = tokens.accessToken;
    const isExpired = authService.isTokenExpired();

    console.log('AppInitializer: Tokens disponibles:', {
        hasAccessToken: !!token,
        hasRefreshToken: !!tokens.refreshToken,
        accessTokenExpired: isExpired,
    });

    // Si hay un token válido, configurar interceptores
    if (token && !isExpired) {
        console.log('AppInitializer: Token válido, configurando interceptores');
        authService.setupAxiosInterceptors();
        setLoading(false); // La carga ha terminado
    } else {
        console.log('AppInitializer: Token no válido, intentando refrescar...');
        const refreshToken = tokens.refreshToken;

        if (refreshToken) {
            authService.refreshToken()
                .then((success) => {
                    if (success) {
                        console.log('AppInitializer: Token renovado, configurando interceptores');
                        authService.setupAxiosInterceptors();
                        setLoading(false); // La carga ha terminado
                    }
                })
                .catch((error) => {
                    console.error('AppInitializer: Error al refrescar el token:', error);
                    authService.clearTokens();
                    if (window.location.pathname !== '/login') {
                        window.location.href = '/login';
                    }
                    setLoading(false); // La carga ha terminado (con error)
                });
        } else {
          setLoading(false); // No hay refresh token, carga terminada.
        }
    }

    return () => {
        console.log('AppInitializer: Limpiando interceptores');
        authService.clearInterceptors();
    };
}, []);

  if (loading) {
    return <div>Cargando...</div>; // Muestra un indicador de carga mientras se inicializa
  }

  return children;
};