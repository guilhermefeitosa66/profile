/* =============================================================
   Currículo — comportamento de tela.

   A página não depende deste arquivo: o script no <head> já
   resolveu idioma e paleta antes da primeira pintura, e o resto
   é CSS. Aqui ficam só os controles da barra de ações.
   ============================================================= */

(function () {
  'use strict';

  var PALETTES = ['amber', 'orange', 'ruby', 'rose', 'violet', 'ocean', 'teal', 'forest'];
  var root = document.documentElement;

  /* ---------- idioma ------------------------------------------ */

  var TITLE = {
    pt: 'Guilherme Feitoza — Engenheiro de Software Full Stack | Web & Mobile',
    en: 'Guilherme Feitoza — Full Stack Software Engineer | Web & Mobile'
  };

  var MONTHS = {
    pt: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };

  var langButtons = document.querySelectorAll('[data-set-lang]');

  function setLang(lang, persist) {
    root.dataset.lang = lang;
    root.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.title = TITLE[lang];

    // só grava quando a troca partiu de um clique: assim a primeira
    // visita continua seguindo o idioma do navegador
    if (persist) {
      try { localStorage.setItem('cv-lang', lang); } catch (e) { /* modo anônimo */ }
    }

    langButtons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.setLang === lang));
    });

    var stamp = document.querySelector('[data-stamp-date]');
    if (stamp) {
      var now = new Date();
      stamp.textContent = MONTHS[lang][now.getMonth()] + ' ' + now.getFullYear();
    }
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () { setLang(btn.dataset.setLang, true); });
  });

  /* ---------- paleta ------------------------------------------ */

  var shuffle = document.querySelector('[data-shuffle]');
  if (shuffle) {
    shuffle.addEventListener('click', function () {
      var current = root.dataset.palette;
      var others = PALETTES.filter(function (p) { return p !== current; });
      root.dataset.palette = others[Math.floor(Math.random() * others.length)];
      paintChrome();
    });
  }

  /* ---------- cromo do navegador ------------------------------
     theme-color e favicon acompanham a paleta sorteada. Ambos
     precisam de cor literal, e os tokens do CSS são oklch(): o
     canvas faz a conversão. Se o navegador não converter, tudo
     fica como está no HTML — nada quebra. */

  var canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  var ctx = canvas.getContext('2d', { willReadFrequently: true });

  function hexOf(prop) {
    var raw = getComputedStyle(root).getPropertyValue(prop).trim();
    if (!raw || !ctx) return null;
    // pintar 1 px e ler o pixel é o caminho confiável: o canvas
    // devolve oklch() de volta se a gente só ler o fillStyle
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#000';
    ctx.fillStyle = raw;
    ctx.fillRect(0, 0, 1, 1);
    var d;
    try { d = ctx.getImageData(0, 0, 1, 1).data; } catch (e) { return null; }
    if (!d[3]) return null;
    return '#' + [d[0], d[1], d[2]].map(function (n) {
      return ('0' + n.toString(16)).slice(-2);
    }).join('');
  }

  function paintChrome() {
    var ink = hexOf('--ink');
    var a = hexOf('--bright-a');
    var b = hexOf('--bright-b');
    if (!ink || !a || !b) return;

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', ink);

    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="' + a + '"/>' +
      '<stop offset="1" stop-color="' + b + '"/>' +
      '</linearGradient></defs>' +
      '<rect width="64" height="64" rx="14" fill="' + ink + '"/>' +
      '<path d="M0 0h64v30L0 64Z" fill="url(#g)" opacity=".9"/>' +
      '<text x="32" y="45" text-anchor="middle" font-size="29" font-weight="700"' +
      ' font-family="Space Grotesk,Helvetica,Arial,sans-serif" fill="' + ink + '">GF</text>' +
      '</svg>';

    var icon = document.querySelector('link[rel="icon"]');
    if (icon) icon.setAttribute('href', 'data:image/svg+xml,' + encodeURIComponent(svg));
  }

  /* ---------- imprimir ---------------------------------------- */

  document.querySelectorAll('[data-print]').forEach(function (el) {
    el.addEventListener('click', function () { window.print(); });
  });

  /* ---------- início ------------------------------------------ */

  setLang(root.dataset.lang === 'en' ? 'en' : 'pt', false);
  paintChrome();
})();
