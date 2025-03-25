import React from "react";
import { THeaderCell } from "../atoms/THeaderCell";

/**
 * Componente que renderiza una fila de header de una tabla.
 * Recibe un array de objetos (headerData) que representan las celdas de la fila.
 * Cada objeto debe tener las siguientes propiedades:
 * - label: string que se va a mostrar en la celda
 * - click: función que se va a ejecutar al hacer clic en la celda
 * - clase: string que se va a utilizar como clase CSS para la celda
 * 
 * @param {array} headerData Un array de objetos con las celdas de la fila.
 * @returns Un JSX con la fila de la tabla.
 */
export const THeaderRow = ({ headerData }) => {
	console.log("headerData:", headerData);
	return (
		<thead>
			<tr>
				{headerData.map((child, index) => (
                    <THeaderCell 
                        key={index} 
                        data={child.label} 
                        onClick={child.click}
						label={child.label}
						clase={child.clase}
                    >
                    </THeaderCell>
                ))}
			</tr>
		</thead>
	);
};