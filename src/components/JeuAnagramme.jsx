import React, { useState, useEffect } from 'react';
import '../jeuAnagramme.css';

const normaliserMot = (mot) => {
  return String(mot)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase();
};

const melangerLettres = (mot) => {
  const lettres = mot.split('');
  for (let i = lettres.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [lettres[i], lettres[j]] = [lettres[j], lettres[i]];
  }
  return lettres;
};

const JeuAnagramme = ({ motATrouver = '', onWin, onAbandon }) => {
  const [lettresMelangees, setLettresMelangees] = useState([]);
  const [proposition, setProposition] = useState([]);
  const motNormalise = normaliserMot(motATrouver);

  useEffect(() => {
    if (!motNormalise) {
      setLettresMelangees([]);
      setProposition([]);
      return;
    }

    setLettresMelangees(melangerLettres(motNormalise));
    setProposition([]);
  }, [motNormalise]);

  const ajouterLettre = (lettre, index) => {
    const nouvelleProposition = [...proposition, lettre];
    setProposition(nouvelleProposition);

    const nouveauxChoix = [...lettresMelangees];
    nouveauxChoix.splice(index, 1);
    setLettresMelangees(nouveauxChoix);

    if (nouvelleProposition.join('') === motNormalise) {
      onWin(true);
    }
  };

  const reset = () => {
    setProposition([]);
    setLettresMelangees(melangerLettres(motNormalise));
  };

  const handleAbandon = () => {
    if (onAbandon) {
      onAbandon();
    }
  };

  return (
    <div className="jeu-anagramme">
      {!motNormalise && (
        <p className="jeu-anagramme__reset">Mot indisponible</p>
      )}
      <div className="jeu-anagramme__saisie">
        {motNormalise.split('').map((_, index) => (
          <div key={index} className="jeu-anagramme__case">
            {proposition[index] || ''}
          </div>
        ))}
      </div>

      <div className="jeu-anagramme__lettres">
        {lettresMelangees.map((lettre, index) => (
          <button
            key={`${lettre}-${index}`}
            type="button"
            className="jeu-anagramme__lettre"
            onClick={() => ajouterLettre(lettre, index)}
            disabled={!motNormalise}
          >
            {lettre}
          </button>
        ))}
      </div>

      <div className="jeu-anagramme__actions">
        <button type="button" onClick={reset} className="jeu-anagramme__reset" disabled={!motNormalise}>
          Reinitialiser
        </button>
        <button type="button" onClick={handleAbandon} className="jeu-anagramme__abandon" disabled={!motNormalise}>
          Abandonner
        </button>
      </div>
    </div>
  );
};

export default JeuAnagramme;