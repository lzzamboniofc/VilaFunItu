import { esc, icones } from '../helpers.js';
import { marca } from './marca.js';

export function footer(ctx, menu, { home = true } = {}) {
  const prefixo = home ? '' : './';
  const redes = ctx.filtrar(ctx.cfg.redes);
  const cred = ctx.cfg.site.creditos;

  return `<footer class="rodape">
  <div class="rodape__grade">
    <div class="rodape__marca">
      <a href="${home ? '#inicio' : './'}" aria-label="${esc(ctx.n.nome.valor)} — início">${marca(ctx, { variante: 'marca--grande' })}</a>
      <p>${esc(ctx.cfg.rodape.descricao)}</p>
      ${ctx.botaoCanal({ classe: 'btn btn--claro' })}
    </div>
    <nav class="rodape__nav" aria-label="Rodapé">
      <h2 class="rodape__titulo">Navegação</h2>
      <ul>
        ${menu.map((m) => `<li><a href="${prefixo}#${m.id}">${esc(m.rotulo)}</a></li>`).join('')}
        <li><a href="privacidade.html">Política de privacidade</a></li>
      </ul>
    </nav>
    <div class="rodape__contato">
      <h2 class="rodape__titulo">Contato</h2>
      <ul>
        ${redes
          .map(
            (r) =>
              `<li><a class="rodape__rede" href="${esc(r.url)}" target="_blank" rel="noopener">${r.nome === 'Instagram' ? icones.instagram : ''}<span>${esc(r.usuario)}</span><span class="sr-only"> no ${esc(r.nome)}</span></a></li>`
          )
          .join('')}
        ${ctx.n.whatsapp.confirmado && ctx.n.whatsapp.valor ? `<li><a class="rodape__rede" href="${esc(ctx.whatsappUrl())}" target="_blank" rel="noopener">${icones.whatsapp}<span>WhatsApp</span></a></li>` : ''}
        ${ctx.n.telefone.confirmado && ctx.n.telefone.valor ? `<li><a href="tel:+${esc(ctx.n.telefone.valor.replace(/\D/g, ''))}">${esc(ctx.n.telefone.valor)}</a></li>` : ''}
        ${ctx.n.email.confirmado && ctx.n.email.valor ? `<li><a href="mailto:${esc(ctx.n.email.valor)}">${esc(ctx.n.email.valor)}</a></li>` : ''}
        <li>${esc(ctx.n.cidade.valor)} (${esc(ctx.n.cidade.uf)})</li>
      </ul>
    </div>
  </div>
  <div class="rodape__base">
    <p>© ${ctx.ano} ${esc(ctx.n.nome.valor)}</p>
    <p>${cred.url ? `<a href="${esc(cred.url)}" target="_blank" rel="noopener">${esc(cred.texto)}</a>` : esc(cred.texto)}</p>
  </div>
</footer>`;
}

/** Botão flutuante discreto (mobile): aparece depois do hero e some na seção de contato. */
export function ctaFlutuante(ctx) {
  return `<div class="cta-flutuante" data-cta-flutuante hidden>
  ${ctx.botaoCanal({ classe: 'btn btn--primario btn--largo' })}
</div>`;
}
