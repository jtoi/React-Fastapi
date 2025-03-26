import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import * as constants from "../constants";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [menus, setMenus] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = useCallback(async () => {
    if (!token) {
      console.log("Token no encontrado en fetchUserData");
      return;
    }

    setIsLoading(true);
    try {
      const [userResponse, menusResponse] = await Promise.all([
        api.get(constants.SERVER_URL + "users/me"),
        api.get(constants.SERVER_URL + "auth/menus/")
      ]);

      setUsername(userResponse.data.username);
      setMenus(menusResponse.data.menus);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUsername(null);
      setMenus([]);
      localStorage.removeItem("token");
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token, fetchUserData]);

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
    <UserContext.Provider value={{ 
      username, 
      menus, 
      updateToken, 
      clearAuthData, 
      token,
      isLoading 
    }}>
      {children}
    </UserContext.Provider>
  );
};