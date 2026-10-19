import { esc } from '../helpers.js';

export const experienciaMeta = { id: 'experiencia', rotulo: 'Experiência' };

/** Seção editorial em fundo escuro, com blocos alternados de foto e texto. */
export function experiencia(ctx) {
  const e = ctx.cfg.experiencia;
  const blocos = ctx.filtrar(e.blocos);
  if (!blocos.length) return '';

  const html = blocos
    .map((b, i) => {
      const foto = ctx.imagem(b.foto, { classe: 'exp__foto', sizes: '(min-width: 960px) 44vw, 100vw' });
      return `<article class="exp${i % 2 ? ' exp--inverso' : ''}${foto ? '' : ' exp--sem-foto'}">
      ${foto ? `<div class="exp__midia">${foto}</div>` : ''}
      <div class="exp__texto">
        <h3 class="exp__titulo">${esc(b.titulo)} ${ctx.selo(b)}</h3>
        <p>${esc(b.texto)}</p>
      </div>
    </article>`;
    })
    .join('\n');

  return `<section class="secao secao--escura experiencia" id="${experienciaMeta.id}" aria-labelledby="exp-titulo">
  <h2 class="titulo-secao" id="exp-titulo">${esc(e.titulo)}</h2>
  <div class="exp__lista">
    ${html}
  </div>
</section>`;
}
