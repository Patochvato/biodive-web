import React, { useEffect } from 'react';
import { playSound } from './audioManager';

const EcranVictoire = ({ score, objets, onRejouer, onQuitter }) => {
  // Déclenchement du son à l'apparition de l'écran
  useEffect(() => {
    // On joue le son final
    playSound('final.mp3', 0.5);
  }, []); // Le tableau vide [] assure que le son ne joue qu'une seule fois

  // Logique de distinction selon les points
  const obtenirAppreciation = (points) => {
    if (points < 0) {
      return {
        titre: "DOMMAGE...",
        message: "L'océan est fragile, il faut en prendre soin. Retente ta chance pour protéger la biodiversité !",
        couleur: "#e57373" // Rouge doux
      };
    } else if (points <= 500) {
      return {
        titre: "BIEN ESSAYÉ !",
        message: "Tu commences à comprendre les secrets de la mer. Continue tes explorations !",
        couleur: "#81c784" // Vert doux
      };
    } else if (points < 1000) {
      return {
        titre: "BRAVO !",
        message: "Quelle belle plongée ! Tu as récolté de précieuses informations sur le milieu marin.",
        couleur: "#4db6ac" // Turquoise
      };
    } else {
      return {
        titre: "EXPERT MARIN !",
        message: "Incroyable ! Tu es un véritable protecteur des océans. La biodiversité te remercie !",
        couleur: "#ffd54f" // Or
      };
    }
  };

  const appreciation = obtenirAppreciation(score);

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(1, 87, 155, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px',
      boxSizing: 'border-box'
    },
    carte: {
      backgroundColor: 'white',
      borderRadius: '30px',
      padding: '40px 20px',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      border: `8px solid ${appreciation.couleur}`,
      position: 'relative'
    },
    trophee: {
      fontSize: '80px',
      marginBottom: '10px'
    },
    titre: {
      fontSize: '2.5rem',
      color: appreciation.couleur,
      margin: '10px 0',
      fontWeight: '900'
    },
    message: {
      fontSize: '1.1rem',
      color: '#555',
      marginBottom: '25px',
      lineHeight: '1.4',
      padding: '0 10px'
    },
    scoreBox: {
      backgroundColor: '#f5f5f5',
      borderRadius: '20px',
      padding: '20px',
      marginBottom: '30px'
    },
    scoreChiffre: {
      fontSize: '3rem',
      display: 'block',
      fontWeight: 'bold',
      color: '#0277bd'
    },
    boutonRejouer: {
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      padding: '15px 30px',
      borderRadius: '50px',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      width: '100%',
      marginBottom: '10px',
      boxShadow: '0 4px 10px rgba(76, 175, 80, 0.3)'
    },
    boutonQuitter: {
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      padding: '12px 30px',
      borderRadius: '50px',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      width: '100%',
      opacity: 0.9
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.carte}>
        <div style={styles.trophee}>
          {score >= 1000 ? '👑' : '🏆'}
        </div>
        
        <h2 style={styles.titre}>{appreciation.titre}</h2>
        
        <p style={styles.message}>{appreciation.message}</p>

        <div style={styles.scoreBox}>
      <span style={{ color: '#888', fontSize: '0.9rem' }}>SCORE FINAL</span>
      <span style={styles.scoreChiffre}>{score} PTS</span>
      <div style={{ marginTop: '5px', fontWeight: 'bold', color: '#0277bd' }}>
         🎒 Objets : {objets} / 3 
      </div>
    </div>
        <button 
          style={styles.boutonRejouer} 
          onClick={() => {
            playSound('bulles.mp3');
            onRejouer();
          }}
        >
          NOUVELLE PLONGÉE
        </button>

        <button 
          style={styles.boutonQuitter} 
          onClick={() => {
            // Logique pour quitter (retour à l'accueil)
            onQuitter();
          }}
        >
          QUITTER
        </button>
      </div>
    </div>
  );
};

export default EcranVictoire;