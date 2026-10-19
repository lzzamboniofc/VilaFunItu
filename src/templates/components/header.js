import { esc } from '../helpers.js';
import { marca } from './marca.js';

/** Cabeçalho fixo com menu adaptado às seções visíveis. */
export function header(ctx, menu, { home = true } = {}) {
  const prefixo = home ? '' : './';
  const links = menu
    .map((m) => `<li><a class="nav__link" href="${prefixo}#${m.id}">${esc(m.rotulo)}</a></li>`)
    .join('');

  return `<header class="topo${home ? ' topo--sobre-hero' : ' topo--solido'}" data-topo>
  <div class="topo__barra">
    <a class="topo__marca" href="${home ? '#inicio' : './'}" aria-label="${esc(ctx.n.nome.valor)} — início">${marca(ctx)}</a>
    <nav class="nav" aria-label="Principal">
      <ul class="nav__lista" id="menu-principal" data-menu>
        ${links}
        <li class="nav__cta-mobile">${ctx.botaoCanal({ classe: 'btn btn--primario btn--largo' })}</li>
      </ul>
    </nav>
    <div class="topo__acoes">
      ${ctx.botaoCanal({ classe: 'btn btn--primario btn--compacto topo__cta' })}
      <button class="menu-botao" type="button" aria-expanded="false" aria-controls="menu-principal" data-menu-botao>
        <span class="menu-botao__linhas" aria-hidden="true"></span>
        <span class="sr-only" data-menu-rotulo>Abrir menu</span>
      </button>
    </div>
  </div>
</header>`;
}
