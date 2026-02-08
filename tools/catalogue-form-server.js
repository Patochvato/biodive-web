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
  if (req.method === 'GET') {
    return serveHtml(res);
  }

  if (req.method === 'POST') {
    return parseBody(req, (params) => {
      const entry = {
        ID: params.get('ID') || '',
        QUESTION: params.get('QUESTION') || '',
        REPONSE: params.get('REPONSE') || '',
        EXPLICATIONS: params.get('EXPLICATIONS') || '',
        '@images': params.get('@images') || '',
        TYPE: params.get('TYPE') || '',
        CATEGORIE: params.get('CATEGORIE') || '',
        POINTS: params.get('POINTS') || ''
      };

      const data = readJson();
      const categorie = entry.CATEGORIE || 'faune';
      if (!data[categorie]) data[categorie] = [];
      data[categorie].push(entry);

      writeJson(data);

      res.writeHead(302, { Location: '/' });
      res.end();
    });
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Formulaire : http://localhost:${PORT}`);
});