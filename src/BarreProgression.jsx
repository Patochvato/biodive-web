import React from 'react';

const BarreProgression = ({ position }) => {
  // Calcul du pourcentage d'avancement (max 100 cases)
  const pourcentage = Math.min((position / 100) * 100, 100);

  return (
    <div style={styles.container}>
      <div style={styles.label}>
        <span>Départ</span>
        <span>Objectif : Case 100</span>
      </div>
      
      <div style={styles.track}>
        {/* Le curseur (Plongeur) */}
        <div style={{ ...styles.plongeur, left: `${pourcentage}%` }}>
          🤿
          <div style={styles.bulle}>Case {position}</div>
        </div>
        
        {/* La barre remplie */}
        <div style={{ ...styles.fill, width: `${pourcentage}%` }} />
      </div>
    </div>
  );
};

const styles = {
  container: { width: '80%', margin: '20px auto', padding: '10px' },
  label: { display: 'flex', justifyContent: 'space-between', color: '#01579b', fontWeight: 'bold', marginBottom: '10px' },
  track: { height: '12px', backgroundColor: '#bbdefb', borderRadius: '10px', position: 'relative', border: '1px solid #90caf9' },
  fill: { height: '100%', backgroundColor: '#0288d1', borderRadius: '10px', transition: 'width 0.5s ease-out' },
  plongeur: { 
    position: 'absolute', 
    top: '-30px', 
    fontSize: '24px', 
    transition: 'left 0.5s ease-out',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  bulle: { fontSize: '10px', backgroundColor: 'white', padding: '2px 5px', borderRadius: '5px', border: '1px solid #ddd', marginTop: '2px' }
};

export default BarreProgression;