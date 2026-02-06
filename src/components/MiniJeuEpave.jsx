import React from 'react';
import '../miniJeuEpave.css';

const MiniJeuEpave = ({
  ouvert,
  tempsRestant,
  motATrouver,
  reponseUser,
  onReponseChange,
  onValider,
  onAnnuler
}) => {
  if (!ouvert) return null;

  return (
    <div className="mini-jeu-overlay">
      <div className="mini-jeu-carte">
        <div className={`mini-jeu-timer ${tempsRestant <= 5 ? 'danger' : ''}`.trim()}>
          ⏱️ {tempsRestant}s
        </div>

        <h3 className="mini-jeu-titre">⚓ DÉFI DE L'ÉPAVE</h3>
        <p>Remettez les lettres dans l'ordre :</p>

        {motATrouver.melange && (
          <h2 className="mini-jeu-melange">
            {motATrouver.melange}
          </h2>
        )}

        <input
          type="text"
          value={reponseUser}
          onChange={(e) => onReponseChange(e.target.value)}
          placeholder="Ta réponse..."
          className="mini-jeu-input"
          onKeyDown={(e) => e.key === 'Enter' && onValider()}
          autoFocus
        />

        <div className="mini-jeu-actions">
          <button
            onClick={onAnnuler}
            className="mini-jeu-btn mini-jeu-btn-annuler"
          >
            ANNULER
          </button>
          <button
            onClick={onValider}
            className="mini-jeu-btn mini-jeu-btn-valider"
          >
            VALIDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniJeuEpave;
