/**
 * Build estático do site Villa Fun Itu.
 *
 * Lê src/config.js, renderiza os componentes em HTML e grava o site pronto
 * na RAIZ do repositório (compatível com GitHub Pages: branch main, pasta /root).
 *
 *   npm run build              → usa o modo definido em src/config.js
 *   npm run build:demo         → força o modo demonstração
 *   npm run build:publico      → força o modo público
 *   npm run dev                → build + servidor local + recompilação automática
 *
 * Dependências opcionais (o build funciona sem elas, com menos otimização):
 *   sharp   → converte fotos para WebP em vários tamanhos
 *   esbuild → minifica CSS e JavaScript
 */
import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { existsSync, watch } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(raiz, 'src');
const assets = path.join(raiz, 'assets');

const args = process.argv.slice(2);
const argModo = args.find((a) => a.startsWith('--modo='))?.split('=')[1];
const assistir = args.includes('--watch');

const opcional = async (nome) => {
  try {
    const m = await import(nome);
    return m.default ?? m;
  } catch {
    return null;
  }
};
const sharp = await opcional('sharp');
const esbuild = await opcional('esbuild');

/** Importa um módulo ignorando o cache (necessário no modo --watch). */
const importarFresco = (arquivo) => import(`${pathToFileURL(arquivo).href}?t=${Date.now()}`);

/** Percorre a config e devolve todos os objetos de foto com `arquivo` preenchido. */
function coletarFotos(obj, lista = []) {
  if (Array.isArray(obj)) obj.forEach((o) => coletarFotos(o, lista));
  else if (obj && typeof obj === 'object') {
    if (typeof obj.arquivo === 'string' && obj.arquivo && 'alt' in obj) lista.push(obj);
    Object.values(obj).forEach((v) => coletarFotos(v, lista));
  }
  return lista;
}

const LARGURAS = [480, 960, 1600];

async function processarImagens(cfg) {
  const saida = path.join(assets, 'img');
  await mkdir(saida, { recursive: true });
  const mapa = {};
  const avisos = [];

  for (const foto of coletarFotos(cfg)) {
    const origem = path.join(src, 'images', foto.arquivo);
    if (!existsSync(origem)) {
      avisos.push(`Foto não encontrada em src/images: ${foto.arquivo}`);
      continue;
    }
    if (mapa[foto.arquivo]) continue;
    const base = foto.arquivo.replace(/\.[^.]+$/, '').replace(/[^a-z0-9-_]/gi, '-').toLowerCase();

    if (sharp) {
      const meta = await sharp(origem).rotate().metadata();
      const larguraOrig = meta.autoOrient?.width ?? meta.width;
      const alturaOrig = meta.autoOrient?.height ?? meta.height;
      const larguras = LARGURAS.filter((l) => l < larguraOrig);
      if (!larguras.length || larguras[larguras.length - 1] < Math.min(larguraOrig, 1600)) larguras.push(Math.min(larguraOrig, 1600));
      const variantes = [];
      for (const l of [...new Set(larguras)]) {
        const nome = `${base}-${l}.webp`;
        const destino = path.join(saida, nome);
        const precisa = !existsSync(destino) || (await stat(destino)).mtimeMs < (await stat(origem)).mtimeMs;
        if (precisa) await sharp(origem).rotate().resize({ width: l }).webp({ quality: 78 }).toFile(destino);
        variantes.push({ src: `assets/img/${nome}`, largura: l });
      }
      mapa[foto.arquivo] = { largura: larguraOrig, altura: alturaOrig, variantes };
    } else {
      // Sem sharp: copia o arquivo original (use fotos já otimizadas, de preferência .webp).
      const nome = `${base}${path.extname(foto.arquivo).toLowerCase()}`;
      await cp(origem, path.join(saida, nome));
      const largura = foto.largura || 1600;
      const altura = foto.altura || 1200;
      mapa[foto.arquivo] = { largura, altura, variantes: [{ src: `assets/img/${nome}`, largura }] };
      avisos.push(`"sharp" ausente: ${foto.arquivo} copiada sem conversão para WebP.`);
    }
  }

  // Logotipo oficial (copiado como está)
  const logo = cfg.negocio.logo;
  if (logo.arquivo && existsSync(path.join(src, 'images', logo.arquivo))) {
    await cp(path.join(src, 'images', logo.arquivo), path.join(saida, logo.arquivo));
  }

  // Ícones e imagem de compartilhamento
  await cp(path.join(src, 'static'), saida, { recursive: true });
  const og = cfg.fotos.compartilhamento;
  if (sharp && og.confirmado && og.arquivo && existsSync(path.join(src, 'images', og.arquivo))) {
    await sharp(path.join(src, 'images', og.arquivo)).resize(1200, 630, { fit: 'cover' }).png().toFile(path.join(saida, 'og.png'));
  }

  return { mapa, avisos };
}

