import React from "react";
import { Button } from "./Button";

/**
 * Componente que renderiza una celda del header de una tabla, contiene un botón que,
 * al hacerle clic, ejecuta una función dada.
 *
 * @param {function} onClick - Función que se va a ejecutar al hacer clic en el botón
 * @param {string} data - Valor que se va a utilizar para ordenar la tabla
 * @param {string} label - Texto que se va a mostrar en el botón
 * @param {string} clase - Clase CSS adicional que se va a aplicar al botón
 * @returns {React.ReactElement} - Componente que se va a renderizar
 */
export const THeaderCell
 = ({ onClick, data, label, clase }) => {
	return <th data-sort={data}><Button url={onClick} data={data} label={label} clase={clase}></Button></th>;
};