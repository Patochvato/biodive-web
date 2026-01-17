import React from 'react';

const DePlacement = ({ onLancer, catalogue }) => {
  const lancerLeDe = () => {
  if (catalogue.length === 0) {
    alert("Vous avez exploré toutes les zones ! Direction l'arrivée !");
    onLancer(6, null); // On fait avancer le joueur sans carte
    return;
  }

    const valeurDe = Math.floor(Math.random() * 6) + 1;
    const indexAleatoire = Math.floor(Math.random() * catalogue.length);
    const cartePiochee = catalogue[indexAleatoire];

    onLancer(valeurDe, cartePiochee);
  };

  const styles = {
    container: {
      width: '90%',           // Force la largeur à 100% du parent (le main)
      maxWidth: '380px',       // S'aligne sur la largeur de tes cartes Faune/Action
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '100px 20px',    // Plus d'espace pour un look "carte"
      boxShadow: '0 8px 20px rgba(0,0,0,0.1)', // Ombre pour rappeler les autres cartes
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: '30px'              // Espace entre le titre et le bouton
    },
    titre: {
      color: '#0288d1',
      fontSize: '1.8rem',
      margin: 0
    },
    bouton: {
      padding: '20px',
      fontSize: '1.3rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      borderRadius: '15px',
      boxShadow: '0 4px 0 #388e3c', // Petit effet 3D sur le bouton
      transition: 'transform 0.1s'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.titre}>À vous de jouer !</h2>
      
      <button 
        onClick={lancerLeDe}
        style={styles.bouton}
        onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
        onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
      >
        🎲 LANCER LE DÉ
      </button>
    </div>
  );
};

export default DePlacement;