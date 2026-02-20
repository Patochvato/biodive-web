import React from 'react';
import EffetBulles from './EffetBulles';

/**
 * Barre de progression avec icône de plongeur
 */
const BarreProgressionPlongeur = ({ position }) => {
  const styles = {
    progressContainer: {
      width: '85%',
      height: '30px',
      backgroundColor: 'rgba(157, 221, 255, 0.32)',
      borderRadius: '20px',
      marginTop: '20px',
      position: 'relative',
      border: '2px solid #0288d1',
      boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.2)',
      overflow: 'visible'
    },
    progressBar: {
      height: '100%',
      backgroundColor: '#4caf50',
      borderRadius: '18px',
      transition: 'width 0.8s ease-out',
      backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)',
      backgroundSize: '30px 30px',
    },
    plongeurIcon: {
      position: 'absolute',
      top: '-10px',
      fontSize: '24px',
      transition: 'left 0.8s ease-out',
      filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.3))',
      animation: 'bounce 2s infinite ease-in-out'
    },
    reperes: {
      position: 'absolute',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0 10px',
      top: '35px',
      fontSize: '0.7rem',
      color: '#0288d1',
      fontWeight: 'bold'
    }
  };

  return (
    <div style={styles.progressContainer}>
      {/* Barre colorée */}
      <div style={{ ...styles.progressBar, width: `${position}%` }} />

      {/* Icône du plongeur */}
      <div style={{ ...styles.plongeurIcon, left: `calc(${position}% - 15px)` }}>
        {position > 0 && position < 100 && <EffetBulles />}
        🤿
      </div>

      {/* Repères de distance */}
      <div style={styles.reperes}>
        <span>Surface</span>
        <span>50%</span>
        <span>Arrivée</span>
      </div>
    </div>
  );
};

export default BarreProgressionPlongeur;
