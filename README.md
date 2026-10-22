# Villa Fun Itu — site

Site do **Villa Fun Itu**, buffet infantil em Itu (SP) para festas intimistas com gastronomia afetiva.
Publicado pelo GitHub Pages: <https://lzzamboniofc.github.io/VilaFunItu/>

## Como funciona

O site é estático. Um build em Node.js lê `src/config.js`, monta o HTML a partir dos componentes e grava o resultado **na raiz do repositório** — é isso que o GitHub Pages publica (branch `main`, pasta `/ (root)`). Nenhum servidor Node é necessário no site publicado.

```
src/
  config.js            ← TODO o conteúdo editável (textos, contatos, fotos, FAQ…)
  templates/           ← componentes (cabeçalho, hero, serviços, galeria, FAQ, contato…)
  styles/              ← CSS; cores e fontes em styles/tokens.css
  scripts/main.js      ← interações (menu, FAQ, galeria, botão flutuante, mapa)
  images/              ← coloque aqui as fotos reais
  static/              ← favicon, ícones e imagem de compartilhamento
  fonts/               ← Lora e Inter (licença SIL OFL), já otimizadas
scripts/
  build.mjs            ← gera o site
  pendencias.mjs       ← lista o que falta confirmar
  serve.mjs            ← servidor local que simula o GitHub Pages
  gerar-marca.mjs      ← regera favicon e imagem de compartilhamento
  gerar-ilustracoes.mjs← gera as ilustrações fictícias usadas no lugar das fotos
index.html, 404.html, privacidade.html, assets/, sitemap.xml, robots.txt, .nojekyll  ← gerados pelo build
```

## Comandos

```bash
npm install            # opcional: instala sharp (fotos em WebP) e esbuild (minificação)
npm run dev            # build + servidor em http://localhost:4173/VilaFunItu/ com recompilação automática
npm run build          # gera o site no modo definido em src/config.js
npm run build:publico  # força o modo público
npm run build:demo     # força o modo demonstração
npm run pendencias     # lista o conteúdo fictício no ar e o que está oculto até ser confirmado
npm run ilustracoes    # regera as ilustrações fictícias (src/images/ilustracao-*.jpg)
```

Depois do build, faça commit e push dos arquivos gerados para o GitHub Pages atualizar.

## Modo demonstração × modo público

Em `src/config.js`, `modo: 'demonstracao'` ou `modo: 'publico'`.

- **Demonstração** (apresentação comercial): mostra itens pendentes com o selo “A confirmar” e espaços reservados neutros no lugar das fotos. A página fica com `noindex` para não ser indexada pelo Google enquanto não for o site final.
- **Público**: oculta tudo o que não tem `confirmado: true`, esconde seções sem conteúdo (o menu se ajusta sozinho) e libera a indexação.

## Conteúdo fictício (estado atual)

O site está no **modo público**, sem selos “A confirmar”. Para a apresentação, os textos ainda não confirmados foram preenchidos com **textos fictícios** coerentes com a proposta do Villa Fun, e os espaços de foto usam **ilustrações fictícias** geradas por `npm run ilustracoes`.

Esses itens estão marcados com `ficticio: true` em `src/config.js` e aparecem no topo do relatório `npm run pendencias`. Antes de entregar o site como oficial, troque cada um pelo conteúdo real e marque `confirmado: true`.

Dados de contato não confirmados (telefone, WhatsApp, e-mail, endereço, horários) **não** foram inventados: ficam ocultos até serem confirmados. Avaliações e equipe também seguem ocultas — nunca use depoimentos ou pessoas fictícias.

## Atualizar conteúdo

1. Edite o item em `src/config.js`, preencha o valor e marque `confirmado: true`.
2. Fotos: copie o arquivo para `src/images/`, informe o nome em `arquivo` e um texto em `alt`. Com o `sharp` instalado, o build gera versões WebP em 480, 960 e 1600 px.
3. Canal de orçamento: troque `canalPrincipal.url` (hoje, Direct do Instagram provisório) — todos os botões “Consultar data” mudam juntos.
4. Endereço confirmado ativa mapa (carregado só quando o visitante pede), botão “Como chegar” e o endereço nos dados estruturados.
5. Avaliações: apenas reais e verificáveis, com nome como aparece no Google. Sem elas, a seção não aparece em nenhum modo.
6. Cores provisórias: troque em `src/styles/tokens.css` quando houver o manual da marca.

## Domínio próprio

Se usar um domínio (ex.: `villafunitu.com.br`), ajuste `site.url` e `site.basePath: '/'` na config e adicione o arquivo `CNAME`.
