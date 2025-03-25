import React from 'react';

export const Button = ({ url, data, label, clase }) => {
  return (
    <a data={data} scope="col" className={clase} href={url}>
      {label}
    </a>
  );
};