// Table.js
import React, { useMemo } from "react";
import { THeaderRow } from "../molecules/THeaderRow";
import { TRow } from "../molecules/TRow";

export const Table = () => {
  const headerData = useMemo(() => [
    { label: "Id" },
    { label: "Cliente" },
    { label: "Producto" },
    { label: "Cantidad" },
    { label: "Fecha" },
    { label: "Estado" },
  ], []);

  const bodyData = useMemo(() => [
    { id: "#1082", client: "Supermercado Central", prod: "Manzanas Rojas", qtty: "500 kg", addate: "02/03/2025", state: "Entregado" },
    { id: "#1081", client: "Fruterías Deliciosas", prod: "Naranjas Valencia", qtty: "350 kg", addate: "01/03/2025", state: "En ruta" },
    { id: "#1080", client: "Restaurante Orgánico", prod: "Mix de Frutas", qtty: "120 kg", addate: "01/03/2025", state: "Procesando" },
    { id: "#1079", client: "Hoteles Vacacionales", prod: "Manzanas Verdes", qtty: "200 kg", addate: "28/02/2025", state: "Entregado" },
    { id: "#1078", client: "Supermercado Norte", prod: "Naranjas y Manzanas", qtty: "650 kg", addate: "27/02/2025", state: "Entregado" },
  ], []);

  const badgeType = React.useCallback((state) => {
    switch (state) {
      case "Entregado": return "success";
      case "En ruta": return "warning";
      case "Procesando": return "primary";
      default: return "secondary";
    }
  }, []);

  // Memoized validation to prevent unnecessary re-renders
  const isValidData = useMemo(() => {
    return headerData && bodyData && bodyData.length > 0;
  }, [headerData, bodyData]);

  if (!isValidData) {
    return <div>No hay datos para mostrar</div>;
  }

    console.log("Table:", headerData);
  return (
    <table className="table table-hover">
      <THeaderRow headerData={headerData} />
      <tbody>
        <TRow bodyData={bodyData} badgeType={badgeType} />
      </tbody>
    </table>
  );
};