import React from 'react';
import '../cartes.css';

const CarteHeader = ({ title, pointsText, headerStyle, badgeStyle }) => {
  return (
    <div className="carte-header" style={headerStyle}>
      <span className="carte-header-title">{title}</span>
      <span className="carte-points-badge" style={badgeStyle}>
        {pointsText}
      </span>
    </div>
  );
};

export default CarteHeader;
