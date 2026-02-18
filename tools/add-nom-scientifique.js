import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lire le fichier JSON
const filePath = path.join(__dirname, '..', 'src', 'catalogue_complet.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Ajouter le champ "NOM_SCIENTIFIQUE" après "EXPLICATIONS" pour toutes les cartes faune
if (data.faune && Array.isArray(data.faune)) {
  data.faune = data.faune.map(carte => {
    // Créer un nouvel objet avec l'ordre souhaité
    const nouvelleCarte = {};
    
    for (const [key, value] of Object.entries(carte)) {
      nouvelleCarte[key] = value;
      
      // Ajouter "NOM_SCIENTIFIQUE" après "EXPLICATIONS"
      if (key === 'EXPLICATIONS') {
        nouvelleCarte['NOM'] = '';
      }
    }
    
    return nouvelleCarte;
  });
}

// Écrire le fichier JSON mis à jour avec une indentation de 2 espaces
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log(`✓ Champ "NOM_SCIENTIFIQUE" ajouté à ${data.faune.length} cartes de faune`);
