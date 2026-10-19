import { esc } from '../helpers.js';

export const servicosMeta = { id: 'servicos', rotulo: 'Serviços' };

/** Serviços apresentados como um cardápio: nome, descrição e, se confirmados, preço e duração. */
export function servicos(ctx) {
  const s = ctx.cfg.servicos;
  const itens = ctx.filtrar(s.itens);
  if (!itens.length) return '';

  const linhas = itens
    .map((it) => {
      const detalhes = [];
      if (it.confirmado && it.duracao) detalhes.push(`<span>${esc(it.duracao)}</span>`);
      if (it.confirmado && it.preco) detalhes.push(`<span class="cardapio__preco">${esc(it.preco)}</span>`);
      return `<li class="cardapio__item${it.confirmado ? '' : ' pendente'}">
        <div class="cardapio__cabeca">
          <h3 class="cardapio__nome">${esc(it.nome)}</h3>
          ${ctx.selo(it)}
          ${detalhes.length ? `<p class="cardapio__detalhes">${detalhes.join('')}</p>` : ''}
        </div>
        <p class="cardapio__desc">${esc(it.descricao)}</p>
      </li>`;
    })
    .join('\n');

  return `<section class="secao servicos" id="${servicosMeta.id}" aria-labelledby="servicos-titulo">
  <div class="servicos__intro">
    <h2 class="titulo-secao" id="servicos-titulo">${esc(s.titulo)}</h2>
    <p>${esc(s.texto)}</p>
    ${ctx.botaoCanal({ classe: 'btn btn--primario' })}
  </div>
  <ul class="cardapio">
    ${linhas}
  </ul>
</section>`;
}
