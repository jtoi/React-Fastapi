import React from 'react';

export const Text = ({ texto, clase }) => {
  return <p className={clase}>{texto}</p>;
};