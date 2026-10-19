import { esc, icones } from '../helpers.js';

export const contatoMeta = { id: 'contato', rotulo: 'Contato' };

/**
 * Contato e localização. Cada canal só aparece se confirmado (ou, no modo
 * demonstração, com o selo "A confirmar"). Mapa e rota exigem endereço validado.
 */
export function contato(ctx) {
  const { n } = ctx;
  const c = ctx.cfg.contato;
  const linhas = [];

  const linha = (icone, rotulo, conteudo, item) =>
    `<li class="canal${item && item.confirmado !== true ? ' pendente' : ''}">
      <span class="canal__icone">${icone}</span>
      <div><p class="canal__rotulo">${esc(rotulo)} ${ctx.selo(item)}</p>${conteudo}</div>
    </li>`;

  for (const r of ctx.filtrar(ctx.cfg.redes)) {
    linhas.push(
      linha(
        r.nome === 'Instagram' ? icones.instagram : icones.email,
        r.nome,
        `<a class="canal__valor" href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.usuario)}</a>`,
        r
      )
    );
  }

  if (ctx.visivel(n.whatsapp) && n.whatsapp.valor) {
    const num = n.whatsapp.valor.replace(/^55(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');
    linhas.push(
      linha(
        icones.whatsapp,
        'WhatsApp',
        `<a class="canal__valor" href="${esc(ctx.whatsappUrl('Olá! Gostaria de consultar uma data para uma festa no Villa Fun.'))}" target="_blank" rel="noopener">${esc(num)}</a>`,
        n.whatsapp
      )
    );
  }

  if (ctx.visivel(n.telefone)) {
    linhas.push(
      linha(
        icones.telefone,
        'Telefone',
        n.telefone.valor
          ? `<a class="canal__valor" href="tel:+${esc(n.telefone.valor.replace(/\D/g, ''))}">${esc(n.telefone.valor)}</a>`
          : '<p class="canal__valor canal__valor--vazio">Número a informar</p>',
        n.telefone
      )
    );
  }

  if (ctx.visivel(n.email)) {
    linhas.push(
      linha(
        icones.email,
        'E-mail',
        n.email.valor
          ? `<a class="canal__valor" href="mailto:${esc(n.email.valor)}">${esc(n.email.valor)}</a>`
          : '<p class="canal__valor canal__valor--vazio">E-mail a informar</p>',
        n.email
      )
    );
  }

  // Endereço: a cidade é confirmada; o endereço completo, não.
  const e = ctx.enderecoTexto();
  if (ctx.enderecoValido()) {
    linhas.push(
      linha(
        icones.local,
        'Endereço',
        `<address class="canal__valor">${esc(e.linha1)}${e.linha2 ? `<br>${esc(e.linha2)}` : ''}<br>${esc(e.cidade)}${e.cep ? ` · CEP ${esc(e.cep)}` : ''}</address>
        <a class="link-forte canal__rota" href="${esc(ctx.rotaUrl())}" target="_blank" rel="noopener">Como chegar<span class="sr-only"> (abre o Google Maps)</span></a>`,
        n.endereco
      )
    );
  } else {
    linhas.push(
      linha(
        icones.local,
        'Localização',
        `<p class="canal__valor">${esc(e.cidade)}</p>${ctx.demo ? '<p class="canal__obs">Endereço completo a confirmar.</p>' : ''}`,
        n.cidade
      )
    );
  }

  if (ctx.visivel(n.horarios)) {
    const hs = n.horarios.valor || [];
    linhas.push(
      linha(
        icones.relogio,
        'Horário de atendimento',
        hs.length
          ? `<ul class="canal__horarios">${hs.map((h) => `<li><span>${esc(h.dias)}</span> <span>${esc(h.horas)}</span></li>`).join('')}</ul>`
          : '<p class="canal__valor canal__valor--vazio">Horários a informar</p>',
        n.horarios
      )
    );
  }

  let mapa = '';
  if (ctx.enderecoValido()) {
    mapa = `<div class="mapa" data-mapa data-mapa-src="${esc(ctx.mapaEmbedUrl())}">
      <div class="mapa__capa">
        <p>O mapa é carregado do Google Maps somente se você pedir.</p>
        <div class="mapa__acoes">
          <button type="button" class="btn btn--linha" data-mapa-carregar>Mostrar mapa</button>
          <a class="btn btn--primario" href="${esc(ctx.rotaUrl())}" target="_blank" rel="noopener">Como chegar<span class="sr-only"> (abre o Google Maps)</span></a>
        </div>
      </div>
    </div>`;
  } else if (ctx.demo) {
    mapa = `<div class="mapa mapa--reservado" role="note">
      <p>${ctx.selo(n.endereco)}</p>
      <p>O mapa e o botão “Como chegar” são ativados quando o endereço for confirmado.</p>
    </div>`;
  }

  return `<section class="secao contato" id="${contatoMeta.id}" aria-labelledby="contato-titulo">
  <div class="contato__painel">
    <div class="contato__chamada">
      <h2 class="titulo-secao" id="contato-titulo">${esc(c.titulo)}</h2>
      <p>${esc(c.texto)}</p>
      ${ctx.botaoCanal({ classe: 'btn btn--primario btn--grande' })}
      <p class="contato__canal">Atendimento ${esc(ctx.canal.rotuloCanal)}. ${ctx.selo(ctx.canal)}</p>
    </div>
    <ul class="canais">
      ${linhas.join('\n      ')}
    </ul>
  </div>
  ${mapa}
</section>`;
}
