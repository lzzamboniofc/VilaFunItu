import { esc } from './helpers.js';

/** Dados estruturados schema.org — somente informações confirmadas. */
export function schema(ctx) {
  const { n, cfg } = ctx;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${cfg.site.url}#negocio`,
    name: n.nome.valor,
    description: n.proposta.valor,
    url: cfg.site.url,
    image: `${cfg.site.url}assets/img/og.png`,
    areaServed: { '@type': 'City', name: n.cidade.valor },
    address: {
      '@type': 'PostalAddress',
      addressLocality: n.cidade.valor,
      addressRegion: n.cidade.uf,
      addressCountry: 'BR',
    },
    sameAs: cfg.redes.filter((r) => r.confirmado).map((r) => r.url),
  };
  if (ctx.enderecoValido()) {
    const e = n.endereco;
    data.address.streetAddress = [e.logradouro, e.numero, e.complemento].filter(Boolean).join(', ');
    if (e.cep) data.address.postalCode = e.cep;
  }
  if (n.telefone.confirmado && n.telefone.valor) data.telephone = n.telefone.valor;
  if (n.email.confirmado && n.email.valor) data.email = n.email.valor;
  if (n.logo.confirmado && n.logo.arquivo) data.logo = `${cfg.site.url}assets/img/${n.logo.arquivo}`;
  return JSON.stringify(data);
}

/** Documento HTML completo. */
export function documento(ctx, { titulo, descricao, caminho = '', corpo, base = '', indexar = true, classeBody = '', versao }) {
  const { cfg } = ctx;
  const url = cfg.site.url + caminho;
  const robots = indexar && !ctx.demo ? 'index, follow' : 'noindex, follow';
  const v = versao ? `?v=${versao}` : '';

  return `<!doctype html>
<html lang="${cfg.site.idioma}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${base ? `<base href="${esc(base)}">` : ''}
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
<meta name="robots" content="${robots}">
<link rel="canonical" href="${esc(url)}">
<meta name="theme-color" content="${esc(cfg.site.corTema)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${esc(ctx.n.nome.valor)}">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(cfg.site.url)}assets/img/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(ctx.n.nome.valor)} — ${esc(ctx.n.proposta.valor)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="icon" href="assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
<link rel="preload" href="assets/fonts/lora-variable.woff" as="font" type="font/woff" crossorigin>
<link rel="stylesheet" href="assets/css/site.css${v}">
<script type="application/ld+json">${schema(ctx)}</script>
<script>document.documentElement.classList.add('js')</script>
</head>
<body class="${ctx.demo ? 'modo-demo ' : ''}${classeBody}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${corpo}
<script src="assets/js/site.js${v}" defer></script>
</body>
</html>
`;
}
