import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import authService from "../services/authService";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        // Si no hay token, el usuario no está autenticado
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        // Decodificar el token
        const decodedToken = jwtDecode(token);

        // Verificar si el token ha expirado
        const currentTime = Date.now() / 1000; // Tiempo actual en segundos
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          // El token ha expirado, intentar refrescarlo
          const refreshed = await authService.refreshToken();
          setIsAuthenticated(refreshed);
        } else {
          // El token es válido
          setIsAuthenticated(true);
        }
      } catch (error) {
        // Si ocurre un error al decodificar el token, asumimos que no es válido
        console.error("Error al decodificar el token:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Configurar interceptores
    authService.setupAxiosInterceptors();
    
    checkTokenValidity();
  }, []);

  return { isAuthenticated, isLoading };
}