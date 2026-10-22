/**
 * Gera ilustrações FICTÍCIAS (vetoriais, na paleta do site) para ocupar os
 * espaços de imagem enquanto não houver fotos reais do Villa Fun.
 *
 *   npm run ilustracoes   (requer o pacote "sharp")
 *
 * Saída: src/images/ilustracao-*.jpg — o build converte para WebP.
 * Para usar fotos reais, coloque os arquivos em src/images e troque os nomes em src/config.js.
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const destino = path.join(raiz, 'src/images');

const C = {
  leite: '#fff5f2',
  leite2: '#fbe4de',
  rosa: '#f6c3c9',
  ameixa: '#3b1f3a',
  ameixa2: '#5e3f5b',
  morango: '#e0485f',
  morangoEsc: '#b3263f',
  pistache: '#e1edd5',
  pistacheMed: '#b9d3a4',
  pistacheForte: '#2f5a46',
  manteiga: '#ffd877',
  manteigaEsc: '#f2b84b',
  massa: '#f6d3a1',
  chocolate: '#5a3226',
  chocolateEsc: '#3d2019',
  dourado: '#e3a24a',
  douradoEsc: '#c27f2c',
  madeira: '#d9a47a',
};

/* ---------- utilitários ---------- */
const rng = (s) => () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
const f = (n) => Math.round(n * 10) / 10;

const defs = () => `<defs>
  <pattern id="xadrez" width="56" height="56" patternUnits="userSpaceOnUse">
    <rect width="56" height="56" fill="${C.leite}"/>
    <rect width="28" height="56" fill="${C.morango}" fill-opacity=".5"/>
    <rect width="56" height="28" fill="${C.morango}" fill-opacity=".5"/>
  </pattern>
  <pattern id="xadrezP" width="40" height="40" patternUnits="userSpaceOnUse">
    <rect width="40" height="40" fill="${C.leite}"/>
    <rect width="20" height="40" fill="${C.pistacheForte}" fill-opacity=".35"/>
    <rect width="40" height="20" fill="${C.pistacheForte}" fill-opacity=".35"/>
  </pattern>
  <pattern id="listras" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
    <rect width="24" height="24" fill="${C.manteiga}"/>
    <rect width="12" height="24" fill="${C.morango}"/>
  </pattern>
  <pattern id="poa" width="36" height="36" patternUnits="userSpaceOnUse">
    <rect width="36" height="36" fill="${C.pistacheMed}"/>
    <circle cx="9" cy="9" r="5" fill="${C.leite}"/>
    <circle cx="27" cy="27" r="5" fill="${C.leite}"/>
  </pattern>
  <radialGradient id="brilhoBrig" cx=".35" cy=".3" r=".75">
    <stop offset="0" stop-color="#7a4636"/><stop offset="1" stop-color="${C.chocolateEsc}"/>
  </radialGradient>
  <radialGradient id="brilhoCox" cx=".4" cy=".3" r=".8">
    <stop offset="0" stop-color="#f3c06d"/><stop offset="1" stop-color="${C.douradoEsc}"/>
  </radialGradient>
  <linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#cfe6f2"/><stop offset="1" stop-color="${C.leite}"/>
  </linearGradient>
  <filter id="sombra" x="-20%" y="-20%" width="140%" height="160%">
    <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="${C.ameixa}" flood-opacity=".18"/>
  </filter>
</defs>`;

/** Fio com bandeirinhas ao longo de uma curva. */
function bandeirinhas(x1, y1, x2, y2, queda, n, cores, larg = 56, alt = 70) {
  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2 + queda * 2;
  const pt = (t) => [(1 - t) ** 2 * x1 + 2 * (1 - t) * t * cx + t * t * x2, (1 - t) ** 2 * y1 + 2 * (1 - t) * t * cy + t * t * y2];
  let s = `<path d="M${x1},${y1} Q${cx},${cy} ${x2},${y2}" fill="none" stroke="${C.ameixa}" stroke-width="3"/>`;
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n;
    const [x, y] = pt(t);
    s += `<path d="M${f(x - larg / 2)},${f(y)} L${f(x + larg / 2)},${f(y)} L${f(x)},${f(y + alt)} Z" fill="${cores[i % cores.length]}"/>`;
  }
  return s;
}

