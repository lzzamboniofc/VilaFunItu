/**
 * Verificações rápidas e locais inspiradas nos critérios de Desia 2.0.
 * npm run auditar — não substitui a auditoria completa do ZIP enviado.
 */
import { readFileSync } from 'node:fs';
const html=readFileSync('src/preview/index.html','utf8');
const css=readFileSync('src/preview/site.css','utf8');
const js=readFileSync('src/preview/site.js','utf8');
const errors=[], warnings=[];
const text=html.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ');
const count=(str,pattern)=>(str.match(pattern)||[]).length;
if(count(html,/<h1\b/gi)!==1)errors.push('A prévia deve ter um H1.');
if(!/name="robots"[^>]+content="noindex/i.test(html))errors.push('A prévia comercial precisa de noindex.');
if(!/não é um site oficial/i.test(html))errors.push('Exibir claramente a condição de projeto não oficial.');
if(count(html,/<img\b(?![^>]*\balt=)/gi))errors.push('Há imagem sem texto alternativo.');
if(!/prefers-reduced-motion/i.test(css))errors.push('Adicionar suporte a movimento reduzido.');
if(!/aria-expanded/.test(html)||!/Escape/.test(js))errors.push('Verificar acessibilidade do menu mobile.');
for(const rx of [/\bpróximo nível\b/i,/\bjornada\b/i,/\bexperiência única\b/i,/\bmemória para sempre\b/i,/\bmomentos especiais merecem\b/i,/\bessência\b/i,/\btransforme\b/i]){
 if(rx.test(text))warnings.push('Copy genérica: '+rx.source);
}
if(/#667eea|#764ba2|bg-clip-text/i.test(css))warnings.push('Gradiente genérico detectado.');
if(/\d+[.,]?\d*\s?\+\s?(?:clientes|festas|avaliações)/i.test(text))warnings.push('Número de prova social exige comprovação.');
console.log('Auditoria rápida — prévia Villa Fun Itu');
console.log(errors.length?'Erros: '+errors.join('; '):'Nenhum erro estrutural nas verificações rápidas.');
console.log(warnings.length?'Avisos: '+warnings.join('; '):'Nenhuma expressão genérica prioritária encontrada.');
if(errors.length||warnings.length)process.exitCode=1;
