/* Gera prévia comercial na raiz para GitHub Pages (main / root). */
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=path.join(root,'src','preview');
await mkdir(path.join(root,'assets','css'),{recursive:true});
await mkdir(path.join(root,'assets','js'),{recursive:true});
await cp(path.join(source,'site.css'),path.join(root,'assets','css','preview.css'));
await cp(path.join(source,'site.js'),path.join(root,'assets','js','preview.js'));
await writeFile(path.join(root,'index.html'),await readFile(path.join(source,'index.html'),'utf8'));
await writeFile(path.join(root,'robots.txt'),'User-agent: *\nAllow: /\n# Meta noindex: prévia comercial não oficial.\n');
console.log('✔ Prévia comercial pronta em main /root (index.html, CSS, JS).');
