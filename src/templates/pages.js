import { esc } from './helpers.js';
import { documento } from './layout.js';
import { header } from './components/header.js';
import { hero } from './components/hero.js';
import { sobre, sobreMeta } from './components/sobre.js';
import { experiencia, experienciaMeta } from './components/experiencia.js';
import { servicos, servicosMeta } from './components/servicos.js';
import { reserva, reservaMeta } from './components/reserva.js';
import { galeria, galeriaMeta } from './components/galeria.js';
import { equipe, equipeMeta } from './components/equipe.js';
import { avaliacoes, avaliacoesMeta } from './components/avaliacoes.js';
import { faq, faqMeta } from './components/faq.js';
import { contato, contatoMeta } from './components/contato.js';
import { footer, ctaFlutuante } from './components/footer.js';

/** Ordem das seções da página inicial. `menu: false` mantém a seção fora do menu. */
const SECOES = [
  { meta: sobreMeta, render: sobre },
  { meta: experienciaMeta, render: experiencia, menu: false },
  { meta: servicosMeta, render: servicos },
  { meta: reservaMeta, render: reserva, menu: false },
  { meta: galeriaMeta, render: galeria },
  { meta: equipeMeta, render: equipe },
  { meta: avaliacoesMeta, render: avaliacoes },
  { meta: faqMeta, render: faq },
  { meta: contatoMeta, render: contato },
];

/** Renderiza as seções e monta o menu apenas com as que têm conteúdo. */
function montarSecoes(ctx) {
  const renderizadas = SECOES.map((s) => ({ ...s, html: s.render(ctx) })).filter((s) => s.html);
  const menu = renderizadas.filter((s) => s.menu !== false).map((s) => s.meta);
  return { html: renderizadas.map((s) => s.html).join('\n'), menu };
}

export function paginaInicial(ctx, versao) {
  const { html, menu } = montarSecoes(ctx);
  const corpo = `${header(ctx, menu)}
<main id="conteudo">
${hero(ctx)}
${html}
</main>
${footer(ctx, menu)}
${ctaFlutuante(ctx)}`;
  return {
    menu,
    html: documento(ctx, {
      titulo: ctx.cfg.site.titulo,
      descricao: ctx.cfg.site.descricao,
      corpo,
      versao,
    }),
  };
}

export function pagina404(ctx, menu, versao) {
  const corpo = `${header(ctx, menu, { home: false })}
<main id="conteudo" class="pagina-simples pagina-404">
  <div class="arco arco--xadrez pagina-404__arco" aria-hidden="true"></div>
  <div>
    <h1 class="titulo-secao">Esta página não está na festa.</h1>
    <p>O endereço pode ter mudado ou sido digitado com erro. Volte ao início para conhecer o ${esc(ctx.n.nome.valor)}.</p>
    <div class="hero__acoes">
      <a class="btn btn--primario btn--grande" href="./">Voltar ao início</a>
      ${ctx.botaoCanal({ classe: 'btn btn--linha btn--grande' })}
    </div>
  </div>
</main>
${footer(ctx, menu, { home: false })}`;
  return documento(ctx, {
    titulo: `Página não encontrada | ${ctx.n.nome.valor}`,
    descricao: ctx.cfg.site.descricao,
    caminho: '404.html',
    base: ctx.cfg.site.basePath,
    indexar: false,
    corpo,
    versao,
  });
}

export function paginaPrivacidade(ctx, menu, versao) {
  const nome = esc(ctx.n.nome.valor);
  const temMapa = ctx.enderecoValido();
  const contatoTxt = ctx.n.email.confirmado && ctx.n.email.valor
    ? `pelo e-mail <a href="mailto:${esc(ctx.n.email.valor)}">${esc(ctx.n.email.valor)}</a>`
    : `pelo Instagram <a href="${esc(ctx.cfg.redes[0].url)}" target="_blank" rel="noopener">${esc(ctx.cfg.redes[0].usuario)}</a>`;

  const corpo = `${header(ctx, menu, { home: false })}
<main id="conteudo" class="pagina-simples privacidade">
  <article class="texto-longo">
    <h1 class="titulo-secao">Política de privacidade</h1>
    <p>Esta política explica como o site do ${nome} trata informações de quem o visita.</p>

    <h2>Dados coletados</h2>
    <p>Este site não possui formulários, não cria contas de usuário e não coleta dados pessoais diretamente. Ele também não utiliza cookies próprios, ferramentas de análise de audiência ou publicidade.</p>

    <h2>Serviços de terceiros</h2>
    <p>Os botões de contato levam a serviços externos, como o Instagram${ctx.n.whatsapp.confirmado ? ' e o WhatsApp' : ''}. Ao usá-los, você passa a interagir diretamente com esses serviços, que seguem suas próprias políticas de privacidade.</p>
    ${temMapa ? '<p>O mapa da seção de contato só é carregado do Google Maps quando você clica em “Mostrar mapa”. A partir desse momento, o Google pode registrar dados de navegação conforme a política dele.</p>' : ''}
    <p>O site é hospedado no GitHub Pages, que pode registrar dados técnicos de acesso, como endereço IP, para fins de segurança e operação.</p>

    <h2>Seus direitos</h2>
    <p>Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode solicitar informações sobre dados pessoais tratados pelo ${nome} entrando em contato ${contatoTxt}.</p>

    <h2>Atualizações</h2>
    <p>Esta política pode ser atualizada sempre que o site passar a usar novos recursos.</p>
    <p><a class="link-forte" href="./">Voltar ao início</a></p>
  </article>
</main>
${footer(ctx, menu, { home: false })}`;
  return documento(ctx, {
    titulo: `Política de privacidade | ${ctx.n.nome.valor}`,
    descricao: `Como o site do ${ctx.n.nome.valor} trata as informações de quem o visita.`,
    caminho: 'privacidade.html',
    corpo,
    versao,
  });
}
