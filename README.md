# ACAIL Angola — Website institucional

Proposta de novo website institucional da ACAIL Angola, empresa industrial angolana constituída em 2005 com seis áreas de negócio: Produtos Siderúrgicos; Gases Industriais, Medicinais e Alimentares; Saúde; Pré-Fabricação em Betão; Inertes; Serviços Industriais.

## Tecnologias

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4 · Zod 4 · lucide-react · Vitest + Testing Library · playwright-core (E2E).

## Requisitos

- Node.js ≥ 20.9 e npm
- Para os testes E2E: Chromium/Chrome instalado (defina `CHROMIUM_PATH` se não estiver num caminho padrão)

## Instalação e desenvolvimento

```bash
npm install
cp .env.example .env.local   # opcional
npm run dev                  # http://localhost:3000
```

## Comandos

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm start` | Servir o build de produção |
| `npm run typecheck` | Gera tipos de rotas e valida TypeScript |
| `npm run lint` | ESLint |
| `npm test` | Testes unitários e de componentes |
| `npm run test:e2e` | Testes E2E em Chromium (requer `npm run build`; inicia o servidor na porta 3210 ou usa `BASE_URL`) |
| `npm run check:links` | Verifica ligações internas e âncoras (requer servidor; `BASE_URL`, por omissão `http://localhost:3100`) |
| `npm run validate` | typecheck + lint + testes + build |

## Variáveis de ambiente

Ver `.env.example`.

| Variável | Descrição |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canónico (SEO, sitemap, Open Graph) |
| `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` | Ativam o envio do formulário. Sem elas, o formulário **não simula envios**: informa que o envio não está ativo e indica o e-mail do departamento. |
| `CONTACT_OVERRIDE_TO` | Opcional: destinatário único para testes |

## Publicação na Vercel

1. Importar o repositório na Vercel (framework Next.js detetado automaticamente).
2. Definir `NEXT_PUBLIC_SITE_URL` (e, quando disponíveis, as variáveis de e-mail).
3. Deploy. Configurar o domínio em *Settings → Domains*.

Detalhes, domínio e migração SEO em [`docs/deployment.md`](docs/deployment.md).

## Documentação

- [`docs/architecture.md`](docs/architecture.md) — organização do código, componentes e estratégia de conteúdo
- [`docs/content-audit.md`](docs/content-audit.md) — fontes, conteúdos migrados e informação por validar
- [`docs/deployment.md`](docs/deployment.md) — publicação, domínio e variáveis
- [`docs/client-handover.md`](docs/client-handover.md) — concluído, pendente e segunda fase
- [`docs/qa-report.md`](docs/qa-report.md) — testes executados e resultados

## Editar conteúdos

Os conteúdos estão em `src/data/` (empresa, setores, produtos, projetos, notícias). Ver "Como acrescentar…" em `docs/architecture.md`.
