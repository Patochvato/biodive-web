import React from 'react';

/**
 * Affichage d'un message bonus flottant
 */
const MessageBonus = ({ message }) => {
  if (!message) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#ffd700',
        color: '#000',
        padding: '15px 15px',
        borderRadius: '30px',
        fontWeight: 'bold',
        zIndex: 3000,
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        border: '2px solid white',
        animation: 'bounce 0.5s ease'
      }}
    >
      {message}
    </div>
  );
};

export default MessageBonus;
