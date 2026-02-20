/**
 * Constantes du jeu BioDive
 */

// Images des faces du dé de départ
export const IMAGES_FACES_DE = {
  "PLONGEUR": "face_plongeur.png",
  "POIGNARD": "face_poignard.png",
  "CAMERA": "face_camera.png",
  "PHOTO": "face_photo.png",
  "BINGO": "face_bingo.png"
};

// Faces du dé de départ
export const FACES_DE_DEPART = [
  "PLONGEUR", 
  "POIGNARD", 
  "CAMERA", 
  "PHOTO", 
  "PLONGEUR", 
  "BINGO"
];

// Dictionnaire pour le mini-jeu d'anagrammes
export const DICTIONNAIRE_ANAGRAMMES = [
  { solution: ["PALMES"], melange: "MLAPES" },
  { solution: ["ANCRE", "NACRE"], melange: "NCARE" },
  { solution: ["CORAIL"], melange: "LIAROC" },
  { solution: ["REQUIN"], melange: "NUIREQ" },
  { solution: ["MEDUSE"], melange: "USEDEM" },
  { solution: ["BALEINE"], melange: "ELENIBA" },
  { solution: ["TORTUE"], melange: "UORTTE" },
  { solution: ["MANTA"], melange: "TAMAN" },
  { solution: ["POULPE"], melange: "LUPOPE" },
  { solution: ["LAGON"], melange: "NOGAL" },
  { solution: ["ABYSSE"], melange: "SABYSE" },
  { solution: ["PLANCTON"], melange: "TOLNCPAN" },
  { solution: ["CRABE"], melange: "BECRA" },
  { solution: ["MURENE"], melange: "ENRUME" },
  { solution: ["RIVAGE"], melange: "GERAVI" }
];

// Objets du jeu
export const OBJETS = ["camera", "couteau", "photo", "bouclier"];

// Messages de bonus
export const MESSAGES_OBJETS = {
  camera: "✨ Super ! Vous avez trouvé la CAMÉRA vidéo !",
  photo: "✨ Super ! Vous avez trouvé l'APPAREIL PHOTO !",
  bouclier: "✨ Super ! Vous avez trouvé le BOUCLIER !",
  couteau: "✨ Super ! Vous avez trouvé le COUTEAU !"
};

// Noms d'affichage des objets
export const NOMS_OBJETS = {
  camera: "Caméra",
  photo: "Appareil Photo",
  bouclier: "Bouclier",
  couteau: "Couteau"
};

// Configuration du jeu
export const CONFIG_JEU = {
  TEMPS_MINI_JEU: 20,
  BONUS_COLLECTION_COMPLETE: 100,
  BONUS_PHOTO_BIOLOGIE: 10,
  MULTIPLICATEUR_CAMERA: 1.2,
  POSITION_VICTOIRE: 100
};
