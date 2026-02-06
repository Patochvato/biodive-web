import React from 'react';
import '../cartes.css';

const CarteActionButton = ({ label, onClick, className = '', style }) => {
  return (
    <button className={`carte-btn carte-btn-action ${className}`.trim()} onClick={onClick} style={style}>
      {label}
    </button>
  );
};

export default CarteActionButton;
