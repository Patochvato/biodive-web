import React from 'react';
import '../cartes.css';

const CarteVraiFauxButtons = ({ onVrai, onFaux, className = '' }) => {
  return (
    <div className={`carte-choix-vf ${className}`.trim()}>
      <button className="carte-btn carte-btn-choix carte-btn-vrai" onClick={onVrai}>
        VRAI
      </button>
      <button className="carte-btn carte-btn-choix carte-btn-faux" onClick={onFaux}>
        FAUX
      </button>
    </div>
  );
};

export default CarteVraiFauxButtons;
