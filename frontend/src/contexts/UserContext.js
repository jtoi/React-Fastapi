// UserContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import * as constants from "../constants";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [menus, setMenus] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token")); // Mantén el token en el contexto

  // Función para obtener los datos del usuario (nombre y menús)
  const fetchUserData = useCallback(async () => {
    if (token) {
      try {
        const userResponse = await api.get(constants.SERVER_URL + "users/me");
        setUsername(userResponse.data.username);
        const menusResponse = await api.get(constants.SERVER_URL + "auth/menus/");
        setMenus(menusResponse.data.menus);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Manejar el error (por ejemplo, redirigir al login)
        setUsername(null);
        setMenus([]);
        localStorage.removeItem("token");
        setToken(null);

      }
    } else {
      setUsername(null);
      setMenus([]);
    }
  }, [token]);

  // Llama a fetchUserData cuando el token cambie
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Función para actualizar el token (para usar después del login)
  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    fetchUserData(); // Recarga los datos del usuario después de actualizar el token
  };

  // Función para limpiar el token (para usar en el logout)
    const clearAuthData = () => {
        setToken(null);
        localStorage.removeItem('token');
        setUsername(null);
        setMenus([]);
    }

  return (
    <UserContext.Provider value={{ username, menus, updateToken, clearAuthData, token }}>
      {children}
    </UserContext.Provider>
  );
};