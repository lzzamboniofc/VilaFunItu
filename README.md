# Villa Fun Itu — prévia comercial (não oficial)

Prévia visual independente do Villa Fun Itu. Site demonstrativo, não representa o site oficial do estabelecimento.

Página para apresentação: https://lzzamboniofc.github.io/VilaFunItu/

A prévia possui design responsivo e galeria de ilustrações conceituais. Não há preços, avaliações, agendamento, endereço ou descrição de serviços não confirmados. O aviso de demonstração fica visível e o HTML utiliza meta noindex,nofollow para evitar indexação.

## Editar a prévia

- src/preview/index.html: conteúdo e estrutura.
- src/preview/site.css: design e responsividade.
- src/preview/site.js: menu mobile, animações e visualização da galeria.
- scripts/build-preview.mjs: copia a prévia para a raiz, para GitHub Pages (main /root).

Imagens ilustrativas e fontes otimizadas permanecem em assets/img e assets/fonts.

Comandos:
- npm run build: gera a prévia na raiz.
- npm run build:preview: equivalente.
- npm run dev: gera a prévia e inicia o servidor local.
- npm run build:completo: restaura a geração do site antigo (substitui index.html).
- npm run build:demo: gera a demonstração do site antigo.

O site completo original continua em src/config.js, src/templates, src/styles e scripts/build.mjs. A branch backup/site-completo-antes-da-previa mantém a versão anterior integral.

Antes de entregar qualquer site oficial, substituir as ilustrações por fotografias autorizadas, confirmar dados com a empresa e atualizar identidade, serviços e canais de conversão.
