import React from 'react';

const BarreInventaire = ({ inventaire }) => {
  const styles = {
    // Le conteneur ne force plus de position fixe, il suit le flux vertical
    container: {
      display: 'flex',
      gap: '15px',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      borderRadius: '15px',
      border: '1px solid #b3e5fc',
      margin: '20px 0', // Espacement vertical automatique
      width: 'fit-content' // S'adapte à la taille des icônes
    },
    icon: (possede) => ({
      width: '40px',
      height: '40px',
      objectFit: 'contain',
      // Effet visuel : gris si absent, couleur + éclat si possédé
      filter: possede 
        ? 'drop-shadow(0px 0px 5px #ffd700) saturate(1.2)' 
        : 'grayscale(100%) opacity(0.3)',
      transition: 'all 0.4s ease'
    })
  };

  return (
    <div style={styles.container}>
      <img 
        src="/images/camera.png" 
        style={styles.icon(inventaire.camera)} 
        alt="Caméra" 
        title="Bonus Vidéo"
      />
      <img 
        src="/images/couteau.png" 
        style={styles.icon(inventaire.couteau)} 
        alt="Couteau" 
        title="Protection"
      />
      <img 
        src="/images/photo.png" 
        style={styles.icon(inventaire.photo)} 
        alt="Appareil Photo" 
        title="Bonus Photo"
      />
    </div>
  );
};

export default BarreInventaire;