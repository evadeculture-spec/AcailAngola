# Arquitetura

## Stack

| Camada | Escolha | Motivo |
| --- | --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) | Geração estática, rotas tipadas, metadados e sitemap nativos, compatível com Vercel. |
| UI | React 19, Server Components por omissão | Apenas 6 componentes cliente (header, catálogo, formulário, wrapper de parâmetros, mapa, página de erro). |
| Linguagem | TypeScript `strict` + `noUncheckedIndexedAccess` | Erros detetados em compilação. |
| Estilos | Tailwind CSS 4 com tokens em `@theme` | Design system centralizado num só ficheiro. |
| Ícones | lucide-react | Ícones lineares, importados individualmente. |
| Validação | Zod 4 (modo `jitless`, compatível com CSP) | O mesmo esquema valida no cliente e no servidor. |
| Fontes | `@fontsource-variable/inter` e `manrope` | Servidas pelo próprio domínio, sem pedidos à Google. |
| Testes | Vitest + Testing Library; E2E com playwright-core | Unitários, componentes, API e percursos reais em Chromium. |

Não foram usados shadcn/ui nem bibliotecas de animação: os componentes necessários são simples e as animações de entrada usam CSS *scroll-driven* (sem JavaScript), respeitando `prefers-reduced-motion`.

## Estrutura

```
src/
├─ app/                       Rotas (App Router)
│  ├─ page.tsx                Início
│  ├─ empresa/                A Empresa
│  ├─ areas-de-negocio/       Agregador + [slug] (6 páginas estáticas)
│  ├─ produtos/               Catálogo + [slug] (38 páginas estáticas)
│  ├─ projetos/               Portefólio
│  ├─ noticias/               Arquivo + [slug]
│  ├─ contactos/              Contactos e formulário
│  ├─ politica-de-*/          Páginas legais (rascunho assinalado)
│  ├─ api/contact/route.ts    Endpoint do formulário
│  ├─ sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg
│  └─ not-found.tsx, error.tsx
├─ components/
│  ├─ layout/                 Header (menu desktop/mobile), Footer
│  ├─ ui/                     Button, Section, Breadcrumbs, JsonLd, Logo
│  ├─ sections/               PageHero, ContactCta, SectorCard, DepartmentCard, LegalPage, LocationMap, home/*
│  ├─ catalog/                ProductCard, CatalogExplorer, DocumentsList
│  ├─ forms/                  ContactForm (+ leitura de parâmetros do URL)
│  └─ visuals/                TechnicalVisual (SVG), MediaFrame, SectorIcon
├─ data/                      Conteúdo tipado (empresa, setores, produtos, projetos, notícias, navegação, redirecionamentos)
├─ lib/                       content.ts (acesso a dados), seo.ts, catalog.ts, format.ts, site.ts, contact/*
├─ types/content.ts           Modelos de conteúdo
└─ styles/globals.css         Tokens e estilos base
tests/                        Testes unitários e de componentes
scripts/                      e2e.mjs, check-links.mjs
```

## Estratégia de conteúdo

- Todo o conteúdo vive em `src/data/*.ts`, tipado por `src/types/content.ts`.
- Os componentes nunca importam dados diretamente para listagens: usam `src/lib/content.ts`. Para migrar para um CMS headless (ex.: Sanity), basta reimplementar estas funções (tornando-as assíncronas) e mapear os documentos para os mesmos tipos.
- Campos opcionais (`phone`, `scope`, `image`, `specifications`, `datasheets`) ficam vazios até haver informação validada; a interface adapta-se (oculta a secção ou remete para o departamento).

### Como acrescentar…

