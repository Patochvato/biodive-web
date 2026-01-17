import React from 'react';

const CarteAction = ({ carte, onContinuer }) => {
  if (!carte) return null;

  const obtenirIcone = (action) => {
    const texte = JSON.stringify(action).toUpperCase();
    let nomFichier = "biodive.png"; 

    if (texte.includes("PLONG")) nomFichier = "plongeur1.svg";
    else if (texte.includes("FAUN")) nomFichier = "faune1.svg";
    else if (texte.includes("ENVIRON")) nomFichier = "environnement1.svg";
    else if (texte.includes("REGLE") || texte.includes("LOI")) nomFichier = "reglementation1.svg";
    else if (texte.includes("BONUS")) nomFichier = "bonus1.svg";
    else if (texte.includes("JEU")) nomFichier = "jeu1.svg";

    return (
      <img 
        src={`/images/${nomFichier}`} 
        style={{ width: '80px', height: '80px', objectFit: 'contain', margin: '10px auto', display: 'block' }} 
        alt="icone"
        onError={(e) => { e.target.src = "/images/biodive.png"; }}
      />
    );
  };

  const styles = {
    // CORRECTION : Utilisation de 'carte' pour la cohérence et ajout du scroll
    carte: { 
      width: '100%',
      maxWidth: '350px', 
      maxHeight: '85vh', // Limite la hauteur à 85% de l'écran
      overflowY: 'auto', // Permet de scroller si le texte est long
      backgroundColor: '#fff3e0', 
      borderRadius: '15px', 
      boxShadow: '0 8px 16px rgba(0,0,0,0.2)', 
      border: '3px solid #ef6c00',
      display: 'flex',
      flexDirection: 'column'
    },
    header: { backgroundColor: '#ef6c00', color: 'white', padding: '15px', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' },
    content: { padding: '20px', textAlign: 'center' },
    description: { fontSize: '1.1em', fontStyle: 'italic', color: '#444', marginBottom: '15px' },
    effetBox: { backgroundColor: '#ffe0b2', padding: '15px', borderRadius: '8px', border: '1px dashed #ef6c00' },
    // CORRECTION : Ajout du style pour le bouton (il manquait dans ton return)
    btn: { width: '100%', padding: '15px', backgroundColor: '#ef6c00', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginTop: 'auto' }
  };

  // On s'assure que VALEUR est traité comme un nombre
  const pointsAction = parseInt(carte.VALEUR, 10) || 0;

  return (
    <div style={styles.carte}>
      <div style={styles.header}>
        {carte.CATEGORIE || "ACTION"}
      </div>
      
      <div style={styles.content}>
        {obtenirIcone(carte)}

        {/* Note : Vérifie que ton JSON utilise bien DESCRIPTION et non QUESTION pour les actions */}
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

        {/* Dans le rendu de CarteAction.jsx, juste avant le bouton : */}
<div style={{ 
  fontSize: '24px', 
  fontWeight: 'bold', 
  color: pointsAction < 0 ? '#d32f2f' : '#388e3c',
  marginTop: '10px' 
}}>
  {/* Affichage dynamique du texte selon la valeur */}
  {pointsAction > 0 ? `+${pointsAction}` : pointsAction} 
  {Math.abs(pointsAction) <= 9 ? " Cases 🌊" : " Points ⭐"}
</div>
      </div>

      {/* CORRECTION : Envoi des points au score lors du clic et ajout du style bouton */}
      <button style={styles.btn} onClick={() => onContinuer(pointsAction)}>
        OK, J'AI COMPRIS
      </button>
    </div>
  );
};

export default CarteAction;