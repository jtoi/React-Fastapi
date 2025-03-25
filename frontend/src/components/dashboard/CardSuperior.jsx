import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link

export const CardSuperior = ({ label, text, pie, onClick }) => {

	const handleClick = (e) => {
		if (onClick) {
			onClick(); // Ejecuta la función onClick si está definida
		}
	};

	return (
		<div className="col-md-6 col-lg-3">
			<div className="card">
				<div className="card-header">
					<h5>{label}</h5>
				</div>
				<div className="card-body text-center">
					<div className="card-icon mb-3">
						<i className="fas fa-apple-alt"></i>
					</div>
					<h3>{text}</h3>
					<p className="text-muted">{pie}</p>
				</div>
			</div>
		</div>
	);
};