/** Balão com nó, brilho e cordão. */
function balao(cx, cy, rx, cor, para, inclinacao = 0) {
  const ry = rx * 1.18;
  const [tx, ty] = para;
  const baseY = cy + ry;
  return `<g>
    <path d="M${cx},${baseY} C${cx + 30},${baseY + (ty - baseY) * 0.35} ${tx - 30},${baseY + (ty - baseY) * 0.6} ${tx},${ty}" fill="none" stroke="${C.ameixa2}" stroke-width="2.5"/>
    <g transform="rotate(${inclinacao} ${cx} ${cy})">
      <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${cor}"/>
      <path d="M${cx - 10},${baseY + 12} L${cx + 10},${baseY + 12} L${cx},${baseY - 2} Z" fill="${cor}"/>
      <ellipse cx="${cx - rx * 0.38}" cy="${cy - ry * 0.4}" rx="${rx * 0.16}" ry="${ry * 0.28}" fill="#fff" fill-opacity=".38" transform="rotate(-25 ${cx - rx * 0.38} ${cy - ry * 0.4})"/>
    </g>
  </g>`;
}

/** Cobertura escorrendo sobre um andar de bolo. */
function cobertura(x, y, w, prof, n, cor, r) {
  let d = `M${x},${y} H${x + w} V${y + prof * 0.5}`;
  const passo = w / n;
  for (let i = n; i > 0; i--) {
    const x0 = x + i * passo;
    const x1 = x0 - passo;
    const fundo = y + prof * (0.7 + r() * 0.9);
    d += ` C${f(x0)},${f(fundo)} ${f(x1)},${f(fundo)} ${f(x1)},${f(y + prof * 0.5)}`;
  }
  return `<path d="${d} Z" fill="${cor}"/>`;
}

function confeitos(x, y, w, h, n, r, cores) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const px = x + r() * w;
    const py = y + r() * h;
    s += `<rect x="${f(px)}" y="${f(py)}" width="14" height="5" rx="2.5" fill="${cores[i % cores.length]}" transform="rotate(${f(r() * 180)} ${f(px + 7)} ${f(py + 2.5)})"/>`;
  }
  return s;
}

function vela(x, yBase, h, cor) {
  return `<g>
    <rect x="${x - 6}" y="${yBase - h}" width="12" height="${h}" rx="3" fill="${C.leite}"/>
    <path d="M${x - 6},${yBase - h * 0.75} l12,-10 v8 l-12,10 Z M${x - 6},${yBase - h * 0.35} l12,-10 v8 l-12,10 Z" fill="${cor}"/>
    <path d="M${x},${yBase - h - 38} C${x + 14},${yBase - h - 18} ${x + 10},${yBase - h - 4} ${x},${yBase - h - 4} C${x - 10},${yBase - h - 4} ${x - 14},${yBase - h - 18} ${x},${yBase - h - 38} Z" fill="${C.manteigaEsc}"/>
    <path d="M${x},${yBase - h - 26} C${x + 6},${yBase - h - 16} ${x + 5},${yBase - h - 8} ${x},${yBase - h - 8} C${x - 5},${yBase - h - 8} ${x - 6},${yBase - h - 16} ${x},${yBase - h - 26} Z" fill="${C.manteiga}"/>
  </g>`;
}

