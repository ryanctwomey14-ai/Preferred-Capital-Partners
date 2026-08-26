/* Preferred Capital Partners — investor assistant
   ============================================================================
   Answers questions from `agent-kb.js`. Two modes:

   1. Local (default). Retrieval over the knowledge base. No API key, no
      network call, works on a static host, and — the point on a securities
      site — it can only say what is written in the knowledge base. It cannot
      invent a return figure.

   2. Model-backed (optional). Set an endpoint and the same retrieved context
      is sent to your own serverless function, which calls the Claude API with
      your key server-side:

        window.PCP_AGENT = { endpoint: '/.netlify/functions/agent' };

      A ready function is in `functions/agent.js`. Never put an API key in
      this file or anywhere else the browser can read it.
   ========================================================================== */
(function () {
  'use strict';

  var KB = window.PCP_KB;
  if (!KB || !document.body) { return; }

  var CFG = window.PCP_AGENT || {};
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Retrieval --------------------------------------------------------
     Deliberately simple: token overlap against each entry's keyword list and
     answer text, with a synonym pass so everyday phrasing reaches the formal
     term. Good enough for a bounded domain, and entirely inspectable. */

  var STOP = ' a an the is are was were do does did i you my your we our it its of to in on for with and or if that this what how when where which can could would should will am be been about as at by from '.split(' ');

  var SYN = {
    money: 'capital funds', cash: 'capital distribution', pay: 'distribution paid',
    payout: 'distribution', profit: 'return returns', earn: 'return returns',
    make: 'return returns', cost: 'fees fee', charge: 'fees fee',
    tax: 'tax taxes k1 depreciation', taxes: 'tax k1 depreciation',
    safe: 'risk guarantee', risky: 'risk', lose: 'risk loss',
    out: 'liquidity exit', withdraw: 'liquidity redeem',
    buy: 'acquisition criteria', buying: 'acquisition criteria',
    where: 'markets location',
    runs: 'firm leadership', founder: 'firm leadership', ceo: 'firm leadership',
    start: 'process steps', begin: 'process steps',
    join: 'process accredited', apply: 'process accredited',
    retirement: 'ira 401k ubti', ira: 'ira 401k ubti retirement',
    minimum: 'minimum amount', least: 'minimum',
    long: 'hold period', quick: 'liquidity hold',
    report: 'reporting portal', update: 'reporting portal',
    apartment: 'multifamily', apartments: 'multifamily',
    building: 'multifamily property', buildings: 'multifamily property',
    landlord: 'operations management', manage: 'operations management'
  };

  function tokens(str) {
    var raw = String(str).toLowerCase().replace(/[^a-z0-9%$\s-]/g, ' ').split(/\s+/);
    var out = [];
    raw.forEach(function (w) {
      if (!w || w.length < 2 || STOP.indexOf(w) > -1) { return; }
      out.push(w);
      if (SYN[w]) { out = out.concat(SYN[w].split(' ')); }
      if (w.length > 4 && w.slice(-1) === 's') { out.push(w.slice(0, -1)); }
    });
    return out;
  }

  /* Words that appear in a keyword list but carry no domain signal. Left in,
     they let an unrelated question match on "like kind" or "for me". */
  var WEAK = (' me like kind work works working good bad new old over out back get got take much many ' +
              'thing things need want right first one two use used using make made come comes ' +
              'go goes give given put set say said know known thank thanks please ok okay yes no ' +
              'happens happen tell about help question questions who not ' +
              /* Brand and category words appear across the whole corpus, so they
                 identify nothing. Leaving them indexed let an unrelated question
                 match on the word "capital". */
              'capital invest investing investment investments investor investors money ' +
              'real estate property properties fund funds partner partners preferred ').split(' ');

  function keyTokens(str) {
    return tokens(str).filter(function (w) { return WEAK.indexOf(w) === -1; });
  }

  var INDEX = KB.entries.map(function (e) {
    return { entry: e, keys: keyTokens(e.k), body: tokens(e.a + ' ' + e.t) };
  });

  /* Inverse document frequency: a term listed by many entries cannot decide
     between them, so it is worth proportionally less. */
  var DF = {};
  INDEX.forEach(function (row) {
    var seen = {};
    row.keys.forEach(function (k) { if (!seen[k]) { seen[k] = 1; DF[k] = (DF[k] || 0) + 1; } });
  });
  var N = INDEX.length;
  function idf(w) { return Math.log(1 + N / (1 + (DF[w] || 0))); }

  /* Certain intents must not be left to word overlap. A request for a
     recommendation has to reach the disclaimer, not the entry that happens to
     share the word "invest". */
  var INTENT = [
    [/\b(should i|shall i|is this (a )?good|do you recommend|would you (invest|advise|recommend)|is it worth|what would you do|is this right for me|advice)\b/i, 'advice'],
    [/\b(guarantee|guaranteed|risk[- ]?free|can'?t lose|principal protected|insured|promise)\b/i, 'guarantee'],
    [/\b(speak (to|with)|talk to|contact you|reach (you|someone)|real person|human|book a call|get in touch)\b/i, 'contact'],
    [/\b(not accredited|non[- ]accredited|don'?t qualify|do not qualify)\b/i, 'notaccredited'],
    [/\b(i have (a|an)|to sell you|selling a|off.?market|bring you a deal|submit a deal|i represent)\b/i, 'broker']
  ];

  function byId(id) {
    for (var i = 0; i < KB.entries.length; i++) {
      if (KB.entries[i].id === id) { return KB.entries[i]; }
    }
    return null;
  }

  function search(question) {
    for (var i = 0; i < INTENT.length; i++) {
      if (INTENT[i][0].test(question)) {
        var forced = byId(INTENT[i][1]);
        if (forced) { return [{ entry: forced, score: 99 }]; }
      }
    }
    /* Unique terms only, so synonym expansion widens reach without inflating
       the score of whatever it expanded into. */
    var q = [], seenQ = {};
    tokens(question).forEach(function (w) { if (!seenQ[w]) { seenQ[w] = 1; q.push(w); } });
    if (!q.length) { return []; }

    var scored = INDEX.map(function (row) {
      var score = 0, keyHits = 0;
      q.forEach(function (w) {
        var weight = idf(w);
        if (row.keys.indexOf(w) > -1) { score += 3 * weight; keyHits++; }
        else if (w.length > 3 && row.keys.some(function (k) {
          return k.length > 3 && (k.indexOf(w) === 0 || w.indexOf(k) === 0);
        })) { score += 1.5 * weight; keyHits++; }
        else if (row.body.indexOf(w) > -1) { score += 0.35 * weight; }
      });
      return { entry: row.entry, score: score, keyHits: keyHits };
    });
    scored.sort(function (a, b) {
      if (Math.abs(b.score - a.score) > 0.001) { return b.score - a.score; }
      return b.keyHits - a.keyHits;
    });

    var top = scored[0];
    var next = scored[1];
    /* Three conditions to answer at all: a real keyword matched, the match is
       strong enough in absolute terms, and it is decisively ahead of the
       runner-up. A dead heat means the assistant cannot tell which answer was
       wanted, and saying so is better than guessing. */
    if (!top || top.keyHits === 0 || top.score < 3.2) { return []; }
    /* Decisiveness is only required of a weak match. Two closely-related
       entries scoring highly is normal — the second is offered as a follow-up
       rather than treated as ambiguity. */
    if (top.score < 6 && next && next.score > 0 && (top.score - next.score) < 0.4) { return []; }
    return scored.filter(function (s) { return s.keyHits > 0 && s.score >= 3.2; }).slice(0, 3);
  }

  /* ---- Answer assembly -------------------------------------------------- */

  function compose(question) {
    var hits = search(question);
    if (!hits.length) {
      return { html: KB.meta.fallback, related: [], confident: false };
    }
    var best = hits[0].entry;
    var html = best.a;
    if (best.guard) {
      html += '<span class="pcp-agent__caveat">' + KB.meta.caveat + '</span>';
    }
    if (best.src) {
      html += '<a class="pcp-agent__src" href="' + best.src + '">' + (best.label || 'Read more') +
              '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
              'stroke-width="2.5" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg></a>';
    }
    var related = hits.slice(1).map(function (h) { return h.entry; });
    return { html: html, related: related, confident: true };
  }

  /* ---- Optional model call ---------------------------------------------- */

  function askModel(question, history) {
    var hits = search(question);
    var context = (hits.length ? hits : INDEX.slice(0, 6).map(function (r) { return { entry: r.entry }; }))
      .map(function (h) { return h.entry.t + ' — ' + h.entry.a.replace(/<[^>]+>/g, ''); })
      .join('\n\n');
    return fetch(CFG.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: question, context: context, history: history.slice(-6) })
    })
      .then(function (r) { if (!r.ok) { throw new Error('HTTP ' + r.status); } return r.json(); })
      .then(function (data) {
        if (!data || !data.answer) { throw new Error('empty'); }
        return { html: data.answer, related: [], confident: true };
      });
  }

  /* ---- Interface --------------------------------------------------------- */

  var ICON_MARK =
    '<svg width="20" height="20" viewBox="0 0 30 30" fill="none" aria-hidden="true">' +
    '<rect x="1" y="14" width="5" height="15" fill="currentColor" opacity=".55"/>' +
    '<rect x="8.5" y="8" width="5" height="21" fill="currentColor" opacity=".8"/>' +
    '<rect x="16" y="11" width="5" height="18" fill="currentColor" opacity=".65"/>' +
    '<path d="M22.5 12.5 27 3.5m0 0-5.6 1.4M27 3.5l1.4 5.6" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="square"/></svg>';

  var root = document.createElement('div');
  root.className = 'pcp-agent';
  root.innerHTML =
    '<button class="pcp-agent__launch" type="button" aria-expanded="false" aria-controls="pcp-agent-panel">' +
      '<span class="pcp-agent__launch-mark" aria-hidden="true">' + ICON_MARK + '</span>' +
      '<span class="pcp-agent__launch-text">Ask about investing</span>' +
    '</button>' +
    '<section class="pcp-agent__panel" id="pcp-agent-panel" role="dialog" aria-modal="false" ' +
      'aria-label="Investor assistant" hidden>' +
      '<header class="pcp-agent__head">' +
        '<div>' +
          '<p class="pcp-agent__title">Investor assistant</p>' +
          '<p class="pcp-agent__sub">Automated &middot; not investment advice</p>' +
        '</div>' +
        '<button class="pcp-agent__close" type="button" aria-label="Close assistant">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
          'stroke-width="2" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>' +
        '</button>' +
      '</header>' +
      '<div class="pcp-agent__log" role="log" aria-live="polite" aria-atomic="false"></div>' +
      '<div class="pcp-agent__prompts"></div>' +
      '<form class="pcp-agent__form" autocomplete="off">' +
        '<label class="sr-only" for="pcp-agent-input">Ask a question</label>' +
        '<input class="pcp-agent__input" id="pcp-agent-input" type="text" ' +
          'placeholder="Ask about terms, tax, risk…" maxlength="300">' +
        '<button class="pcp-agent__send" type="submit" aria-label="Send question">' +
          '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
          'stroke-width="2" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>' +
        '</button>' +
      '</form>' +
      '<p class="pcp-agent__foot">Answers are drawn from published material and are qualified by the ' +
        '<a href="disclosures.html">offering documents and disclosures</a>.</p>' +
    '</section>';
  document.body.appendChild(root);

  var launch = root.querySelector('.pcp-agent__launch');
  var panel = root.querySelector('.pcp-agent__panel');
  var closeBtn = root.querySelector('.pcp-agent__close');
  var log = root.querySelector('.pcp-agent__log');
  var promptWrap = root.querySelector('.pcp-agent__prompts');
  var form = root.querySelector('.pcp-agent__form');
  var input = root.querySelector('.pcp-agent__input');
  var history = [];
  var started = false;

  /* Interior pages sit in /insights/, so relative links in the knowledge base
     need a prefix rather than being rewritten per page. */
  var depth = (location.pathname.replace(/\/[^\/]*$/, '/').match(/\//g) || []).length - 1;
  var prefix = depth > 0 ? '../'.repeat(depth) : '';
  function fixLinks(html) {
    if (!prefix) { return html; }
    return html.replace(/href="(?!https?:|mailto:|tel:|#|\/)/g, 'href="' + prefix);
  }

  function bubble(who, html, cls) {
    var el = document.createElement('div');
    el.className = 'pcp-agent__msg pcp-agent__msg--' + who + (cls ? ' ' + cls : '');
    el.innerHTML = who === 'you' ? escapeHtml(html) : fixLinks(html);
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }

  function renderPrompts(list) {
    promptWrap.innerHTML = '';
    list.forEach(function (p) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'pcp-agent__prompt';
      b.textContent = typeof p === 'string' ? p : p.label;
      b.addEventListener('click', function () { ask(b.textContent); });
      promptWrap.appendChild(b);
    });
  }

  function ask(question) {
    question = String(question || '').trim();
    if (!question) { return; }
    bubble('you', question);
    input.value = '';
    promptWrap.innerHTML = '';
    history.push({ role: 'user', content: question });

    var thinking = bubble('pcp', '<span class="pcp-agent__dots"><i></i><i></i><i></i></span>', 'is-thinking');

    var done = function (result) {
      thinking.classList.remove('is-thinking');
      thinking.innerHTML = fixLinks(result.html);
      log.scrollTop = log.scrollHeight;
      history.push({ role: 'assistant', content: result.html.replace(/<[^>]+>/g, '') });
      if (result.related && result.related.length) {
        renderPrompts(result.related.map(function (e) {
          return { label: e.t + ': ' + e.k.split(' ').slice(0, 2).join(' ') };
        }));
      } else {
        renderPrompts(KB.prompts.slice(0, 3));
      }
    };

    var local = function () { window.setTimeout(function () { done(compose(question)); }, reduceMotion ? 0 : 420); };

    if (CFG.endpoint) {
      askModel(question, history).then(done).catch(local);
    } else {
      local();
    }
  }

  function open() {
    panel.hidden = false;
    /* Two frames so the opening transition has a starting state to run from. */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { root.classList.add('is-open'); });
    });
    launch.setAttribute('aria-expanded', 'true');
    if (!started) {
      started = true;
      bubble('pcp', KB.meta.greeting);
      renderPrompts(KB.prompts);
    }
    window.setTimeout(function () { input.focus(); }, 220);
  }

  function close() {
    root.classList.remove('is-open');
    launch.setAttribute('aria-expanded', 'false');
    window.setTimeout(function () { panel.hidden = true; }, reduceMotion ? 0 : 260);
    launch.focus();
  }

  launch.addEventListener('click', function () {
    if (launch.getAttribute('aria-expanded') === 'true') { close(); } else { open(); }
  });
  closeBtn.addEventListener('click', close);
  form.addEventListener('submit', function (e) { e.preventDefault(); ask(input.value); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && root.classList.contains('is-open')) { close(); }
  });

  window.PCP_ASSISTANT = { ask: ask, open: open, close: close, search: search };
})();
