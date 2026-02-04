/**
 * Joue un fichier audio situé dans /public/sons/
 * @param {string} filename - Nom du fichier (ex: 'dice.mp3')
 * @param {number} volume - Volume entre 0 et 1
 */
export const playSound = (fichier, volume = 1) => {
  const audio = new Audio(`/sons/${fichier}`);
  audio.volume = volume;
  audio.play().catch(e => console.log("Erreur audio:", e));
  return audio; // <--- C'est cette ligne qui permet de faire sonChrono.pause() plus tard
};