async function processarCssJs() {
  const cssEntrada = path.join(src, 'styles/main.css');
  const jsEntrada = path.join(src, 'scripts/main.js');
  let css;
  let js;
  if (esbuild) {
    const r = await esbuild.build({
      entryPoints: [cssEntrada, jsEntrada],
      bundle: true,
      minify: true,
      write: false,
      outdir: 'out',
      external: ['../fonts/*'],
      target: ['chrome100', 'safari15', 'firefox100'],
      logLevel: 'silent',
    });
    css = r.outputFiles.find((f) => f.path.endsWith('.css')).text;
    js = r.outputFiles.find((f) => f.path.endsWith('.js')).text;
  } else {
    // Sem esbuild: resolve os @import manualmente.
    const principal = await readFile(cssEntrada, 'utf8');
    const partes = [];
    for (const m of principal.matchAll(/@import '\.\/(.+?)';/g)) partes.push(await readFile(path.join(src, 'styles', m[1]), 'utf8'));
    css = partes.join('\n');
    js = await readFile(jsEntrada, 'utf8');
  }
  await mkdir(path.join(assets, 'css'), { recursive: true });
  await mkdir(path.join(assets, 'js'), { recursive: true });
  await writeFile(path.join(assets, 'css/site.css'), css);
  await writeFile(path.join(assets, 'js/site.js'), js);
  return createHash('sha256').update(css + js).digest('hex').slice(0, 10);
}

async function build() {
  const inicio = Date.now();
  const { default: cfg } = await importarFresco(path.join(src, 'config.js'));
  const { createContext } = await importarFresco(path.join(src, 'templates/helpers.js'));
  const paginas = await importarFresco(path.join(src, 'templates/pages.js'));

  const modo = argModo || cfg.modo;
  if (!['demonstracao', 'publico'].includes(modo)) throw new Error(`Modo inválido: "${modo}". Use "demonstracao" ou "publico".`);

  await rm(assets, { recursive: true, force: true });
  await mkdir(assets, { recursive: true });
  await cp(path.join(src, 'fonts'), path.join(assets, 'fonts'), { recursive: true });

  const { mapa, avisos } = await processarImagens(cfg);
  const versao = await processarCssJs();
  const ctx = createContext(cfg, { modo, imagens: mapa });

  const { html, menu } = paginas.paginaInicial(ctx, versao);
  await writeFile(path.join(raiz, 'index.html'), html);
  await writeFile(path.join(raiz, '404.html'), paginas.pagina404(ctx, menu, versao));
  await writeFile(path.join(raiz, 'privacidade.html'), paginas.paginaPrivacidade(ctx, menu, versao));

  const hoje = new Date().toISOString().slice(0, 10);
  await writeFile(
    path.join(raiz, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${cfg.site.url}</loc><lastmod>${hoje}</lastmod><priority>1.0</priority></url>
  <url><loc>${cfg.site.url}privacidade.html</loc><lastmod>${hoje}</lastmod><priority>0.2</priority></url>
</urlset>
`
  );
  await writeFile(path.join(raiz, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${cfg.site.url}sitemap.xml\n`);
  await writeFile(
    path.join(raiz, 'site.webmanifest'),
    JSON.stringify(
      {
        name: cfg.negocio.nome.valor,
        short_name: cfg.negocio.nomeCurto,
        start_url: './',
        display: 'browser',
        background_color: '#fff5f2',
        theme_color: cfg.site.corTema,
        icons: [
          { src: 'assets/img/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
          { src: 'assets/img/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      null,
      2
    )
  );
  await writeFile(path.join(raiz, '.nojekyll'), '');

  const pendentes = (await importarFresco(path.join(raiz, 'scripts/pendencias.mjs'))).listarPendencias(cfg);
  console.log(
    `✔ Site gerado em modo ${modo === 'publico' ? 'PÚBLICO' : 'DEMONSTRAÇÃO'} (${Date.now() - inicio} ms)` +
      `\n  Seções no menu: ${menu.map((m) => m.rotulo).join(', ') || '—'}` +
      `\n  Fotos processadas: ${Object.keys(mapa).length}${sharp ? '' : ' (sem sharp)'} · CSS/JS ${esbuild ? 'minificados' : 'sem minificação (esbuild ausente)'}` +
      `\n  Informações pendentes: ${pendentes.length} (veja com: npm run pendencias)`
  );
  avisos.forEach((a) => console.warn(`  ⚠ ${a}`));
}

await build();

if (assistir) {
  let timer;
  console.log('Observando alterações em src/ …');
  watch(src, { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => build().catch((e) => console.error('✖ Erro no build:', e.message)), 150);
  });
}

