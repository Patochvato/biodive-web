import React from 'react';

/**
 * Animation d'affichage des points gagnés/perdus
 */
const AnimationPoints = ({ points }) => {
  if (points === 0) return null;
  
  const estPositif = points > 0;
  
  return (
    <div 
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '4rem',
        fontWeight: '900',
        color: estPositif ? '#4caf50' : '#f44336',
        textShadow: '0 0 20px rgba(255,255,255,0.8), 2px 2px 5px rgba(0,0,0,0.5)',
        zIndex: 5000,
        pointerEvents: 'none',
        animation: 'fastFloatUp 0.8s forwards cubic-bezier(0.17, 0.67, 0.83, 0.67)'
      }}
    >
      {estPositif ? `+${points}` : points}
    </div>
  );
};

export default AnimationPoints;
