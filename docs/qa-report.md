# Relatório de QA

Data: 14 de outubro de 2026 · Ambiente: Linux, Node.js 22.22, Chromium 141 (headless) · Build de produção (`next build` + `next start`).

Todos os resultados abaixo foram obtidos executando efetivamente os comandos indicados.

## 1. Verificação técnica

| Verificação | Comando | Resultado |
| --- | --- | --- |
| Instalação de dependências | `npm install` | OK |
| TypeScript (strict) | `npm run typecheck` | 0 erros |
| ESLint (core-web-vitals + typescript) | `npm run lint` | 0 erros, 0 avisos |
| Testes unitários e de componentes | `npm test` | **42/42** em 8 ficheiros |
| Build de produção | `npm run build` | OK — 58 páginas geradas (51 HTML estáticas + API + metadados) |
| Testes E2E (Chromium) | `npm run test:e2e` | **18/18** |
| Ligações internas e âncoras | `npm run check:links` | 52 páginas, 295 âncoras, 0 inválidas |
| Vulnerabilidades (dependências de produção) | `npm audit --omit=dev` | 0 |

Nota: `npm audit` (incluindo dependências de desenvolvimento) reporta 5 vulnerabilidades *high* em `micromatch` via `eslint-config-next`. Afetam apenas a ferramenta de lint em desenvolvimento, não o website publicado; a correção depende de uma nova versão de `eslint-config-next`.

## 2. Testes unitários (Vitest)

- `contact-schema` — validação, mensagens em português, consentimento, honeypot, remoção de quebras de linha (injeção de cabeçalhos), limites de tamanho, encaminhamento por área, validação de parâmetros do URL.
- `contact-route` — API: 503 sem configuração (sem sucesso simulado), 422 com erros por campo, rejeição de honeypot e envios demasiado rápidos, origem externa, JSON inválido, limitação de pedidos (429), envio ao departamento correto, 502 em falha do fornecedor.
- `contact-form` — erros de validação e foco, pré-preenchimento pelo URL, área inválida ignorada, estado "não configurado" com e-mail do departamento, confirmação apenas após resposta positiva do servidor.
- `mailer` — leitura de configuração, destinatário por departamento, escape de HTML.
- `catalog` — pesquisa sem acentos, palavras-chave, filtro por setor, combinação de termos, resultado vazio.
- `rate-limit`, `format` (datas com precisão de mês) e `content-integrity` (6 setores, slugs únicos, referências cruzadas válidas, ausência de Lorem Ipsum, e-mails do domínio oficial, menu com 7 itens, redirecionamentos).

## 3. Testes E2E (scripts/e2e.mjs)

**Auditoria automática de 138 combinações página × largura** — todas as 51 rotas do sitemap a 360 px e 1440 px, e as 9 páginas principais também a 390, 768, 1024 e 1920 px. Em cada uma verificou-se:

- HTTP 200; sem scroll horizontal; exatamente um `h1`;
- título ≤ 70 caracteres, meta description 50–200 caracteres, canonical, `lang="pt-AO"`;
- imagens com `alt` e sem imagens quebradas; SVG com rótulo; ligações e botões com nome acessível;
- JSON-LD válido; nenhum erro na consola do navegador.

**Percursos funcionais**: ligação "Saltar para o conteúdo"; submenu desktop (clique, Escape, devolução de foco, navegação); `aria-current`; catálogo (pesquisa, filtro, URL partilhável, estado vazio); produto → formulário pré-preenchido; validação do formulário; envio sem serviço configurado; mapas carregados apenas após clique; menu mobile (abertura, bloqueio de scroll, submenu, Escape, fecho ao navegar); página 404; redirecionamentos 308 das páginas `.php`; cabeçalhos de segurança; robots/sitemap/Open Graph; API rejeita métodos e conteúdos inválidos.

### Problemas encontrados e corrigidos durante o QA

| Problema | Correção |
| --- | --- |
| Menu mobile sem altura e cliques a atravessá-lo (o `backdrop-filter` do header torna-o bloco de contenção de `position: fixed`) | Painéis passaram a `absolute top-full` com altura explícita. |
| Submenu desktop fechava quando o clique ocorria logo após a abertura por hover | Clique ignorado nos 600 ms seguintes à abertura por hover. |
| Botão "Solicitar Informações" visível em mobile, causando 13 px de scroll horizontal a 360 px | Visibilidade controlada por contentor (`hidden xl:block`). |
| Títulos dos cartões da secção "Capacidade industrial" invisíveis (texto escuro sobre fundo escuro) | Cor corrigida. |
| Legendas das ilustrações cortadas em proporções diferentes de 4:3 | Legenda passou para HTML sobreposto. |
| Dois títulos de página acima de 70 caracteres | Títulos SEO encurtados (`seoTitle` para notícias). |
| Contraste insuficiente de texto secundário (`ink-500`) e nome acessível do logótipo diferente do texto visível | Token `ink-500` escurecido para #666F79; espaço entre "ACAIL" e "Angola". |
| Aviso de CSP (Zod testava `eval`) | Zod em modo `jitless`. |

## 4. Lighthouse 13 (medido localmente, build de produção)

| Página | Perfil | Performance | Acessibilidade | Boas práticas | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| / | mobile | 96 | 100 | 100 | 100 | 2,66 s | 0,001 | 46 ms |
| / | desktop | 100 | 100 | 100 | 100 | 0,55 s | 0,001 | 0 ms |
| /empresa | mobile | 96 | 100 | 100 | 100 | — | — | — |
| /empresa | desktop | 100 | 100 | 100 | 100 | — | — | — |
| /areas-de-negocio | mobile | 95 | 100 | 100 | 100 | 2,81 s | 0,000 | 55 ms |
| /areas-de-negocio/gases | mobile | 95 | 100 | 100 | 100 | 2,86 s | 0,000 | 52 ms |
| /produtos | mobile | 95 | 100 | 100 | 100 | 2,66 s | 0,013 | 135 ms |
| /produtos/varao-de-construcao | mobile | 96 | 100 | 100 | 100 | 2,77 s | 0,000 | 47 ms |
| /projetos | mobile | 95 | 100 | 100 | 100 | 2,79 s | 0,000 | 54 ms |
| /noticias | mobile | 96 | 100 | 100 | 100 | 2,62 s | 0,018 | 45 ms |
| /contactos | mobile | 93 | 100 | 100 | 100 | 3,10 s | 0,029 | 80 ms |

Todas as páginas, em perfil desktop, obtiveram 100 em Performance e 100 nas restantes categorias. As metas (Performance ≥ 90, Acessibilidade/SEO/Boas práticas ≥ 95) foram cumpridas em todas as medições.

Limitações da medição: servidor local (sem CDN), perfil mobile com limitação simulada de rede/CPU. Os valores em produção na Vercel devem ser confirmados após a publicação (PageSpeed Insights) — e voltarão a depender do peso das fotografias quando forem acrescentadas.

## 5. Revisão visual

Capturas em Chromium (360, 390 e 1440 px) da homepage, A Empresa, Áreas de Negócio, página de setor, catálogo, produto, projetos, notícias, contactos, submenu desktop e menu mobile. Sem sobreposições, textos cortados ou imagens distorcidas após as correções acima.

## 6. Não testado

- Envio real de e-mail (não existem credenciais Resend neste ambiente; o percurso com fornecedor foi testado com *mock*).
- Navegadores Safari e Firefox reais e leitores de ecrã (NVDA/VoiceOver) — recomendado antes do lançamento.
- Carregamento efetivo do Google Maps (rede externa bloqueada no ambiente; o iframe é criado corretamente).
