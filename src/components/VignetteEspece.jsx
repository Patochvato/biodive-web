import React, { useState } from 'react';
import './album.css';
import { playSound } from '../audioManager';


const VignetteEspece = ({ espece }) => {
  const [flipped, setFlipped] = useState(false);
  const gererClic = () => {
    // 1. Jouer le son de "flip"
    // Utilise un son court comme 'click.mp3' ou 'swipe.mp3'
    playSound('/public/sounds/bris.mp3', 0.3); 

    // 2. Vibration légère (optionnel, très sympa sur mobile)
    if (navigator.vibrate) navigator.vibrate(10);

    setFlipped(!flipped);

    if (!flipped) {
      setTimeout(() => {
        setFlipped(false);
      }, 3000);
    }
  };

  // On oublie REPONSE, on prend directement NOM
  const nomAAfficher = espece.NOM || "Nom manquant";

  return (
    <div className="vignette-perspective" onClick={() => setFlipped(!flipped)}>
      <div className={`vignette-inner ${flipped ? 'flipped' : ''}`}>
        
        {/* RECTO : IMAGE */}
        <div className="vignette-front">
          <img 
            src={`/images/${espece["@images"] || 'biodive.png'}`} 
            alt={nomAAfficher} 
            className="vignette-image"
          />
        </div>

        {/* VERSO : NOM DIRECT DU JSON */}
        <div className="vignette-back">
          <span className="label-info">Espèce</span>
          <div className="nom-commun">
            {nomAAfficher} 
          </div>
          
          {espece.NOM_SCIENTIFIQUE && (
            <>
              <div className="separateur"></div>
              <span className="label-info">Nom Scientifique</span>
              <div className="nom-scientifique">{espece.NOM_SCIENTIFIQUE}</div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
export default VignetteEspece;