/** Bolo de dois andares em um suporte. */
function bolo(cx, base, esc, r, { velas = true } = {}) {
  const s = (v) => v * esc;
  const w1 = s(300), h1 = s(130), w2 = s(210), h2 = s(110);
  const y1 = base - s(26) - h1;
  const y2 = y1 - h2;
  let g = `<g filter="url(#sombra)">
    <rect x="${cx - s(28)}" y="${base - s(26)}" width="${s(56)}" height="${s(70)}" fill="${C.leite}"/>
    <ellipse cx="${cx}" cy="${base + s(44)}" rx="${s(110)}" ry="${s(18)}" fill="${C.leite}"/>
    <ellipse cx="${cx}" cy="${base - s(22)}" rx="${s(200)}" ry="${s(22)}" fill="${C.leite}"/>
    <rect x="${cx - w1 / 2}" y="${y1}" width="${w1}" height="${h1}" rx="${s(14)}" fill="${C.rosa}"/>
    ${cobertura(cx - w1 / 2, y1, w1, s(36), 7, C.morango, r)}
    <rect x="${cx - w1 / 2}" y="${y1 + h1 - s(22)}" width="${w1}" height="${s(14)}" fill="${C.leite}" fill-opacity=".7"/>
    <rect x="${cx - w2 / 2}" y="${y2}" width="${w2}" height="${h2 + s(4)}" rx="${s(14)}" fill="${C.massa}"/>
    ${cobertura(cx - w2 / 2, y2, w2, s(30), 5, C.leite, r)}
    ${confeitos(cx - w2 / 2 + s(14), y2 + s(48), w2 - s(36), h2 - s(64), 16, r, [C.morango, C.pistacheForte, C.manteigaEsc, C.ameixa2])}
    ${confeitos(cx - w1 / 2 + s(16), y1 + s(56), w1 - s(40), h1 - s(92), 18, r, [C.leite, C.manteiga, C.pistacheMed])}
  </g>`;
  if (velas) g += vela(cx - s(50), y2 + s(4), s(70), C.morango) + vela(cx, y2 + s(4), s(84), C.pistacheForte) + vela(cx + s(50), y2 + s(4), s(70), C.ameixa2);
  // Morangos no topo
  g += `<circle cx="${cx - s(80)}" cy="${y2 + s(2)}" r="${s(14)}" fill="${C.morangoEsc}"/><circle cx="${cx + s(84)}" cy="${y2 + s(2)}" r="${s(14)}" fill="${C.morangoEsc}"/>`;
  return g;
}

/** Docinho visto de lado: forminha + bolinha. */
function docinho(x, y, esc, corForma, corDoce) {
  const s = (v) => v * esc;
  return `<path d="M${x - s(24)},${y - s(18)} L${x + s(24)},${y - s(18)} L${x + s(18)},${y} L${x - s(18)},${y} Z" fill="${corForma}"/>
    <circle cx="${x}" cy="${y - s(32)}" r="${s(22)}" fill="${corDoce}"/>
    <circle cx="${x - s(7)}" cy="${y - s(40)}" r="${s(5)}" fill="#fff" fill-opacity=".35"/>`;
}

/** Forminha de papel vista de cima (bordas onduladas). */
function forminha(cx, cy, r, cor) {
  const n = 18;
  let d = '';
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    if (i === 0) d += `M${f(x)},${f(y)}`;
    else {
      const am = ((i - 0.5) / n) * Math.PI * 2;
      d += ` Q${f(cx + Math.cos(am) * r * 1.12)},${f(cy + Math.sin(am) * r * 1.12)} ${f(x)},${f(y)}`;
    }
  }
  return `<path d="${d} Z" fill="${cor}"/><circle cx="${cx}" cy="${cy}" r="${r * 0.8}" fill="#000" fill-opacity=".08"/>`;
}

function brigadeiro(cx, cy, r, rnd, corGranulado) {
  let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#brilhoBrig)"/>`;
  for (let i = 0; i < 14; i++) {
    const a = rnd() * Math.PI * 2;
    const d = Math.sqrt(rnd()) * r * 0.85;
    const x = cx + Math.cos(a) * d;
    const y = cy + Math.sin(a) * d;
    s += `<rect x="${f(x)}" y="${f(y)}" width="${f(r * 0.28)}" height="${f(r * 0.1)}" rx="${f(r * 0.05)}" fill="${corGranulado}" transform="rotate(${f(rnd() * 180)} ${f(x)} ${f(y)})"/>`;
  }
  return s;
}

