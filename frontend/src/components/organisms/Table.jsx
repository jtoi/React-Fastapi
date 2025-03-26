import React from "react";
import { THeaderRow } from "../molecules/THeaderRow";
import { TRow } from "../molecules/TRow";

  /**
   * Table es un componente que renderiza una tabla con los datos de los pedidos.
   * La tabla tiene una fila de header con los títulos de las columnas y varias filas de body con los datos de los pedidos.
   * La propiedad "badgeType" es una función que determina el tipo de badge a mostrar en la columna de "Estado".
   * @returns {React.ReactElement} - Un JSX con la tabla.
   */
export const Table = () => {
  const headerData = [
    { label: "Id" },
    { label: "Cliente" },
    { label: "Producto" },
    { label: "Cantidad" },
    { label: "Fecha" },
    { label: "Estado" },
  ];

  const bodyData = [
    { id: "#1082", client: "Supermercado Central", prod: "Manzanas Rojas", qtty: "500 kg", addate: "02/03/2025", state: "Entregado" },
    { id: "#1081", client: "Fruterías Deliciosas", prod: "Naranjas Valencia", qtty: "350 kg", addate: "01/03/2025", state: "En ruta" },
    { id: "#1080", client: "Restaurante Orgánico", prod: "Mix de Frutas", qtty: "120 kg", addate: "01/03/2025", state: "Procesando" },
    { id: "#1079", client: "Hoteles Vacacionales", prod: "Manzanas Verdes", qtty: "200 kg", addate: "28/02/2025", state: "Entregado" },
    { id: "#1078", client: "Supermercado Norte", prod: "Naranjas y Manzanas", qtty: "650 kg", addate: "27/02/2025", state: "Entregado" },
  ];

  // Lógica para determinar el tipo de badge basado en el estado
  const badgeType = (state) => {
    switch (state) {
      case "Entregado":
        return "success"; // Verde
      case "En ruta":
        return "warning"; // Amarillo
      case "Procesando":
        return "primary"; // Azul
      default:
        return "secondary"; // Gris
    }
  };

  return (
    <table className="table table-hover">
      <THeaderRow headerData={headerData} />
      <tbody>
        <TRow bodyData={bodyData} badgeType={badgeType} />
      </tbody>
    </table>
  );
};
