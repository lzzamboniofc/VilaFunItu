/**
 * Villa Fun Itu — interações do site.
 * Sem dependências. Tudo é melhoria progressiva: sem JS, o conteúdo continua acessível.
 */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
const raiz = document.documentElement;

/* ---------- Cabeçalho: fundo sólido após rolar ---------- */
function iniciarTopo() {
  const topo = $('[data-topo]');
  if (!topo || !topo.classList.contains('topo--sobre-hero')) return;
  const atualizar = () => topo.classList.toggle('is-rolado', window.scrollY > 24);
  atualizar();
  window.addEventListener('scroll', atualizar, { passive: true });
}

/* ---------- Menu mobile ---------- */
function iniciarMenu() {
  const botao = $('[data-menu-botao]');
  const menu = $('[data-menu]');
  if (!botao || !menu) return;
  const rotulo = $('[data-menu-rotulo]', botao);
  const desktop = window.matchMedia('(min-width: 1024px)');

  const focaveis = () => [botao, ...$$('a, button', menu)].filter((el) => el.offsetParent !== null);

  function definir(aberto) {
    raiz.classList.toggle('menu-aberto', aberto);
    botao.setAttribute('aria-expanded', String(aberto));
    rotulo.textContent = aberto ? 'Fechar menu' : 'Abrir menu';
    if (aberto) $('a', menu)?.focus();
  }

  botao.addEventListener('click', () => definir(botao.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) definir(false);
  });
  document.addEventListener('keydown', (e) => {
    if (!raiz.classList.contains('menu-aberto')) return;
    if (e.key === 'Escape') {
      definir(false);
      botao.focus();
    }
    if (e.key === 'Tab') {
      const els = focaveis();
      const primeiro = els[0];
      const ultimo = els[els.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    }
  });
  desktop.addEventListener('change', () => definir(false));
}

/* ---------- Destaque do item de menu da seção visível ---------- */
function iniciarSecaoAtual() {
  const links = $$('.nav__link[href^="#"]');
  if (!links.length || !('IntersectionObserver' in window)) return;
  const mapa = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const obs = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((en) => {
        const link = mapa.get(en.target.id);
        if (link && en.isIntersecting) {
          links.forEach((l) => l.removeAttribute('aria-current'));
          link.setAttribute('aria-current', 'true');
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  mapa.forEach((_, id) => {
    const el = document.getElementById(id);
    if (el) obs.observe(el);
  });
}

/* ---------- Perguntas frequentes ---------- */
function iniciarFaq() {
  $$('[data-faq]').forEach((botao) => {
    const resposta = document.getElementById(botao.getAttribute('aria-controls'));
    if (!resposta) return;
    resposta.inert = true;
    botao.addEventListener('click', () => {
      const aberto = botao.getAttribute('aria-expanded') === 'true';
      botao.setAttribute('aria-expanded', String(!aberto));
      resposta.classList.toggle('is-aberta', !aberto);
      resposta.inert = aberto;
    });
  });
}

/* ---------- Galeria ampliável ---------- */
function iniciarGaleria() {
  const dialogo = $('[data-lightbox]');
  const botoes = $$('[data-galeria-abrir]');
  if (!dialogo || !botoes.length || typeof dialogo.showModal !== 'function') return;

  const palco = $('[data-lightbox-palco]', dialogo);
  const legenda = $('[data-lightbox-legenda]', dialogo);
  const btnAnt = $('[data-lightbox-ant]', dialogo);
  const btnProx = $('[data-lightbox-prox]', dialogo);
  let atual = 0;
  let origem = null;

  const unico = botoes.length < 2;
  btnAnt.hidden = unico;
  btnProx.hidden = unico;

  function mostrar(i) {
    atual = (i + botoes.length) % botoes.length;
    const botao = botoes[atual];
    const midia = botao.firstElementChild.cloneNode(true);
    const img = midia.querySelector('img');
    if (img) {
      img.removeAttribute('loading');
      img.sizes = '100vw';
    }
    palco.replaceChildren(midia);
    const texto = botao.getAttribute('aria-label').replace(/^Ampliar foto:\s*/, '');
    legenda.textContent = unico ? texto : `${texto} — ${atual + 1} de ${botoes.length}`;
  }

  botoes.forEach((b, i) =>
    b.addEventListener('click', () => {
      origem = b;
      mostrar(i);
      dialogo.showModal();
      raiz.style.overflow = 'hidden';
    })
  );

  const fechar = () => dialogo.close();
  $('[data-lightbox-fechar]', dialogo).addEventListener('click', fechar);
  btnAnt.addEventListener('click', () => mostrar(atual - 1));
  btnProx.addEventListener('click', () => mostrar(atual + 1));

  dialogo.addEventListener('close', () => {
    raiz.style.overflow = '';
    palco.replaceChildren();
    origem?.focus();
  });
  // Clique fora da foto fecha
  dialogo.addEventListener('click', (e) => {
    if (e.target === dialogo || e.target === palco) fechar();
  });
  dialogo.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') mostrar(atual - 1);
    if (e.key === 'ArrowRight') mostrar(atual + 1);
  });

  // Gesto de deslizar no celular
  let x0 = null;
  palco.addEventListener('touchstart', (e) => (x0 = e.touches[0].clientX), { passive: true });
  palco.addEventListener(
    'touchend',
    (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) mostrar(atual + (dx < 0 ? 1 : -1));
      x0 = null;
    },
    { passive: true }
  );
}

/* ---------- Botão flutuante no celular ---------- */
function iniciarCtaFlutuante() {
  const cta = $('[data-cta-flutuante]');
  const hero = $('#inicio');
  if (!cta || !hero || !('IntersectionObserver' in window)) return;
  cta.hidden = false;
  const ocultadores = [hero, $('#contato'), $('.rodape')].filter(Boolean);
  const visiveis = new Set();
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((en) => (en.isIntersecting ? visiveis.add(en.target) : visiveis.delete(en.target)));
    const mostrar = visiveis.size === 0;
    cta.classList.toggle('is-visivel', mostrar);
    cta.inert = !mostrar;
  });
  ocultadores.forEach((el) => obs.observe(el));
}

/* ---------- Mapa: carregado somente por ação do visitante ---------- */
function iniciarMapa() {
  const mapa = $('[data-mapa]');
  if (!mapa) return;
  $('[data-mapa-carregar]', mapa)?.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = mapa.dataset.mapaSrc;
    iframe.title = 'Mapa da localização';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    mapa.replaceChildren(iframe);
    iframe.focus();
  });
}

iniciarTopo();
iniciarMenu();
iniciarSecaoAtual();
iniciarFaq();
iniciarGaleria();
iniciarCtaFlutuante();
iniciarMapa();
