import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import * as constants from "../../constants";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { UserContext } from '../../contexts/UserContext'; // Importa el UserContext
import { FormEntry } from "../../components/molecules/FormEntry";
import { Button } from "../../components/atoms/Button";

export const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const baseurl = constants.SERVER_URL;
    const navigate = useNavigate();
    const { updateToken } = useContext(UserContext); // Obtiene updateToken del contexto

    useEffect(() => {
        // Configurar interceptores al cargar el componente
        authService.setupAxiosInterceptors();

        // Verificar si ya hay un token válido
        if (localStorage.getItem("token") && !authService.isTokenExpired()) {
            navigate("/");
        }
    }, [navigate]);

    const handleChange = (e) => {
        console.log("Input cambiado:", e.target.name, e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Crear FormData para la solicitud
            const form = new URLSearchParams();
            form.append("username", formData.username);
            form.append("password", formData.password);

            // Usamos axios directamente sin interceptores para el login
            const axiosInstance = axios.create();
            const response = await axiosInstance.post(baseurl + "auth/token", form.toString(), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            if (response.status === 200) {
                // Guardar ambos tokens
                const { access_token, refresh_token, expires_at } = response.data;
                authService.saveTokens(access_token, refresh_token, expires_at);

                // Configurar los interceptores después de login exitoso
                authService.setupAxiosInterceptors();

                // Actualizar el token en el contexto
                updateToken(access_token);

                alert("¡Inicio de sesión exitoso!");
                navigate("/");
            } else {
                alert("Usuario o contraseña incorrectos.");
            }
        } catch (error) {
            if (error.response) {
                console.error("Error del servidor:", error.response.data);
                alert("Usuario o contraseña incorrectos.");
            } else if (error.request) {
                console.error("Sin respuesta del servidor:", error.request);
                alert("No se pudo conectar al servidor.");
            } else {
                console.error("Error:", error.message);
            }
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="w-50 mx-auto border p-4 rounded">
                <h3 className="text-center mb-4">Inicio de Sesión</h3>
                <FormEntry label={"Usuario"} type="text" name="username" id="username" value={formData.username} handleChange={handleChange} required />
                <FormEntry label={"Contraseña"} type="password" name="password" id="password" value={formData.password} handleChange={handleChange} required />
                <Button type="submit" label="Iniciar sesión" />
            </form>
        </div>
    );
};