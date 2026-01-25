import React from 'react';

const BarreInventaire = ({ inventaire }) => {
  const styles = {
    container: {
      display: 'flex',
      gap: '20px', // Un peu plus de gap pour laisser de la place aux badges
      justifyContent: 'center',
      alignItems: 'center',
      padding: '10px 25px',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      borderRadius: '15px',
      border: '1px solid #b3e5fc',
      margin: '20px 0',
      width: 'fit-content'
    },
    // Conteneur individuel pour chaque icône (nécessaire pour positionner le badge)
    iconWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    icon: (quantite) => ({
      width: '40px',
      height: '40px',
      objectFit: 'contain',
      // On teste si quantite > 0 au lieu de true/false
      filter: quantite > 0 
        ? 'drop-shadow(0px 0px 5px #ffd700) saturate(1.2)' 
        : 'grayscale(100%) opacity(0.3)',
      transition: 'all 0.4s ease'
    }),
    badge: {
      position: 'absolute',
      bottom: '-5px',
      right: '-8px',
      backgroundColor: '#ef6c00', // Orange vif pour bien voir le nombre
      color: 'white',
      borderRadius: '50%',
      width: '18px',
      height: '18px',
      fontSize: '11px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1.5px solid white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
      zIndex: 2
    }
  };

  // Petite fonction interne pour éviter de répéter le code des images
  const RendreIcone = (nom, quantite, icone, titre) => (
    <div style={styles.iconWrapper}>
      <img 
        src={`/images/${icone}`} 
        style={styles.icon(quantite)} 
        alt={nom} 
        title={titre}
      />
      {quantite > 0 && <div style={styles.badge}>{quantite}</div>}
    </div>
  );

  return (
    <div style={styles.container}>
      {RendreIcone("Caméra", inventaire.camera, "camera.png", "Bonus Vidéo")}
      {RendreIcone("Couteau", inventaire.couteau, "couteau.png", "Protection")}
      {RendreIcone("Bouclier", inventaire.bouclier, "bouclier.png", "Protection")}
      {RendreIcone("Appareil Photo", inventaire.photo, "photo.png", "Bonus Photo")}
    </div>
  );
};

export default BarreInventaire;