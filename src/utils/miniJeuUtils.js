import { DICTIONNAIRE_ANAGRAMMES, OBJETS } from '../constants/gameConstants';

/**
 * Prépare un nouveau mot pour le mini-jeu d'anagramme
 */
export const choisirMotAleatoire = () => {
  const choisi = DICTIONNAIRE_ANAGRAMMES[
    Math.floor(Math.random() * DICTIONNAIRE_ANAGRAMMES.length)
  ];
  return choisi;
};

/**
 * Vérifie si la réponse du joueur est correcte
 */
export const verifierReponse = (reponseUser, motATrouver) => {
  if (!motATrouver || !motATrouver.solution) {
    console.error('[mini] verifierReponse: motATrouver invalide', motATrouver);
    return { valide: false, erreur: "invalid_data" };
  }

  const solutionsBrutes = Array.isArray(motATrouver.solution)
    ? motATrouver.solution
    : [motATrouver.solution];
    
  const solutions = solutionsBrutes
    .map((valeur) => String(valeur).trim().toUpperCase())
    .filter(Boolean);

  if (solutions.length === 0) {
    console.error('[mini] verifierReponse: solutions vides', motATrouver);
    return { valide: false, erreur: "empty_solutions" };
  }

  if (reponseUser.trim() === "") {
    return { valide: false, erreur: "empty_response" };
  }

  const reponseNormalisee = reponseUser.trim().toUpperCase();
  const estCorrect = solutions.includes(reponseNormalisee);

  return {
    valide: estCorrect,
    solutions: solutions,
    erreur: null
  };
};

/**
 * Choisit un objet aléatoire comme récompense
 */
export const choisirObjetAleatoire = () => {
  return OBJETS[Math.floor(Math.random() * OBJETS.length)];
};
