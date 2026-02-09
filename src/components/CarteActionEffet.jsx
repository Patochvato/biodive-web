import React from 'react';
import '../cartes.css';

const CarteActionEffet = ({ estSuperBonus, estProtege, aBouclier, objetRequis, effet, explications }) => {
  return (
    <>
      <div
        className="carte-action-effet"
        style={{
          backgroundColor: estSuperBonus ? '#fff9c4' : (estProtege ? '#e8f5e9' : '#ffe0b2'),
          border: estSuperBonus ? '2px solid #ffd700' : '1px dashed #ef6c00'
        }}
      >
        {/*<strong>{estProtege ? "S\u00c9CURIT\u00c9 :" : ""}</strong>*/}
        <p>
          {estProtege ? `Gr\u00e2ce \u00e0 votre ${aBouclier ? 'Bouclier' : objetRequis}, vous \u00e9vitez le danger !` : effet}
        </p>
      </div>

      {explications && (
        <p className="carte-action-explications">{explications}</p>
      )}
    </>
  );
};

export default CarteActionEffet;
