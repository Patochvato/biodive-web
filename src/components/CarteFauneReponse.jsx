import React from 'react';
import CarteActionButton from './CarteActionButton';
import CarteOuiNonButtons from './CarteOuiNonButtons';
import '../cartes.css';

const CarteFauneReponse = ({
  scoreAutomatique,
  pointsCarte,
  reponse,
  explications,
  estChoix,
  estVraiFaux,
  estBonus,
  onReponse
}) => {
  const pointsFinal = scoreAutomatique !== null ? scoreAutomatique : pointsCarte;

  return (
    <div className="carte-reponse-container">
      {scoreAutomatique !== null && (
        <h2
          className="carte-result-title"
          style={{ color: scoreAutomatique > 0 ? '#2e7d32' : '#c62828' }}
        >
          {scoreAutomatique > 0 ? "EXCELLENT ! \u2728" : "OUPS... \ud83e\udd88"}
        </h2>
      )}

      <div className="carte-reponse-box">
        <strong className="carte-reponse-title"> {reponse}</strong>
        <p className="carte-reponse-texte">{explications}</p>
      </div>

      {(estChoix || estVraiFaux || estBonus) ? (
        <div className="carte-actions-bottom">
          <CarteActionButton label="CONTINUER" onClick={() => onReponse(pointsFinal)} />
        </div>
      ) : (
        <div className="carte-actions-bottom carte-reponse-footer">
          <p className="carte-reponse-question">Avez-vous trouve ?</p>
          <CarteOuiNonButtons
            points={pointsCarte}
            onOui={() => onReponse(pointsCarte)}
            onNon={() => onReponse(-pointsCarte)}
          />
        </div>
      )}
    </div>
  );
};

export default CarteFauneReponse;
