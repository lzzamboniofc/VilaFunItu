/**
 * ============================================================
 *  VILLA FUN ITU — CONFIGURAÇÃO CENTRAL DO SITE
 * ============================================================
 *  Todo o conteúdo editável do site está neste arquivo.
 *
 *  Regras:
 *  - `confirmado: true`  → informação verificada com o Villa Fun (aparece no modo público).
 *  - `confirmado: false` → pendente. No modo demonstração aparece com o selo
 *                          "A confirmar"; no modo público fica oculta.
 *  - `ficticio: true`    → conteúdo FICTÍCIO de demonstração (textos e ilustrações).
 *                          Aparece normalmente no site, sem selo. Substitua pelo
 *                          conteúdo real e marque `confirmado: true`.
 *  - `fonte`             → de onde a informação veio (só para controle interno).
 *
 *  Depois de editar, rode `npm run build` (ou `npm run dev`).
 *  Para ver o que falta confirmar: `npm run pendencias`.
 * ============================================================
 */

export default {
  /** 'demonstracao' (apresentação comercial) ou 'publico' (site final). */
  modo: 'publico',

  site: {
    /** Endereço final do site, com barra no fim. */
    url: 'https://lzzamboniofc.github.io/VilaFunItu/',
    /** Caminho do repositório no GitHub Pages (usado na página 404). Use '/' em domínio próprio. */
    basePath: '/VilaFunItu/',
    idioma: 'pt-BR',
    titulo: 'Villa Fun Itu | Buffet infantil para festas intimistas em Itu (SP)',
    descricao:
      'Villa Fun Itu: buffet infantil em Itu (SP) com espaço para festas intimistas e gastronomia afetiva. Consulte datas pelo Instagram.',
    corTema: '#3B1F3A',
    creditos: { texto: 'Site desenvolvido sob medida.', url: '' },
  },

  negocio: {
    nome: { valor: 'Villa Fun Itu', confirmado: true, fonte: 'Nome do perfil no Instagram @villafun_itu' },
    nomeCurto: 'Villa Fun',
    segmento: { valor: 'Buffet infantil', confirmado: true, fonte: 'Nome do perfil no Instagram' },
    proposta: {
      valor: 'Espaço para festas intimistas com gastronomia afetiva.',
      confirmado: true,
      fonte: 'Bio do Instagram',
    },
    cidade: { valor: 'Itu', uf: 'SP', confirmado: true, fonte: 'Nome do perfil no Instagram' },

    /** Preencha e marque confirmado: true para ativar mapa, rota e dados estruturados de endereço. */
    endereco: {
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cep: '',
      confirmado: false,
      fonte: 'Não localizado em fontes públicas',
    },

    /** Ex.: [{ dias: 'Segunda a sexta', horas: '9h às 18h' }] */
    horarios: { valor: [], confirmado: false, fonte: 'Não localizado' },

    telefone: { valor: '', confirmado: false, fonte: 'Não localizado' },

    /** Somente números, com DDI e DDD. */
    whatsapp: {
      valor: '5511966017669',
      confirmado: false,
      fonte: 'Diretório GuiaFix (não oficial) — confirmar com o Villa Fun antes de publicar',
    },

    email: { valor: '', confirmado: false, fonte: 'Não localizado' },

    /** Arquivo em src/images (SVG ou PNG). Sem logo confirmado, o site usa o nome em texto. */
    logo: { arquivo: '', confirmado: false, fonte: 'Logotipo original não acessível — solicitar arquivo' },
  },

  /**
   * Canal principal de conversão (todos os botões "Consultar data").
   * Provisório: Direct do Instagram, até o Villa Fun informar o canal oficial
   * (WhatsApp, telefone ou outro). Para trocar, altere `url` e `rotuloCanal`.
   */
  canalPrincipal: {
    rotulo: 'Consultar data',
    rotuloCanal: 'pelo Direct do Instagram',
    url: 'https://ig.me/m/villafun_itu',
    provisorio: true,
    confirmado: false,
    fonte: 'Canal provisório — confirmar canal oficial de orçamento',
  },

  redes: [
    {
      nome: 'Instagram',
      usuario: '@villafun_itu',
      url: 'https://www.instagram.com/villafun_itu/',
      confirmado: true,
      fonte: 'Informado pelo cliente',
    },
  ],

  /* ------------------------------------------------------------
   *  FOTOGRAFIAS
   *  Coloque os arquivos em src/images e informe o nome em `arquivo`.
   *  O build gera versões WebP otimizadas automaticamente.
   *  Use somente fotos reais do Villa Fun.
   * ------------------------------------------------------------ */
  fotos: {
    hero: [
      { arquivo: 'ilustracao-mesa.jpg', alt: 'Ilustração de mesa de festa com bolo, docinhos e balões', confirmado: false, ficticio: true, fonte: 'Ilustração fictícia — substituir por foto real' },
      { arquivo: 'ilustracao-bolo.jpg', alt: 'Ilustração de bolo de aniversário com velas acesas', confirmado: false, ficticio: true, fonte: 'Ilustração fictícia — substituir por foto real' },
      { arquivo: 'ilustracao-baloes.jpg', alt: 'Ilustração de buquê de balões coloridos', confirmado: false, ficticio: true, fonte: 'Ilustração fictícia — substituir por foto real' },
    ],
    sobre: [
      { arquivo: 'ilustracao-espaco.jpg', alt: 'Ilustração do salão com janela em arco e mesa posta', confirmado: false, ficticio: true, fonte: 'Ilustração fictícia — substituir por foto real' },
      { arquivo: 'ilustracao-brigadeiros.jpg', alt: 'Ilustração de brigadeiros em forminhas coloridas', confirmado: false, ficticio: true, fonte: 'Ilustração fictícia — substituir por foto real' },
    ],
    compartilhamento: { arquivo: '', confirmado: false, fonte: 'Gerada automaticamente até haver foto real' },
  },

  /* ------------------------------------------------------------
   *  TEXTOS
   * ------------------------------------------------------------ */
  hero: {
    titulo: 'Festas intimistas com gastronomia afetiva.',
    texto:
      'Buffet infantil em Itu para comemorar com quem é mais próximo, com a comida no centro da festa.',
    botaoSecundario: 'Conhecer a proposta',
  },

  sobre: {
    titulo: 'Uma festa do tamanho de quem importa',
    paragrafos: [
      {
        texto:
          'O Villa Fun Itu é um buffet infantil dedicado a festas intimistas: comemorações pensadas para um grupo próximo de família e amigos.',
        confirmado: true,
        fonte: 'Bio e nome do perfil no Instagram',
      },
      {
        texto:
          'A proposta une o clima de festa à gastronomia afetiva — comida que lembra a mesa de casa e faz parte da memória do dia.',
        confirmado: true,
        fonte: 'Bio do Instagram ("gastronomia afetiva")',
      },
      {
        texto:
          'Cada festa é preparada com calma, do primeiro contato ao último docinho. A ideia é que a família chegue, receba os convidados e aproveite o dia sem se preocupar com os detalhes.',
        confirmado: false,
        ficticio: true,
        fonte: 'Texto fictício — substituir pela história real do Villa Fun',
      },
    ],
  },

  /** Seção editorial "Experiência". */
  experiencia: {
    titulo: 'O que muda numa festa intimista',
    blocos: [
      {
        titulo: 'Perto de quem importa',
        texto:
          'Com menos convidados, a festa acontece de perto: dá para conversar, acompanhar a criança e aproveitar cada momento sem correria.',
        foto: { arquivo: 'ilustracao-chapeus.jpg', alt: 'Ilustração de chapéus de festa e confetes', confirmado: false, ficticio: true, fonte: 'Ilustração fictícia — substituir por foto real' },
        confirmado: true,
        fonte: 'Conceito de festa intimista (bio do Instagram)',
      },
      {
        titulo: 'Comida com memória',
        texto:
          'Na gastronomia afetiva, a comida não é um detalhe: é parte da lembrança que a família leva da festa.',
        foto: { arquivo: 'ilustracao-salgados.jpg', alt: 'Ilustração de travessa com coxinhas e pastéis', confirmado: false, ficticio: true, fonte: 'Ilustração fictícia — substituir por foto real' },
        confirmado: true,
        fonte: 'Conceito de gastronomia afetiva (bio do Instagram)',
      },
    ],
  },

  /** Serviços. Preço e duração só aparecem se preenchidos e o item estiver confirmado. */
  servicos: {
    titulo: 'Para a sua comemoração',
    texto: 'O que você encontra no Villa Fun para planejar a festa.',
    itens: [
      {
        nome: 'Festa infantil intimista',
        descricao: 'Buffet infantil para aniversários com um grupo próximo de convidados.',
        preco: '',
        duracao: '',
        confirmado: true,
        fonte: 'Nome e bio do Instagram',
      },
      {
        nome: 'Cardápio de gastronomia afetiva',
        descricao: 'Salgados feitos na hora, pratos com gosto de casa e uma mesa de doces caprichada — comida para lembrar da festa.',
        preco: '',
        duracao: '',
        confirmado: false,
        ficticio: true,
        fonte: 'Texto fictício — confirmar com o Villa Fun',
      },
      {
        nome: 'Decoração',
        descricao: 'Mesa decorada de acordo com o tema escolhido pela família, com atenção aos detalhes e às cores da festa.',
        preco: '',
        duracao: '',
        confirmado: false,
        ficticio: true,
        fonte: 'Texto fictício — confirmar com o Villa Fun',
      },
      {
        nome: 'Recreação',
        descricao: 'Brincadeiras e acompanhamento para as crianças, enquanto os adultos aproveitam a festa por perto.',
        preco: '',
        duracao: '',
        confirmado: false,
        ficticio: true,
        fonte: 'Texto fictício — confirmar com o Villa Fun',
      },
    ],
  },

  /** Passos para reservar. A seção aparece no modo público com pelo menos 2 passos confirmados. */
  reserva: {
    titulo: 'Como consultar uma data',
    passos: [
      {
        titulo: 'Envie uma mensagem',
        texto: 'Conte a data que você imagina e quantos convidados pretende chamar.',
        confirmado: true,
        fonte: 'Orientação de contato pelo canal provisório',
      },
      {
        titulo: 'Receba as opções',
        texto: 'O Villa Fun responde com a disponibilidade e as opções de cardápio e decoração.',
        confirmado: false,
        ficticio: true,
        fonte: 'Texto fictício — confirmar com o Villa Fun',
      },
      {
        titulo: 'Garanta a data',
        texto: 'Combine os detalhes da festa e confirme a reserva da data.',
        confirmado: false,
        ficticio: true,
        fonte: 'Texto fictício — confirmar com o Villa Fun',
      },
    ],
  },

  /** Galeria: adicione quantas fotos quiser. */
  galeria: {
    titulo: 'Festas no Villa Fun',
    texto: 'Os detalhes que fazem o clima de uma festa intimista.',
    fotos: [
      { arquivo: 'ilustracao-mesa.jpg', alt: 'Ilustração de mesa de festa com bolo e balões', legenda: 'Mesa do parabéns', confirmado: false, ficticio: true, fonte: 'Ilustração fictícia — substituir por foto real' },
      { arquivo: 'ilustracao-brigadeiros.jpg', alt: 'Ilustração de brigadeiros em forminhas', legenda: 'Docinhos', confirmado: false, ficticio: true, fonte: 'Ilustração fictícia — substituir por foto real' },
      { arquivo: 'ilustracao-espaco.jpg', alt: 'Ilustração do salão com mesa posta', legenda: 'O salão', confirmado: false, ficticio: true, fonte: 'Ilustração fictícia — substituir por foto real' },
      { arquivo: 'ilustracao-salgados.jpg', alt: 'Ilustração de salgados servidos na festa', legenda: 'Salgados', confirmado: false, ficticio: true, fonte: 'Ilustração fictícia — substituir por foto real' },
      { arquivo: 'ilustracao-presentes.jpg', alt: 'Ilustração de caixinhas de presente', legenda: 'Lembrancinhas', confirmado: false, ficticio: true, fonte: 'Ilustração fictícia — substituir por foto real' },
      { arquivo: 'ilustracao-bolo.jpg', alt: 'Ilustração de bolo de aniversário', legenda: 'O bolo', confirmado: false, ficticio: true, fonte: 'Ilustração fictícia — substituir por foto real' },
    ],
  },

  /** Profissionais. Nunca publique pessoas sem autorização. Ex.: { nome, funcao, texto, foto, confirmado } */
  equipe: {
    titulo: 'Quem prepara a sua festa',
    pessoas: [],
  },

  /**
   * Apenas avaliações reais e verificáveis (de preferência do Google).
   * Ex.: { nome: 'Nome como aparece no Google', nota: 5, texto: '...', origem: 'Google', url: '', confirmado: true }
   */
  avaliacoes: {
    titulo: 'Quem já comemorou aqui',
    itens: [],
  },

  faq: {
    titulo: 'Perguntas frequentes',
    itens: [
      {
        pergunta: 'Que tipo de festa o Villa Fun faz?',
        resposta: 'Festas infantis intimistas, com gastronomia afetiva.',
        confirmado: true,
        fonte: 'Bio do Instagram',
      },
      {
        pergunta: 'Como consulto uma data?',
        resposta: 'Envie uma mensagem pelo Direct do Instagram @villafun_itu com a data desejada e o número de convidados.',
        confirmado: true,
        fonte: 'Canal provisório (Instagram)',
      },
      {
        pergunta: 'Onde fica o Villa Fun?',
        resposta: 'Em Itu (SP).',
        confirmado: true,
        fonte: 'Nome do perfil no Instagram',
      },
      {
        pergunta: 'Quantos convidados o espaço comporta?',
        resposta: 'O Villa Fun é pensado para festas com um grupo próximo de convidados. Conte quantas pessoas pretende chamar e indicamos o formato ideal.',
        confirmado: false,
        ficticio: true,
        fonte: 'Texto fictício — confirmar com o Villa Fun',
      },
      {
        pergunta: 'O que está incluído na festa?',
        resposta: 'Cada festa é montada com a família: cardápio, decoração e recreação são definidos no orçamento, de acordo com a comemoração.',
        confirmado: false,
        ficticio: true,
        fonte: 'Texto fictício — confirmar com o Villa Fun',
      },
      {
        pergunta: 'Quais são as formas de pagamento?',
        resposta: 'As condições de pagamento são apresentadas junto com o orçamento.',
        confirmado: false,
        ficticio: true,
        fonte: 'Texto fictício — confirmar com o Villa Fun',
      },
      {
        pergunta: 'Com quanta antecedência devo reservar?',
        resposta: 'Quanto antes, melhor — principalmente para fins de semana. Envie a data desejada para consultar a disponibilidade.',
        confirmado: false,
        ficticio: true,
        fonte: 'Texto fictício — confirmar com o Villa Fun',
      },
    ],
  },

  contato: {
    titulo: 'Vamos marcar a sua festa?',
    texto: 'Fale com o Villa Fun para consultar datas e montar a comemoração.',
  },

  rodape: {
    descricao: 'Buffet infantil em Itu (SP) para festas intimistas com gastronomia afetiva.',
  },
};
