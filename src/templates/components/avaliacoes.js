import { esc } from '../helpers.js';

export const avaliacoesMeta = { id: 'avaliacoes', rotulo: 'Avaliações' };

/**
 * Avaliações reais e verificáveis. Nunca aparecem se não estiverem confirmadas,
 * nem no modo demonstração — depoimentos não podem ser simulados.
 */
export function avaliacoes(ctx) {
  const a = ctx.cfg.avaliacoes;
  const itens = (a.itens || []).filter((i) => i.confirmado === true && i.texto && i.nome);
  if (!itens.length) return '';

  return `<section class="secao avaliacoes" id="${avaliacoesMeta.id}" aria-labelledby="avaliacoes-titulo">
  <h2 class="titulo-secao" id="avaliacoes-titulo">${esc(a.titulo)}</h2>
  <ul class="avaliacoes__lista">
    ${itens
      .map(
        (i) => `<li class="avaliacao">
      <figure>
        <blockquote><p>${esc(i.texto)}</p></blockquote>
        <figcaption>
          <span class="avaliacao__nome">${esc(i.nome)}</span>
          ${i.nota ? `<span class="avaliacao__nota">Nota ${esc(i.nota)} de 5</span>` : ''}
          ${
            i.url
              ? `<a class="avaliacao__origem" href="${esc(i.url)}" target="_blank" rel="noopener">Ver no ${esc(i.origem || 'Google')}</a>`
              : `<span class="avaliacao__origem">${esc(i.origem || 'Google')}</span>`
          }
        </figcaption>
      </figure>
    </li>`
      )
      .join('\n    ')}
  </ul>
</section>`;
}
