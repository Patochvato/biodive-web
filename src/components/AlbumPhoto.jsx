import React, { useState } from 'react';
import '../album.css';

// Sous-composant pour la carte individuelle
const VignetteEspece = ({ espece }) => {
  const [flipped, setFlipped] = useState(false);

  // Fonction pour gérer le clic avec retour automatique
  const gererClic = () => {
    // On retourne la carte (passe au verso)
    setFlipped(!flipped);

    // Si on vient de l'afficher (elle passe au verso), 
    // on programme son retour automatique au recto après 3 secondes
    if (!flipped) {
      setTimeout(() => {
        setFlipped(false);
      }, 3000);
    }
  };

  // On utilise directement la clé NOM de ton JSON
  const nomAAfficher = espece.NOM || "Espèce inconnue";

  return (
    <div className="vignette-perspective" onClick={gererClic}>
      <div className={`vignette-inner ${flipped ? 'flipped' : ''}`}>
        
        {/* RECTO : IMAGE */}
        <div className="vignette-front">
          <img 
            src={`/images/${espece["@images"] || 'biodive.png'}`} 
            alt={nomAAfficher} 
            className="vignette-image"
            onError={(e) => e.target.src = "/images/biodive.png"}
          />
        </div>

        {/* VERSO : TEXTE (NOM DU POISSON) */}
        <div className="vignette-back">
          <span className="label-info">Espèce</span>
          {/* On affiche le NOM, pas la réponse ! */}
          <div className="nom-commun">{nomAAfficher}</div>
          
          {espece.NOM_SCIENTIFIQUE && (
            <>
              <div style={{ width: '40%', height: '1px', background: 'rgba(255,255,255,0.3)', margin: '8px 0' }}></div>
              <span className="label-info">Scientifique</span>
              <div className="nom-scientifique">{espece.NOM_SCIENTIFIQUE}</div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

// Composant principal
const AlbumPhoto = ({ catalogue }) => {
  // On récupère le tableau 'faune'
  const sourceFaune = catalogue?.faune || [];

  // Filtrage pour ne garder que la catégorie faune
  const fauneUniquement = sourceFaune.filter(item => 
    item.CATEGORIE?.toLowerCase() === 'faune' && 
    item.TYPE !== 'BONUS'
  );

  return (
    <div className="album-container">
      <p style={{ fontSize: '0.9rem', color: '#0288d1', marginBottom: '10px', textAlign: 'center' }}>
        {fauneUniquement.length} espèces dans la collection
      </p>

      <div className="album-grid">
        {fauneUniquement.map((espece) => (
          <VignetteEspece key={espece.ID} espece={espece} />
        ))}
      </div>

      {fauneUniquement.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666' }}>
          Aucune donnée trouvée dans la section faune.
        </p>
      )}
    </div>
  );
};

export default AlbumPhoto;