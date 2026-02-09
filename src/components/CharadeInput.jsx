import React, { useState, useEffect, useRef } from 'react';

const CharadeInput = ({ question, reponse, onWin }) => {
  const [saisie, setSaisie] = useState("");
  const inputRef = useRef(null); // Création de la référence pour l'input

  // On nettoie la réponse attendue (on enlève le point final s'il existe et les espaces)
  const solutionNettoyee = reponse.replace(/\.$/, "").trim().toUpperCase();

  // Effet pour donner le focus automatiquement à l'input
  useEffect(() => {
    // Un petit délai de 400ms permet d'attendre que la carte ait fini 
    // son animation d'apparition avant d'ouvrir le clavier
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const testerReponse = (e) => {
    const valeur = e.target.value.toUpperCase();
    setSaisie(valeur);

    // .trim() est crucial : il ignore si l'utilisateur tape un espace par erreur à la fin
    if (valeur.trim() === solutionNettoyee) {
      onWin();
    }
  };

  return (
    <div className="charade-container">
      <div style={{ whiteSpace: 'pre-line', textAlign: 'center', marginBottom: '15px' }}>
        {question}
      </div>

      <input
        ref={inputRef} // On lie l'élément physique à notre référence
        type="text"
        value={saisie}
        onChange={testerReponse}
        placeholder="Votre réponse..."
        className="charade-input"
        autoComplete="off"
        spellCheck="false"
        style={{
          width: '100%',
          padding: '12px',
          textAlign: 'center',
          fontSize: '1.2rem',
          border: '2px solid #0288d1',
          borderRadius: '8px',
          textTransform: 'uppercase'
        }}
      />
      
      {/* Petit indicateur pour aider le joueur */}
      <div style={{ marginTop: '8px', fontSize: '0.9rem', color: '#666' }}>
        {solutionNettoyee.length} lettres attendues
      </div>
    </div>
  );
};

export default CharadeInput;