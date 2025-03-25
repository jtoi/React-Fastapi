import React from 'react';

export const Card = ({ header, icon, value, text }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5>{header}</h5>
      </div>
      <div className="card-body text-center">
        <div className="card-icon mb-3">
          <i className={icon}></i>
        </div>
        <h3>{value}</h3>
        <p className="text-muted">{text}</p>
      </div>
    </div>
  );
};
