import React, { useState, useEffect } from 'react';
import { playSound } from './audioManager';

const CarteFaune = ({ carte, onReponse }) => {
  const [montrerReponse, setMontrerReponse] = useState(false);
  // Nouvel état pour stocker si le joueur a eu juste au Vrai/Faux
  const [scoreAutomatique, setScoreAutomatique] = useState(null);

  const estBonus = carte.TYPE?.toLowerCase() === 'bonus';
  // Détection du mode Vrai ou Faux
  const estVraiFaux = carte.TYPE?.toUpperCase().includes("VRAI OU FAUX");

  const extraireNomFichier = (cheminBrut) => {
    if (!cheminBrut) return "biodive.png";
    const parties = cheminBrut.split(/[\\/]/);
    return parties[parties.length - 1];
  };

  const nomImage = extraireNomFichier(carte["@images"]);
  const pointsCarte = parseInt(carte.POINTS, 10) || 0;
  
  useEffect(() => {
    if (estBonus) {
      playSound('gagne.mp3', 0.4);
    }
  }, [estBonus]);

  // Fonction pour gérer le clic Vrai ou Faux au Recto
  const validerChoixVF = (choix) => {
    const estCorrect = choix.toUpperCase() === carte.REPONSE?.toUpperCase();
    setScoreAutomatique(estCorrect ? pointsCarte : -pointsCarte);
    setMontrerReponse(true);
    if (estCorrect) playSound('gagne.mp3', 0.4);
    else playSound('perdu.mp3', 0.4);
  };

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
      border: estBonus ? '4px solid #ffd54f' : '2px solid #0288d1',
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
    imageContainer: { width: '100%', textAlign: 'center', padding: '1px 0' },
    image: { maxWidth: '100%', maxHeight: '180px', objectFit: 'contain', borderRadius: '10px' },
    content: { padding: '20px', textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
    question: { fontSize: '1.1rem', color: '#333', lineHeight: '1.4', margin: '1px',whiteSpace: 'pre-line' },
    btnAction: { 
      width: '100%', 
      padding: '12px', 
      backgroundColor: estBonus ? '#4caf50' : '#0288d1', 
      color: 'white', 
      border: 'none', 
      borderRadius: '8px', 
      cursor: 'pointer', 
      fontWeight: 'bold', 
      marginTop: '10px',
      fontSize: '1.1rem'
    },
    btnVF: {
      flex: 1,
      padding: '15px',
      margin: '5px',
      border: 'none',
      borderRadius: '8px',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '1rem'
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
            <h2 style={{color: '#fbc02d',marginBottom: '1px',marginTop: '10px'}}>BRAVO !</h2>
            <p style={styles.question}>{carte.QUESTION || "Vous avez trouvé un trésor marin !"}</p>
            <div style={{margin: '1px 0', padding: '1px', backgroundColor: '#fff9c4', borderRadius: '10px'}}>
               <p style={{fontSize: '0.9rem', fontStyle: 'italic'}}>{carte.EXPLICATIONS}</p>
            </div>
            <button style={styles.btnAction} onClick={() => onReponse(pointsCarte)}>
              RÉCUPÉRER LES POINTS
            </button>
          </div>
        ) : !montrerReponse ? (
          /* --- RECTO --- */
          <>
            <p style={styles.question}><strong>{carte.TYPE}</strong><br/>{carte.QUESTION}</p>
            {estVraiFaux ? (
              <div style={{ display: 'flex', marginTop: '10px' }}>
                <button style={{ ...styles.btnVF, backgroundColor: '#4caf50' }} onClick={() => validerChoixVF("VRAI")}>VRAI</button>
                <button style={{ ...styles.btnVF, backgroundColor: '#f44336' }} onClick={() => validerChoixVF("FAUX")}>FAUX</button>
              </div>
            ) : (
              <button style={styles.btnAction} onClick={() => setMontrerReponse(true)}>
                VOIR LA RÉPONSE
              </button>
            )}
          </>
        ) : (
          /* --- VERSO --- */
          <div style={{animation: 'fadeIn 0.5s'}}>
            {estVraiFaux && (
              <h2 style={{ color: scoreAutomatique > 0 ? '#4caf50' : '#f44336', marginBottom: '5px' }}>
                {scoreAutomatique > 0 ? "BIEN JOUÉ ! ✨" : "DOMMAGE... 🦈"}
              </h2>
            )}
          <h3 style={{color: '#2e7d32',marginTop: '1px',marginBottom: '1px'}}>Réponse : {carte.REPONSE}</h3>
               <p style={{...styles.explicationTexte, whiteSpace: 'pre-line'}}>{carte.EXPLICATIONS}</p>
            
            <div style={{marginTop: '1px', borderTop: '1px solid #eee', paddingTop: '1px'}}>
              {estVraiFaux ? (
                /* Bouton Continuer pour Vrai/Faux */
                <button style={styles.btnAction} onClick={() => onReponse(scoreAutomatique)}>
                  CONTINUER
                </button>
              ) : (
                /* Système Oui/Non pour les questions classiques */
                <>
                  <p style={{fontWeight: 'bold', marginBottom: '1px'}}>Avez-vous trouvé ?</p>
                  <div style={{display: 'flex'}}>
                    <button style={{...styles.btnValidation, backgroundColor: '#4caf50'}} onClick={() => onReponse(pointsCarte)}>OUI (+{pointsCarte})</button>
                    <button style={{...styles.btnValidation, backgroundColor: '#f44336'}} onClick={() => onReponse(-pointsCarte)}>NON (-{pointsCarte})</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarteFaune;