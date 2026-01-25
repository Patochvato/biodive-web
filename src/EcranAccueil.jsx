import React from 'react';
import { playSound } from './audioManager';

const EcranAccueil = ({ onDemarrer }) => {
  
  const jouerSonEtDemarrer = () => {
    // JUSTE 'bulles.mp3', pas de '/sons/' devant
    playSound('bulles.mp3', 0.5); 
    
    setTimeout(() => {
      onDemarrer();
    }, 400); // Un délai légèrement plus long pour bien entendre les bulles
  };

  const styles = {
    conteneur: {
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      // L'IMAGE EN ARRIÈRE-PLAN ICI
      backgroundImage: `url('/images/fond1.svg')`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '20px',
      boxSizing: 'border-box'
    },
    // On ajoute un voile sombre léger pour que le texte reste lisible sur l'image
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.2)', // Ajuste l'opacité au besoin
      zIndex: 1
    },
    titre: {
      fontSize: '3.5rem',
      fontWeight: 'bold',
      margin: '0',
      textShadow: '0 4px 10px rgba(0,0,0,0.5)',
      zIndex: 3 // Devant les bulles
    },
    message: {
      fontSize: '1.2rem',
      margin: '20px 0 40px',
      maxWidth: '300px',
      fontWeight: 'bold',
      textShadow: '0 2px 4px rgba(0,0,0,0.5)',
      zIndex: 3
    },
    bouton: {
      padding: '18px 40px',
      fontSize: '1.4rem',
      backgroundColor: '#ff9800',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
      zIndex: 3,
      transition: 'transform 0.2s'
    }
  };

  return (
    <div style={styles.conteneur}>
      <div style={styles.overlay} />

      {/* Bulles : zIndex 2 pour être entre le fond et le texte */}
      <div className="bubbles" style={{ zIndex: 2, position: 'absolute', width: '100%', height: '100%' }}>
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
      </div>

      <h1 style={styles.titre}>BIO DIVE</h1>
      
      <p style={styles.message}>
        Plonger à la découverte de la biodiversité marine
      </p>
      
      <button 
        style={styles.bouton} 
        onClick={jouerSonEtDemarrer}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        COMMENCER
      </button>
      <p style={styles.message}>
        Gagner des points en répondant à des questions <br /><br />Progresser en relevant des défis sur la biodiversité marine !
      </p>

      <style>
        {`
          .bubble {
      position: absolute;
      bottom: -100px;
      /* On utilise un blanc très transparent (0.15) et un léger flou (blur) */
      background-color: rgba(255, 255, 255, 0.15); 
      backdrop-filter: blur(2px); /* Effet de réfraction de l'eau */
      border: 1px solid rgba(255, 255, 255, 0.3); /* Contour fin pour la brillance */
      border-radius: 50%;
      pointer-events: none;
      animation: rise 12s infinite ease-in;
    }

    /* Tailles et délais variés pour un aspect naturel */
    .bubble:nth-child(1) { left: 15%; width: 45px; height: 45px; animation-duration: 9s; }
    .bubble:nth-child(2) { left: 35%; width: 25px; height: 25px; animation-duration: 14s; animation-delay: 2s; }
    .bubble:nth-child(3) { left: 55%; width: 55px; height: 55px; animation-duration: 10s; animation-delay: 5s; }
    .bubble:nth-child(4) { left: 80%; width: 35px; height: 35px; animation-duration: 13s; animation-delay: 1s; }
    .bubble:nth-child(5) { left: 25%; width: 40px; height: 40px; animation-duration: 11s; animation-delay: 7s; }

    @keyframes rise {
      0% { 
        transform: translateY(0) scale(1); 
        opacity: 0; 
      }
      20% { 
        opacity: 0.7; 
      }
      80% { 
        opacity: 0.4; 
      }
      100% { 
        /* On ajoute un léger mouvement latéral (X) pour simuler le courant */
        transform: translateY(-120vh) translateX(30px) scale(1.8); 
        opacity: 0; 
      }
    }
      `}
      </style>
    </div>
  );
};

export default EcranAccueil;