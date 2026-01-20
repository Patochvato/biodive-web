import React from 'react';

// 1. On sort la fonction de logique pour plus de clarté
const obtenirIcone = (action) => {
    const categorie = action?.CATEGORIE?.toUpperCase() || "";
    const icones = {
        "PLONGÉE": "plongeur1.svg",
        "FAUNE": "faune1.svg",
        "ENVIRONNEMENT": "environnement1.svg",
        "RÉGLEMENTATION": "reglementation1.svg",
        "BONUS": "bonus1.svg",
        "JEU": "jeu1.svg"
    };
    return icones[categorie] || "biodive.png";
};

// ... (haut du fichier inchangé : import et fonction obtenirIcone)

const CarteAction = ({ carte, onContinuer }) => {
  if (!carte) return null;

  const pointsAction = parseInt(carte.VALEUR, 10) || 0;
  const nomIcone = obtenirIcone(carte);
  const cheminImage = new URL(`../public/images/${nomIcone}`, import.meta.url).href;

  const styles = {
    carte: { 
      width: '100%',
      maxWidth: '400px',
      backgroundColor: '#fff3e0', 
      borderRadius: '15px', 
      boxShadow: '0 8px 16px rgba(0,0,0,0.2)', 
      border: '3px solid #ef6c00',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden' // Important pour que le header suive l'arrondi
    },
    header: { 
      backgroundColor: '#ef6c00', 
      color: 'white', 
      padding: '12px 15px', 
      display: 'flex',
      justifyContent: 'space-between', // Aligne le titre à gauche et les points à droite
      alignItems: 'center', 
      fontWeight: 'bold', 
      textTransform: 'uppercase' 
    },
    pointsBadge: {
      backgroundColor: 'white',
      color: '#ef6c00',
      padding: '2px 10px',
      borderRadius: '12px', // Style "pilule" comme la carte Faune
      fontSize: '0.9em'
    },
    content: { padding: '10px', textAlign: 'center' },
    icone: { width: '80px', height: '80px', marginBottom: '1px' },
    description: { fontSize: '1.05em', fontStyle: 'italic', color: '#444', marginBottom: '15px' },
    effetBox: { backgroundColor: '#ffe0b2', padding: '5px', borderRadius: '8px', border: '1px dashed #ef6c00' },
    btn: { width: '100%', padding: '15px', backgroundColor: '#ef6c00', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }
  };

  return (
    <div style={styles.carte}>
      <div style={styles.header}>
        <span>{carte.CATEGORIE || "ACTION"}</span>
        <span style={styles.pointsBadge}>
          {pointsAction > 0 ? `+${pointsAction}` : pointsAction} pts
        </span>
      </div>
      
      <div style={styles.content}>
        <img src={cheminImage} alt="icone" style={styles.icone} />

        <p style={styles.description}>"{carte.DESCRIPTION || carte.QUESTION}"</p>
        
        <div style={styles.effetBox}>
          <strong>EFFET :</strong>
          <p>{carte.EFFET}</p>
        </div>

        {carte.EXPLICATIONS && (
          <p style={{ fontSize: '0.85em', marginTop: '10px', color: '#666' }}>
              {carte.EXPLICATIONS}
          </p>
        )}
      </div>

      <button style={styles.btn} onClick={() => onContinuer(pointsAction)}>
        OK, J'AI COMPRIS
      </button>
    </div>
  );
};

export default CarteAction;