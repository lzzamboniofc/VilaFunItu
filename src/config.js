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
 *  - `fonte`             → de onde a informação veio (só para controle interno).
 *
 *  Depois de editar, rode `npm run build` (ou `npm run dev`).
 *  Para ver o que falta confirmar: `npm run pendencias`.
 * ============================================================
 */

export default {
  /** 'demonstracao' (apresentação comercial) ou 'publico' (site final). */
  modo: 'demonstracao',

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
      { arquivo: '', alt: 'Ambiente do Villa Fun preparado para uma festa', confirmado: false, fonte: 'Foto pendente' },
      { arquivo: '', alt: 'Mesa posta com a gastronomia do Villa Fun', confirmado: false, fonte: 'Foto pendente' },
      { arquivo: '', alt: 'Detalhe de decoração de festa no Villa Fun', confirmado: false, fonte: 'Foto pendente' },
    ],
    sobre: [
      { arquivo: '', alt: 'Espaço do Villa Fun Itu', confirmado: false, fonte: 'Foto pendente' },
      { arquivo: '', alt: 'Convidados reunidos em festa no Villa Fun', confirmado: false, fonte: 'Foto pendente' },
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
          'Espaço reservado para a história do Villa Fun: quem está à frente, como o espaço nasceu e como cada festa é preparada.',
        confirmado: false,
        fonte: 'História e equipe não localizadas',
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
        foto: { arquivo: '', alt: 'Família e amigos reunidos em festa no Villa Fun', confirmado: false, fonte: 'Foto pendente' },
        confirmado: true,
        fonte: 'Conceito de festa intimista (bio do Instagram)',
      },
      {
        titulo: 'Comida com memória',
        texto:
          'Na gastronomia afetiva, a comida não é um detalhe: é parte da lembrança que a família leva da festa.',
        foto: { arquivo: '', alt: 'Comida servida em festa no Villa Fun', confirmado: false, fonte: 'Foto pendente' },
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
        descricao: 'Opções de cardápio, salgados, pratos e doces servidos na festa.',
        preco: '',
        duracao: '',
        confirmado: false,
        fonte: 'Itens do cardápio não confirmados',
      },
      {
        nome: 'Decoração',
        descricao: 'Opções de decoração e temas disponíveis para a festa.',
        preco: '',
        duracao: '',
        confirmado: false,
        fonte: 'Não confirmado',
      },
      {
        nome: 'Recreação',
        descricao: 'Atividades e acompanhamento para as crianças durante a festa.',
        preco: '',
        duracao: '',
        confirmado: false,
        fonte: 'Não confirmado',
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
        texto: 'O Villa Fun apresenta disponibilidade, pacotes e cardápio.',
        confirmado: false,
        fonte: 'Processo comercial não confirmado',
      },
      {
        titulo: 'Garanta a data',
        texto: 'Combine os detalhes e confirme a reserva.',
        confirmado: false,
        fonte: 'Processo comercial não confirmado',
      },
    ],
  },

  /** Galeria: adicione quantas fotos quiser. */
  galeria: {
    titulo: 'Festas no Villa Fun',
    texto: 'Momentos reais de festas no espaço.',
    fotos: [
      { arquivo: '', alt: 'Ambiente da festa', legenda: '', confirmado: false, fonte: 'Foto pendente' },
      { arquivo: '', alt: 'Mesa de doces', legenda: '', confirmado: false, fonte: 'Foto pendente' },
      { arquivo: '', alt: 'Comida servida na festa', legenda: '', confirmado: false, fonte: 'Foto pendente' },
      { arquivo: '', alt: 'Detalhe da decoração', legenda: '', confirmado: false, fonte: 'Foto pendente' },
      { arquivo: '', alt: 'Crianças na festa', legenda: '', confirmado: false, fonte: 'Foto pendente' },
      { arquivo: '', alt: 'Bolo de aniversário', legenda: '', confirmado: false, fonte: 'Foto pendente' },
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
        resposta: 'Resposta a confirmar com o Villa Fun.',
        confirmado: false,
        fonte: 'Capacidade não confirmada',
      },
      {
        pergunta: 'O que está incluído na festa?',
        resposta: 'Resposta a confirmar com o Villa Fun.',
        confirmado: false,
        fonte: 'Pacotes não confirmados',
      },
      {
        pergunta: 'Quais são as formas de pagamento?',
        resposta: 'Resposta a confirmar com o Villa Fun.',
        confirmado: false,
        fonte: 'Não confirmado',
      },
      {
        pergunta: 'Com quanta antecedência devo reservar?',
        resposta: 'Resposta a confirmar com o Villa Fun.',
        confirmado: false,
        fonte: 'Não confirmado',
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