function coxinha(cx, cy, esc, rot, rnd) {
  const s = (v) => v * esc;
  let g = `<g transform="rotate(${rot} ${cx} ${cy})">
    <path d="M${cx},${cy - s(70)} C${cx + s(20)},${cy - s(40)} ${cx + s(58)},${cy} ${cx + s(52)},${cy + s(30)} C${cx + s(44)},${cy + s(64)} ${cx - s(44)},${cy + s(64)} ${cx - s(52)},${cy + s(30)} C${cx - s(58)},${cy} ${cx - s(20)},${cy - s(40)} ${cx},${cy - s(70)} Z" fill="url(#brilhoCox)"/>`;
  for (let i = 0; i < 22; i++) {
    const x = cx + (rnd() - 0.5) * s(80);
    const y = cy + (rnd() - 0.3) * s(80);
    g += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(s(2.5))}" fill="${C.douradoEsc}" fill-opacity=".55"/>`;
  }
  return g + '</g>';
}

function presente(x, y, w, h, corCaixa, corFita) {
  const tampa = h * 0.2;
  return `<g filter="url(#sombra)">
    <rect x="${x}" y="${y + tampa * 0.6}" width="${w}" height="${h - tampa * 0.6}" fill="${corCaixa}"/>
    <rect x="${x - w * 0.05}" y="${y}" width="${w * 1.1}" height="${tampa}" rx="4" fill="${corCaixa}"/>
    <rect x="${x - w * 0.05}" y="${y + tampa - 6}" width="${w * 1.1}" height="6" fill="#000" fill-opacity=".08"/>
    <rect x="${x + w / 2 - w * 0.07}" y="${y}" width="${w * 0.14}" height="${h}" fill="${corFita}"/>
    <ellipse cx="${x + w / 2 - w * 0.17}" cy="${y - h * 0.08}" rx="${w * 0.2}" ry="${h * 0.11}" fill="none" stroke="${corFita}" stroke-width="${w * 0.07}" transform="rotate(-20 ${x + w / 2 - w * 0.17} ${y - h * 0.08})"/>
    <ellipse cx="${x + w / 2 + w * 0.17}" cy="${y - h * 0.08}" rx="${w * 0.2}" ry="${h * 0.11}" fill="none" stroke="${corFita}" stroke-width="${w * 0.07}" transform="rotate(20 ${x + w / 2 + w * 0.17} ${y - h * 0.08})"/>
    <circle cx="${x + w / 2}" cy="${y - 2}" r="${w * 0.07}" fill="${corFita}"/>
  </g>`;
}

function chapeu(cx, base, w, h, padrao, pompom, rot = 0) {
  return `<g transform="rotate(${rot} ${cx} ${base})" filter="url(#sombra)">
    <path d="M${cx - w / 2},${base} L${cx},${base - h} L${cx + w / 2},${base} Q${cx},${base + w * 0.16} ${cx - w / 2},${base} Z" fill="url(#${padrao})"/>
    <path d="M${cx - w / 2},${base} Q${cx},${base + w * 0.16} ${cx + w / 2},${base}" fill="none" stroke="${C.leite}" stroke-width="10"/>
    <circle cx="${cx}" cy="${base - h}" r="${w * 0.12}" fill="${pompom}"/>
  </g>`;
}

function confete(w, h, n, r, cores) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = r() * w;
    const y = r() * h;
    const cor = cores[i % cores.length];
    s += i % 3 === 0 ? `<circle cx="${f(x)}" cy="${f(y)}" r="${f(4 + r() * 6)}" fill="${cor}"/>` : `<rect x="${f(x)}" y="${f(y)}" width="${f(10 + r() * 12)}" height="7" rx="3" fill="${cor}" transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})"/>`;
  }
  return s;
}

