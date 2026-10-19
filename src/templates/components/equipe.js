import { esc } from '../helpers.js';

export const equipeMeta = { id: 'equipe', rotulo: 'Equipe' };

/** Equipe: aparece somente quando houver profissionais cadastrados na config. */
export function equipe(ctx) {
  const e = ctx.cfg.equipe;
  const pessoas = ctx.filtrar(e.pessoas);
  if (!pessoas.length) return '';

  return `<section class="secao equipe" id="${equipeMeta.id}" aria-labelledby="equipe-titulo">
  <h2 class="titulo-secao" id="equipe-titulo">${esc(e.titulo)}</h2>
  <ul class="equipe__lista">
    ${pessoas
      .map(
        (p) => `<li class="pessoa">
      ${ctx.imagem(p.foto, { classe: 'pessoa__foto', sizes: '(min-width: 960px) 22vw, 60vw' })}
      <h3 class="pessoa__nome">${esc(p.nome)} ${ctx.selo(p)}</h3>
      ${p.funcao ? `<p class="pessoa__funcao">${esc(p.funcao)}</p>` : ''}
      ${p.texto ? `<p>${esc(p.texto)}</p>` : ''}
    </li>`
      )
      .join('\n    ')}
  </ul>
</section>`;
}
