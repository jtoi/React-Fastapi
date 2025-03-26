import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { UserProvider } from '../../contexts/UserContext'; // Importa el UserContext

export const Logout = () => {
    const navigate = useNavigate();
    const { clearAuthData } = useContext(UserProvider); // Obtiene clearAuthData del contexto

    useEffect(() => {
        const performLogout = async () => {
            const refreshToken = localStorage.getItem("refreshToken"); // Recupera el token desde el almacenamiento local
            if (refreshToken) {
                try {
                    await authService.logout(refreshToken);
                    // No necesitas limpiar el almacenamiento local aquí, clearAuthData lo hará
                    clearAuthData(); // Limpia el token y la información del usuario usando el contexto
                    navigate("/login"); // Redirige al usuario a la página de inicio de sesión
                } catch (error) {
                    console.error("Error al cerrar sesión", error);
                    clearAuthData(); // Limpia el token y la información del usuario usando el contexto en caso de error
                    navigate("/login"); // Redirige al usuario a la página de inicio de sesión
                }
            } else {
                console.warn("No hay token de refresh disponible");
                clearAuthData(); // Limpia el token y la información del usuario usando el contexto
                navigate("/login"); // Redirige al usuario a la página de inicio de sesión
            }
        };

        performLogout();
    }, [navigate, clearAuthData]);

    return (
        <div className="text-center">
            <p>Cerrando sesión...</p>
        </div>
    );
};