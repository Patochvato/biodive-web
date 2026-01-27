import React, { useState, useEffect } from 'react';
import { playSound } from './audioManager';

const CarteFaune = ({ carte, onReponse }) => {
  const [montrerReponse, setMontrerReponse] = useState(false);
  const [scoreAutomatique, setScoreAutomatique] = useState(null);

  const estBonus = carte.TYPE?.toLowerCase() === 'bonus';
  const estVraiFaux = carte.TYPE?.toUpperCase().includes("VRAI OU FAUX");
  const estChoix = carte.TYPE?.toUpperCase() === "CHOIX";

  // Extraction des options pour le TYPE CHOIX
  const partiesQuestion = carte.QUESTION.split('\n');
  const enTeteQuestion = partiesQuestion[0];
  const options = partiesQuestion.slice(1).map(opt => opt.replace(/,$/, ''));

  const extraireNomFichier = (cheminBrut) => {
    if (!cheminBrut) return "biodive.png";
    const parties = cheminBrut.split(/[\\/]/);
    return parties[parties.length - 1];
  };

  const nomImage = extraireNomFichier(carte["@images"]);
  const pointsCarte = parseInt(carte.POINTS, 10) || 0;
  
  useEffect(() => {
    if (estBonus) playSound('gagne.mp3', 0.4);
  }, [estBonus]);

  const validerReponseDirecte = (choix) => {
    const laBonneReponse = carte.REPONSE?.trim().toUpperCase();
    const estCorrect = choix.toUpperCase() === laBonneReponse;
    
    setScoreAutomatique(estCorrect ? pointsCarte : -pointsCarte);
    setMontrerReponse(true);
    
    if (estCorrect) playSound('gagne.mp3', 0.4);
    else playSound('perdu.mp3', 0.4);
  };

  // Détermine la couleur du header selon la situation
  const obtenirCouleurHeader = () => {
    if (estBonus) return '#ffd54f';
    if (!montrerReponse) return '#0288d1';
    if (scoreAutomatique !== null) return scoreAutomatique > 0 ? '#2e7d32' : '#c62828';
    return '#0288d1'; // Couleur neutre pour les questions simples
  };

  const styles = {
    carte: {
      width: '100%', maxWidth: '400px', minHeight: '450px',
      backgroundColor: 'white', borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)', display: 'flex',
      flexDirection: 'column', border: estBonus ? '4px solid #ffd54f' : '2px solid #0288d1',
      overflow: 'hidden', zIndex: 10
    },
    header: {
      backgroundColor: obtenirCouleurHeader(),
      color: estBonus ? '#000' : 'white', padding: '12px 15px',
      display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', transition: 'background-color 0.3s'
    },
    content: { padding: '20px', textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column' },
    image: { maxWidth: '100%', maxHeight: '150px', objectFit: 'contain', borderRadius: '10px', marginBottom: '10px' },
    question: { fontSize: '1.05rem', color: '#333', marginBottom: '15px', fontWeight: '500', whiteSpace: 'pre-line' },
    btnChoix: { 
      width: '100%', padding: '10px', margin: '4px 0', 
      backgroundColor: '#f1f8ff', border: '1px solid #0288d1', 
      borderRadius: '8px', cursor: 'pointer', textAlign: 'left',
      fontSize: '0.95rem', color: '#0277bd'
    },
    btnValidation: { padding: '15px 10px', margin: '10px 5px', borderRadius: '8px', border: 'none', cursor: 'pointer', color: 'white', fontWeight: 'bold', flex: 1 },
    btnAction: { width: '100%', padding: '12px', backgroundColor: '#0288d1', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px'}
  };

  return (
    <div style={styles.carte}>
      <div style={styles.header}>
        <span>{estBonus ? "🎁 BONUS" : (montrerReponse ? "RÉSULTAT" : `🔍 ${carte.CATEGORIE}`)}</span>
        <span style={{backgroundColor:'white', padding:'2px 8px', borderRadius:'10px', color:'#333'}}>
          {pointsCarte} pts
        </span>
      </div>

      <div style={styles.content}>
        <img src={`/images/${nomImage}`} style={styles.image} alt="Illustration" onError={(e) => e.target.src = "/images/biodive.png"} />

        {!montrerReponse ? (
          <>
            <p style={styles.question}>{estChoix ? enTeteQuestion : carte.QUESTION}</p>
            
            {estChoix ? (
              <div style={{textAlign: 'left'}}>
                {options.map((opt, index) => (
                  <button key={index} style={styles.btnChoix} onClick={() => validerReponseDirecte(opt.trim().charAt(0))}>
                    {opt}
                  </button>
                ))}
              </div>
            ) : estVraiFaux ? (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{ ...styles.btnChoix, textAlign: 'center', backgroundColor: '#4caf50', color: 'white' }} onClick={() => validerReponseDirecte("VRAI")}>VRAI</button>
                <button style={{ ...styles.btnChoix, textAlign: 'center', backgroundColor: '#f44336', color: 'white' }} onClick={() => validerReponseDirecte("FAUX")}>FAUX</button>
              </div>
            ) : (
              <button style={styles.btnAction} onClick={() => setMontrerReponse(true)}>
                {estBonus ? "RÉCUPÉRER" : "VOIR LA RÉPONSE"}
              </button>
            )}
          </>
        ) : (
          /* --- VERSO : SOLUTION --- */
          <div style={{animation: 'fadeIn 0.5s'}}>
            {scoreAutomatique !== null && (
               <h2 style={{ color: scoreAutomatique > 0 ? '#2e7d32' : '#c62828', margin: '0 0 10px 0' }}>
                 {scoreAutomatique > 0 ? "EXCELLENT ! ✨" : "OUPS... 🦈"}
               </h2>
            )}
            
            <div style={{padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '8px', borderLeft: '5px solid #0288d1', textAlign: 'left', marginBottom: '15px'}}>
              <strong style={{color: '#0277bd'}}>Réponse : {carte.REPONSE}</strong>
              <p style={{fontSize: '0.95rem', marginTop: '5px', whiteSpace: 'pre-line'}}>{carte.EXPLICATIONS}</p>
            </div>

            {/* Si c'est un choix ou V/F, on affiche Continuer. Sinon, on affiche OUI/NON */}
            {(estChoix || estVraiFaux || estBonus) ? (
              <button style={styles.btnAction} onClick={() => onReponse(scoreAutomatique || pointsCarte)}>
                CONTINUER
              </button>
            ) : (
              <div style={{marginTop: '10px'}}>
                <p style={{fontWeight: 'bold', marginBottom: '10px'}}>Avez-vous trouvé ?</p>
                <div style={{display: 'flex'}}>
                  <button style={{...styles.btnValidation, backgroundColor: '#4caf50'}} onClick={() => onReponse(pointsCarte)}>OUI (+{pointsCarte})</button>
                  <button style={{...styles.btnValidation, backgroundColor: '#f44336'}} onClick={() => onReponse(-pointsCarte)}>NON (-{pointsCarte})</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarteFaune;