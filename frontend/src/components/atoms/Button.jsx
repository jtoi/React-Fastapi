import React from 'react';

export const Button = ({ type, label }) => {
  return (
    <button type={type} className="btn btn-primary w-100">
      {label}
  </button>
  );
};