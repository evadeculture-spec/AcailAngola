# Publicação (Vercel)

## 1. Pré-requisitos

- Repositório no GitHub (este projeto).
- Conta Vercel com acesso ao repositório.
- Node.js ≥ 20.9 (a Vercel usa a versão LTS por omissão).

## 2. Criar o projeto

1. Em vercel.com → **Add New… → Project** → importar o repositório.
2. Framework: **Next.js** (detetado automaticamente). Build: `next build`. Output: automático.
3. Definir as variáveis de ambiente (secção 3) e fazer **Deploy**.

Cada *push* gera uma pré-visualização; o ramo de produção publica o website. Nas pré-visualizações, `robots.txt` bloqueia a indexação.

## 3. Variáveis de ambiente

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `SITE_NOINDEX` | Não | `1` bloqueia a indexação (robots.txt e meta `noindex`). Usar em demonstrações; remover na produção real. |
| `NEXT_PUBLIC_SITE_URL` | Sim (produção) | URL canónico sem barra final, ex.: `https://www.acailangola.com`. Usado em canonical, sitemap, Open Graph e JSON-LD. Numa demonstração em `*.vercel.app`, definir com esse endereço. |
| `RESEND_API_KEY` | Para ativar o formulário | Chave da API Resend (resend.com). |
| `CONTACT_FROM_EMAIL` | Para ativar o formulário | Remetente num domínio verificado na Resend, ex.: `Website ACAIL Angola <website@acailangola.com>`. |
| `CONTACT_OVERRIDE_TO` | Não | Envia todas as mensagens para um único endereço (homologação). |

Sem `RESEND_API_KEY` e `CONTACT_FROM_EMAIL`, o formulário responde que o envio não está ativo e apresenta o e-mail do departamento — não há envios simulados.

### Ativar o envio de e-mail

1. Criar conta na Resend e adicionar o domínio `acailangola.com`.
2. Publicar no DNS os registos SPF/DKIM indicados pela Resend e aguardar a verificação.
3. Criar uma chave API com permissão de envio e configurá-la na Vercel.
4. Fazer *redeploy* e enviar uma mensagem de teste por cada área.

## 4. Domínio

1. Vercel → Project → **Settings → Domains** → adicionar `www.acailangola.com` e `acailangola.com` (redirecionar o domínio raiz para `www`).
2. No fornecedor de DNS: `CNAME www → cname.vercel-dns.com` e `A @ → 76.76.21.21` (confirmar os valores indicados pela Vercel).
3. O certificado HTTPS é emitido automaticamente.
4. **Atenção ao e-mail:** não alterar os registos MX existentes.

## 5. Migração do domínio atual (SEO)

1. Antes da troca, rastrear o website atual (ex.: Screaming Frog) e exportar todos os URLs indexados, incluindo páginas de categorias e notícias.
2. Acrescentar cada URL antigo a `src/data/redirects.ts` com o destino mais próximo (já incluídos: `index.php`, `quem-somos.php`, `servicos.php`, `portfolio.php`, `noticias.php`, `contactos.php`). URLs com parâmetros (ex.: `?id=`) exigem regras com `has` no `next.config.ts`.
3. Após a publicação, submeter `https://www.acailangola.com/sitemap.xml` na Google Search Console e acompanhar erros 404.

## 6. Proteção adicional (recomendado)

- O limitador de pedidos do formulário é em memória (por instância). Para proteção global, ativar regras de *rate limiting* na **Vercel Firewall** para `/api/contact` ou usar um armazenamento partilhado (ex.: Upstash Redis).
- Ativar Vercel Analytics apenas após decisão sobre consentimento (a versão atual não usa cookies).

## 7. Verificação após publicação

```bash
BASE_URL=https://<endereço> npm run test:e2e
BASE_URL=https://<endereço> npm run check:links
```

## 8. Demonstração atual (Vercel)

- Projeto `acail-angola` (equipa JD), ligado ao repositório GitHub; cada *push* publica automaticamente.
- URL: https://acail-angola-roan.vercel.app
- Variáveis: `NEXT_PUBLIC_SITE_URL=https://acail-angola-roan.vercel.app`, `SITE_NOINDEX=1`.
- Para a produção real: definir `NEXT_PUBLIC_SITE_URL=https://www.acailangola.com`, remover `SITE_NOINDEX`, ligar o domínio e fazer *redeploy*.

## 9. Netlify (alternativa)

O repositório inclui `netlify.toml` (build `npm run build`, Node 22). A Netlify instala automaticamente o adaptador Next.js (OpenNext), que suporta App Router, rotas de API, redirecionamentos e cabeçalhos definidos em `next.config.ts`.

1. app.netlify.com → **Add new site → Import an existing project → GitHub** → `evadeculture-spec/AcailAngola`.
2. Ramo: `feature/website-institucional` (ou `main`, quando existir). As definições de build são lidas do `netlify.toml`.
3. **Site configuration → Environment variables**: `NEXT_PUBLIC_SITE_URL` (ex.: `https://<site>.netlify.app`), `SITE_NOINDEX=1` para demonstração e, se aplicável, as variáveis de e-mail.
4. **Deploy site**. Após alterar variáveis, usar *Trigger deploy → Clear cache and deploy site*.

Alternativa por CLI: `npx netlify-cli login` seguido de `npx netlify-cli deploy --build --prod`.

Nota: o limitador de pedidos do formulário é em memória também na Netlify (funções por instância).
