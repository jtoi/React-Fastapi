import React from 'react';

/**
 * Badge component.
 * @param {string} type - The type of badge. Bootstrap types (primary, secondary, success, danger, warning, info, light, dark)
 * @param {*} children - The content of the badge
 * @returns A JSX element representing the badge.
 */
export const Badge = ({ type, children }) => {
  const badgeClass = `badge bg-${type}`;

  return <span className={badgeClass}>{children}</span>;
};