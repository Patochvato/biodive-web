/**
 * Joue un fichier audio situé dans /public/sons/
 * @param {string} filename - Nom du fichier (ex: 'dice.mp3')
 * @param {number} volume - Volume entre 0 et 1
 */
export const playSound = (filename, volume = 0.5) => {
  try {
    // Le chemin vers le dossier public/sons est déjà ici
    const audio = new Audio(`/sons/${filename}`);
    audio.volume = volume;
    audio.play();
  } catch (error) {
    console.error("Erreur audio :", error);
  }
};