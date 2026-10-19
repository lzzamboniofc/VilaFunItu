/** Utilitários compartilhados pelos componentes. */

export const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/** Cria o contexto de renderização a partir da config, do modo e do mapa de imagens processadas. */
export function createContext(cfg, { modo, imagens }) {
  const demo = modo === 'demonstracao';

  /** Um item aparece se estiver confirmado ou se estivermos no modo demonstração. */
  const visivel = (item) => !!item && (item.confirmado === true || demo);
  const filtrar = (lista = []) => lista.filter(visivel);

  /** Selo discreto exibido apenas no modo demonstração em itens pendentes. */
  const selo = (item) =>
    demo && item && item.confirmado !== true
      ? '<span class="selo" title="Informação pendente de confirmação">A confirmar</span>'
      : '';

  /** Foto com arquivo real processado pelo build? */
  const temFoto = (foto) => !!(foto && foto.arquivo && imagens[foto.arquivo] && visivel(foto));

  /**
   * Renderiza <picture> responsivo, ou um espaço reservado neutro (só no modo demonstração).
   * Retorna '' quando não há foto e estamos no modo público.
   */
  function imagem(foto, { sizes = '100vw', classe = '', eager = false, rotulo = 'Foto a confirmar' } = {}) {
    if (temFoto(foto)) {
      const img = imagens[foto.arquivo];
      const srcset = img.variantes.map((v) => `${v.src} ${v.largura}w`).join(', ');
      const maior = img.variantes[img.variantes.length - 1];
      return `<picture class="${classe}">
  <source type="image/webp" srcset="${srcset}" sizes="${sizes}">
  <img src="${maior.src}" alt="${esc(foto.alt)}" width="${img.largura}" height="${img.altura}"${
        eager ? ' fetchpriority="high"' : ' loading="lazy"'
      } decoding="async">
</picture>`;
    }
    if (!demo) return '';
    return `<div class="placeholder ${classe}" role="img" aria-label="${esc(foto?.alt || 'Foto')} (foto a confirmar)">
  <span class="placeholder__txt">${esc(rotulo)}</span>
</div>`;
  }

  const n = cfg.negocio;
  const canal = cfg.canalPrincipal;

  const whatsappUrl = (msg = '') =>
    n.whatsapp.valor
      ? `https://wa.me/${n.whatsapp.valor}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`
      : '';

  const enderecoTexto = () => {
    const e = n.endereco;
    const linha1 = [e.logradouro, e.numero].filter(Boolean).join(', ');
    const linha2 = [e.complemento, e.bairro].filter(Boolean).join(' · ');
    return { linha1, linha2, cidade: `${n.cidade.valor} – ${n.cidade.uf}`, cep: e.cep };
  };

  const enderecoValido = () => n.endereco.confirmado === true && !!n.endereco.logradouro;

  const rotaUrl = () => {
    const e = enderecoTexto();
    const q = [e.linha1, e.linha2, e.cidade, e.cep].filter(Boolean).join(', ');
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;
  };

  const mapaEmbedUrl = () => {
    const e = enderecoTexto();
    const q = [e.linha1, e.cidade].filter(Boolean).join(', ');
    return `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
  };

  /** Botão do canal principal (abre em nova aba, por ser externo). */
  const botaoCanal = ({ classe = 'btn btn--primario', rotulo = canal.rotulo, extra = '' } = {}) =>
    `<a class="${classe}" href="${esc(canal.url)}" target="_blank" rel="noopener" ${extra}>
  <span>${esc(rotulo)}</span>
  <svg class="btn__icone" aria-hidden="true" viewBox="0 0 20 20" width="18" height="18"><path d="M5 15 15 5M8 5h7v7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <span class="sr-only">(abre ${esc(canal.rotuloCanal)} em nova aba)</span>
</a>`;

  return {
    cfg,
    n,
    canal,
    demo,
    modo,
    visivel,
    filtrar,
    selo,
    temFoto,
    imagem,
    whatsappUrl,
    enderecoTexto,
    enderecoValido,
    rotaUrl,
    mapaEmbedUrl,
    botaoCanal,
    ano: new Date().getFullYear(),
  };
}

/** Ícones mínimos usados no site (apenas onde ajudam a identificar um canal). */
export const icones = {
  instagram:
    '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor"/></svg>',
  whatsapp:
    '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><path d="M4 20l1.2-3.8A8 8 0 1 1 8 19z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9.2 8.6c.3 2.6 2.2 4.9 5 5.8l1-1.2 1.8.9-.4 1.6c-3.9.3-8-3.6-8.1-7.6l1.6-.5 1 1.8z" fill="currentColor"/></svg>',
  telefone:
    '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><path d="M6.6 3.5 9.4 4l1.1 4-2 1.4a11 11 0 0 0 6.1 6.1l1.4-2 4 1.1.5 2.8c-.2 1.6-1.6 2.6-3.2 2.4C9.6 19 5 14.4 4.2 6.7c-.2-1.6.8-3 2.4-3.2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  email:
    '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  local:
    '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  relogio:
    '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
};
