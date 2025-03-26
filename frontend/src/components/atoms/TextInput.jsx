import React from "react";

export const TextInput = ({ type, name, id, value, handleChange, required }) => {
  return (
	<input
		type={type}
		id={id}
		name={name}
		className="form-control"
		value={value}
		onChange={handleChange}
		required={required}
	/>
  );
};