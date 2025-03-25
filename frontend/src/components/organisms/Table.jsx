import React from 'react';
import { TableHeader } from '../molecules/TableHeader';

export const Table = ({  }) => {
	const headerData = [
		{
		  label: "Id",
		  click: "2.589,00 €",
		  data: "id",
		  clase: "btn btn-primary",
		},
		{
		  label: "Cliente",
		  click: "85%",
		  data: "client",
		  clase: "btn btn-primary",
		},
		{
		  label: "Producto",
		  click: "20 Horas",
		  data: "prod",
		  clase: "btn btn-primary",
		},
		{
		  label: "Cantidad",
		  click: "otracosa",
		  data: "qtty",
		  clase: "btn btn-primary",
		},
		{
		  label: "Fecha",
		  click: "98",
		  data: "addate",
		  clase: "btn btn-primary",
		},
		{
		  label: "Estado",
		  click: "cambistate",
		  data: "state",
		  clase: "btn btn-primary",
		},
	  ];
  return (
	<table className="table table-hover">
		<TableHeader headerData={headerData}></TableHeader>
	</table>
  );
};