import React from 'react';
import { playSound } from './audioManager';
import CarteActionButton from './components/CarteActionButton';
import CarteActionEffet from './components/CarteActionEffet';
import CarteHeader from './components/CarteHeader';
import './cartes.css';

const obtenirIcone = (action) => {
    const categorie = action?.CATEGORIE?.toUpperCase() || "";
    const icones = {
        "PLONGÉE": "plongeur1.svg",
        "FAUNE": "faune1.svg",
        "ENVIRONNEMENT": "environnement1.svg",
        "REGLEMENTATION": "reglement1.svg",
        "BONUS": "bonus1.svg",
        "SUPER BONUS": "bouclier.png",
        "JEU": "jeu1.svg"
    };
    return icones[categorie] || "biodive.png";
};

const CarteAction = ({ carte, inventaire, onContinuer }) => {
  if (!carte) return null;

  const pointsAction = parseInt(carte.VALEUR, 10) || 0;
  const nomIcone = obtenirIcone(carte);
  const cheminImage = `/images/${nomIcone}`;
  
  const estSuperBonus = carte.CATEGORIE?.toUpperCase() === "SUPER BONUS";
  const estDanger = carte.TYPE?.toUpperCase() === "DANGER";
  const aObjetRequis = carte.OBJET_REQUIS && inventaire[carte.OBJET_REQUIS.toLowerCase()] > 0;
  const aBouclier = inventaire.bouclier > 0;
  const estProtege = estDanger && (aObjetRequis || aBouclier);

  const gererClicFinal = () => {
    if (estProtege) {
      let objetAConsommer = aObjetRequis ? carte.OBJET_REQUIS.toLowerCase() : "bouclier";
      onContinuer(0, objetAConsommer); 
    } else {
      if (estSuperBonus) playSound('gagne.mp3', 0.6);
      else if (pointsAction < 0) playSound('perdu.mp3', 0.4);
      else if (pointsAction > 0) playSound('gagne.mp3', 0.3);
      onContinuer(pointsAction);
    }
  };

  return (
    <div
      className={`carte carte-action ${estSuperBonus ? 'carte-super-bonus' : ''}`}
      style={{ border: estProtege ? '4px solid #4caf50' : '3px solid #ef6c00' }}
    >
      <CarteHeader
        title={estSuperBonus ? "✨ SUPER BONUS ✨" : (estProtege ? "🛡️ PROTECTION ACTIVE" : (carte.CATEGORIE || "ACTION"))}
        pointsText={estProtege ? "0 pts" : (pointsAction > 0 ? `+${pointsAction}` : `${pointsAction} pts`)}
        headerStyle={{
          backgroundColor: estSuperBonus ? '#ffd700' : (estProtege ? '#4caf50' : '#ef6c00'),
          color: estSuperBonus ? '#5c4300' : 'white'
        }}
        badgeStyle={{
          color: estSuperBonus ? '#ffd700' : (estProtege ? '#4caf50' : '#ef6c00')
        }}
      />
      
      <div className="carte-action-content">
        <div className="carte-body">
          <img
            src={cheminImage}
            alt="icone"
            className={`carte-action-icone ${estSuperBonus ? 'icone-super-bonus' : ''}`}
          />
          
          <div className="carte-action-description">
              {estSuperBonus && <span style={{display:'block', color:'#b8860b', fontWeight:'bold', marginBottom: '5px'}}>ÉQUIPEMENT LÉGENDAIRE !</span>}
              {carte.DESCRIPTION || carte.QUESTION}
          </div>

          <CarteActionEffet
            estSuperBonus={estSuperBonus}
            estProtege={estProtege}
            aBouclier={aBouclier}
            objetRequis={carte.OBJET_REQUIS}
            effet={carte.EFFET}
            explications={carte.EXPLICATIONS}
          />

          <div className="carte-actions-bottom">
            <CarteActionButton
              className="carte-action-btn"
              style={{
                backgroundColor: estSuperBonus ? '#ffd700' : (estProtege ? '#4caf50' : '#ef6c00'),
                color: estSuperBonus ? '#5c4300' : 'white'
              }}
              label={estSuperBonus ? "GÉNIAL ! JE PRENDS" : (estProtege ? "OUF ! CONTINUER" : "OK, J'AI COMPRIS")}
              onClick={gererClicFinal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarteAction;