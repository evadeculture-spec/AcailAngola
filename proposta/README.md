# Proposta Smarty Squad × ACAIL Angola

Apresentação comercial (20 diapositivos + anexo) para o desenvolvimento de três websites:
ACAIL Angola, ACAIL Gás Solucions e ACAIL Pré-Fabricados.

## Entregáveis (`dist/`)

| Ficheiro | Descrição |
| --- | --- |
| `SmartySquad_ACAIL_Proposta_Ecossistema_Digital.pptx` | PowerPoint editável (16:9), com notas do apresentador |
| `SmartySquad_ACAIL_Proposta_Ecossistema_Digital.pdf` | Versão PDF |
| `web/index.html` (+ `SmartySquad_ACAIL_Proposta_Web.zip`) | Versão web navegável (← → espaço, F para ecrã inteiro, deslizar em telemóvel) |

## Regenerar

```bash
npm install
./build.sh               # ilustrações/mockups + PPTX + PDF + pré-visualizações
SKIP_ASSETS=1 ./build.sh # só PPTX/PDF
```

- `src/scenes.js` — ilustrações vetoriais conceptuais
- `src/render-assets.js` — mockups das homepages (HTML → PNG via Chromium)
- `src/build.js` — apresentação (PptxGenJS). Cores do tema em `HEX`/`THEME`.

## Antes de enviar ao cliente

- Inserir valores no diapositivo 18 (campos "A definir após levantamento de requisitos").
- Substituir os contactos entre `[ ]` no diapositivo 20.
- Substituir as cores provisórias pelos códigos oficiais ACAIL / ACAIL Gás (tokens `ang`, `gas`, `conc`) e
  os placeholders "LOGÓTIPO" dos mockups pelos logótipos oficiais.
- Tipografia: Inter. Se não estiver instalada no computador de apresentação, o PowerPoint substitui-a;
  o PDF mantém o design original.
