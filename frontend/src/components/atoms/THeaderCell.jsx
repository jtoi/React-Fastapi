import React from "react";

export const THeaderCell = ({ 
  onClick, 
  data, 
  label, 
  clase = '', 
  className = '' 
}) => {
  const handleClick = typeof onClick === 'function' 
    ? (e) => {
        e.preventDefault();
        onClick(data);
      } 
    : undefined;

  return (
    <th 
      data-sort={data} 
      className={`${clase} ${className}`.trim()}
      onClick={handleClick}
    >
      {label}
    </th>
  );
};