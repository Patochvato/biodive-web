import React, { useState } from 'react';
import BarreInventaire from './BarreInventaire';
import DePlacement from './DePlacement';
import catalogue_complet from './catalogue_complet.json';
// Importez vos composants de cartes ici
import CarteFaune from './CarteFaune'; 
import CarteAction from './CarteAction';
import BarreProgression from './BarreProgression';
import EcranVictoire from './EcranVictoire';
import EcranAccueil from './EcranAccueil';
import { playSound } from './audioManager';

const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    position: 'relative',
    overflow: 'hidden',
    backgroundImage: `url('/images/fond2.svg')`, // Ton superbe SVG
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Légère teinte pour le contraste
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  header: {
    width: '100%',
  textAlign: 'center',
  backgroundColor: '#0288d1',
  color: 'white',
  padding: '8px 0', // Hauteur réduite
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },  
  progressContainer: {
    width: '85%',
    height: '30px', // Plus haute pour plus de visibilité
    backgroundColor: 'rgba(157, 221, 255, 0.32)', // Bleu très clair transparent
    borderRadius: '20px',
    marginTop: '20px',
    position: 'relative',
    border: '2px solid #0288d1',
    boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.2)',
    overflow: 'visible' // Pour que l'icône puisse dépasser un peu
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: '18px',
    transition: 'width 0.8s ease-out', // Animation fluide du déplacement
    backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)',
    backgroundSize: '30px 30px', // Effet de rayures stylisées
  },
  plongeurIcon: {
    position: 'absolute',
    top: '-10px', // Positionné légèrement au-dessus
    left: 'calc(width)', // Sera géré en ligne
    fontSize: '24px',
    transition: 'left 0.8s ease-out',
    filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.3))'
  },
  main: {
  flex: 1,
  width: '100%',
  maxWidth: '500px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start', 
  padding: '10px 15px', // On augmente le padding du haut à 40px pour "abaisser" le contenu
  boxSizing: 'border-box'
}
};

