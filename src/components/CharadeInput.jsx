import React, { useState } from 'react';

const CharadeInput = ({ question, reponse, onWin }) => {
  const [saisie, setSaisie] = useState("");
  
  // Nettoyage de la solution : on enlève le point final, les espaces et on met en majuscules
  const solutionNettoyee = reponse
    .replace(/\.$/, "") // Enlève le point final si présent
    .trim()
    .toUpperCase();

  const testerReponse = (e) => {
    const valeur = e.target.value.toUpperCase();
    setSaisie(valeur);

    // On compare
    if (valeur.trim() === solutionNettoyee) {
      onWin();
    }
  };

  return (
    <div style={{
      padding: '15px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '12px',
      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)'
    }}>
      {/* Affichage du texte en respectant les \n */}
      <div style={{ 
        whiteSpace: 'pre-line', // Important pour interpréter les \n du JSON
        textAlign: 'left',
        fontSize: '1rem',
        lineHeight: '1.5',
        marginBottom: '20px',
        color: '#333',
        fontStyle: 'italic'
      }}>
        {question}
      </div>

      <div style={{ textAlign: 'center' }}>
        <input
          type="text"
          value={saisie}
          onChange={testerReponse}
          placeholder="Réponse..."
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          style={{
            width: '90%',
            padding: '12px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            borderRadius: '8px',
            border: '2px solid #0288d1',
            backgroundColor: '#fff',
            color: '#0288d1',
            textAlign: 'center',
            textTransform: 'uppercase'
          }}
        />
        <div style={{ marginTop: '8px', fontSize: '0.8rem', color: '#666' }}>
          {solutionNettoyee.length} lettres
        </div>
      </div>
    </div>
  );
};

export default CharadeInput;