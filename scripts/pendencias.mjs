/**
 * Lista todas as informações que ainda dependem de confirmação.
 *   npm run pendencias
 */
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROTULOS = {
  'negocio.endereco': 'Endereço completo (ativa mapa, rota e dados estruturados)',
  'negocio.horarios': 'Horários de atendimento',
  'negocio.telefone': 'Telefone',
  'negocio.whatsapp': 'WhatsApp',
  'negocio.email': 'E-mail',
  'negocio.logo': 'Logotipo original (arquivo)',
  canalPrincipal: 'Canal oficial de orçamento/reserva',
  'fotos.compartilhamento': 'Foto para compartilhamento em redes (Open Graph)',
};

/** Percorre a config e devolve [{ caminho, descricao, fonte }] para cada item com confirmado: false. */
export function listarPendencias(cfg) {
  const lista = [];
  const visitar = (obj, caminho) => {
    if (Array.isArray(obj)) return obj.forEach((o, i) => visitar(o, `${caminho}[${i}]`));
    if (!obj || typeof obj !== 'object') return;
    if (obj.confirmado === false) {
      const descricao =
        ROTULOS[caminho] ||
        obj.nome ||
        obj.pergunta ||
        obj.titulo ||
        (obj.alt ? `Foto: ${obj.alt}` : '') ||
        (obj.texto ? `${obj.texto.slice(0, 70)}…` : caminho);
      lista.push({ caminho, descricao, fonte: obj.fonte || '', valorAtual: typeof obj.valor === 'string' ? obj.valor : obj.url || '' });
    }
    for (const [k, v] of Object.entries(obj)) {
      if (k === 'foto' || typeof v === 'object') visitar(v, caminho ? `${caminho}.${k}` : k);
    }
  };
  visitar(cfg, '');

  // Seções preparadas, mas sem conteúdo.
  if (!cfg.avaliacoes.itens.length) lista.push({ caminho: 'avaliacoes.itens', descricao: 'Avaliações reais do Google (seção oculta até haver avaliações)', fonte: '' });
  if (!cfg.equipe.pessoas.length) lista.push({ caminho: 'equipe.pessoas', descricao: 'Equipe/profissionais (seção oculta até haver dados autorizados)', fonte: '' });
  return lista;
}

const executadoDireto = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;
if (executadoDireto) {
  const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const { default: cfg } = await import(pathToFileURL(path.join(raiz, 'src/config.js')).href);
  const lista = listarPendencias(cfg);
  const grupos = new Map();
  for (const p of lista) {
    const grupo = p.caminho.split(/[.[]/)[0];
    if (!grupos.has(grupo)) grupos.set(grupo, []);
    grupos.get(grupo).push(p);
  }
  console.log(`\nVilla Fun Itu — ${lista.length} informações pendentes de confirmação`);
  console.log(`Modo atual em src/config.js: ${cfg.modo}\n`);
  for (const [grupo, itens] of grupos) {
    console.log(`■ ${grupo}`);
    for (const p of itens) {
      console.log(`  - ${p.descricao}`);
      console.log(`      onde: ${p.caminho}${p.valorAtual ? `  |  valor atual: ${p.valorAtual}` : ''}${p.fonte ? `  |  ${p.fonte}` : ''}`);
    }
    console.log('');
  }
  console.log('Para confirmar um item: preencha o valor em src/config.js, marque confirmado: true e rode npm run build.\n');
}
