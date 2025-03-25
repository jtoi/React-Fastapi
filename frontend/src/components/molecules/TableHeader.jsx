import React from "react";
import { TableCellHeader } from "../atoms/TableCellHeader";
import { data } from "react-router-dom";

export const TableHeader = ({ headerData }) => {
	return (
		<thead>
			<tr>
				{headerData.map((child, index) => (
                    <TableCellHeader 
                        key={index} 
                        data={child.label} 
                        onClick={child.click}
						label={child.label}
						clase={child.clase}
                    >
                    </TableCellHeader>
                ))}
			</tr>
		</thead>
	);
};