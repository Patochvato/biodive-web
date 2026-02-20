import React from 'react';

/**
 * Composant d'animation de bulles pour le plongeur
 */
const EffetBulles = () => {
  return (
    <div style={{ position: 'absolute', top: '-15px', left: '10px' }}>
      {[1, 2, 3].map((i) => (
        <span 
          key={i} 
          style={{
            position: 'absolute',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            border: '1px solid white',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            animation: `monterBulles ${1 + i * 0.5}s infinite ease-out`,
            left: `${i * 8}px`
          }}
        />
      ))}
    </div>
  );
};

export default EffetBulles;
