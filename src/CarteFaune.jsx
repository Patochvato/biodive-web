import React, { useState, useEffect } from 'react';
import { playSound } from './audioManager';
import CarteActionButton from './components/CarteActionButton';
import CarteChoixOptions from './components/CarteChoixOptions';
import CarteFauneReponse from './components/CarteFauneReponse';
import CarteHeader from './components/CarteHeader';
import CarteVraiFauxButtons from './components/CarteVraiFauxButtons';
import JeuAnagramme from './components/JeuAnagramme';
import TexteATrous from './components/TexteATrous';
import CharadeInput from './components/CharadeInput';
import './cartes.css';

const CarteFaune = ({ carte, onReponse }) => {
  const [montrerReponse, setMontrerReponse] = useState(false);
  const [scoreAutomatique, setScoreAutomatique] = useState(null);
  const [choixSelectionnes, setChoixSelectionnes] = useState([]);

  const estBonus = carte.TYPE?.toLowerCase() === 'bonus';
  const estVraiFaux = carte.TYPE?.toUpperCase().includes("VRAI OU FAUX");
  const estChoix = carte.TYPE?.toUpperCase() === "CHOIX";
  const estAnagramme = carte.TYPE?.toUpperCase() === "ANAGRAMME";
  const estQuiSuisJe = carte.TYPE?.toUpperCase() === "QUI SUIS-JE";
  const estCharade = carte.TYPE?.toUpperCase() === "CHARADE";

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
  const motAnagramme = carte.REPONSE || '';
  
  useEffect(() => {
    if (estBonus) {
      playSound('gagne.mp3', 0.4);
      // Pour les BONUS, pas de verso - on passe directement au score
      setScoreAutomatique(pointsCarte);
      setMontrerReponse(true);
    }
  }, [estBonus, pointsCarte]);

  useEffect(() => {
    setMontrerReponse(false);
    setScoreAutomatique(null);
    setChoixSelectionnes([]);
  }, [carte?.ID]);

  const validerReponseDirecte = (choix) => {
    const laBonneReponse = carte.REPONSE?.trim().toUpperCase();
    const estCorrect = choix.toUpperCase() === laBonneReponse;
    
    setScoreAutomatique(estCorrect ? pointsCarte : -pointsCarte);
    setMontrerReponse(true);
    
    if (estCorrect) playSound('gagne.mp3', 0.4);
    else playSound('perdu.mp3', 0.4);
  };

  const reponsesChoix = String(carte.REPONSE || '')
    .split(',')
    .map((valeur) => valeur.trim().toUpperCase())
    .filter(Boolean);
  const nombreReponsesChoix = reponsesChoix.length || 1;

  const gererChoixMultiple = (optionKey) => {
    setChoixSelectionnes((prev) => {
      const existeDeja = prev.includes(optionKey);
      const prochain = existeDeja ? prev.filter((val) => val !== optionKey) : [...prev, optionKey];

      if (prochain.length >= nombreReponsesChoix) {
        const estCorrect = reponsesChoix.length > 0
          ? (prochain.length === reponsesChoix.length && prochain.every((val) => reponsesChoix.includes(val)))
          : prochain[0] === optionKey;

        setScoreAutomatique(estCorrect ? pointsCarte : -pointsCarte);
        setMontrerReponse(true);
        if (estCorrect) playSound('gagne.mp3', 0.4);
        else playSound('perdu.mp3', 0.4);
      }

      return prochain;
    });
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
        title={estBonus ? `🎁 BONUS - ${carte.CATEGORIE}` : (montrerReponse ? "RÉPONSE" : `${carte.CATEGORIE} - ${carte.TYPE} `)}
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
          {estBonus ? (
            // Affichage spécial pour les BONUS
            <>
              <p className="carte-question">{carte.QUESTION}</p>
              {carte.EXPLICATIONS && (
                <p className="carte-explications">{carte.EXPLICATIONS}</p>
              )}
              <div className="carte-actions-bottom">
                <CarteActionButton
                  label="RÉCUPÉRER"
                  onClick={() => onReponse(pointsCarte)}
                />
              </div>
            </>
          ) : !montrerReponse ? (
            // Autres types de cartes - face question
            <>
              {/*<p className="carte-question">{estChoix ? enTeteQuestion : carte.QUESTION}</p>*/}
              {/* On n'affiche le texte ici QUE si ce n'est pas géré par un composant spécial (Charade ou Qui Suis-Je) */}
              {!estCharade && !estQuiSuisJe && (
                <p className="carte-question">
                  {estChoix ? enTeteQuestion : carte.QUESTION}
                </p>
              )}

              {estChoix && reponsesChoix.length > 1 && (
                <p className="carte-multi-reponse">Plusieurs reponses possibles</p>
              )}
              
              {estQuiSuisJe ? (
                <div className="carte-actions-bottom">
                  {/* On peut ajouter le texte ici si TexteATrous ne l'affiche pas de lui-même */}
                  <p className="carte-question">{carte.QUESTION}</p> 
                  <TexteATrous
                    reponseAlternative={carte.REPONSE || ''}
                    onWin={() => {
                      playSound('gagne.mp3', 0.4);
                      setScoreAutomatique(pointsCarte);
                      setMontrerReponse(true);
                    }}
                    onAbandon={() => {
                      playSound('perdu.mp3', 0.4);
                      setScoreAutomatique(-pointsCarte);
                      setMontrerReponse(true);
                    }}
                  />
                </div>
              ) : estAnagramme ? (
                <div className="carte-actions-bottom">
                  <JeuAnagramme
                    motATrouver={motAnagramme}
                    onWin={() => {
                      playSound('sifflet.mp3', 0.4);
                      setScoreAutomatique(pointsCarte);
                      setMontrerReponse(true);
                    }}
                    onAbandon={() => {
                      playSound('perd.mp3', 0.4);
                      setScoreAutomatique(-pointsCarte);
                      setMontrerReponse(true);
                    }}
                  />
                </div>
              ) : estCharade ? (
                <div className="carte-actions-bottom">
                  <CharadeInput
                    question={carte.QUESTION}
                    reponse={carte.REPONSE}
                    onWin={() => {
                      playSound('gagne.mp3', 0.4);
                      setScoreAutomatique(pointsCarte);
                      setMontrerReponse(true);
                    }}
                    onAbandon={() => {
                      playSound('perd.mp3', 0.4);
                      setScoreAutomatique(-pointsCarte);
                      setMontrerReponse(true);
                    }}
                  />
                </div>
              ) : estChoix ? (
                <CarteChoixOptions
                  className="carte-actions-bottom"
                  options={options}
                  selectedKeys={choixSelectionnes}
                  onToggle={(optionKey) => gererChoixMultiple(optionKey)}
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
                    label="VOIR LA RÉPONSE"
                    onClick={() => setMontrerReponse(true)}
                  />
                </div>
              )}
            </>
          ) : (
            // Face réponse pour les non-BONUS
            <CarteFauneReponse
              scoreAutomatique={scoreAutomatique}
              pointsCarte={pointsCarte}
              reponse={carte.REPONSE}
              explications={carte.EXPLICATIONS}
              nomScientifique={carte.NOM_SCIENTIFIQUE}
              estChoix={estChoix}
              estVraiFaux={estVraiFaux}
              estBonus={estBonus}
              estAnagramme={estAnagramme}
              estQuiSuisJe={estQuiSuisJe}
              onReponse={onReponse}
              estCharade={estCharade}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CarteFaune;