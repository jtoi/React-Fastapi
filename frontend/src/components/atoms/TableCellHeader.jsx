import React from "react";
import { Button } from "./Button";

export const TableCellHeader = ({ onClick, data, label, clase }) => {
	return <th data-sort={data}><Button url={onClick} data={data} label={label} clase={clase}></Button></th>;
};