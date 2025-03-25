import React from 'react';

export const Badge = ({ type, children }) => {
  const badgeClass = `badge bg-${type}`;

  return <span className={badgeClass}>{children}</span>;
};