function planta(x, base, esc) {
  const s = (v) => v * esc;
  let folhas = '';
  const angs = [-60, -35, -12, 12, 35, 60, -48, 48, 0];
  angs.forEach((a, i) => {
    const l = s(90 + (i % 3) * 22);
    folhas += `<ellipse cx="${x}" cy="${base - s(70) - l / 2}" rx="${s(20)}" ry="${l / 2}" fill="${i % 2 ? C.pistacheForte : '#4f7d5f'}" transform="rotate(${a} ${x} ${base - s(70)})"/>`;
  });
  return `${folhas}<path d="M${x - s(48)},${base - s(80)} H${x + s(48)} L${x + s(38)},${base} H${x - s(38)} Z" fill="${C.morango}"/><rect x="${x - s(54)}" y="${base - s(92)}" width="${s(108)}" height="${s(18)}" rx="${s(4)}" fill="${C.morangoEsc}"/>`;
}

/** Cadeira com encosto em arco (vista frontal). */
function cadeira(x, base, esc, cor) {
  const s = (v) => v * esc;
  return `<g fill="${cor}">
    <path d="M${x - s(50)},${base - s(110)} V${base - s(200)} A${s(50)},${s(50)} 0 0 1 ${x + s(50)},${base - s(200)} V${base - s(110)} H${x + s(36)} V${base - s(196)} A${s(36)},${s(36)} 0 0 0 ${x - s(36)},${base - s(196)} V${base - s(110)} Z"/>
    <rect x="${x - s(56)}" y="${base - s(118)}" width="${s(112)}" height="${s(16)}" rx="${s(5)}"/>
    <rect x="${x - s(50)}" y="${base - s(110)}" width="${s(10)}" height="${s(110)}"/>
    <rect x="${x + s(40)}" y="${base - s(110)}" width="${s(10)}" height="${s(110)}"/>
  </g>`;
}

