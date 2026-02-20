import React, { useState, useRef, useCallback, useMemo } from 'react';
import BarreInventaire from './BarreInventaire';
import DePlacement from './DePlacement';
import catalogue_complet from './catalogue_complet.json';
import CarteFaune from './CarteFaune'; 
import CarteAction from './CarteAction';
import EcranVictoire from './EcranVictoire';
import EcranAccueil from './EcranAccueil';
import { playSound } from './audioManager';
import MiniJeuEpave from './components/MiniJeuEpave';
import AnimationPoints from './components/AnimationPoints';
import BarreProgressionPlongeur from './components/BarreProgressionPlongeur';
import ClubPlongee from './components/ClubPlongee';
import MessageBonus from './components/MessageBonus';
import { FACES_DE_DEPART, CONFIG_JEU } from './constants/gameConstants';
import {
  calculerPointsAvecBonus,
  obtenirObjetTrouve,
  genererMessageBonus,
  mettreAJourInventaire,
  compterObjetsUniques,
  mettreAJourInventaireDepart
} from './utils/inventaireUtils';
import {
  choisirMotAleatoire,
  verifierReponse,
  choisirObjetAleatoire
} from './utils/miniJeuUtils';

const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    position: 'relative',
    overflow: 'hidden',
    backgroundImage: `url('/images/fond2.svg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#0288d1',
    color: 'white',
    padding: '6px 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  main: {
    flex: 1,
    width: '100%',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '10px 15px',
    boxSizing: 'border-box'
  }
};

function App() {
  // États principaux
  const [ecranAccueil, setEcranAccueil] = useState(true);
  const [position, setPosition] = useState(0);
  const [mode, setMode] = useState('DEPLACEMENT');
  const [estAuClub, setEstAuClub] = useState(true);
  const [inventaire, setInventaire] = useState({ camera: 0, couteau: 0, photo: 0, bouclier: 0 });
  const [carteActuelle, setCarteActuelle] = useState(null);
  const [score, setScore] = useState(0);
  const [dernierDeDepart, setDernierDeDepart] = useState(null);
  const [messageBonus, setMessageBonus] = useState("");
  const [cartesUtilisees, setCartesUtilisees] = useState([]);
  
  // États d'animation
  const [animationScore, setAnimationScore] = useState(null);
  const [flashScore, setFlashScore] = useState(false);
  
  // États du mini-jeu
  const [miniJeuOuvert, setMiniJeuOuvert] = useState(false);
  const [motATrouver, setMotATrouver] = useState({ melange: "", solution: "" });
  const [reponseUser, setReponseUser] = useState("");
  const [tempsRestant, setTempsRestant] = useState(0);
  
  // Gestion des timers
  const timersRef = useRef({ intervals: [], timeouts: [] });

  const registerTimeout = useCallback((fn, delay) => {
    const timeoutId = setTimeout(fn, delay);
    timersRef.current.timeouts.push(timeoutId);
    return timeoutId;
  }, []);

  const registerInterval = useCallback((fn, delay) => {
    const intervalId = setInterval(fn, delay);
    timersRef.current.intervals.push(intervalId);
    return intervalId;
  }, []);

  const clearAllTimers = useCallback(() => {
    timersRef.current.intervals.forEach(clearInterval);
    timersRef.current.timeouts.forEach(clearTimeout);
    timersRef.current = { intervals: [], timeouts: [] };
  }, []);

  const afficherMessageBonus = useCallback((message, duration = 3000) => {
    if (!message) return;
    setMessageBonus(message);
    registerTimeout(() => setMessageBonus(""), duration);
  }, [registerTimeout]);

  // Lancer le dé de départ
  const tenterLeDepart = useCallback(() => {
    playSound('dice.mp3', 0.4);
    
    const tirage = FACES_DE_DEPART[Math.floor(Math.random() * FACES_DE_DEPART.length)];
    setDernierDeDepart(tirage);

    // Mise à jour de l'inventaire
    setInventaire(prev => mettreAJourInventaireDepart(prev, tirage));

    // Si départ validé
    if (tirage === "PLONGEUR" || tirage === "BINGO") {
      registerTimeout(() => {
        setEstAuClub(false);
        setDernierDeDepart(null);
      }, 1500);
    }
  }, [registerTimeout]);

  // Préparer le mini-jeu
  const preparerMiniJeu = useCallback(() => {
    const choisi = choisirMotAleatoire();
    setReponseUser("");
    setMotATrouver(choisi);
    setTempsRestant(CONFIG_JEU.TEMPS_MINI_JEU);
    setMiniJeuOuvert(true);
  }, []);

  // Vérifier la réponse du mini-jeu
  const verifierMiniJeu = useCallback(() => {
    const resultat = verifierReponse(reponseUser, motATrouver);

    if (resultat.erreur === "invalid_data" || resultat.erreur === "empty_solutions") {
      afficherMessageBonus("Erreur interne du mini‑jeu");
      setMiniJeuOuvert(false);
      return;
    }

    if (resultat.erreur === "empty_response") {
      afficherMessageBonus("Veuillez entrer une réponse", 2000);
      return;
    }

    if (resultat.valide) {
      const gain = choisirObjetAleatoire();
      setInventaire(prev => ({ ...prev, [gain]: prev[gain] + 1 }));
      afficherMessageBonus(`✨ BRAVO ! Vous avez trouvé : ${gain.toUpperCase()} !`);
      setMiniJeuOuvert(false);
    } else {
      afficherMessageBonus(`❌ Dommage ! Le mot était ${resultat.solutions.join(' / ')}`);
      setMiniJeuOuvert(false);
    }
  }, [afficherMessageBonus, reponseUser, motATrouver]);

  // Gestion du chrono du mini-jeu
  React.useEffect(() => {
    let intervalle;

    if (miniJeuOuvert && tempsRestant > 0) {
      intervalle = registerInterval(() => {
        setTempsRestant((prev) => prev - 1);
      }, 1000);
    } else if (tempsRestant === 0 && miniJeuOuvert) {
      afficherMessageBonus("⌛ TEMPS ÉCOULÉ ! Le coffre s'est refermé...");
      registerTimeout(() => setMiniJeuOuvert(false), 1000);
    }

    return () => {
      if (intervalle) clearInterval(intervalle);
    };
  }, [afficherMessageBonus, miniJeuOuvert, registerInterval, registerTimeout, tempsRestant]);

  // Gestion du son du mini-jeu
  React.useEffect(() => {
    let sonChrono = null;

    if (miniJeuOuvert) {
      sonChrono = new Audio('/sons/attente.mp3');
      sonChrono.volume = 0.3;
      sonChrono.loop = true;
      sonChrono.play().catch(e => console.log("Erreur audio attente:", e));
    }

    return () => {
      if (sonChrono) {
        sonChrono.pause();
        sonChrono.currentTime = 0;
      }
    };
  }, [miniJeuOuvert]);

  // Nettoyage global des timers
  React.useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  // Gestion de la fin de tour
  const finirTour = useCallback((points = 0, objetUtilise = null) => {
    // Calcul des points avec bonus
    const pointsFinal = calculerPointsAvecBonus(points, carteActuelle, inventaire);

    // Animation des points
    if (pointsFinal > 0) {
      playSound('bling.mp3', 0.3);
    }
    
    if (pointsFinal !== 0) {
      setAnimationScore(pointsFinal);
      setFlashScore(true);
      registerTimeout(() => {
        setAnimationScore(null);
        setFlashScore(false);
      }, 800);
    }

    // Application des points/position
    if (pointsFinal >= -9 && pointsFinal <= 9) {
      setPosition(prev => Math.min(100, Math.max(0, prev + pointsFinal)));
    } else {
      setScore(prev => prev + pointsFinal);
    }

    // Gestion des objets trouvés/utilisés
    const objetTrouve = obtenirObjetTrouve(carteActuelle?.VALEUR);
    const messageFinal = genererMessageBonus(objetTrouve, objetUtilise);
    
    if (objetUtilise) {
      playSound('bris.mp3', 0.5);
    }

    setInventaire(prev => mettreAJourInventaire(prev, objetTrouve, objetUtilise));

    if (messageFinal) {
      afficherMessageBonus(messageFinal);
    }

    // Nettoyage
    if (carteActuelle) {
      setCartesUtilisees(prev => [...prev, carteActuelle.ID]);
    }
    setMode('DEPLACEMENT');
    setCarteActuelle(null);
  }, [carteActuelle, inventaire, registerTimeout, afficherMessageBonus]);

  // Mémoïsation du catalogue complet et calculs
  const toutesLesCartes = useMemo(() => [
    ...(catalogue_complet.faune || []),
    ...(catalogue_complet.action || [])
  ], []);

  const nbObjetsRecuperesUnique = useMemo(() => 
    compterObjetsUniques(inventaire), 
    [inventaire]
  );

  const bonusCollection = useMemo(() => 
    nbObjetsRecuperesUnique >= 4 ? CONFIG_JEU.BONUS_COLLECTION_COMPLETE : 0,
    [nbObjetsRecuperesUnique]
  );

  // Réinitialiser le jeu
  const reinitialiserJeu = useCallback(() => {
    clearAllTimers();
    setEcranAccueil(true);
    setMode('DEPLACEMENT');
    setScore(0);
    setPosition(0);
    setEstAuClub(true);
    setInventaire({ camera: 0, couteau: 0, photo: 0, bouclier: 0 });
    setCartesUtilisees([]);
    setDernierDeDepart(null);
    setMessageBonus("");
    setAnimationScore(null);
    setFlashScore(false);
    setMiniJeuOuvert(false);
    setMotATrouver({ melange: "", solution: "" });
    setReponseUser("");
    setTempsRestant(0);
  }, [clearAllTimers]);

  // Affichage de l'écran d'accueil
  if (ecranAccueil) {
    return <EcranAccueil onDemarrer={() => setEcranAccueil(false)} />;
  }

  // Rendu principal du jeu
  return (
    <div style={styles.container}>
      {/* Animation de points */}
      {animationScore !== null && <AnimationPoints points={animationScore} />}
      
      {/* En-tête avec score */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>
          BIO DIVE 🐠
          <span
            style={{
              fontSize: '1.2rem',
              marginLeft: '15px',
              display: 'inline-block',
              transition: 'all 0.2s ease',
              transform: flashScore ? 'scale(1.4)' : 'scale(1)',
              color: flashScore ? '#ffd700' : 'white',
              textShadow: flashScore ? '0 0 10px rgba(255, 215, 0, 0.8)' : 'none',
              fontWeight: '900'
            }}
          >
            Score : {score}
          </span>
        </h1>
      </header>

      {/* Barre de progression */}
      <BarreProgressionPlongeur position={position} />

      {/* Inventaire */}
      <BarreInventaire inventaire={inventaire} />

      {/* Message bonus */}
      <MessageBonus message={messageBonus} />

      <main style={styles.main}>
        {/* Écran de victoire */}
        {mode === 'VICTOIRE' && (
          <EcranVictoire
            score={score + bonusCollection}
            objets={nbObjetsRecuperesUnique}
            onRejouer={reinitialiserJeu}
            onQuitter={reinitialiserJeu}
            catalogue={catalogue_complet}
          />
        )}

        {/* Club de plongée (départ) */}
        {estAuClub ? (
          <ClubPlongee 
            dernierDe={dernierDeDepart} 
            onLancerDe={tenterLeDepart}
          />
        ) : mode === 'DEPLACEMENT' ? (
          /* Déplacement */
          <DePlacement
            catalogue={toutesLesCartes.filter(c => !cartesUtilisees.includes(c.ID))}
            onLancer={(valeurDe, carte) => {
              playSound('dice.mp3', 0.4);

              const nouvellePos = Math.min(CONFIG_JEU.POSITION_VICTOIRE, position + valeurDe);
              setPosition(nouvellePos);

              if (nouvellePos >= CONFIG_JEU.POSITION_VICTOIRE) {
                setMode('VICTOIRE');
              } else if (carte) {
                setCarteActuelle(carte);
                setMode('QUESTION');
              }
            }}
            onFouiller={preparerMiniJeu}
          />
        ) : mode === 'QUESTION' && carteActuelle ? (
          /* Question (Faune ou Action) */
          carteActuelle.ID.includes("faune") ? (
            <CarteFaune carte={carteActuelle} onReponse={finirTour} />
          ) : (
            <CarteAction 
              carte={carteActuelle} 
              inventaire={inventaire} 
              onContinuer={finirTour} 
            />
          )
        ) : (
          /* État de secours */
          <div style={{ textAlign: 'center' }}>
            <p>Chargement de l'aventure...</p>
            <button onClick={() => setMode('DEPLACEMENT')}>Réinitialiser</button>
          </div>
        )}
      </main>

      {/* Mini-jeu épave */}
      <MiniJeuEpave
        ouvert={miniJeuOuvert}
        tempsRestant={tempsRestant}
        motATrouver={motATrouver}
        reponseUser={reponseUser}
        onReponseChange={setReponseUser}
        onValider={verifierMiniJeu}
        onAnnuler={() => setMiniJeuOuvert(false)}
      />
    </div>
  );
}

export default App;