/**
 * Gera os arquivos de marca provisórios em src/static:
 * favicon (SVG e PNG), ícones do app e imagem de compartilhamento (Open Graph).
 *
 * Uso: npm run marca   (requer o pacote opcional "sharp")
 *
 * Quando houver logotipo e fotos oficiais, substitua os arquivos de src/static
 * ou ajuste os desenhos abaixo.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import config from '../src/config.js';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const destino = path.join(raiz, 'src/static');

const C = {
  leite: '#fff5f2',
  ameixa: '#3b1f3a',
  morango: '#e0485f',
  morangoTexto: '#b3263f',
  manteiga: '#ffd877',
  pistache: '#e1edd5',
};

/** Arco = retângulo com topo semicircular. */
const arco = (x, y, w, h) => `M${x},${y + h} V${y + w / 2} A${w / 2},${w / 2} 0 0 1 ${x + w},${y + w / 2} V${y + h} Z`;

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${C.leite}"/>
  <path d="${arco(14, 8, 36, 50)}" fill="${C.ameixa}"/>
  <circle cx="32" cy="27" r="6.5" fill="${C.manteiga}"/>
</svg>`;

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="xadrez" width="44" height="44" patternUnits="userSpaceOnUse">
      <rect width="44" height="44" fill="${C.leite}"/>
      <rect width="22" height="44" fill="${C.morango}" fill-opacity="0.55"/>
      <rect width="44" height="22" fill="${C.morango}" fill-opacity="0.55"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="${C.leite}"/>
  <path d="${arco(640, 120, 200, 510)}" fill="url(#xadrez)"/>
  <path d="${arco(860, 250, 170, 380)}" fill="${C.ameixa}"/>
  <circle cx="945" cy="345" r="24" fill="${C.manteiga}"/>
  <path d="${arco(1050, 360, 130, 270)}" fill="${C.manteiga}"/>
  <ellipse cx="1115" cy="630" rx="90" ry="70" fill="${C.pistache}"/>
  <text x="72" y="250" font-family="Lora, Georgia, serif" font-size="96" font-weight="600" fill="${C.ameixa}" letter-spacing="-2">${config.negocio.nomeCurto}</text>
  <text x="72" y="320" font-family="Lora, Georgia, serif" font-size="52" font-style="italic" fill="${C.morangoTexto}">${config.negocio.cidade.valor}</text>
  <text x="72" y="440" font-family="Lora, Georgia, serif" font-size="34" fill="${C.ameixa}">Festas intimistas com</text>
  <text x="72" y="484" font-family="Lora, Georgia, serif" font-size="34" fill="${C.ameixa}">gastronomia afetiva.</text>
  <text x="72" y="560" font-family="Inter, Arial, sans-serif" font-size="24" fill="#5e3f5b">Buffet infantil em ${config.negocio.cidade.valor} (${config.negocio.cidade.uf})</text>
</svg>`;

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('O pacote "sharp" não está instalado. Rode `npm install` e tente de novo.');
  process.exit(1);
}

await mkdir(destino, { recursive: true });
await writeFile(path.join(destino, 'favicon.svg'), favicon);
const fav = Buffer.from(favicon);
await sharp(fav, { density: 300 }).resize(32, 32).png().toFile(path.join(destino, 'favicon-32.png'));
await sharp(fav, { density: 600 }).resize(180, 180).flatten({ background: C.leite }).png().toFile(path.join(destino, 'apple-touch-icon.png'));
await sharp(fav, { density: 1200 }).resize(512, 512).png().toFile(path.join(destino, 'icon-512.png'));
await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(path.join(destino, 'og.png'));
console.log('Arquivos de marca gerados em src/static.');
