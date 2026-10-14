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
