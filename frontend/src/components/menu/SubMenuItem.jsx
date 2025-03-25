import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link

export const SubMenuItem = ({ text, url, onClick }) => {

  const handleClick = (e) => {
    if (onClick) {
      onClick(); // Ejecuta la función onClick si está definida
    }
  };

  return (
    <li>
      <Link to={url} alt={text} title={text} className="submenu-link" onClick={handleClick}>
        {text}
      </Link>
    </li>
  );
};