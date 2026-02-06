import React from 'react';
import '../cartes.css';

const CarteChoixOptions = ({ options, onChoix, className = '' }) => {
  return (
    <div className={`carte-choix-list ${className}`.trim()}>
      {options.map((optionTexte, index) => (
        <button
          key={index}
          className="carte-btn carte-btn-choix"
          onClick={() => onChoix(optionTexte)}
        >
          {optionTexte}
        </button>
      ))}
    </div>
  );
};

export default CarteChoixOptions;
