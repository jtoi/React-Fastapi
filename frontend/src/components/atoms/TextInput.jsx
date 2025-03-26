import React from "react";

export const TextInput = ({ type, name, id, value, handleChange, required }) => {
	return (
		<input
			type={type}
			id={id}
			name={name}
			className="form-control"
			defaultValue={value || ""} // Asegúrate de evitar valores undefined
			onChange={handleChange} // Aquí debe estar configurado
			required={required}
		/>
	);
}; c