# assets/img

Uma foto por paleta — a mesma pose, camisas de cores diferentes. O CSS escolhe
qual usar através da variável `--photo` de cada `html[data-palette=...]`, então
trocar a paleta troca a foto junto com as cores, sem JavaScript e sem flash.

| arquivo | paleta |
|---|---|
| `profile-yellow.jpg` | `amber` |
| `profile-orange.jpg` | `orange` |
| `profile-red.jpg`    | `ruby` |
| `profile-white.jpg`  | `rose` |
| `profile-purple.jpg` | `violet` |
| `profile-blue.jpg`   | `ocean` |
| `profile-black.jpg`  | `teal` |
| `profile-green.jpg`  | `forest` |

Todas em 640×640, JPEG qualidade 82 — o avatar aparece a 172 px na tela e 26 mm
no papel, então não há motivo para arquivos maiores.

- `profile.jpeg` — versão 1024×1024 usada só no `og:image` (prévia em redes sociais).
- `favicon.svg` — ícone estático de reserva. Com JavaScript ligado, o `app.js`
  regenera o favicon nas cores da paleta sorteada.

O recorte é circular; para trocar as fotos, mantenha o rosto no terço superior
ou ajuste `background-position` na regra `.avatar` do CSS.
