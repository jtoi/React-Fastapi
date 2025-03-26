import React from "react";
import { TextInput } from "../atoms/TextInput";

export const FormEntry = ({ label, type, name, id, value, handleChange, required }) => {
	return (
		<div className="form-group mb-3">
			<label htmlFor={id}>{label}</label>
			<TextInput
				type={type}
				id={id}
				name={name}
				value={value}
				handleChange={handleChange}
				required={required}
			/>
		</div>
	);
};