| Conteúdo | Passos |
| --- | --- |
| Fotografia de um setor/produto/projeto | Colocar o ficheiro em `public/images/` e preencher `image: { src, alt, width, height }` no registo. O `MediaFrame` passa a usar `next/image` (AVIF/WebP). |
| Ficha técnica PDF | Colocar em `public/documents/` e acrescentar `{ title, href: '/documents/…pdf', sizeLabel }` em `datasheets`. |
| Especificações | Preencher `specifications: [{ label, value }]` — é gerada a tabela responsiva. |
| Notícia | Acrescentar um objeto em `src/data/news.ts` com `date` e `datePrecision` corretos. A página e o sitemap são gerados automaticamente. |
| Telefone de departamento | Preencher `phone` em `src/data/company.ts` (aparece em contactos e no Schema.org). |

## Componentes principais

- **Header** — sticky, submenu das áreas de negócio (clique, hover, Escape, clique fora, devolução de foco), menu mobile com bloqueio de scroll, *focus trap* e fecho ao navegar; `aria-current` na página ativa. Os painéis são posicionados em `absolute` relativamente ao header (o `backdrop-filter` impede `position: fixed` correto nos descendentes).
- **PageHero** — hero das páginas internas com breadcrumbs (visíveis + `BreadcrumbList`).
- **MediaFrame / TechnicalVisual** — fotografia autorizada quando existe, ilustração técnica vetorial caso contrário.
- **CatalogExplorer** — pesquisa sem acentos, filtro por área com contagens, URL partilhável (`?setor=&q=`), estado vazio; versão agrupada renderizada no servidor como *fallback* (conteúdo indexável sem JavaScript).
- **ContactForm** — validação por campo (ao sair do campo e ao submeter), resumo de erros, foco no primeiro erro, estados de envio/sucesso/erro, honeypot, pré-preenchimento a partir do URL e alternativa por e-mail quando o envio não está ativo.

## Formulário de contacto (servidor)

`POST /api/contact`:

1. Verificação de origem (mesmo domínio) e `Content-Type`.
2. Limitação de pedidos por IP (5 em 10 minutos, em memória).
3. Limite de tamanho (20 KB) e JSON válido.
4. Validação Zod (remoção de caracteres de controlo e de quebras de linha em campos de linha única).
5. Anti-spam: honeypot e tempo mínimo de preenchimento (3 s).
6. Sem `RESEND_API_KEY`/`CONTACT_FROM_EMAIL` → **503 `not_configured`** (nunca simula sucesso).
7. Envio via API REST da Resend para o departamento da área escolhida, com `reply_to` do visitante e HTML escapado.

## SEO

- Metadados por página (`pageMetadata`): título ≤ 70 caracteres, descrição, canonical, Open Graph, X Cards.
- JSON-LD: `Organization` (contactos, localizações), `WebSite`, `BreadcrumbList` em páginas internas, `NewsArticle`.
- `sitemap.xml` gerado a partir dos dados; `robots.txt` bloqueia indexação em pré-visualizações Vercel.
- Imagem Open Graph gerada (`/opengraph-image`).
- Redirecionamentos 308 das páginas `.php` antigas.
- Preparado para inglês: textos centralizados em dados; a internacionalização (`/en`) não foi implementada para evitar traduções incompletas.

## Segurança

- Cabeçalhos: CSP, HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP; `X-Powered-By` removido.
- Nenhuma credencial no cliente; variáveis de ambiente apenas no servidor (`.env.example`).
- Mapas Google carregados apenas por ação do utilizador (sem cookies de terceiros por omissão) — por isso não é necessário banner de cookies na configuração atual.

## Decisões relevantes

1. **Sem fotografias de stock nem geradas por IA**: as imagens de uma empresa industrial real devem ser autênticas. As ilustrações técnicas mantêm a qualidade visual sem induzir em erro.
2. **Sem páginas de detalhe de projeto**: não há informação validada suficiente; os projetos são apresentados numa página editorial única.
3. **Encaminhamento por área**: o visitante escolhe a área; o servidor decide o destinatário (o e-mail de destino nunca vem do cliente).
4. **Geração estática integral** (exceto a API): máxima rapidez, custo de alojamento mínimo.
