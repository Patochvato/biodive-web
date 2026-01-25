import React from 'react';
import { playSound } from './audioManager'; // Pour le feedback sonore

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

// AJOUT DE L'INVENTAIRE DANS LES PROPS
const CarteAction = ({ carte, inventaire, onContinuer }) => {
  if (!carte) return null;

  const pointsAction = parseInt(carte.VALEUR, 10) || 0;
  const nomIcone = obtenirIcone(carte);
  const cheminImage = `/images/${nomIcone}`;

  // LOGIQUE DE PROTECTION
  const estDanger = carte.TYPE?.toUpperCase() === "DANGER";
  const aObjetRequis = carte.OBJET_REQUIS && inventaire[carte.OBJET_REQUIS.toLowerCase()];
  const aBouclier = inventaire.bouclier; // Vérifie si le bouclier est possédé

  const estProtege = estDanger && (aObjetRequis || aBouclier);

  const gererClicFinal = () => {
  if (estProtege) {
    // On détermine ce qui a servi de protection
    // Priorité à l'objet spécifique requis, sinon le bouclier
    let objetAConsommer = aObjetRequis ? carte.OBJET_REQUIS.toLowerCase() : "bouclier";
    
    // On appelle finirTour avec 0 points de malus ET le nom de l'objet à retirer
    onContinuer(0, objetAConsommer); 
  } else {
    // Cas normal : malus ou bonus appliqué sans consommation
    if (pointsAction < 0) playSound('perdu.mp3', 0.4);
    onContinuer(pointsAction);
  }
  };

  const styles = {
    // ... tes styles restent exactement les mêmes ...
    carte: { 
      width: '100%', maxWidth: '400px', backgroundColor: '#fff3e0', 
      borderRadius: '15px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)', 
      border: estProtege ? '4px solid #4caf50' : '3px solid #ef6c00', // Bordure verte si protégé
      display: 'flex', flexDirection: 'column', overflow: 'hidden' 
    },
    header: { 
      backgroundColor: estProtege ? '#4caf50' : '#ef6c00', // Header vert si protégé
      color: 'white', padding: '12px 15px', display: 'flex',
      justifyContent: 'space-between', alignItems: 'center', 
      fontWeight: 'bold', textTransform: 'uppercase' 
    },
    pointsBadge: { backgroundColor: 'white', color: estProtege ? '#4caf50' : '#ef6c00', padding: '2px 10px', borderRadius: '12px', fontSize: '0.9em' },
    content: { padding: '10px', textAlign: 'center' },
    icone: { width: '80px', height: '80px', marginBottom: '1px' },
    description: { fontSize: '1.05em', fontStyle: 'italic', color: '#444', marginBottom: '15px' },
    effetBox: { backgroundColor: estProtege ? '#e8f5e9' : '#ffe0b2', padding: '5px', borderRadius: '8px', border: estProtege ? '1px dashed #4caf50' : '1px dashed #ef6c00' },
    btn: { width: '100%', padding: '15px', backgroundColor: estProtege ? '#4caf50' : '#ef6c00', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }
  };

  return (
    <div style={styles.carte}>
      <div style={styles.header}>
        <span>{estProtege ? "🛡️ PROTECTION ACTIVE" : (carte.CATEGORIE || "ACTION")}</span>
        <span style={styles.pointsBadge}>
          {estProtege ? "0 pts" : (pointsAction > 0 ? `+${pointsAction}` : `${pointsAction} pts`)}
        </span>
      </div>
      
      <div style={styles.content}>
        <img src={cheminImage} alt="icone" style={styles.icone} />

        <p style={styles.description}>{carte.DESCRIPTION || carte.QUESTION}</p>
        
        <div style={styles.effetBox}>
          <strong>{estProtege ? "SÉCURITÉ :" : "EFFET :"}</strong>
          <p>{estProtege ? `Grâce à votre ${aBouclier ? 'Bouclier' : carte.OBJET_REQUIS}, vous évitez le danger !` : carte.EFFET}</p>
        </div>

        {carte.EXPLICATIONS && (
          <p style={{ fontSize: '0.85em', marginTop: '10px', color: '#666', whiteSpace: 'pre-line' }}>
              {carte.EXPLICATIONS}
          </p>
        )}
      </div>

      <button style={styles.btn} onClick={gererClicFinal}>
        {estProtege ? "OUF ! CONTINUER" : "OK, J'AI COMPRIS"}
      </button>
    </div>
  );
};

export default CarteAction;