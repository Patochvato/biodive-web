import React, { useState } from 'react';

const CarteFaune = ({ carte, onReponse }) => {
  const [montrerReponse, setMontrerReponse] = useState(false);

  // --- FONCTION DE NETTOYAGE ---
  const extraireNomFichier = (cheminBrut) => {
    if (!cheminBrut) return "biodive.png";
    const parties = cheminBrut.split(/[\\/]/);
    return parties[parties.length - 1];
  };

  const nomImage = extraireNomFichier(carte["@images"]);
  // Conversion sécurisée des points en nombre
  const pointsCarte = parseInt(carte.POINTS, 10) || 0;

  const styles = {
    carte: {
      width: '100%',
      maxWidth: '400px',
      maxHeight: '80vh', 
      overflowY: 'auto', // Permet de scroller si le texte est long
      backgroundColor: 'white',
      borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      border: '2px solid #0288d1'
    },
    header: {
      backgroundColor: '#0288d1',
      color: 'white',
      padding: '12px 15px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontWeight: 'bold',
      textTransform: 'uppercase'

    },
    pointsBadge: {
      backgroundColor: 'white',
      color: '#0288d1',
      padding: '2px 8px',
      borderRadius: '10px',
    },
    imageContainer: { width: '100%', maxWidth: '400px', textAlign: 'center', padding: '10px 0px 10px' },
    image: { 
      maxWidth: '100%', 
      maxHeight: '180px', // Taille limitée pour laisser de la place au texte
      objectFit: 'contain',
      borderRadius: '10px'
    },
    content: { padding: '10px 15px 10px', textAlign: 'center' },
    question: { fontSize: '1.1rem', marginBottom: '15px', color: '#333' },
    reponseBox: { 
      backgroundColor: '#e8f5e9', 
      padding: '10px', 
      borderRadius: '10px', 
      marginTop: '10px',
      border: '1px solid #4caf50' 
    },
    btnAction: {
      width: '100%',
      padding: '15px',
      backgroundColor: '#0288d1',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold'
    },
    btnValidation: {
       padding: '10px 20px',
       margin: '10px 5px',
       borderRadius: '8px',
       border: 'none',
       cursor: 'pointer',
       color: 'white',
       fontWeight: 'bold',
       flex: 1
    }
  };

  return (
    <div style={styles.carte}>
      <div style={styles.header}>
        <span>🔍 {carte.CATEGORIE || "BIOLOGIE"}</span>
        <span style={styles.pointsBadge}>{pointsCarte} pts</span>
      </div>

      <div style={styles.imageContainer}>
        <img 
          src={`/images/${nomImage}`} 
          style={styles.image} 
          alt="Illustration" 
          onError={(e) => e.target.src = "/images/biodive.png"}
        />
      </div>

      <div style={styles.content}>
        <p style={styles.question}><strong>{carte.TYPE} :</strong><br/>{carte.QUESTION}</p>

        {!montrerReponse ? (
          <button style={styles.btnAction} onClick={() => setMontrerReponse(true)}>
            VOIR LA RÉPONSE
          </button>
        ) : (
          <div style={styles.reponseBox}>
            <p style={{color: '#2e7d32'}}><strong>Réponse :</strong> {carte.REPONSE}</p>
            <p style={{fontSize: '0.85rem', marginTop: '10px', fontStyle: 'italic'}}>{carte.EXPLICATIONS}</p>
            
            <p style={{marginTop: '15px', fontWeight: 'bold'}}>Avez-vous eu raison ?</p>
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
        )}
      </div>
    </div>
  );
};

export default CarteFaune;