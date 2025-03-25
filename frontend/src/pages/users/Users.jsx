import React, { useState, useEffect } from "react";
import * as constants from "../../constants";
import api from '../../services/api';

export const Users = () => {
  const [userData, setUserData] = useState(null); // Estado para almacenar la respuesta del servidor
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const baseurl = constants.SERVER_URL; // URL base de la API


  const fetchUserData = async () => {
		try {
			const response = await api.get(constants.SERVER_URL + "users/me");
			console.log('User: fetchUserData: realizando solicitud');
			setUserData(response.data.username); // Almacena el username en el estado
		} catch (error) {
			console.error("Error fetching username:", error);
		}
	};
 
  useEffect(() => {
    // Función para obtener los datos del usuario

    fetchUserData(); // Llama a la función para obtener los datos
  }, []); // El array vacío [] asegura que esto se ejecute solo una vez al montar el componente

  if (loading) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  if (error) {
    return (
      <div>
        Error: {error.response ? error.response.data.message : error.message}
      </div>
    ); // Muestra un mensaje de error si algo falla
  }

  return (
    <div>
      <h1>Información del Usuario</h1>
      {userData ? (
        <div>
          <p>Nombre: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* Muestra más datos del usuario según la respuesta del servidor */}
        </div>
      ) : (
        <p>No se encontraron datos del usuario.</p>
      )}
    </div>
  );
};