import { esc } from '../helpers.js';

/**
 * Marca do site. Enquanto o logotipo original não for confirmado,
 * exibe apenas o nome do negócio em texto (não é um logotipo).
 */
export function marca(ctx, { variante = '' } = {}) {
  const logo = ctx.n.logo;
  if (logo.confirmado && logo.arquivo) {
    return `<img class="marca-img ${variante}" src="assets/img/${esc(logo.arquivo)}" alt="${esc(ctx.n.nome.valor)}" height="40">`;
  }
  return `<span class="marca ${variante}"><span class="marca__nome">${esc(ctx.n.nomeCurto)}</span><span class="marca__cidade">${esc(ctx.n.cidade.valor)}</span></span>`;
}
