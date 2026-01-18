import React from 'react';

// 1. On sort la fonction de logique pour plus de clarté
const obtenirIcone = (action) => {
    const categorie = action?.CATEGORIE?.toUpperCase() || "";
    const icones = {
        "PLONGEE": "plongeur1.svg",
        "FAUNE": "faune1.svg",
        "ENVIRONNEMENT": "environnement1.svg",
        "REGLEMENTATION": "reglementation1.svg",
        "LOI": "reglementation1.svg",
        "BONUS": "bonus1.svg",
        "JEU": "jeu1.svg"
    };
    return icones[categorie] || "biodive.png";
};

const CarteAction = ({ carte, onContinuer }) => {
  if (!carte) return null;

  // 2. Préparation de l'image
  const nomFichier = obtenirIcone(carte);
  // Cette ligne crée le lien vers ton dossier assets/images
  const cheminImage = new URL(`../public/images/${nomFichier}`, import.meta.url).href;

  const styles = {
    carte: { 
      width: '100%',
      maxWidth: '350px', 
      maxHeight: '85vh', 
      overflowY: 'auto', 
      backgroundColor: '#fff3e0', 
      borderRadius: '15px', 
      boxShadow: '0 8px 16px rgba(0,0,0,0.2)', 
      border: '3px solid #ef6c00',
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto'
    },
    header: { backgroundColor: '#ef6c00', color: 'white', padding: '15px', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' },
    content: { padding: '20px 20px 10px', textAlign: 'center' },
    icone: { width: '60px', height: '60px', marginBottom: '15px' }, // Style pour l'image
    description: { fontSize: '1.1em', fontStyle: 'italic', color: '#444', marginBottom: '15px' },
    effetBox: { backgroundColor: '#ffe0b2', padding: '10px', borderRadius: '8px', border: '1px dashed #ef6c00' },
    btn: { width: '100%', padding: '15px', backgroundColor: '#ef6c00', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginTop: '15px' }
  };

  const pointsAction = parseInt(carte.VALEUR, 10) || 0;

  return (
    <div style={styles.carte}>
      <div style={styles.header}>
        {carte.CATEGORIE || "ACTION"}
      </div>
      
      <div style={styles.content}>
        {/* CORRECTION : On utilise la balise <img> avec le chemin préparé */}
        <img src={cheminImage} alt={carte.CATEGORIE} style={styles.icone} />

        <p style={styles.description}>"{carte.DESCRIPTION || carte.QUESTION}"</p>
        
        <div style={styles.effetBox}>
          <strong>EFFET :</strong>
          <p>{carte.EFFET}</p>
        </div>

        {carte.EXPLICATIONS && (
          <p style={{ fontSize: '0.8em', marginTop: '10px', color: '#888' }}>
              {carte.EXPLICATIONS}
          </p>
        )}

        <div style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: pointsAction < 0 ? '#d32f2f' : '#388e3c',
          marginTop: '10px' 
        }}>
          {pointsAction > 0 ? `+${pointsAction}` : pointsAction} 
          {Math.abs(pointsAction) <= 9 ? " Cases 🌊" : " Points ⭐"}
        </div>
      </div>

      <button style={styles.btn} onClick={() => onContinuer(pointsAction)}>
        OK, J'AI COMPRIS
      </button>
    </div>
  );
};

export default CarteAction;