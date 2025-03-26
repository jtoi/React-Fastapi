// UserContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import * as constants from "../constants";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [menus, setMenus] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const fetchUserData = useCallback(async () => {
    if (!token) {
        console.log("Token no encontrado en fetchUserData");
        return;
    }

    try {
        const userResponse = await api.get(constants.SERVER_URL + "users/me");
        setUsername(userResponse.data.username);

        const menusResponse = await api.get(constants.SERVER_URL + "auth/menus/");
        setMenus(menusResponse.data.menus);
    } catch (error) {
        console.error("Error fetching user data:", error);
        setUsername(null);
        setMenus([]);
        localStorage.removeItem("token");
        setToken(null);
    }
}, [token]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const clearAuthData = () => {
    setToken(null);
    localStorage.removeItem('token');
    setUsername(null);
    setMenus([]);
  };

  return (
    <UserContext.Provider value={{ username, menus, updateToken, clearAuthData, token }}>
      {children}
    </UserContext.Provider>
  );
};

