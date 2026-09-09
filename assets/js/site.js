/* Preferred Capital Partners — site behaviour
   No dependencies. Everything degrades to a readable page without JS. */
(function () {
  'use strict';

  /* The head script adds `js` (which arms every hidden reveal state) and a
     timer that strips it again. Reaching here means this file loaded, so the
     timer is cancelled and the reveals stay armed. */
  if (window.PCP_REVEAL_FAILSAFE) { clearTimeout(window.PCP_REVEAL_FAILSAFE); }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 1. Hero entrance -------------------------------------------------
     One orchestrated moment on first paint: the image settles from a 1.07
     scale while the copy staggers in. Purpose: explanation — it establishes
     the hierarchy of the page before the visitor starts reading. */
  var hero = document.querySelector('.hero');
  if (hero) {
    var startHero = function () { hero.classList.add('is-ready'); };
    requestAnimationFrame(function () { requestAnimationFrame(startHero); });
    /* rAF is paused in background tabs; this guarantees the copy is never
       left at opacity 0 if the frame callback never arrives. */
    window.setTimeout(startHero, 800);
  }

  /* ---- 1b. Hero video ---------------------------------------------------
     Autoplay is declared in the markup so the browser can start it as early as
     possible; this only intervenes when the visitor has asked for less motion,
     in which case the poster frame stands in for the footage. */
  var heroVideo = document.querySelector('.hero__video');
  if (heroVideo) {
    var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var thin = !!conn && (conn.saveData === true || /(^|-)(2g|slow-2g)$/.test(conn.effectiveType || ''));
    var handset = window.matchMedia('(max-width: 700px)').matches;

    /* A 1.5 MB background loop is not worth a cellular download or the battery
       it costs. On handsets, metered connections and reduced-motion the poster
       frame stands in and the sources are never fetched. */
    if (reduceMotion || thin || handset) {
      heroVideo.removeAttribute('autoplay');
      Array.prototype.forEach.call(heroVideo.querySelectorAll('source'), function (s) {
        s.parentNode.removeChild(s);
      });
      heroVideo.load();
      heroVideo.pause();
    }
  }

  /* ---- 2. Sticky nav state ---------------------------------------------
     Transparent over the hero, solid once the visitor scrolls past it. */
  var nav = document.querySelector('.nav');
  if (nav) {
    var threshold = hero ? 80 : 20;
    var ticking = false;
    var setNavState = function () {
      nav.classList.toggle('is-stuck', window.scrollY > threshold);
      ticking = false;
    };
    setNavState();
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(setNavState); ticking = true; }
    }, { passive: true });
  }

  /* ---- 3. Mobile drawer ------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var drawer = document.getElementById('site-drawer');
  if (toggle && drawer) {
    var lastFocus = null;
    var openDrawer = function () {
      lastFocus = document.activeElement;
      drawer.classList.add('is-open');
      drawer.removeAttribute('aria-hidden');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      var first = drawer.querySelector('a, button');
      if (first) { first.focus(); }
    };
    var closeDrawer = function () {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (lastFocus) { lastFocus.focus(); }
    };
    toggle.addEventListener('click', function () {
      if (toggle.getAttribute('aria-expanded') === 'true') { closeDrawer(); } else { openDrawer(); }
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a') || e.target.closest('.drawer__close')) { closeDrawer(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) { closeDrawer(); }
    });
  }

  /* ---- 3b. Interior page header entrance --------------------------------
     Same orchestration as the hero, so arriving on any page feels the same. */
  var pagehead = document.querySelector('.pagehead');
  if (pagehead) {
    var startHead = function () { pagehead.classList.add('is-ready'); };
    requestAnimationFrame(function () { requestAnimationFrame(startHead); });
    window.setTimeout(startHead, 800);
  }

  /* ---- 4. Scroll reveals ------------------------------------------------
     Purpose: prevent a jarring change — content arrives as the reader gets
     to it rather than being fully painted above and below the fold. The
     entrance classes are applied here rather than in the markup so the HTML
     stays free of presentation hooks. */

  /* The hidden state for headings and media now lives in the stylesheet and
     is matched by selector, so it applies at first paint. This script only
     decides WHEN each one arrives. */
  var revealTargets = document.querySelectorAll(
    '.reveal, [data-stagger], .rule, .steps, .rv-head, .rv-media, ' +
    'main section:not(.hero) h2, ' +
    '.media-frame, .om__media, .insight-card__media, .principal__media');

  var showAll = function () {
    Array.prototype.forEach.call(revealTargets, function (el) { el.classList.add('is-in'); });
  };

  if (!('IntersectionObserver' in window)) {
    showAll();
  } else {
    /* threshold 0 rather than a fraction: a section taller than the viewport
       can never reach a ratio threshold, and would sit hidden forever. The
       negative bottom margin is what delays the reveal until the element is
       properly on screen. */
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0 });

    var observeAll = function () {
      Array.prototype.forEach.call(revealTargets, function (el) {
        if (!el.classList.contains('is-in')) { io.observe(el); }
      });
    };
    observeAll();

    /* Coming back with the browser's back button restores the page from
       bfcache with every is-in class still on it, so nothing arrives a second
       time — the effect only returned on a hard refresh. Clear the flag from
       anything that is off screen again and re-arm those. */
    window.addEventListener('pageshow', function (e) {
      if (!e.persisted) { return; }
      Array.prototype.forEach.call(revealTargets, function (el) {
        var r = el.getBoundingClientRect();
        if (r.top > window.innerHeight || r.bottom < 0) { el.classList.remove('is-in'); }
      });
      observeAll();
    });

    /* Safety net: reveal only what is genuinely on screen, so content is never
       left invisible — but nothing below the fold is spent early. */
    var sweep = function () {
      Array.prototype.forEach.call(revealTargets, function (el) {
        if (el.classList.contains('is-in')) { return; }
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92 && r.bottom > 0) {
          el.classList.add('is-in');
          io.unobserve(el);
        }
      });
    };
    window.setTimeout(sweep, 1500);
  }

  /* ---- 5. Accordion (FAQ) -----------------------------------------------
     Panels render open so the content is readable and indexable without JS;
     this closes them on init and animates height on toggle. Purpose: state
     indication — the panel grows from the question that produced it. */
  var accButtons = document.querySelectorAll('.acc__btn');

  function collapse(panel) {
    if (reduceMotion) { panel.style.height = '0px'; return; }
    panel.style.height = panel.getBoundingClientRect().height + 'px';
    panel.getBoundingClientRect();
    requestAnimationFrame(function () { panel.style.height = '0px'; });
  }

  function expand(panel) {
    var target = panel.scrollHeight;
    if (reduceMotion) { panel.style.height = 'auto'; return; }
    panel.style.height = target + 'px';
    var done = function (e) {
      if (e.propertyName !== 'height') { return; }
      panel.style.height = 'auto';
      panel.removeEventListener('transitionend', done);
    };
    panel.addEventListener('transitionend', done);
  }

  Array.prototype.forEach.call(accButtons, function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) { return; }
    panel.style.height = '0px';
    panel.setAttribute('data-open', 'false');
    btn.addEventListener('click', function () {
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      panel.setAttribute('data-open', String(!isOpen));
      if (isOpen) { collapse(panel); } else { expand(panel); }
    });
  });

  /* ---- 5b. Interactive map ----------------------------------------------
     Chips and map points are two views of one selection, so both directions
     are wired: pointing at either highlights both. Purpose: state indication,
     and it lets the labels stay out of the map until they are asked for. */
  var mapFig = document.querySelector('[data-usmap]');
  if (mapFig) {
    var points = mapFig.querySelectorAll('.usmap__market');
    var chips = mapFig.querySelectorAll('.usmap-chip');

    var setActive = function (slug, on) {
      Array.prototype.forEach.call(points, function (g) {
        if (g.getAttribute('data-market') === slug) { g.classList.toggle('is-active', on); }
      });
      Array.prototype.forEach.call(chips, function (b) {
        if (b.getAttribute('data-market') === slug) { b.classList.toggle('is-active', on); }
      });
    };

    var bind = function (el) {
      var slug = el.getAttribute('data-market');
      var on = function () { setActive(slug, true); };
      var off = function () { setActive(slug, false); };
      el.addEventListener('mouseenter', on);
      el.addEventListener('mouseleave', off);
      el.addEventListener('focus', on);
      el.addEventListener('blur', off);
      /* Touch has no hover, so a tap latches the label until another is tapped. */
      el.addEventListener('click', function () {
        var already = el.classList.contains('is-active');
        Array.prototype.forEach.call(points, function (g) { g.classList.remove('is-active'); });
        Array.prototype.forEach.call(chips, function (b) { b.classList.remove('is-active'); });
        if (!already) { setActive(slug, true); }
      });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
      });
    };

    Array.prototype.forEach.call(points, bind);
    Array.prototype.forEach.call(chips, bind);
  }

  /* ---- 6. Forms ---------------------------------------------------------
     Front-end validation + a success state. Wire `action` to your CRM or
     form endpoint before launch — see README.md. */
  var forms = document.querySelectorAll('form[data-validate]');
  Array.prototype.forEach.call(forms, function (form) {
    form.addEventListener('submit', function (e) {
      var invalid = null;
      var fields = form.querySelectorAll('input[required], select[required], textarea[required]');
      Array.prototype.forEach.call(fields, function (field) {
        var wrap = field.closest('.field') || field.closest('.checkline');
        var ok = field.checkValidity();
        if (wrap) { wrap.classList.toggle('has-error', !ok); }
        if (!ok && !invalid) { invalid = field; }
      });
      if (invalid) {
        e.preventDefault();
        invalid.focus();
        return;
      }
      if (!form.getAttribute('action')) {
        e.preventDefault();
        var success = form.parentNode.querySelector('.form-success');
        if (success) {
          form.hidden = true;
          success.classList.add('is-visible');
          success.setAttribute('tabindex', '-1');
          success.focus();
        }
      }
    });
    form.addEventListener('input', function (e) {
      var wrap = e.target.closest('.field') || e.target.closest('.checkline');
      if (wrap && wrap.classList.contains('has-error') && e.target.checkValidity()) {
        wrap.classList.remove('has-error');
      }
    });
  });

  /* ---- 7. Footer year --------------------------------------------------- */
  var years = document.querySelectorAll('[data-year]');
  Array.prototype.forEach.call(years, function (el) { el.textContent = new Date().getFullYear(); });

  /* Expose for debugging in the browser console. */
  window.PCP = { reduceMotion: reduceMotion };
})();
