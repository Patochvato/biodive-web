import React from 'react';
import { IMAGES_FACES_DE } from '../constants/gameConstants';

/**
 * Écran du club de plongée (départ)
 */
const ClubPlongee = ({ dernierDe, onLancerDe }) => {
  const styles = {
    container: {
      width: '100%',
      maxWidth: '380px',
      backgroundColor: 'white',
      padding: '30px 20px',
      borderRadius: '20px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
      textAlign: 'center'
    },
    deContainer: {
      margin: '20px auto',
      width: '150px',
      height: '150px',
      border: '3px solid #0288d1',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      overflow: 'hidden',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
    },
    imageDeEntier: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      padding: '15px',
      opacity: 0.6
    },
    imageFaceDe: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      padding: '10px',
      animation: 'popIn 0.3s ease-out'
    },
    bouton: {
      padding: '12px 25px',
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontWeight: 'bold',
      cursor: 'pointer'
    }
  };

  const obtenirMessage = () => {
    if (!dernierDe) return "Tentez de tirer PLONGEUR pour démarrer !";
    if (dernierDe === "PLONGEUR" || dernierDe === "BINGO") return "C'est parti ! 🤿";
    return "Équipement trouvé ! Rejouez pour partir.";
  };

  return (
    <div style={styles.container}>
      <h2 style={{ color: '#0288d1', marginBottom: '20px' }}>
        🏠 Club de Plongée
      </h2>

      <div style={styles.deContainer}>
        {dernierDe ? (
          <img
            src={`/images/${IMAGES_FACES_DE[dernierDe]}`}
            alt={dernierDe}
            style={styles.imageFaceDe}
          />
        ) : (
          <img
            src="/images/dedepart.png"
            alt="Lancer le dé"
            style={styles.imageDeEntier}
          />
        )}
      </div>

      <p style={{ marginBottom: '15px' }}>{obtenirMessage()}</p>

      <button onClick={onLancerDe} style={styles.bouton}>
        LANCER LE DÉ DE DÉPART
      </button>
    </div>
  );
};

export default ClubPlongee;
