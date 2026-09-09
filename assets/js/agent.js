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
  /* One endpoint path for both environments. Locally dev-server.py answers it;
     in production a Netlify redirect forwards /api/agent to the function. If
     neither is there the first call fails and the latch below stops us
     retrying, so every later question goes straight to the knowledge base
     with no wasted round trip. */
  if (!('endpoint' in CFG)) { CFG.endpoint = '/api/agent'; }
  var modelDown = false;
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
  function idf(w) {
    /* A term no entry lists carries no evidence, so it is damped rather than
       treated as the rarest and most decisive word in the corpus. Without
       this, one sloppy prefix match could clear the answer threshold alone. */
    if (!DF[w]) { return 0.9; }
    return Math.log(1 + N / (1 + DF[w]));
  }

  /* Certain intents must not be left to word overlap. A request for a
     recommendation has to reach the disclaimer, not the entry that happens to
     share the word "invest". */
  var INTENT = [
    [/\b(should i|shall i|is this (a )?good|do you recommend|would you (invest|advise|recommend)|is it worth|what would you do|is this right for me|advice)\b/i, 'advice'],
    [/\b(guarantee|guaranteed|risk[- ]?free|can'?t lose|principal protected|insured|promise)\b/i, 'guarantee'],
    [/\b(speak (to|with)|talk to|contact you|reach (you|someone)|real person|human|book a call|get in touch)\b/i, 'contact'],
    [/\b(not accredited|non[- ]accredited|don'?t qualify|do not qualify)\b/i, 'notaccredited'],
    [/\b(i have (a|an)|to sell you|selling a|off.?market|bring you a deal|submit a deal|i represent)\b/i, 'broker'],
    /* Every suggested prompt has to land. "Who can invest?" is weak or
       stopped in every word, so overlap alone can never answer it. And a
       few firm entries are now shadowed by the general ones that share
       their vocabulary, so the specific reading is pinned here. */
    [/\b(who can invest|who is (this|it) for|am i eligible|can i invest|eligib)/i, 'accredited'],
    [/\b(what markets|which markets|where do you (buy|invest|operate)|what cities|which cities)\b/i, 'markets'],
    [/\b(how does a syndication|what is a syndication|what\'?s a syndication)\b/i, 'g-syndication'],
    [/\b(cost seg|cost segregation|bonus depreciation)\b/i, 'g-costseg'],
    [/\b(506 ?\(?[bc]\)?|reg(ulation)? d)\b/i, 'g-regd'],
    [/\b(capital call)\b/i, 'g-capitalcall'],
    [/\b(cap rate|capitalisation rate|capitalization rate)\b/i, 'g-caprate'],
    /* These read as one term, but their head word is filtered as a brand
       or category word, so overlap sees only the generic half. */
    [/\b(preferred return|pref(erred)? hurdle|what is the pref)\b/i, 'preferred'],
    [/\b(irr|equity multiple|cash[- ]on[- ]cash)\b/i, 'g-irr'],
    [/\b(distribution|distributions|when do i get paid|when am i paid|payout)\b/i, 'distributions'],
    [/\b(agency debt|fannie|freddie|bridge (loan|debt)|rate cap|fixed rate|floating rate)\b/i, 'g-debt']
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
    keyTokens(question).forEach(function (w) { if (!seenQ[w]) { seenQ[w] = 1; q.push(w); } });
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
      html += '<a class="pcp-agent__src" href="' + best.src + '">' +
              'Read more: ' + (best.label || 'on the site') +
              '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
              'stroke-width="2.5" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg></a>';
    }
    var related = hits.slice(1).map(function (h) { return h.entry; });
    return { html: html, related: related, confident: true };
  }

  /* ---- Optional model call ---------------------------------------------- */

  function askModel(question, history) {
    /* Retrieval picks what is most relevant, but the model is also allowed to
       answer general questions about the asset class, so it gets a wider slice
       than the three entries the local composer would use. Firm-specific
       entries are labelled so the model knows which facts it may not vary. */
    var hits = search(question);
    var picked = hits.map(function (h) { return h.entry; });
    var ids = {};
    picked.forEach(function (e) { ids[e.id] = true; });

    /* Pad the remaining slots by alternating scopes. Filling in definition
       order sent thirteen firm entries and one general one, because the firm
       entries are declared first — which starved exactly the vocabulary a
       general question needs. */
    var isGeneral = function (e) { return e.id.indexOf('g-') === 0; };
    var pool = { firm: [], general: [] };
    INDEX.forEach(function (r) {
      if (ids[r.entry.id]) { return; }
      pool[isGeneral(r.entry) ? 'general' : 'firm'].push(r.entry);
    });
    var turn = 'general';
    while (picked.length < 14 && (pool.firm.length || pool.general.length)) {
      var from = pool[turn].length ? turn : (turn === 'firm' ? 'general' : 'firm');
      var e = pool[from].shift();
      if (!e) { break; }
      picked.push(e);
      ids[e.id] = true;
      turn = turn === 'firm' ? 'general' : 'firm';
    }
    var context = picked.map(function (e) {
      var scope = e.id.indexOf('g-') === 0 ? 'GENERAL' : 'FIRM';
      return '[' + scope + ' | ' + e.t + '] ' + e.a.replace(/<[^>]+>/g, '');
    }).join('\n\n');
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

  /* The firm's mark, same trace as the hero watermark. Sized in its own
     viewBox so it scales with the tile rather than being redrawn. */
  var ICON_MARK =
    '<svg viewBox="0 0 122 128" fill="none" aria-hidden="true" focusable="false">' +
      '<path d="M93 7 L91 41 L87 44 L85 59 L81 41 L66 31 Z" fill="#DFB877"/>' +
      '<path d="M20 84 L36 73 L36 118 L26 118 L20 111 Z" fill="#F1EFE8" opacity=".92"/>' +
      '<path d="M47 56 L64 41 L64 118 L53 118 L47 111 Z" fill="#F1EFE8" opacity=".92"/>' +
      '<path d="M74 44 L91 75 L91 118 L74 118 Z" fill="#7FBBA1" opacity=".9"/>' +
    '</svg>';

  var root = document.createElement('div');
  root.className = 'pcp-agent';
  root.innerHTML =
    '<button class="pcp-agent__launch" type="button" aria-expanded="false" ' +
      'aria-controls="pcp-agent-panel" aria-label="Ask about investing">' +
      '<span class="pcp-agent__launch-mark">' + ICON_MARK + '</span>' +
      '<span class="pcp-agent__launch-hint" aria-hidden="true">Ask about investing</span>' +
    '</button>' +
    '<section class="pcp-agent__panel" id="pcp-agent-panel" role="dialog" aria-modal="false" ' +
      'aria-label="Investor assistant" hidden>' +
      '<header class="pcp-agent__head">' +
        '<div>' +
          '<p class="pcp-agent__title">Investor assistant</p>' +
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
        'definitive offering documents.</p>' +
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
        renderPrompts(result.related
          .filter(function (e) { return e.q; })
          .map(function (e) { return { label: e.q }; }));
      } else {
        /* Nothing closely related, so offer openers the visitor has not
           already asked. Compared on letters alone: the chip carries a
           question mark and the typed question usually does not, so a raw
           string match would re-offer the question just answered. */
        var flat = function (t) { return String(t).toLowerCase().replace(/[^a-z0-9]/g, ''); };
        var asked = history.filter(function (h) { return h.role === 'user'; })
                           .map(function (h) { return flat(h.content); });
        var fresh = KB.prompts.filter(function (t) { return asked.indexOf(flat(t)) === -1; });
        renderPrompts((fresh.length ? fresh : KB.prompts).slice(0, 3));
      }
    };

    var local = function () { window.setTimeout(function () { done(compose(question)); }, reduceMotion ? 0 : 420); };

    if (CFG.endpoint && !modelDown) {
      askModel(question, history).then(done).catch(function () {
        modelDown = true;
        local();
      });
    } else {
      local();
    }
  }

  /* The launcher pulses to say it is there. Once someone has opened it that
     job is done, so the animation is retired — and the fact is remembered, so
     a returning visitor is not pulsed at again. Storage can throw in a private
     window or with site data blocked, so every access is guarded. */
  var SEEN_KEY = 'pcp-assistant-seen';
  function markSeen() {
    root.classList.add('is-seen');
    try { window.localStorage.setItem(SEEN_KEY, '1'); } catch (e) { /* not important enough to fail on */ }
  }
  try {
    if (window.localStorage.getItem(SEEN_KEY)) { root.classList.add('is-seen'); }
  } catch (e) { /* leave the pulse running */ }

  function open() {
    markSeen();
    panel.hidden = false;

    /* An element leaving display:none has no resolved previous style, so a
       transition has nothing to interpolate from. Reading a layout property
       forces the browser to resolve the closed state first, which gives the
       opacity and transform transitions a real starting point. Without this
       the panel opened logically — is-open applied, hidden cleared — and then
       sat at zero opacity, which on a phone reads as "it does not open".
       Desktop happened to get away with it; a handset did not. */
    void panel.offsetHeight;

    /* The visible state lives entirely in `is-open`, so if the frames never
       arrive — a throttled tab, a browser that has stopped compositing — the
       class still has to land. Whichever fires first wins; the other is a
       no-op. */
    var reveal = function () { root.classList.add('is-open'); };
    requestAnimationFrame(function () { requestAnimationFrame(reveal); });
    window.setTimeout(reveal, 120);

    /* Last resort. If the transition still has not carried the panel to full
       opacity once it should long since have finished, stop trusting it and
       set the end state directly. An assistant that is open but invisible is
       worse than one that appears without an animation. */
    window.setTimeout(function () {
      if (!root.classList.contains('is-open')) { return; }
      if (parseFloat(window.getComputedStyle(panel).opacity) < 0.9) {
        /* Kill the transition before forcing the values. Assigning opacity on
           its own would just start another transition through the very
           machinery that has already failed to run, which leaves the panel
           exactly as invisible as before. */
        panel.style.transition = 'none';
        panel.style.opacity = '1';
        panel.style.transform = 'none';
      }
    }, 420);
    launch.setAttribute('aria-expanded', 'true');
    if (!started) {
      started = true;
      bubble('pcp', KB.meta.greeting);
      renderPrompts(KB.prompts);
    }
    window.setTimeout(function () { input.focus(); }, 220);
  }

  function close() {
    /* Clear anything the safety net forced, so the closing transition has a
       clean state to run from and the next open starts fresh. */
    panel.style.transition = '';
    panel.style.opacity = '';
    panel.style.transform = '';
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
