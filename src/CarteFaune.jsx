import React, { useState, useEffect } from 'react'; // Ajout de useEffect ici
import { playSound } from './audioManager'; // Ajout de l'import playSound


const CarteFaune = ({ carte, onReponse }) => {
  const [montrerReponse, setMontrerReponse] = useState(false);

  // Détection du mode Bonus
  const estBonus = carte.TYPE?.toLowerCase() === 'bonus';

  const extraireNomFichier = (cheminBrut) => {
    if (!cheminBrut) return "biodive.png";
    const parties = cheminBrut.split(/[\\/]/);
    return parties[parties.length - 1];
  };

  const nomImage = extraireNomFichier(carte["@images"]);
  const pointsCarte = parseInt(carte.POINTS, 10) || 0;
  
  useEffect(() => {
    if (estBonus) {
      playSound('gagne.mp3', 0.4); // Ou 'bonus.mp3' si tu as ce fichier
    }
  }, [estBonus]);

  const styles = {
    carte: {
      width: '100%',
      maxWidth: '400px',
      height: 'auto', 
      minHeight: '450px',
      backgroundColor: 'white',
      borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      border: estBonus ? '4px solid #ffd54f' : '2px solid #0288d1', // Bordure dorée pour le bonus
      overflow: 'hidden',
      zIndex: 10
    },
    header: {
      backgroundColor: estBonus ? '#ffd54f' : (montrerReponse ? '#2e7d32' : '#0288d1'),
      color: estBonus ? '#000' : 'white',
      padding: '12px 15px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      textTransform: 'uppercase',
      fontWeight: 'bold'
    },
    pointsBadge: { 
      backgroundColor: 'white', 
      color: estBonus ? '#fbc02d' : (montrerReponse ? '#2e7d32' : '#0288d1'), 
      padding: '2px 8px', 
      borderRadius: '10px' 
    },
    imageContainer: { width: '100%', textAlign: 'center', padding: '15px 0' },
    image: { maxWidth: '100%', maxHeight: '180px', objectFit: 'contain', borderRadius: '10px' },
    content: { padding: '20px', textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
    question: { fontSize: '1.1rem', color: '#333', lineHeight: '1.4' },
    btnAction: { 
      width: '100%', 
      padding: '15px', 
      backgroundColor: estBonus ? '#4caf50' : '#0288d1', 
      color: 'white', 
      border: 'none', 
      borderRadius: '8px', 
      cursor: 'pointer', 
      fontWeight: 'bold', 
      marginTop: '10px',
      fontSize: '1.1rem'
    },
    btnValidation: { padding: '15px 10px', margin: '10px 5px', borderRadius: '8px', border: 'none', cursor: 'pointer', color: 'white', fontWeight: 'bold', flex: 1 }
  };

  return (
    <div style={styles.carte}>
      <div style={styles.header}>
        <span>
          {estBonus ? "🎁 BONUS" : (montrerReponse ? "✅ SOLUTION" : `🔍 ${carte.CATEGORIE || "BIOLOGIE"}`)}
        </span>
        <span style={styles.pointsBadge}>+{pointsCarte} pts</span>
      </div>

      <div style={styles.content}>
        {/* AFFICHAGE DE L'IMAGE (Commun à tous les modes) */}
        <div style={styles.imageContainer}>
          <img 
            src={`/images/${nomImage}`} 
            style={styles.image} 
            alt="Illustration" 
            onError={(e) => e.target.src = "/images/biodive.png"}
          />
        </div>

        {estBonus ? (
          /* --- MODE BONUS --- */
          <div style={{animation: 'fadeIn 0.5s'}}>
            <h2 style={{color: '#fbc02d', marginBottom: '1px'}}>BRAVO !</h2>
            <p style={styles.question}>
              {carte.QUESTION || "Vous avez trouvé un trésor marin !"}
            </p>
            <div style={{margin: '10px 0', padding: '15px', backgroundColor: '#fff9c4', borderRadius: '10px'}}>
               <p style={{fontSize: '0.9rem', fontStyle: 'italic'}}>{carte.EXPLICATIONS}</p>
            </div>
            <button style={styles.btnAction} onClick={() => onReponse(pointsCarte)}>
              RÉCUPÉRER LES POINTS
            </button>
          </div>
        ) : !montrerReponse ? (
          /* --- RECTO CLASSIQUE --- */
          <>
            <p style={styles.question}><strong>{carte.TYPE}</strong><br/><br/>{carte.QUESTION}</p>
            <button style={styles.btnAction} onClick={() => setMontrerReponse(true)}>
              VOIR LA RÉPONSE
            </button>
          </>
        ) : (
          /* --- VERSO CLASSIQUE --- */
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