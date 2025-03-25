import React from "react";
import { TCell } from "../atoms/TCell";

/**
 * TRow es un componente que renderiza una fila de una tabla.
 * Recibe un array de objetos (bodyData) que representan las celdas de la fila.
 * Cada objeto debe tener las mismas propiedades y tipos de datos.
 * La propiedad "state" se utiliza para mostrar un badge con un tipo de estado.
 * La propiedad "badgeType" es una función que determina el tipo de badge a mostrar.
 * @param {array} bodyData Un array de objetos con las celdas de la fila.
 * @param {function} badgeType La función que determina el tipo de badge a mostrar.
 * @returns Un JSX con la fila de la tabla.
 */
export const TRow = ({ bodyData, badgeType }) => {
  return (
    <>
      {bodyData.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {Object.entries(row).map(([key, value], cellIndex) => (
            <TCell
              key={cellIndex}
              text={value}
              isBadge={key === "state" && badgeType} // Verifica si la celda es "state" y si hay un badgeType
              badgeType={badgeType && key === "state" ? badgeType(value) : null} // Pasa el badgeType dinámicamente
            />
          ))}
        </tr>
      ))}
    </>
  );
};
