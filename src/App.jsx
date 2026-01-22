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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#e1f5fe',
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
    backgroundColor: 'rgba(2, 136, 209, 0.2)', // Bleu très clair transparent
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

function App() {
  const [ecranAccueil, setEcranAccueil] = useState(true); // Nouveau : commence sur l'accueil
  const [position, setPosition] = useState(0);
  const [mode, setMode] = useState('DEPLACEMENT'); 
  const [estAuClub, setEstAuClub] = useState(true);
  const [inventaire, setInventaire] = useState({ camera: false, couteau: false, photo: false });
  const [carteActuelle, setCarteActuelle] = useState(null);
  const [score, setScore] = useState(0);
  const [dernierDeDepart, setDernierDeDepart] = useState(null);
  const [messageBonus, setMessageBonus] = useState("");
  const [cartesUtilisees, setCartesUtilisees] = useState([]);

  const tenterLeDepart = () => {
    playSound('dice.mp3', 0.4);
  const faces = ["PLONGEUR", "POIGNARD", "CAMERA", "PHOTO", "PLONGEUR", "BINGO"];
  const tirage = faces[Math.floor(Math.random() * faces.length)];
  setDernierDeDepart(tirage);

  // Mise à jour de l'inventaire selon le tirage
  if (tirage === "POIGNARD") setInventaire(prev => ({ ...prev, couteau: true }));
  if (tirage === "CAMERA") setInventaire(prev => ({ ...prev, camera: true }));
  if (tirage === "PHOTO") setInventaire(prev => ({ ...prev, photo: true }));

  // Si c'est un départ validé (Plongeur ou Bingo)
  if (tirage === "PLONGEUR" || tirage === "BINGO") {
    // On laisse 1.5s au joueur pour voir le résultat avant de changer d'écran
    setTimeout(() => {
      setEstAuClub(false);
      setDernierDeDepart(null); // On réinitialise pour la prochaine fois
    }, 1500);
  }
};

  
const finirTour = (points = 0) => {
  let pointsFinal = parseInt(points, 10) || 0;

  // 1. CALCUL DES BONUS
  if (pointsFinal > 0) {
    if (carteActuelle?.CATEGORIE === "BIOLOGIE" && inventaire.photo) {
      pointsFinal += 10;
    }
    if (inventaire.camera) {
      pointsFinal = Math.round(pointsFinal * 1.2);
    }
  }

  // 2. APPLICATION DES POINTS
  if (pointsFinal >= -9 && pointsFinal <= 9) {
    setPosition(prev => Math.min(100, Math.max(0, prev + pointsFinal)));
  } else {
    setScore(prev => prev + pointsFinal);
  }

  // 3. RAMASSER LES OBJETS (Correction ici : on utilise objetTrouve partout)
  const objetTrouve = carteActuelle?.VALEUR ? String(carteActuelle.VALEUR).toUpperCase() : "";

  if (objetTrouve.includes("CAMERA") && !inventaire.camera) {
    setInventaire(prev => ({ ...prev, camera: true }));
    setMessageBonus("✨ Super ! Vous avez trouvé la CAMÉRA vidéo !");
    setTimeout(() => setMessageBonus(""), 3000);
  } 
  else if (objetTrouve.includes("PHOTO") && !inventaire.photo) {
    setInventaire(prev => ({ ...prev, photo: true }));
    setMessageBonus("✨ Super ! Vous avez trouvé l'APPAREIL PHOTO !");
    setTimeout(() => setMessageBonus(""), 3000);
  } 
  else if (objetTrouve.includes("COUTEAU") && !inventaire.couteau) {
    setInventaire(prev => ({ ...prev, couteau: true }));
    setMessageBonus("✨ Super ! Vous avez trouvé le COUTEAU de sécurité !");
    setTimeout(() => setMessageBonus(""), 3000);
  }

  // 4. MÉMOIRE ET NETTOYAGE
  if (carteActuelle) {
    setCartesUtilisees(prev => [...prev, carteActuelle.ID]);
  }
  
  // Ces deux lignes sont cruciales pour fermer la carte et revenir au dé
  setMode('DEPLACEMENT');
  setCarteActuelle(null);
};

const toutesLesCartes = [
    ...(catalogue_complet.faune || []),
    ...(catalogue_complet.action || [])
  ];
const nbObjets = Object.values(inventaire).filter(val => val === true).length;
const bonusCollection = nbObjets === 3 ? 100 : 0; // +100 si inventaire complet

  if (ecranAccueil) {
    return <EcranAccueil onDemarrer={() => setEcranAccueil(false)} />;
  }
  const quitterLeJeu = () => {
  setEcranAccueil(true);
  setMode('ACCUEIL');
  setScore(0);
  setInventaire([]);
  setPosition(0);
}
const retournerALAccueil = () => {
  // 1. On affiche à nouveau l'écran d'accueil
  setEcranAccueil(true);
    // On le remet soit à null, soit à 'DEPART' pour la prochaine partie
  setMode('DEPLACEMENT'); 
    // 3. On remet les compteurs à zéro pour ne pas retrouver l'ancien score
  setScore(0);
  setPosition(0);
  setInventaire([]);
  setCartesUtilisees([]);
  setDernierDeDepart(null);
};

// Compte le nombre d'objets récupérés (ceux qui sont à true)
const nbObjetsRecuperes = Object.values(inventaire).filter(val => val === true).length;

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
    left: `calc(${position}% - 15px)` 
  }}>
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
    objets={nbObjets}
    onRejouer={() => {
      // 1. On remet tout à zéro
      setPosition(0);
      setScore(0);
      setEstAuClub(true);
      setInventaire({ couteau: false, camera: false, photo: false });
      setCartesUtilisees([]);
      // 2. IMPORTANT : On change le mode pour retourner au jeu
      setMode('DEPLACEMENT'); 
    }} 
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
        margin: '20px auto', width: '120px', height: '120px', 
        border: '2px solid #0288d1', borderRadius: '15px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'white', fontSize: '1.2rem', fontWeight: 'bold', color: '#0288d1'
      }}>
        {dernierDeDepart ? <span>{dernierDeDepart}</span> : <span>🎲</span>}
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
      <CarteAction carte={carteActuelle} onContinuer={finirTour} />
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