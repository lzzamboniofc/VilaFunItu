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


## Revisão de identidade (Desia 2.0)

A prévia foi revisada segundo o Desia 2.0 fornecido para o projeto. O brief está em `docs/brief-desia-villafun.md` e o relatório em `docs/auditoria-desia-2026-11-06.md`.

O comando `npm run auditar` executa verificações locais leves de conteúdo e acessibilidade. Para executar **o Desia 2.0 original**, extraia o ZIP fornecido à parte e use o comando:

```bash
python /caminho/para/desia-2.0/desia.py . --check --json relatorio-desia.json
```

A opção `--check` não altera os arquivos. Caso queira analisar a aparência via navegador, consulte o README original do Desia e abra o site com `npm run dev`. Não foi utilizada a aplicação automática de tokens nem a reescrita por LLM, que poderiam alterar indevidamente a identidade.
