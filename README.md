# profile

Currículo online de **Guilherme Feitoza de Sousa Lima** — Engenheiro de Software
Full Stack · Web & Mobile.

No ar em **<https://guilhermefeitosa66.github.io/profile/>**

Página estática, sem build e sem dependências: HTML, CSS e um arquivo de JavaScript
de ~120 linhas. Feita para ser lida no navegador **e** impressa (`Ctrl/Cmd + P` →
*Salvar como PDF*), saindo em **uma única página A4** com layout próprio de impressão.

## O que ela faz

**Paleta sorteada a cada visita.** São oito paletas, uma para cada cor de camisa
das fotos em `assets/img`. Um script curto no `<head>` sorteia uma antes da
primeira pintura e escreve em `html[data-palette]`; o CSS faz o resto — cores,
foto, favicon e a cor da barra do navegador mudam juntas. O botão redondo na
barra de ações sorteia outra sem recarregar.

**Português e inglês.** Os dois idiomas estão no HTML; o CSS esconde um deles.
Isso mantém a página funcionando sem JavaScript, imprime no idioma que está na
tela e deixa os dois textos indexáveis. A escolha fica salva no `localStorage`;
na primeira visita vale o idioma do navegador.

**Parâmetros de URL**, para compartilhar um link sempre igual:

| parâmetro | valores |
|---|---|
| `?palette=` | `amber` `orange` `ruby` `rose` `violet` `ocean` `teal` `forest` |
| `?lang=` | `pt` `en` |

Exemplo: <https://guilhermefeitosa66.github.io/profile/?lang=en&palette=ocean>

## Estrutura

```
.
├── index.html          # a página inteira — conteúdo nos dois idiomas
├── assets/
│   ├── css/curriculo.css   # tema, layout de tela e layout de impressão
│   ├── js/app.js           # idioma, sorteio de paleta, favicon, imprimir
│   └── img/                # uma foto por paleta + favicon (ver README de lá)
├── _local/             # PDFs de origem do CV — IGNORADO pelo git
└── .nojekyll           # desliga o Jekyll no GitHub Pages
```

`_local/` está no `.gitignore`: fica só na máquina e não sobe para o repositório.

## Editar o conteúdo

Tudo em `index.html`, HTML puro. Cada cargo é um `<div class="job">`, cada
competência um `<div class="skill" data-level="1..5">` — o `data-level` já pinta
a barra e o rótulo. O texto em português leva `lang="pt"` e o equivalente em
inglês `lang="en"`; **os dois precisam ser editados juntos**, senão um idioma
fica desatualizado.

Depois de mexer, confira se ainda cabe em uma página:

```bash
python3 -m http.server 8000 &
google-chrome --headless=new --print-to-pdf=/tmp/cv.pdf --no-pdf-header-footer \
  http://localhost:8000/index.html && pdfinfo /tmp/cv.pdf | grep Pages
```

## Editar as cores

Cada paleta é **um par de matizes** no fim do bloco de variáveis do CSS:

```css
html[data-palette="ocean"] { --h: 248; --h2: 268; --photo: url('../img/profile-blue.jpg'); }
```

Todo o resto — acento, tinta, neutros, rampa de proficiência — é derivado desses
dois números em `oklch()`, com as claridades fixas e já calibradas: **todo texto
fica acima de 4,5:1 de contraste nas oito paletas**. Mudar só a matiz é seguro;
mudar as claridades pede uma conferência de contraste.

Duas famílias de acento convivem, porque o mesmo acento aparece sobre o papel
branco e sobre a coluna escura:

- `--accent` — tom médio, para o que fica **sobre o branco**;
- `--accent-bright` — tom claro, só **sobre o fundo escuro**, ou com `--ink` por cima.

Os tons claros nunca carregam texto branco. Se for mexer, mantenha essa separação.

Para acrescentar uma paleta: adicione a foto em `assets/img`, uma linha
`html[data-palette="..."]` no CSS e o nome no array `PALETTES` — que aparece em
dois lugares, no script do `<head>` e em `assets/js/app.js`.

## Rodar localmente

Abrir o `index.html` no navegador já funciona. Se preferir servir:

```bash
python3 -m http.server 8000
```

## Publicar

O deploy é o push: **Settings → Pages** aponta para a branch `main`, raiz do
repositório. Em cerca de um minuto a mudança está no ar.

## Gerar o PDF

Abrir a página → `Ctrl/Cmd + P` → destino **Salvar como PDF**, papel **A4**,
margens **padrão** e **desmarcar** "Cabeçalhos e rodapés". O CSS de impressão
esconde a barra de ações e está calibrado para sair em uma página, no idioma e
na paleta que estiverem na tela.
