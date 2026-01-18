import React, { useState } from 'react';

const CarteFaune = ({ carte, onReponse }) => {
  const [montrerReponse, setMontrerReponse] = useState(false);

  const extraireNomFichier = (cheminBrut) => {
    if (!cheminBrut) return "biodive.png";
    const parties = cheminBrut.split(/[\\/]/);
    return parties[parties.length - 1];
  };

  const nomImage = extraireNomFichier(carte["@images"]);
  const pointsCarte = parseInt(carte.POINTS, 10) || 0;

  const styles = {
    carte: {
      width: '100%',
      maxWidth: '400px',
      // Changement : on enlève le scroll forcé et on fixe une hauteur max plus nette
      height: 'auto', 
      minHeight: '450px',
      backgroundColor: 'white',
      borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      border: '2px solid #0288d1',
      overflow: 'hidden' // Propre
    },
    header: {
      backgroundColor: montrerReponse ? '#2e7d32' : '#0288d1', // Change de couleur au verso
      color: 'white',
      padding: '12px 15px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      textTransform: 'uppercase',
      fontWeight: 'bold'
    },
    pointsBadge: { backgroundColor: 'white', color: montrerReponse ? '#2e7d32' : '#0288d1', padding: '2px 8px', borderRadius: '10px' },
    imageContainer: { width: '100%', textAlign: 'center', padding: '15px 0' },
    image: { maxWidth: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '10px' },
    content: { padding: '10px', textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
    question: { fontSize: '1rem', color: '#333' },
    explicationTexte: { fontSize: '0.95rem', marginTop: '15px', fontStyle: 'italic', color: '#444' },
    btnAction: { width: '100%', padding: '15px', backgroundColor: '#0288d1', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' },
    btnValidation: { padding: '15px 10px', margin: '10px 5px', borderRadius: '8px', border: 'none', cursor: 'pointer', color: 'white', fontWeight: 'bold', flex: 1 }
  };

  return (
    <div style={styles.carte}>
      <div style={styles.header}>
        <span>{montrerReponse ? "✅ SOLUTION" : `🔍 ${carte.CATEGORIE || "BIOLOGIE"}`}</span>
        <span style={styles.pointsBadge}>{pointsCarte} pts</span>
      </div>

      <div style={styles.content}>
        {!montrerReponse ? (
          /* --- RECTO --- */
          <>
            <div style={styles.imageContainer}>
              <img 
                src={`/images/${nomImage}`} 
                style={styles.image} 
                alt="Illustration" 
                onError={(e) => e.target.src = "/images/biodive.png"}
              />
            </div>
            <p style={styles.question}><strong>{carte.TYPE}</strong><br/>{carte.QUESTION}</p>
            <button style={styles.btnAction} onClick={() => setMontrerReponse(true)}>
              VOIR LA RÉPONSE
            </button>
          </>
        ) : (
          /* --- VERSO --- */
          <div style={{animation: 'fadeIn 0.5s'}}>
            <h3 style={{color: '#2e7d32', marginBottom: '10px'}}>Réponse :</h3>
            <p style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{carte.REPONSE}</p>
            
            <p style={styles.explicationTexte}>{carte.EXPLICATIONS}</p>
            
            <div style={{marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '10px'}}>
              <p style={{fontWeight: 'bold', marginBottom: '10px'}}>Avez-vous trouvé ?</p>
              <div style={{display: 'flex'}}>
                <button 
                  style={{...styles.btnValidation, backgroundColor: '#4caf50'}}
                  onClick={() => onReponse(pointsCarte)}
                >
                  OUI (+{pointsCarte})
                </button>
                <button 
                  style={{...styles.btnValidation, backgroundColor: '#f44336'}}
                  onClick={() => onReponse(-pointsCarte)}
                >
                  NON (-{pointsCarte})
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarteFaune;