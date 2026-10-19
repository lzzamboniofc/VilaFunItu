import { esc } from '../helpers.js';

export const galeriaMeta = { id: 'galeria', rotulo: 'Galeria' };

/**
 * Galeria em colunas (preserva o enquadramento original de cada foto)
 * com ampliação em <dialog> — setas, toque e teclado.
 */
export function galeria(ctx) {
  const g = ctx.cfg.galeria;
  const fotos = g.fotos.filter((f) => ctx.temFoto(f) || (ctx.demo && ctx.visivel(f)));
  if (!fotos.length) return '';

  const proporcoesPlaceholder = ['4/5', '1/1', '3/4', '4/3', '4/5', '1/1'];

  const itens = fotos
    .map((f, i) => {
      const legenda = f.legenda || f.alt;
      const midia = ctx.imagem(f, {
        classe: 'galeria__midia',
        sizes: '(min-width: 1100px) 30vw, (min-width: 640px) 45vw, 100vw',
      });
      const real = ctx.temFoto(f);
      const estilo = real ? '' : ` style="--proporcao:${proporcoesPlaceholder[i % proporcoesPlaceholder.length]}"`;
      return `<li class="galeria__item"${estilo}>
      <button class="galeria__botao" type="button" data-galeria-abrir="${i}" aria-label="Ampliar foto: ${esc(legenda)}">
        ${midia}
      </button>
    </li>`;
    })
    .join('\n');

  return `<section class="secao galeria" id="${galeriaMeta.id}" aria-labelledby="galeria-titulo">
  <div class="galeria__intro">
    <h2 class="titulo-secao" id="galeria-titulo">${esc(g.titulo)}</h2>
    <p>${esc(g.texto)}</p>
  </div>
  <ul class="galeria__grade" data-galeria>
    ${itens}
  </ul>
  <dialog class="lightbox" data-lightbox aria-label="Foto ampliada">
    <div class="lightbox__palco" data-lightbox-palco></div>
    <p class="lightbox__legenda" data-lightbox-legenda aria-live="polite"></p>
    <button class="lightbox__btn lightbox__fechar" type="button" data-lightbox-fechar aria-label="Fechar">
      <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
    </button>
    <button class="lightbox__btn lightbox__ant" type="button" data-lightbox-ant aria-label="Foto anterior">
      <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
    <button class="lightbox__btn lightbox__prox" type="button" data-lightbox-prox aria-label="Próxima foto">
      <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
  </dialog>
</section>`;
}
