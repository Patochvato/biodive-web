import React from 'react';
import CarteActionButton from './CarteActionButton';
import '../cartes.css';

const CarteFauneReponse = ({
  scoreAutomatique,
  pointsCarte,
  reponse,
  explications,
  estChoix,
  estVraiFaux,
  estBonus,
  estAnagramme,
  estQuiSuisJe,
  onReponse
}) => {
  // Déterminer si c'est un jeu interactif (avec score automatique)
  const estJeuInteractif = estChoix || estAnagramme || estQuiSuisJe || estVraiFaux;

  return (
    <div className="carte-reponse-container">
      <div className="carte-reponse-box">
        <div className="carte-reponse-title">
          {reponse}
        </div>
        
        {explications && (
          <div className="carte-reponse-texte">{explications}</div>
        )}
      </div>

      <div className="carte-reponse-footer">
        {estBonus ? (
          <CarteActionButton
            label="RÉCUPÉRER"
            onClick={() => onReponse(pointsCarte)}
          />
        ) : estJeuInteractif ? (
          <CarteActionButton
            label="CONTINUER"
            onClick={() => onReponse(scoreAutomatique || 0)}
          />
        ) : (
          <>
            <p className="carte-reponse-question">Avez-vous trouvé ?</p>
            <div className="carte-reponse-actions">
              <button 
                className="carte-btn-validation carte-btn-oui" 
                onClick={() => onReponse(pointsCarte)}
              >
                OUI ({pointsCarte > 0 ? '+' : ''}{pointsCarte})
              </button>
              <button 
                className="carte-btn-validation carte-btn-non" 
                onClick={() => onReponse(-pointsCarte)}
              >
                NON (-{pointsCarte})
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CarteFauneReponse;
