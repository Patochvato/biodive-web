import http from 'http';
import fs from 'fs';
import path from 'path';
import { URLSearchParams } from 'url';
import { fileURLToPath } from 'url';

const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const JSON_PATH = path.join(ROOT, 'src', 'catalogue_complet.json');
const HTML_PATH = path.join(__dirname, 'catalogue-form.html');

function readJson() {
  const raw = fs.readFileSync(JSON_PATH, 'utf8');
  return JSON.parse(raw);
}

function writeJson(data) {
  fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2), 'utf8');
}

function serveHtml(res) {
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

function parseBody(req, callback) {
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => callback(new URLSearchParams(body)));
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    return serveHtml(res);
  }

  if (req.method === 'GET' && req.url === '/api/recent') {
    const data = readJson();
    const recent = data.faune ? data.faune.slice(-10).reverse() : [];
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(recent));
    return;
  }

  if (req.method === 'POST') {
    return parseBody(req, (params) => {
      console.log('📝 Réception POST...');
      
      const entry = {
        ID: params.get('ID') || '',
        QUESTION: params.get('QUESTION') || '',
        REPONSE: params.get('REPONSE') || '',
        EXPLICATIONS: params.get('EXPLICATIONS') || '',
        NOM_SCIENTIFIQUE: params.get('NOM_SCIENTIFIQUE') || '',
        '@images': params.get('@images') || '',
        TYPE: params.get('TYPE') || '',
        CATEGORIE: params.get('CATEGORIE') || '',
        POINTS: params.get('POINTS') || ''
      };

      console.log('✅ Entrée à ajouter:', entry);

      const data = readJson();
      console.log(`📊 Nombre d'entrées faune avant: ${data.faune ? data.faune.length : 0}`);
      
      // Vérifier si l'ID existe déjà
      if (!data.faune) data.faune = [];
      const idExists = data.faune.some(item => item.ID === entry.ID);
      
      if (idExists) {
        console.log(`❌ ERREUR: L'ID "${entry.ID}" existe déjà !`);
        const errorHtml = `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <title>Erreur - ID existant</title>
            <style>
              body { font-family: Arial; padding: 40px; text-align: center; }
              .error { color: #d32f2f; background: #ffebee; padding: 20px; border-radius: 8px; margin: 20px auto; max-width: 600px; }
              a { display: inline-block; margin-top: 20px; padding: 10px 20px; background: #1976d2; color: white; text-decoration: none; border-radius: 4px; }
            </style>
          </head>
          <body>
            <div class="error">
              <h1>❌ Erreur</h1>
              <p>L'ID <strong>"${entry.ID}"</strong> existe déjà dans le catalogue.</p>
              <p>Veuillez choisir un autre identifiant.</p>
            </div>
            <a href="/">← Retour au formulaire</a>
          </body>
          </html>
        `;
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(errorHtml);
        return;
      }
      
      data.faune.push(entry);

      console.log(`📊 Nombre d'entrées faune après: ${data.faune.length}`);

      writeJson(data);
      console.log('💾 JSON sauvegardé');

      // Afficher une page de confirmation au lieu de rediriger
      const successHtml = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <title>Entrée ajoutée</title>
          <style>
            body { font-family: Arial; padding: 20px; max-width: 720px; margin: 0 auto; }
            .success { color: #2e7d32; background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .details { background: #f5f5f5; padding: 15px; border-radius: 4px; margin: 10px 0; }
            .details strong { display: inline-block; width: 150px; }
            a { display: inline-block; margin-top: 20px; padding: 10px 20px; background: #1976d2; color: white; text-decoration: none; border-radius: 4px; }
            a:hover { background: #1565c0; }
          </style>
        </head>
        <body>
          <div class="success">
            <h1>✅ Entrée ajoutée avec succès !</h1>
          </div>
          <div class="details">
            <p><strong>ID :</strong> ${entry.ID}</p>
            <p><strong>Question :</strong> ${entry.QUESTION}</p>
            <p><strong>Réponse :</strong> ${entry.REPONSE}</p>
            <p><strong>Explications :</strong> ${entry.EXPLICATIONS}</p>
            <p><strong>Nom scientifique :</strong> ${entry.NOM_SCIENTIFIQUE || '(vide)'}</p>
            <p><strong>Type :</strong> ${entry.TYPE}</p>
            <p><strong>Catégorie :</strong> ${entry.CATEGORIE}</p>
            <p><strong>Points :</strong> ${entry.POINTS}</p>
          </div>
          <p><strong>Total d'entrées faune :</strong> ${data.faune.length}</p>
          <a href="/">← Ajouter une autre entrée</a>
        </body>
        </html>
      `;
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(successHtml);
    });
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Formulaire : http://localhost:${PORT}`);
});