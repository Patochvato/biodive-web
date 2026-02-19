import React from 'react';
import '../album.css';
import VignetteEspece from './VignetteEspece';

// Composant principal
const AlbumPhoto = ({ catalogue }) => {
  // On récupère le tableau 'faune'
  const sourceFaune = catalogue?.faune || [];

  // Filtrage pour ne garder que la catégorie faune
  const fauneUniquement = sourceFaune.filter(item => 
    item.CATEGORIE?.toLowerCase() === 'faune' && 
    item.TYPE !== 'BONUS' &&
    item["@images"] && item["@images"] !== 'biodive.png'
  );

  return (
    <div className="album-container">
      <p style={{ fontSize: '1rem', color: '#0288d1', marginBottom: '10px', textAlign: 'center' }}>
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