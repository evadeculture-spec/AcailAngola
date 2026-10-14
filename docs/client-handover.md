# Entrega ao cliente — ACAIL Angola

## Concluído

- Website institucional multipágina em português, pronto para publicação na Vercel.
- **Páginas**: Início; A Empresa; Áreas de Negócio (agregador + 6 páginas de setor); Produtos e Soluções (catálogo com pesquisa e filtros + 38 páginas de produto/serviço); Projetos; Notícias (arquivo + artigo); Contactos; Política de Privacidade e Política de Cookies (rascunho assinalado); página 404 e página de erro.
- **Funcionalidades**: menu responsivo com submenu das áreas de negócio; menu mobile; breadcrumbs; catálogo pesquisável com URL partilhável; pedidos de informação pré-preenchidos a partir de qualquer produto ou setor; formulário com validação no cliente e no servidor, anti-spam, limitação de pedidos e encaminhamento por departamento; mapas carregados a pedido; redirecionamentos das páginas antigas.
- **SEO técnico**: metadados por página, Open Graph, dados estruturados, sitemap, robots, canonical.
- **Qualidade**: 42 testes unitários, 18 testes E2E, verificação de ligações, Lighthouse ≥ 93 (mobile) / 100 (desktop). Ver `docs/qa-report.md`.

## Necessita de aprovação ou de material da ACAIL

Por ordem de impacto na apresentação:

1. **Logótipo oficial (SVG)** e **HEX do azul institucional** — substituição em dois pontos (`src/components/ui/logo.tsx`, tokens em `src/styles/globals.css`).
2. **Fotografias autorizadas** das instalações (Viana, Mazozo, Catumbela), produtos e obras. Recomendado: 1 fotografia de destaque por setor, 1 para o hero, 1 por projeto (mínimo 2400 px de largura).
3. **Telefones** de cada departamento e confirmação dos e-mails e da correspondência área → departamento.
4. **Missão e visão**: os textos atuais são uma proposta de redação.
5. **Âmbito do fornecimento** em cada projeto de referência.
6. **Fichas técnicas PDF** e especificações dos produtos principais.
7. **Notícias históricas** com datas originais.
8. **Dados jurídicos** e validação das páginas legais.
9. **Credenciais de envio de e-mail** (Resend) e verificação do domínio — até lá, o formulário indica os e-mails dos departamentos.

A lista completa está em `docs/content-audit.md` §6.

## Segunda fase (sugestões)

- CMS headless (ex.: Sanity) para a equipa gerir notícias, produtos e projetos — a camada `src/lib/content.ts` já isola o acesso aos dados.
- Versão em inglês (`/en`) com traduções profissionais.
- Páginas de detalhe de projeto com galeria, quando houver informação validada.
- Fichas de produto com tabelas técnicas completas e downloads por referência.
- Área de imprensa / downloads institucionais (catálogo geral, apresentação da empresa).
- Integração de CRM para os pedidos do formulário; análise de audiências com consentimento.
- Proteção global de pedidos (Vercel Firewall / Redis) e monitorização de erros.
