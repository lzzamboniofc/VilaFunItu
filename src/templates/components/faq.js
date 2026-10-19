import { esc } from '../helpers.js';

export const faqMeta = { id: 'perguntas', rotulo: 'Dúvidas' };

/** Accordion acessível (botão + região), com animação de altura via CSS grid. */
export function faq(ctx) {
  const f = ctx.cfg.faq;
  const itens = ctx.filtrar(f.itens);
  if (!itens.length) return '';

  const html = itens
    .map(
      (it, i) => `<div class="faq__item${it.confirmado ? '' : ' pendente'}">
      <h3 class="faq__pergunta">
        <button type="button" class="faq__botao" aria-expanded="false" aria-controls="faq-r${i}" id="faq-p${i}" data-faq>
          <span>${esc(it.pergunta)}</span>
          ${ctx.selo(it)}
          <span class="faq__sinal" aria-hidden="true"></span>
        </button>
      </h3>
      <div class="faq__resposta" id="faq-r${i}" role="region" aria-labelledby="faq-p${i}">
        <div><p>${esc(it.resposta)}</p></div>
      </div>
    </div>`
    )
    .join('\n    ');

  return `<section class="secao faq" id="${faqMeta.id}" aria-labelledby="faq-titulo">
  <div class="faq__intro">
    <h2 class="titulo-secao" id="faq-titulo">${esc(f.titulo)}</h2>
    <p>Não encontrou o que procura? ${ctx.botaoCanal({ classe: 'link-forte', rotulo: 'Pergunte ao Villa Fun' })}</p>
  </div>
  <div class="faq__lista">
    ${html}
  </div>
</section>`;
}
