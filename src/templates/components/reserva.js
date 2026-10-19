import { esc } from '../helpers.js';

export const reservaMeta = { id: 'reserva', rotulo: 'Como reservar' };

/**
 * Etapas para consultar uma data. Lista ordenada semântica, sem números exibidos:
 * a ordem é dada pela sequência visual (linha que conecta as etapas).
 * Só aparece com pelo menos 2 etapas visíveis.
 */
export function reserva(ctx) {
  const r = ctx.cfg.reserva;
  const passos = ctx.filtrar(r.passos);
  if (passos.length < 2) return '';

  return `<section class="secao reserva" id="${reservaMeta.id}" aria-labelledby="reserva-titulo">
  <h2 class="titulo-secao" id="reserva-titulo">${esc(r.titulo)}</h2>
  <ol class="etapas">
    ${passos
      .map(
        (p) => `<li class="etapa${p.confirmado ? '' : ' pendente'}">
      <span class="etapa__marco" aria-hidden="true"></span>
      <h3 class="etapa__titulo">${esc(p.titulo)} ${ctx.selo(p)}</h3>
      <p>${esc(p.texto)}</p>
    </li>`
      )
      .join('\n    ')}
  </ol>
</section>`;
}
