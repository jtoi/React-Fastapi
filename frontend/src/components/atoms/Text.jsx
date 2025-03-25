import React from 'react';

/**
 * Componente que renderiza un texto con una clase CSS dada en la propiedad `clase`.
 * La propiedad `texto` es el texto a ser renderizado.
 * @param {Object} props - Component props.
 * @param {string} props.texto - Texto a ser renderizado.
 * @param {string} props.clase - Clase CSS a ser aplicada al texto.
 * @returns {ReactElement} - Componente que se va a renderizar.
 */
export const Text = ({ texto, clase }) => {
  return <p className={clase}>{texto}</p>;
};