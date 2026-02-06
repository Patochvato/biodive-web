import React from 'react';
import '../cartes.css';

const CarteOuiNonButtons = ({ points, onOui, onNon }) => {
  return (
    <div className="carte-reponse-actions">
      <button className="carte-btn-validation carte-btn-oui" onClick={onOui}>
        OUI (+{points})
      </button>
      <button className="carte-btn-validation carte-btn-non" onClick={onNon}>
        NON (-{points})
      </button>
    </div>
  );
};

export default CarteOuiNonButtons;
