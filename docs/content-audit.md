# Auditoria de conteúdos — ACAIL Angola

Data da auditoria: 14 de outubro de 2026

## 1. Acesso às fontes

| Fonte | Estado | Observação |
| --- | --- | --- |
| https://www.acailangola.com/ e páginas internas (`quem-somos.php`, `servicos.php`, `portfolio.php`, `noticias.php`, `contactos.php`) | **Não acessível** | O ambiente de desenvolvimento não conseguiu resolver o domínio (DNS `ENOTFOUND`) e o proxy de saída recusou a ligação. Não foi possível ler o HTML, as imagens, o logótipo nem os PDF. |
| Arquivo web (web.archive.org) | Não acessível | Bloqueado no ambiente. |
| Pesquisa web (motor de pesquisa) | Parcial | Devolveu resultados que confirmam: constituição em 2005, seis áreas de atividade, localização no Pólo Industrial de Viana e uma notícia do Ver Angola (agosto de 2016). As páginas de origem não puderam ser abertas. |
| Briefing do cliente | Disponível | Base principal do conteúdo publicado. |

**Consequência:** todo o conteúdo foi construído a partir do briefing e das confirmações externas acima. Antes da publicação, cada item da secção 6 deve ser confrontado com o website oficial e validado pela ACAIL Angola.

## 2. Identidade visual

| Elemento | Estado | Decisão aplicada |
| --- | --- | --- |
| Logótipo oficial | Não obtido | Assinatura tipográfica provisória ("ACAIL / ANGOLA" com barra azul) em `src/components/ui/logo.tsx`. Não imita o logótipo real. Substituir pelo SVG oficial. |
| Cor institucional | Não extraída | Azul provisório `#0F4C8F` (`--color-brand-600`), com escala completa em `src/styles/globals.css`. Basta alterar os tokens `--color-brand-*` para aplicar o HEX oficial em todo o website. |
| Favicon | Provisório | `src/app/icon.svg` (inicial "A" sobre azul). Substituir pelo símbolo oficial. |
| Tipografia | Definida | Manrope (títulos) e Inter (texto), servidas localmente via `@fontsource-variable` (sem pedidos à Google). |
| Fotografias | Não obtidas / direitos não confirmados | Ilustrações técnicas vetoriais próprias (`src/components/visuals/technical-visual.tsx`). Não são fotografias de stock nem imagens geradas por IA. O componente `MediaFrame` passa a mostrar fotografias reais logo que sejam acrescentadas aos dados (`image`). |

## 3. Estrutura do website antigo (segundo o briefing)

- Início, Quem Somos, Serviços, Portfólio, Notícias, Contactos.
- Páginas internas de categorias de produtos, saúde, pré-fabricação e inertes (URLs não confirmados).

Mapa de redirecionamentos para a nova estrutura: `src/data/redirects.ts` (ver `docs/deployment.md`).

## 4. Conteúdo migrado e respetiva fonte

| Conteúdo | Fonte | Onde está |
| --- | --- | --- |
| Constituição em 2005 | Briefing + pesquisa web | `src/data/company.ts` |
| Seis áreas de negócio e respetivas famílias | Briefing | `src/data/sectors.ts` |
| Famílias de produtos e serviços (38 registos) | Briefing | `src/data/products.ts` |
| Valores e compromisso Qualidade, Segurança e Ambiente | Briefing | `src/data/company.ts`, `/empresa` |
| Localizações (Viana, Mazozo, Catumbela) | Briefing | `src/data/company.ts` |
| E-mails dos departamentos | Briefing | `src/data/company.ts` |
| Projetos de referência (4) | Briefing | `src/data/projects.ts` |
| Notícia de agosto de 2016 (Ver Angola) | Pesquisa web (título e URL da notícia) | `src/data/news.ts` |

## 5. Conteúdo redigido (proposta, a aprovar)

Textos escritos para o novo website a partir dos factos acima, sem acrescentar dados empresariais:

- Missão e visão (`/empresa`) — **redação proposta**; substituir pelo texto oficial se existir.
- Descrições das áreas de negócio e das famílias de produtos.
- Descrições e aplicações correntes de cada produto (conhecimento técnico geral do tipo de produto; não incluem dimensões, classes, normas ou referências).
- Descrições das obras dos projetos (localização pública de cada obra).

## 6. Informação por validar (antes da publicação)

| # | Item | Responsável |
| --- | --- | --- |
| 1 | Logótipo oficial em SVG e autorização de uso | ACAIL |
| 2 | HEX oficial do azul institucional e de eventuais cores secundárias | ACAIL / design |
| 3 | Telefones de cada departamento (não publicados por falta de confirmação) | ACAIL |
| 4 | Confirmação dos e-mails dos departamentos e correspondência área → departamento (ex.: Produtos Siderúrgicos encaminhados para `geral@`; Inertes e Serviços para `geral@`) | ACAIL |
| 5 | Moradas completas de Mazozo e Catumbela e coordenadas exatas | ACAIL |
| 6 | Âmbito do fornecimento da ACAIL em cada projeto de referência (campo `scope`) e fotografias autorizadas | ACAIL |
| 7 | Texto oficial de missão, visão e política de qualidade | ACAIL |
| 8 | Fotografias das instalações, produtos e obras (com direitos de utilização) | ACAIL |
| 9 | Catálogos PDF e fichas técnicas (colocar em `public/documents/` e referenciar em `datasheets`) | ACAIL |
| 10 | Especificações técnicas por produto (campo `specifications`) | ACAIL |
| 11 | Notícias históricas (distinções em feiras, eventos), com datas originais e autorização | ACAIL |
| 12 | Denominação social completa, NIF e dados para as páginas legais | ACAIL / jurídico |
| 13 | Validação jurídica das Políticas de Privacidade e de Cookies | Jurídico |
| 14 | Lista completa de URLs antigos (rastreio do domínio atual) para os redirecionamentos | Equipa técnica |
| 15 | Eventuais certificações (nenhuma foi publicada por não estar confirmada) | ACAIL |

## 7. Falhas de usabilidade do website atual

Não foi possível inspecionar o website atual. A proposta resolve, por conceção, os problemas típicos de websites institucionais desta geração (páginas `.php` sem URLs semânticos, ausência de catálogo pesquisável, contactos dispersos, ausência de dados estruturados e de otimização mobile). Esta secção deve ser completada com uma inspeção direta assim que o domínio estiver acessível.

## 8. Regras editoriais aplicadas

- Nenhum número de trabalhadores, faturação, capacidade de produção, certificação ou parceria foi publicado.
- Projetos apresentados como referências históricas, sem afirmar contratos atuais nem âmbitos não confirmados.
- Notícias apenas com data e fonte confirmadas; a precisão da data é respeitada ("agosto de 2016", sem inventar o dia).
- Campos técnicos vazios não são apresentados; a interface remete para o departamento comercial.
