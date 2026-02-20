import { MESSAGES_OBJETS, NOMS_OBJETS, CONFIG_JEU } from '../constants/gameConstants';

/**
 * Calcule les points finaux avec les bonus
 */
export const calculerPointsAvecBonus = (points, carte, inventaire) => {
  let pointsFinal = parseInt(points, 10) || 0;

  if (pointsFinal > 0) {
    // Bonus photo pour catégorie BIOLOGIE
    if (carte?.CATEGORIE === "BIOLOGIE" && inventaire.photo > 0) {
      pointsFinal += CONFIG_JEU.BONUS_PHOTO_BIOLOGIE;
    }

    // Multiplicateur caméra
    if (inventaire.camera > 0) {
      pointsFinal = Math.round(pointsFinal * CONFIG_JEU.MULTIPLICATEUR_CAMERA);
    }
  }

  return pointsFinal;
};

/**
 * Détermine l'objet trouvé à partir de la valeur de la carte
 */
export const obtenirObjetTrouve = (valeur) => {
  if (!valeur) return null;
  
  const valeurUpper = String(valeur).toUpperCase();
  
  if (valeurUpper.includes("CAMERA")) return "camera";
  if (valeurUpper.includes("PHOTO")) return "photo";
  if (valeurUpper.includes("BOUCLIER")) return "bouclier";
  if (valeurUpper.includes("COUTEAU")) return "couteau";
  
  return null;
};

/**
 * Génère le message de bonus pour un objet trouvé ou utilisé
 */
export const genererMessageBonus = (objetTrouve, objetUtilise) => {
  if (objetTrouve && MESSAGES_OBJETS[objetTrouve]) {
    return MESSAGES_OBJETS[objetTrouve];
  }
  
  if (objetUtilise) {
    const nomAffiche = NOMS_OBJETS[objetUtilise] || objetUtilise;
    return `⚠️ Votre ${nomAffiche} a été utilisé !`;
  }
  
  return "";
};

/**
 * Met à jour l'inventaire après une action
 */
export const mettreAJourInventaire = (inventaireActuel, objetTrouve, objetUtilise) => {
  let nouvelInventaire = { ...inventaireActuel };

  // Retirer l'objet utilisé
  if (objetUtilise) {
    nouvelInventaire[objetUtilise] = Math.max(0, nouvelInventaire[objetUtilise] - 1);
  }

  // Ajouter l'objet trouvé
  if (objetTrouve) {
    nouvelInventaire[objetTrouve] = (nouvelInventaire[objetTrouve] || 0) + 1;
  }

  return nouvelInventaire;
};

/**
 * Compte le nombre d'objets différents récupérés
 */
export const compterObjetsUniques = (inventaire) => {
  return Object.keys(inventaire).filter(cle => inventaire[cle] > 0).length;
};

/**
 * Met à jour l'inventaire selon le résultat du dé de départ
 */
export const mettreAJourInventaireDepart = (inventaireActuel, tirage) => {
  const nouvelInventaire = { ...inventaireActuel };

  switch (tirage) {
    case "POIGNARD":
      nouvelInventaire.couteau += 1;
      break;
    case "CAMERA":
      nouvelInventaire.camera += 1;
      break;
    case "PHOTO":
      nouvelInventaire.photo += 1;
      break;
    case "BINGO":
      nouvelInventaire.bouclier += 1;
      break;
    default:
      break;
  }

  return nouvelInventaire;
};
