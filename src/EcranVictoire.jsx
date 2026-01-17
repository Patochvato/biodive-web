import React from 'react';

const EcranVictoire = ({ score, nbObjets, onRejouer }) => {
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(2, 136, 209, 0.98)', // Bleu profond
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      zIndex: 2000,
      textAlign: 'center',
      padding: '20px'
    },
    content: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '40px',
      borderRadius: '20px',
      border: '2px solid white',
      backdropFilter: 'blur(10px)'
    },
    trophee: { fontSize: '100px', marginBottom: '10px' },
    titre: { fontSize: '2.5rem', margin: '10px 0' },
    scoreFinal: { 
      fontSize: '2rem', 
      backgroundColor: 'white', 
      color: '#0288d1', 
      padding: '10px 30px', 
      borderRadius: '50px',
      margin: '20px 0',
      fontWeight: 'bold'
    },
    btn: {
      padding: '15px 40px',
      fontSize: '1.2rem',
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      borderRadius: '30px',
      cursor: 'pointer',
      boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
      fontWeight: 'bold',
      marginTop: '20px'
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.content}>
        <div style={styles.trophee}>🏆</div>
        <h1 style={styles.titre}>BRAVO !</h1>
        <p>Vous avez terminé votre exploration sous-marine.</p>
        <p>Objets récupérés : {nbObjets} / 3</p>
       {nbObjets === 3 && <p style={{color: '#ffd700'}}>✨ Bonus Collection Complète +100 ! ✨</p>}
       <div style={styles.scoreFinal}>{score} POINTS</div>

        <button style={styles.btn} onClick={onRejouer}>
          NOUVELLE PLONGÉE
        </button>
      </div>
    </div>
  );
};

// LA LIGNE INDISPENSABLE QUE VOUS AVIEZ OUBLIÉE :
export default EcranVictoire;