/* ---------- cenas ---------- */
const cenas = {
  /** Mesa de festa com bolo, docinhos e balões (retrato). */
  mesa(W = 800, H = 1000) {
    const r = rng(11);
    let s = `<rect width="${W}" height="${H}" fill="${C.leite2}"/>`;
    s += `<circle cx="${W * 0.5}" cy="${H * 0.46}" r="${W * 0.44}" fill="${C.leite}"/>`;
    s += bandeirinhas(-20, 120, W + 20, 120, 40, 9, [C.morango, C.manteiga, C.pistacheMed, C.ameixa2]);
    s += balao(110, 330, 70, C.morango, [150, 690], -8) + balao(200, 250, 58, C.manteiga, [160, 690], 6);
    s += balao(690, 320, 70, C.pistacheMed, [650, 690], 8) + balao(610, 240, 54, C.ameixa2, [645, 690], -6);
    s += `<rect x="0" y="${H * 0.72}" width="${W}" height="${H * 0.28}" fill="url(#xadrez)"/>`;
    s += `<rect x="0" y="${H * 0.72}" width="${W}" height="10" fill="${C.morangoEsc}" fill-opacity=".35"/>`;
    s += bolo(W / 2, H * 0.72 - 50, 0.95, r);
    // pratinhos de docinhos
    for (const [px, cor] of [[120, C.manteiga], [680, C.pistache]]) {
      s += `<ellipse cx="${px}" cy="${H * 0.72 - 6}" rx="95" ry="16" fill="${C.leite}" filter="url(#sombra)"/>`;
      s += docinho(px - 46, H * 0.72 - 14, 0.9, cor, C.chocolate) + docinho(px, H * 0.72 - 14, 0.9, cor, C.morangoEsc) + docinho(px + 46, H * 0.72 - 14, 0.9, cor, C.chocolate);
      s += docinho(px - 23, H * 0.72 - 50, 0.9, cor, C.leite) + docinho(px + 23, H * 0.72 - 50, 0.9, cor, C.chocolate);
    }
    return { W, H, s };
  },

  /** Close do bolo com velas acesas e confetes (retrato). */
  bolo(W = 800, H = 1000) {
    const r = rng(23);
    let s = `<rect width="${W}" height="${H}" fill="${C.manteiga}"/>`;
    s += confete(W, H * 0.55, 46, r, [C.morango, C.leite, C.pistacheForte, C.ameixa2]);
    s += `<rect x="0" y="${H * 0.8}" width="${W}" height="${H * 0.2}" fill="${C.manteigaEsc}"/>`;
    s += bolo(W / 2, H * 0.8 - 60, 1.45, r);
    return { W, H, s };
  },

  /** Buquê de balões amarrado (retrato). */
  baloes(W = 800, H = 1000) {
    let s = `<rect width="${W}" height="${H}" fill="${C.pistache}"/>`;
    s += `<path d="M0,${H * 0.86} Q${W * 0.5},${H * 0.8} ${W},${H * 0.86} V${H} H0 Z" fill="${C.pistacheMed}"/>`;
    const no = [W * 0.5, H * 0.8];
    const lista = [
      [W * 0.28, 300, 100, C.morango, -10],
      [W * 0.52, 210, 110, C.manteiga, 4],
      [W * 0.76, 320, 96, C.ameixa2, 10],
      [W * 0.4, 470, 92, C.leite, -4],
      [W * 0.65, 500, 88, C.morangoEsc, 8],
    ];
    lista.forEach(([x, y, rx, cor, inc]) => (s += balao(x, y, rx, cor, no, inc)));
    s += `<path d="M${no[0]},${no[1]} c-30,20 -36,52 -18,70 M${no[0]},${no[1]} c26,24 30,50 14,72" fill="none" stroke="${C.morango}" stroke-width="6" stroke-linecap="round"/>`;
    s += `<circle cx="${no[0]}" cy="${no[1]}" r="10" fill="${C.morango}"/>`;
    return { W, H, s };
  },

  /** Salão com janela em arco, mesa posta e cadeiras (retrato). */
  espaco(W = 900, H = 1200) {
    let s = `<rect width="${W}" height="${H}" fill="${C.leite2}"/>`;
    // janela em arco
    const jx = W * 0.2, jw = W * 0.6, jt = 170, jb = 760;
    s += `<path d="M${jx - 24},${jb} V${jt + jw / 2} A${jw / 2 + 24},${jw / 2 + 24} 0 0 1 ${jx + jw + 24},${jt + jw / 2} V${jb} Z" fill="${C.leite}"/>`;
    s += `<path d="M${jx},${jb} V${jt + jw / 2} A${jw / 2},${jw / 2} 0 0 1 ${jx + jw},${jt + jw / 2} V${jb} Z" fill="url(#ceu)"/>`;
    s += `<circle cx="${jx + jw * 0.72}" cy="${jt + jw * 0.42}" r="46" fill="${C.manteiga}"/>`;
    s += `<path d="M${jx},${jb - 160} Q${jx + jw * 0.35},${jb - 260} ${jx + jw},${jb - 190} V${jb} H${jx} Z" fill="${C.pistacheMed}"/>`;
    s += `<circle cx="${jx + jw * 0.25}" cy="${jb - 250}" r="70" fill="#4f7d5f"/><rect x="${jx + jw * 0.25 - 8}" y="${jb - 200}" width="16" height="70" fill="${C.chocolate}"/>`;
    s += `<rect x="${jx + jw / 2 - 6}" y="${jt}" width="12" height="${jb - jt}" fill="${C.leite}"/><rect x="${jx}" y="${jt + jw / 2 + 40}" width="${jw}" height="12" fill="${C.leite}"/>`;
    s += bandeirinhas(40, 120, W - 40, 120, 30, 10, [C.morango, C.manteiga, C.pistacheForte, C.leite], 50, 62);
    // cadeiras atrás da mesa
    for (const [x, cor] of [[W * 0.22, C.ameixa], [W * 0.5, C.morango], [W * 0.78, C.ameixa]]) s += cadeira(x, 900, 1.15, cor);
    // mesa
    s += `<rect x="40" y="840" width="${W - 80}" height="40" fill="url(#xadrezP)"/>`;
    s += `<path d="M40,880 H${W - 40} L${W - 70},1060 H70 Z" fill="url(#xadrezP)"/>`;
    s += `<rect x="40" y="836" width="${W - 80}" height="8" fill="${C.pistacheForte}" fill-opacity=".4"/>`;
    s += `<rect x="0" y="1060" width="${W}" height="${H - 1060}" fill="${C.madeira}"/>`;
    // itens sobre a mesa
    s += `<ellipse cx="${W * 0.5}" cy="838" rx="110" ry="14" fill="${C.leite}"/>`;
    s += docinho(W * 0.5 - 50, 834, 1, C.manteiga, C.chocolate) + docinho(W * 0.5, 834, 1, C.manteiga, C.morangoEsc) + docinho(W * 0.5 + 50, 834, 1, C.manteiga, C.chocolate);
    s += `<rect x="${W * 0.18}" y="770" width="40" height="66" rx="8" fill="${C.leite}" fill-opacity=".85"/><circle cx="${W * 0.18 + 20}" cy="760" r="24" fill="${C.morango}"/><circle cx="${W * 0.18 + 6}" cy="745" r="18" fill="${C.manteiga}"/>`;
    s += `<rect x="${W * 0.76}" y="776" width="60" height="60" rx="10" fill="${C.manteiga}"/><rect x="${W * 0.76 + 24}" y="776" width="12" height="60" fill="${C.morango}"/>`;
    s += planta(W - 70, 1080, 0.9);
    return { W, H, s };
  },

  /** Brigadeiros vistos de cima (quadrado). */
  brigadeiros(W = 1000, H = 1000) {
    const r = rng(37);
    let s = `<rect width="${W}" height="${H}" fill="${C.ameixa}"/>`;
    s += `<circle cx="${W / 2}" cy="${H / 2}" r="${W * 0.43}" fill="${C.madeira}"/><circle cx="${W / 2}" cy="${H / 2}" r="${W * 0.4}" fill="#e3b48c"/>`;
    const formas = [C.morango, C.manteiga, C.pistacheMed, C.leite];
    const pos = [];
    for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) if (i * i + j * j <= 5) pos.push([W / 2 + i * 150 + (j % 2 ? 0 : 0), H / 2 + j * 150]);
    pos.forEach(([x, y], k) => {
      s += forminha(x, y, 66, formas[k % formas.length]);
      s += k % 5 === 2
        ? `<circle cx="${x}" cy="${y}" r="46" fill="${C.leite}"/><circle cx="${x - 12}" cy="${y - 14}" r="10" fill="#fff"/>` + confeitos(x - 36, y - 30, 70, 60, 8, r, [C.morango, C.pistacheForte, C.manteigaEsc])
        : brigadeiro(x, y, 46, r, k % 3 ? C.chocolateEsc : C.morango);
    });
    return { W, H, s };
  },

  /** Salgados: coxinhas e pastéis em travessa (quadrado). */
  salgados(W = 1000, H = 1000) {
    const r = rng(53);
    let s = `<rect width="${W}" height="${H}" fill="url(#xadrezP)"/>`;
    s += `<rect x="${W * 0.08}" y="${H * 0.12}" width="${W * 0.84}" height="${H * 0.76}" rx="60" fill="${C.leite}" filter="url(#sombra)"/>`;
    s += `<rect x="${W * 0.12}" y="${H * 0.16}" width="${W * 0.76}" height="${H * 0.68}" rx="44" fill="none" stroke="${C.leite2}" stroke-width="6"/>`;
    const cox = [[0.27, 0.32], [0.45, 0.3], [0.63, 0.33], [0.32, 0.53], [0.5, 0.52], [0.68, 0.55], [0.28, 0.73], [0.46, 0.72]];
    cox.forEach(([x, y], i) => (s += coxinha(W * x, H * y, 1.05, (i % 3) * 14 - 14, r)));
    // pastéis (meia-lua)
    for (const [x, y, rot] of [[0.7, 0.75, -20], [0.78, 0.38, 30]]) {
      const cx = W * x, cy = H * y;
      s += `<g transform="rotate(${rot} ${cx} ${cy})"><path d="M${cx - 70},${cy} A70,70 0 0 1 ${cx + 70},${cy} Z" fill="#f0b45e"/>`;
      for (let i = 0; i <= 10; i++) s += `<circle cx="${f(cx - 66 + i * 13.2)}" cy="${cy}" r="6" fill="${C.douradoEsc}" fill-opacity=".7"/>`;
      s += '</g>';
    }
    s += `<circle cx="${W * 0.86}" cy="${H * 0.14}" r="56" fill="${C.morango}"/><circle cx="${W * 0.86}" cy="${H * 0.14}" r="40" fill="${C.morangoEsc}"/>`;
    return { W, H, s };
  },

  /** Lembrancinhas: caixinhas de presente (quadrado). */
  presentes(W = 1000, H = 1000) {
    const r = rng(71);
    let s = `<rect width="${W}" height="${H}" fill="${C.rosa}"/>`;
    s += confete(W, H * 0.5, 40, r, [C.leite, C.manteiga, C.ameixa2, C.pistacheForte]);
    s += `<rect x="0" y="${H * 0.78}" width="${W}" height="${H * 0.22}" fill="${C.leite2}"/>`;
    s += presente(W * 0.14, H * 0.5, 260, 240, C.ameixa, C.manteiga);
    s += presente(W * 0.56, H * 0.42, 300, 320, C.manteiga, C.morango);
    s += presente(W * 0.38, H * 0.62, 220, 170, C.pistacheMed, C.ameixa);
    return { W, H, s };
  },

  /** Chapéus de festa e confetes (retrato). */
  chapeus(W = 900, H = 1100) {
    const r = rng(89);
    let s = `<rect width="${W}" height="${H}" fill="${C.leite}"/>`;
    s += confete(W, H, 70, r, [C.morango, C.manteigaEsc, C.pistacheForte, C.ameixa2]);
    s += `<rect x="0" y="${H * 0.78}" width="${W}" height="${H * 0.22}" fill="url(#xadrez)"/>`;
    s += chapeu(W * 0.27, H * 0.78, 230, 360, 'listras', C.morango, -12);
    s += chapeu(W * 0.73, H * 0.78, 230, 380, 'poa', C.manteiga, 10);
    s += chapeu(W * 0.5, H * 0.8, 260, 440, 'xadrez', C.ameixa, 0);
    return { W, H, s };
  },
};

/** Arquivos gerados e cena usada. */
export const ILUSTRACOES = {
  'ilustracao-mesa.jpg': 'mesa',
  'ilustracao-bolo.jpg': 'bolo',
  'ilustracao-baloes.jpg': 'baloes',
  'ilustracao-espaco.jpg': 'espaco',
  'ilustracao-brigadeiros.jpg': 'brigadeiros',
  'ilustracao-salgados.jpg': 'salgados',
  'ilustracao-presentes.jpg': 'presentes',
  'ilustracao-chapeus.jpg': 'chapeus',
};

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('O pacote "sharp" não está instalado. Rode `npm install` e tente de novo.');
  process.exit(1);
}

await mkdir(destino, { recursive: true });
for (const [arquivo, nome] of Object.entries(ILUSTRACOES)) {
  const { W, H, s } = cenas[nome]();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${defs()}${s}</svg>`;
  await sharp(Buffer.from(svg), { density: 144 * 2 })
    .resize({ width: 1600 })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(destino, arquivo));
  console.log(`  ✔ ${arquivo}`);
}
console.log('Ilustrações fictícias geradas em src/images.');
