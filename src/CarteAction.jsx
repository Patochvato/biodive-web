import React from 'react';
import { playSound } from './audioManager';

const obtenirIcone = (action) => {
    const categorie = action?.CATEGORIE?.toUpperCase() || "";
    const icones = {
        "PLONGÉE": "plongeur1.svg",
        "FAUNE": "faune1.png",
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

  const styles = {
    carte: { 
      width: '100%', maxWidth: '400px', backgroundColor: '#fff3e0', 
      borderRadius: '15px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)', 
      border: estProtege ? '4px solid #4caf50' : '3px solid #ef6c00', 
      display: 'flex', flexDirection: 'column', overflow: 'hidden' 
    },
    header: { 
      backgroundColor: estSuperBonus ? '#ffd700' : (estProtege ? '#4caf50' : '#ef6c00'), 
      color: estSuperBonus ? '#5c4300' : 'white', 
      padding: '12px 15px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' 
    },
    pointsBadge: { 
        backgroundColor: 'white', 
        color: estSuperBonus ? '#ffd700' : (estProtege ? '#4caf50' : '#ef6c00'), 
        padding: '2px 10px', borderRadius: '12px', fontSize: '0.9em' 
    },
    content: { padding: '15px', textAlign: 'center' },
    icone: { width: '100px', height: '100px', marginBottom: '10px' },
    description: { fontSize: '1.05em', fontStyle: 'italic', color: '#444', marginBottom: '15px' },
    effetBox: { 
        backgroundColor: estSuperBonus ? '#fff9c4' : (estProtege ? '#e8f5e9' : '#ffe0b2'), 
        padding: '10px', borderRadius: '8px', 
        border: estSuperBonus ? '2px solid #ffd700' : '1px dashed #ef6c00' 
    },
    btn: { 
        width: '100%', padding: '15px', 
        backgroundColor: estSuperBonus ? '#ffd700' : (estProtege ? '#4caf50' : '#ef6c00'), 
        color: estSuperBonus ? '#5c4300' : 'white', 
        border: 'none', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' 
    }
  };

  return (
    <div style={styles.carte} className={estSuperBonus ? 'carte-super-bonus' : ''}>
      <div style={styles.header}>
        <span>{estSuperBonus ? "✨ SUPER BONUS ✨" : (estProtege ? "🛡️ PROTECTION ACTIVE" : (carte.CATEGORIE || "ACTION"))}</span>
        <span style={styles.pointsBadge}>
          {estProtege ? "0 pts" : (pointsAction > 0 ? `+${pointsAction}` : `${pointsAction} pts`)}
        </span>
      </div>
      
      <div style={styles.content}>
        <img 
          src={cheminImage} 
          alt="icone" 
          style={styles.icone} 
          className={estSuperBonus ? 'icone-super-bonus' : ''} 
        />
        
        <div style={styles.description}>
            {estSuperBonus && <span style={{display:'block', color:'#b8860b', fontWeight:'bold', marginBottom: '5px'}}>ÉQUIPEMENT LÉGENDAIRE !</span>}
            {carte.DESCRIPTION || carte.QUESTION}
        </div>

        <div style={styles.effetBox}>
          <strong>{estProtege ? "SÉCURITÉ :" : ""}</strong>
          <p>{estProtege ? `Grâce à votre ${aBouclier ? 'Bouclier' : carte.OBJET_REQUIS}, vous évitez le danger !` : carte.EFFET}</p>
        </div>

        {carte.EXPLICATIONS && (
          <p style={{ fontSize: '0.85em', marginTop: '15px', color: '#666', whiteSpace: 'pre-line' }}>
              {carte.EXPLICATIONS}
          </p>
        )}
      </div>

      <button style={styles.btn} onClick={gererClicFinal}>
        {estSuperBonus ? "GÉNIAL ! JE PRENDS" : (estProtege ? "OUF ! CONTINUER" : "OK, J'AI COMPRIS")}
      </button>
    </div>
  );
};

export default CarteAction;