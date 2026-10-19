import { esc } from '../helpers.js';

export const sobreMeta = { id: 'proposta', rotulo: 'A proposta' };

export function sobre(ctx) {
  const s = ctx.cfg.sobre;
  const paragrafos = ctx.filtrar(s.paragrafos);
  if (!paragrafos.length) return '';

  const fotos = ctx.cfg.fotos.sobre
    .map((f, i) =>
      ctx.imagem(f, {
        classe: `sobre__foto sobre__foto--${i + 1}`,
        sizes: i === 0 ? '(min-width: 960px) 30vw, 70vw' : '(min-width: 960px) 20vw, 46vw',
      })
    )
    .filter(Boolean)
    .join('');

  return `<section class="secao sobre${fotos ? '' : ' sobre--sem-fotos'}" id="${sobreMeta.id}" aria-labelledby="sobre-titulo">
  <div class="sobre__texto">
    <h2 class="titulo-secao" id="sobre-titulo">${esc(s.titulo)}</h2>
    ${paragrafos
      .map(
        (p, i) =>
          `<p class="${i === 0 ? 'sobre__abertura' : ''}${p.confirmado ? '' : ' pendente'}">${esc(p.texto)} ${ctx.selo(p)}</p>`
      )
      .join('\n    ')}
  </div>
  ${fotos ? `<div class="sobre__fotos">${fotos}</div>` : ''}
</section>`;
}
