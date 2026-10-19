/**
 * Servidor local sem dependências. Simula o GitHub Pages:
 * o site fica em http://localhost:4173/VilaFunItu/ e endereços inexistentes recebem o 404.html.
 *   npm run serve        (ou npm run dev, que também recompila ao salvar)
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { default: cfg } = await import(pathToFileURL(path.join(raiz, 'src/config.js')).href);
const base = cfg.site.basePath || '/';
const porta = Number(process.env.PORT) || 4173;

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (url === '/' && base !== '/') {
    res.writeHead(302, { Location: base });
    return res.end();
  }
  let rel = url.startsWith(base) ? url.slice(base.length) : null;
  if (rel !== null) {
    if (rel === '' || rel.endsWith('/')) rel += 'index.html';
    const arquivo = path.join(raiz, rel);
    if (arquivo.startsWith(raiz) && !rel.split('/').some((p) => p.startsWith('.') || p === 'src' || p === 'node_modules')) {
      try {
        if ((await stat(arquivo)).isFile()) {
          res.writeHead(200, { 'Content-Type': TIPOS[path.extname(arquivo)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
          return res.end(await readFile(arquivo));
        }
      } catch {}
    }
  }
  res.writeHead(404, { 'Content-Type': TIPOS['.html'] });
  res.end(await readFile(path.join(raiz, '404.html')));
}).listen(porta, () => console.log(`Site em http://localhost:${porta}${base}`));
