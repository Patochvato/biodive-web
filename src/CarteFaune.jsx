import React, { useState, useEffect } from 'react';
import { playSound } from './audioManager';
import CarteActionButton from './components/CarteActionButton';
import CarteChoixOptions from './components/CarteChoixOptions';
import CarteFauneReponse from './components/CarteFauneReponse';
import CarteHeader from './components/CarteHeader';
import CarteVraiFauxButtons from './components/CarteVraiFauxButtons';
import './cartes.css';

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
    const parties = String(cheminBrut).split(/[\\/]/);
    const dernierSegment = parties[parties.length - 1];
    const estImage = /\.(png|jpe?g|svg|webp|gif)$/i.test(dernierSegment);
    return estImage ? dernierSegment : "biodive.png";
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

  return (
    <div
      className="carte carte-faune"
      style={{ border: estBonus ? '4px solid #ffd54f' : '2px solid #0288d1' }}
    >
      <CarteHeader
        title={estBonus ? "🎁 BONUS" : (montrerReponse ? "RÉPONSE" : `${carte.CATEGORIE} - ${carte.TYPE} `)}
        pointsText={`${pointsCarte} pts`}
        headerStyle={{
          backgroundColor: obtenirCouleurHeader(),
          color: estBonus ? '#000' : 'white'
        }}
      />

      <div className="carte-content">
        <img
          src={`/images/${nomImage}`}
          className="carte-image"
          alt="Illustration"
          onError={(e) => e.target.src = "/images/biodive.png"}
        />

        <div className="carte-body">
          {!montrerReponse ? (
            <>
              <p className="carte-question">{estChoix ? enTeteQuestion : carte.QUESTION}</p>
              
              {estChoix ? (
                <CarteChoixOptions
                  className="carte-actions-bottom"
                  options={options}
                  onChoix={(opt) => validerReponseDirecte(opt.trim().charAt(0))}
                />
              ) : estVraiFaux ? (
                <CarteVraiFauxButtons
                  className="carte-actions-bottom"
                  onVrai={() => validerReponseDirecte("VRAI")}
                  onFaux={() => validerReponseDirecte("FAUX")}
                />
              ) : (
                <div className="carte-actions-bottom">
                  <CarteActionButton
                    label={estBonus ? "RÉCUPÉRER" : "VOIR LA RÉPONSE"}
                    onClick={() => setMontrerReponse(true)}
                  />
                </div>
              )}
            </>
          ) : (
            /* --- VERSO : SOLUTION --- */
            <CarteFauneReponse
              scoreAutomatique={scoreAutomatique}
              pointsCarte={pointsCarte}
              reponse={carte.REPONSE}
              explications={carte.EXPLICATIONS}
              estChoix={estChoix}
              estVraiFaux={estVraiFaux}
              estBonus={estBonus}
              onReponse={onReponse}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CarteFaune;