const EffetBulles = () => {
  // On génère 3 bulles avec des délais différents
  return (
    <div style={{ position: 'absolute', top: '-15px', left: '10px' }}>
      {[1, 2, 3].map((i) => (
        <span key={i} style={{
          position: 'absolute',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          border: '1px solid white',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          animation: `monterBulles ${1 + i * 0.5}s infinite ease-out`,
          left: `${i * 8}px`
        }}></span>
      ))}
    </div>
  );
};
function App() {
  const [ecranAccueil, setEcranAccueil] = useState(true); // Nouveau : commence sur l'accueil
  const [position, setPosition] = useState(0);
  const [mode, setMode] = useState('DEPLACEMENT'); 
  const [estAuClub, setEstAuClub] = useState(true);
  const [inventaire, setInventaire] = useState({ camera: 0, couteau: 0, photo: 0, bouclier: 0 });
  const [carteActuelle, setCarteActuelle] = useState(null);
  const [score, setScore] = useState(0);
  const [dernierDeDepart, setDernierDeDepart] = useState(null);
  const [messageBonus, setMessageBonus] = useState("");
  const [cartesUtilisees, setCartesUtilisees] = useState([]);

  const imagesFacesDe = {
  "PLONGEUR": "face_plongeur.png", // Remplace par tes vrais noms de fichiers
  "POIGNARD": "face_poignard.png",
  "CAMERA": "face_camera.png",
  "PHOTO": "face_photo.png",
  "BINGO": "face_bingo.png"
}; 
  const tenterLeDepart = () => {
    playSound('dice.mp3', 0.4);
  const faces = ["PLONGEUR", "POIGNARD", "CAMERA", "PHOTO", "PLONGEUR", "BINGO"];
  const tirage = faces[Math.floor(Math.random() * faces.length)];
  setDernierDeDepart(tirage);

  // Mise à jour de l'inventaire selon le tirage
  if (tirage === "POIGNARD") setInventaire(prev => ({ ...prev, couteau: prev.couteau + 1 }));
if (tirage === "CAMERA") setInventaire(prev => ({ ...prev, camera: prev.camera + 1 }));
if (tirage === "PHOTO") setInventaire(prev => ({ ...prev, photo: prev.photo + 1 }));
if (tirage === "BINGO") setInventaire(prev => ({ ...prev, bouclier: prev.bouclier + 1 }));

  // Si c'est un départ validé (Plongeur ou Bingo)
  if (tirage === "PLONGEUR" || tirage === "BINGO") {
    // On laisse 1.5s au joueur pour voir le résultat avant de changer d'écran
    setTimeout(() => {
      setEstAuClub(false);
      setDernierDeDepart(null); // On réinitialise pour la prochaine fois
    }, 1500);
  }
};

  
const finirTour = (points = 0, objetUtilise = null) => {
  let pointsFinal = parseInt(points, 10) || 0;

  // --- ÉTAPE A : CALCUL DES POINTS ---
  if (pointsFinal > 0) {
    if (carteActuelle?.CATEGORIE === "BIOLOGIE" && inventaire.photo > 0) {
      pointsFinal += 10;
    }
    if (inventaire.camera > 0) {
      pointsFinal = Math.round(pointsFinal * 1.2);
    }
  }

  // --- ÉTAPE B : APPLICATION DES POINTS / POSITION ---
  if (pointsFinal >= -9 && pointsFinal <= 9) {
    setPosition(prev => Math.min(100, Math.max(0, prev + pointsFinal)));
  } else {
    setScore(prev => prev + pointsFinal);
  }

  // --- ÉTAPE C : MISE À JOUR UNIQUE DE L'INVENTAIRE ---
  setInventaire(prev => {
    let nouvelInventaire = { ...prev };

    // 1. On consomme si nécessaire
    if (objetUtilise) {
      playSound('bris.mp3', 0.5);
      nouvelInventaire[objetUtilise] = Math.max(0, nouvelInventaire[objetUtilise] - 1);
      
      const nomAffiche = objetUtilise === "photo" ? "Appareil Photo" : 
                         objetUtilise.charAt(0).toUpperCase() + objetUtilise.slice(1);
      setMessageBonus(`⚠️ Votre ${nomAffiche} est épuisé/utilisé !`);
      setTimeout(() => setMessageBonus(""), 3000);
    }

    // 2. On ramasse si la carte en donne un
    const objetTrouve = carteActuelle?.VALEUR ? String(carteActuelle.VALEUR).toUpperCase() : "";
    
    if (objetTrouve.includes("CAMERA")) {
      nouvelInventaire.camera += 1;
      setMessageBonus("✨ Super ! Vous avez trouvé la CAMÉRA vidéo !");
    } 
    else if (objetTrouve.includes("PHOTO")) {
      nouvelInventaire.photo += 1;
      setMessageBonus("✨ Super ! Vous avez trouvé l'APPAREIL PHOTO !");
    }
    else if (objetTrouve.includes("BOUCLIER")) {
      nouvelInventaire.bouclier += 1;
      setMessageBonus("✨ Super ! Vous avez trouvé le BOUCLIER !");
    } 
    else if (objetTrouve.includes("COUTEAU")) {
      nouvelInventaire.couteau += 1;
      setMessageBonus("✨ Super ! Vous avez trouvé le COUTEAU !");
    }

    if (objetTrouve !== "") {
       setTimeout(() => setMessageBonus(""), 3000);
    }

    return nouvelInventaire;
  });

  // --- ÉTAPE D : NETTOYAGE ---
  if (carteActuelle) {
    setCartesUtilisees(prev => [...prev, carteActuelle.ID]);
  }
  setMode('DEPLACEMENT');
  setCarteActuelle(null);
};

const toutesLesCartes = [
    ...(catalogue_complet.faune || []),
    ...(catalogue_complet.action || [])
  ];
const nbObjetsRecuperesUnique = Object.keys(inventaire).filter(cle => inventaire[cle] > 0).length;
const bonusCollection = nbObjetsRecuperesUnique >= 4 ? 100 : 0; // 4 car tu as Caméra, Couteau, Photo, Bouclier

  if (ecranAccueil) {
    return <EcranAccueil onDemarrer={() => setEcranAccueil(false)} />;
  }
  const quitterLeJeu = () => {
    setEcranAccueil(true);
    setMode('DEPLACEMENT'); 
    setScore(0);
    setPosition(0);
    setEstAuClub(true); // <--- REPASSER PAR LA CASE DÉPART
    setInventaire({ camera: 0, couteau: 0, photo: 0, bouclier: 0 });
    setCartesUtilisees([]);
    setDernierDeDepart(null);
  };

  const retournerALAccueil = () => {
    setEcranAccueil(true);
    setMode('DEPLACEMENT'); 
    setScore(0);
    setPosition(0);
    setEstAuClub(true); // <--- REPASSER PAR LA CASE DÉPART
    setInventaire({ camera: 0, couteau: 0, photo: 0, bouclier: 0 });
    setCartesUtilisees([]);
    setDernierDeDepart(null);
  };

// Compte le nombre d'objets récupérés (ceux qui sont à true)
const nbObjetsRecuperes = Object.values(inventaire).filter(val => val > 0).length;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
  <h1 style={styles.headerTitle}>
    BIO DIVE 🐠 
    <span style={{ fontSize: '1rem', marginLeft: '15px', opacity: 0.9 }}>
      Score : {score}
    </span>
  </h1>
</header>

      {/* ZONE DE NAVIGATION : Barre de progression stylisée */}
<div style={styles.progressContainer}>
  {/* La barre colorée */}
  <div style={{ 
    ...styles.progressBar, 
    width: `${position}%` 
  }} />

  {/* L'icône du plongeur qui suit la barre */}
  <div style={{ 
    ...styles.plongeurIcon, 
    left: `calc(${position}% - 15px)`,
  animation: 'bounce 2s infinite ease-in-out' // Le plongeur flotte doucement
}}>
  {/* On n'affiche les bulles que si le plongeur n'est pas à 0 ou 100 */}
  {position > 0 && position < 100 && <EffetBulles />}
  🤿
</div>

  {/* Petits repères de distance */}
  <div style={{
    position: 'absolute',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 10px',
    top: '35px',
    fontSize: '0.7rem',
    color: '#0288d1',
    fontWeight: 'bold'
  }}>
    <span>Surface</span>
    <span>50%</span>
    <span>Arrivée</span>
  </div>
</div>
      
      <BarreInventaire inventaire={inventaire} />
      
{messageBonus && (
  <div style={{
    position: 'fixed',
    top: '20%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#ffd700',
    color: '#000',
    padding: '15px 25px',
    borderRadius: '30px',
    fontWeight: 'bold',
    zIndex: 3000,
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    border: '2px solid white',
    animation: 'bounce 0.5s ease'
  }}>
    {messageBonus}
  </div>
)}


  <main style={styles.main}>
  {/* On affiche l'écran de victoire uniquement si le mode est 'VICTOIRE' */}
{mode === 'VICTOIRE' && (
  <EcranVictoire 
    score={score + bonusCollection} 
    objets={nbObjetsRecuperesUnique} // <--- Utilise la nouvelle variable ici
    onRejouer={retournerALAccueil} 
    onQuitter={retournerALAccueil}
  />
)}

  {/* 2. CAS : DÉPART (Club) */}
  {estAuClub ? (
  <div style={{ 
    width: '100%',           // Prend toute la largeur disponible dans le main
    maxWidth: '380px',       // S'aligne sur la largeur visuelle de tes cartes
    backgroundColor: 'white', 
    padding: '30px 20px',    // Un peu plus d'espace interne
    borderRadius: '20px', 
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    textAlign: 'center'
  }}>
    <h2 style={{ color: '#0288d1', marginBottom: '20px' }}>🏠 Club de Plongée</h2>
      
      <div style={{ 
  margin: '20px auto', width: '150px', height: '150px', 
  border: '3px solid #0288d1', borderRadius: '20px',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  backgroundColor: 'white', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
}}>
  {dernierDeDepart ? (
    /* Affiche la face spécifique tirée */
    <img 
      src={`/images/${imagesFacesDe[dernierDeDepart]}`} 
      alt={dernierDeDepart}
      style={{ 
        width: '100%', height: '100%', objectFit: 'contain', 
        padding: '10px', animation: 'popIn 0.3s ease-out' 
      }} 
    />
  ) : (
    /* Image du dé entier par défaut avant le lancer */
    <img 
      src="/images/dedepart.png" 
      alt="Lancer le dé" 
      style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '15px', opacity: 0.6 }} 
    />
  )}
</div>

      <p style={{ marginBottom: '15px' }}>
        {dernierDeDepart 
          ? (dernierDeDepart === "PLONGEUR" || dernierDeDepart === "BINGO" 
              ? "C'est parti ! 🤿" 
              : "Équipement trouvé ! Rejouez pour partir.")
          : "Tentez de tirer PLONGEUR pour démarrer !"}
      </p>

      <button onClick={tenterLeDepart} style={{ padding: '12px 25px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
        LANCER LE DÉ DE DÉPART
      </button>
    </div>
  ) : mode === 'DEPLACEMENT' ? (
    /* 3. CAS : DÉPLACEMENT */
    <DePlacement 
  catalogue={toutesLesCartes.filter(c => !cartesUtilisees.includes(c.ID))}
  onLancer={(valeurDe, carte) => {
    playSound('dice.mp3', 0.4);
    
    const nouvellePos = Math.min(100, position + valeurDe);
    setPosition(nouvellePos);

    if (nouvellePos >= 100) {
      // Si on arrive au bout, on finit le jeu directement
      setMode('VICTOIRE');
    } else if (carte) {
      // Sinon, on continue l'exploration
      setCarteActuelle(carte);
      setMode('QUESTION');
        }
      }} 
    />
  ) : mode === 'QUESTION' && carteActuelle ? (
    /* 4. CAS : QUESTION */
    carteActuelle.ID.includes("faune") ? (
      <CarteFaune carte={carteActuelle} onReponse={finirTour} />
    ) : (
      <CarteAction carte={carteActuelle} inventaire={inventaire} onContinuer={finirTour} />
    )
  ) : (
    /* 5. SÉCURITÉ */
    <div style={{ textAlign: 'center' }}>
      <p>Chargement de l'aventure...</p>
      <button onClick={() => setMode('DEPLACEMENT')}>Réinitialiser</button>
    </div>
  )}
</main>
    </div>
  );
}

export default App;