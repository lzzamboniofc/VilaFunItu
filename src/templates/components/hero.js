import { esc } from '../helpers.js';

/**
 * Hero: título + fachada de arcos (motivo da "villa").
 * Cada arco recebe uma foto real; sem foto, o arco é preenchido com
 * cor/padrão da identidade (modo público) ou um espaço reservado (modo demonstração).
 */
export function hero(ctx) {
  const h = ctx.cfg.hero;
  const fotos = ctx.cfg.fotos.hero;
  const preenchimentos = ['arco--xadrez', 'arco--ameixa', 'arco--manteiga'];
  const sizes = ['(min-width: 960px) 24vw, 46vw', '(min-width: 960px) 20vw, 40vw', '(min-width: 960px) 16vw, 32vw'];

  const arcos = preenchimentos
    .map((p, i) => {
      const foto = fotos[i];
      const comFoto = ctx.temFoto(foto);
      const conteudo = comFoto
        ? ctx.imagem(foto, { sizes: sizes[i], classe: 'arco__midia', eager: i === 0 })
        : ctx.demo
          ? '<span class="arco__chip">Foto a confirmar</span>'
          : '';
      return `<div class="arco arco--${i + 1} ${comFoto ? 'arco--foto' : p}">${conteudo}</div>`;
    })
    .join('');

  return `<section class="hero" id="inicio" aria-labelledby="hero-titulo">
  <div class="hero__conteudo">
    <h1 class="hero__titulo" id="hero-titulo">${esc(h.titulo)}</h1>
    <p class="hero__texto">${esc(h.texto)}</p>
    <div class="hero__acoes">
      ${ctx.botaoCanal({ classe: 'btn btn--primario btn--grande' })}
      <a class="btn btn--linha btn--grande" href="#proposta">${esc(h.botaoSecundario)}</a>
    </div>
  </div>
  <div class="hero__fachada"${fotos.some((f) => ctx.temFoto(f)) ? '' : ' aria-hidden="true"'}>${arcos}</div>
</section>`;
}
