import React, { useState, useEffect } from 'react';
import '../texteATrous.css';

const TexteATrous = ({ reponseAlternative, onWin, onAbandon }) => {
  const [motMasque, setMotMasque] = useState([]);
  const [options, setOptions] = useState([]);
  const [indicesRemplis, setIndicesRemplis] = useState({});

  useEffect(() => {
    // Nettoyage : "Un cône" -> "CONE"
    const motPur = reponseAlternative
      .replace(/^(un|une|le|la|les)\s+/i, "")
      .toUpperCase()
      .trim();

    // Création de la structure (on cache environ 50% des lettres)
    const structure = motPur.split('').map((char, index) => {
      if (char === ' ') return { char, type: 'space' };
      const hidden = index % 2 !== 0;
      return { char, type: hidden ? 'hole' : 'visible', id: index };
    });

    // Préparation des lettres à cliquer (les manquantes + 2 leurres)
    const manquantes = structure.filter(s => s.type === 'hole').map(s => s.char);
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const leurres = Array(2).fill(0).map(() => alphabet[Math.floor(Math.random() * 26)]);
    
    setMotMasque(structure);
    setOptions([...manquantes, ...leurres].sort(() => Math.random() - 0.5));
    setIndicesRemplis({});
  }, [reponseAlternative]);

  const gererClic = (lettre) => {
    const premierTrouVide = motMasque.find(s => s.type === 'hole' && !indicesRemplis[s.id]);
    
    if (premierTrouVide) {
      const nouveauxRemplis = { ...indicesRemplis, [premierTrouVide.id]: lettre };
      setIndicesRemplis(nouveauxRemplis);

      const tousRemplis = motMasque.filter(s => s.type === 'hole').every(s => nouveauxRemplis[s.id]);
      
      if (tousRemplis) {
        const motFinal = motMasque.map(s => s.type === 'hole' ? nouveauxRemplis[s.id] : s.char).join('');
        const solutionAttendue = motMasque.map(s => s.char).join('');
        
        if (motFinal === solutionAttendue) {
          onWin();
        } else {
          setTimeout(() => setIndicesRemplis({}), 500);
        }
      }
    }
  };

  return (
    <div className="texte-a-trous">
      <div className="texte-a-trous__saisie">
        {motMasque.map((s, i) => (
          <div 
            key={i} 
            className={`texte-a-trous__case ${s.type === 'space' ? 'texte-a-trous__case--space' : ''}`}
          >
            {s.type === 'hole' ? (indicesRemplis[s.id] || '') : s.type === 'space' ? '' : s.char}
          </div>
        ))}
      </div>

      <div className="texte-a-trous__lettres">
        {options.map((l, i) => (
          <button 
            key={i} 
            onClick={() => gererClic(l)} 
            className="texte-a-trous__lettre"
            type="button"
          >
            {l}
          </button>
        ))}
      </div>

      {onAbandon && (
        <div className="texte-a-trous__actions">
          <button 
            onClick={onAbandon} 
            className="texte-a-trous__abandon"
            type="button"
          >
            Abandonner
          </button>
        </div>
      )}
    </div>
  );
};

export default TexteATrous;