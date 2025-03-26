import React from 'react';

/**
 * Componente que renderiza un botón con un enlace a una url dada.
 * El botón se renderiza con una clase CSS adicional dada en la propiedad `clase`.
 * La propiedad `data` se utiliza para especificar el valor de la propiedad `data-*` del botón.
 * La propiedad `label` es el texto que se muestra en el botón.
 *
 * @param {string} url - Url del enlace del botón
 * @param {string} data - Valor de la propiedad `data-*` del botón
 * @param {string} label - Texto del botón
 * @param {string} clase - Clase CSS adicional para el botón
 * @returns {React.ReactElement} - Componente que se va a renderizar
 */
export const Link = ({ url, data, label, clase }) => {
  return (
    <Link data={data} scope="col" title={label} alt={label} className={clase} href={url}>
      {label}
    </Link>
  );
};