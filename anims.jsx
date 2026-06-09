// anims.jsx — next-gen scroll-driven motion layer
// Reveal-on-scroll (staggered) · number count-ups · chart draw-on wipes ·
// animated comparison bars · scroll-progress bar.
// All gated behind html.cm-anim (set by app.jsx from the Tweak + reduced-motion).

(function () {
  const EASE_OUT_CUBIC = (x) => 1 - Math.pow(1 - x, 3);

  // ── number count-up ─────────────────────────────────────────────────────
  function prepCount(el) {
    if (el.__countPrepped) return el.__countInfo;
    const tn = [...el.childNodes].find((n) => n.nodeType === 3 && /\d/.test(n.nodeValue));
    if (!tn) { el.__countPrepped = true; el.__countInfo = null; return null; }
    const raw = tn.nodeValue;
    const m = raw.match(/^(\s*[^\d-]*)(-?[\d,]*\.?\d+)(.*)$/s);
    if (!m) { el.__countPrepped = true; el.__countInfo = null; return null; }
    const prefix = m[1] || '';
    const numStr = m[2];
    const suffix = m[3] || '';
    const decimals = (numStr.split('.')[1] || '').length;
    const hasComma = /,/.test(numStr);
    const target = parseFloat(numStr.replace(/,/g, ''));
    const info = { tn, prefix, suffix, decimals, target, raw, hasComma };
    el.__countPrepped = true; el.__countInfo = info;
    return info;
  }

  function fmt(v, decimals, hasComma) {
    let s = v.toFixed(decimals);
    if (hasComma) s = Number(s).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    return s;
  }

  function runCount(el, dur = 1400) {
    const info = prepCount(el);
    if (!info) return;
    // start slightly below target zero for a clean climb
    const start = performance.now();
    function frame(now) {
      const p = Math.min(1, (now - start) / dur);
      const v = info.target * EASE_OUT_CUBIC(p);
      info.tn.nodeValue = info.prefix + fmt(v, info.decimals, info.hasComma) + info.suffix;
      if (p < 1) requestAnimationFrame(frame);
      else info.tn.nodeValue = info.raw;
    }
    requestAnimationFrame(frame);
  }

  // ── reveal tagging ──────────────────────────────────────────────────────
  // staggered groups: container -> children get incremental transition-delay
  const GROUPS = [
    ['.trial-grid', '.trial-card', 110],
    ['.ind-grid', '.ind-card', 80],
    ['.condition-grid', '.cond-card', 110],
    ['.steps-grid', '.step', 120],
    ['.impact-grid', '.impact-cell', 110],
    ['.stat-strip-grid', '.stat-strip-cell', 110],
    ['.pub-list', '.pub-row', 65],
    ['.h2h-card', '.h2h-row', 70],
    ['.faq-grid', '.faq-item', 55],
    ['.society-row', '.item', 60],
    ['.hcp-hero-grid > div:first-child', '*', 90],
    ['.pt-hero-grid > div:first-child', '*', 90],
    ['.meta-row', '.meta-block', 90],
  ];

  // standalone reveals (no internal stagger)
  const SINGLES = [
    '.section-head',
    '.hero-chart-card',
    '.pt-hero-visual',
    '.h2h-head',
    '.find-doctor',
    '.pull-quote .pq-inner',
    '.hcp-hero .hero-pill',
  ];

  const COUNT_SELECTORS = [
    '.impact-num',
    '.stat-strip-cell .num',
    '.hero-chart-stats .num',
    '.trial-card .tc-stat',
  ];

  let observer = null;

  function clearTags() {
    if (observer) { observer.disconnect(); observer = null; }
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.remove('reveal', 'reveal-in');
      el.style.transitionDelay = '';
      el.removeAttribute('data-countup');
    });
  }

  function tag(el, delay) {
    if (!el || el.classList.contains('reveal')) return;
    el.classList.add('reveal');
    if (delay) el.style.transitionDelay = delay + 'ms';
  }

  let firstRun = true;

  function revealNow(el, countEls) {
    el.classList.add('reveal-in');
    const counters = el.matches('[data-countup]')
      ? [el]
      : [...el.querySelectorAll('[data-countup]')];
    counters.forEach((c) => { if (!c.__counted) { c.__counted = true; runCount(c); } });
  }

  function init() {
    const root = document.getElementById('root');
    if (!root) return;
    const animOn = document.documentElement.classList.contains('cm-anim');

    clearTags();

    // collect targets
    GROUPS.forEach(([containerSel, childSel, step]) => {
      root.querySelectorAll(containerSel).forEach((container) => {
        const kids = childSel === '*'
          ? [...container.children]
          : [...container.querySelectorAll(childSel)];
        kids.forEach((kid, i) => tag(kid, i * step));
      });
    });
    SINGLES.forEach((sel) => root.querySelectorAll(sel).forEach((el) => tag(el, 0)));

    // mark count-up targets
    const countEls = [];
    COUNT_SELECTORS.forEach((sel) => root.querySelectorAll(sel).forEach((el) => {
      prepCount(el);
      if (el.__countInfo) { el.setAttribute('data-countup', ''); countEls.push(el); }
    }));

    const targets = [...root.querySelectorAll('.reveal')];

    if (!animOn) {
      // reduced motion / disabled: show everything, leave numbers final
      targets.forEach((el) => el.classList.add('reveal-in'));
      firstRun = false;
      return;
    }

    // pre-zero count-ups (only the first time, so re-inits don't reset settled numbers)
    if (firstRun) {
      countEls.forEach((el) => {
        const info = el.__countInfo;
        if (info && !el.__counted) info.tn.nodeValue = info.prefix + fmt(0, info.decimals, info.hasComma) + info.suffix;
      });
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealNow(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -7% 0px' });

    const vh = window.innerHeight || document.documentElement.clientHeight;
    targets.forEach((el) => {
      const r = el.getBoundingClientRect();
      // On a re-init (after a React re-render that wiped classes), anything the
      // user has already reached — at or above the current viewport — must be
      // restored immediately, NOT left for an observer that won't fire on scroll-up.
      if (!firstRun && r.top < vh * 0.92) {
        revealNow(el);
      } else {
        observer.observe(el);
      }
    });

    // standalone count targets not inside a reveal block
    countEls.forEach((el) => {
      if (el.closest('.reveal')) return;
      el.setAttribute('data-standalone-count', '');
      const r = el.getBoundingClientRect();
      if (!firstRun && r.top < vh * 0.92) revealNow(el);
      else observer.observe(el);
    });

    firstRun = false;
  }

  // ── scroll-driven safety net ────────────────────────────────────────────
  // Guarantees no in-view .reveal is ever left hidden — covers elements taller
  // than the viewport and re-init edge cases the IntersectionObserver can miss.
  function sweepReveal() {
    if (!document.documentElement.classList.contains('cm-anim')) return;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    document.querySelectorAll('.reveal:not(.reveal-in)').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.85 && r.bottom > vh * 0.1) {
        revealNow(el);
        if (observer) observer.unobserve(el);
      }
    });
  }

  // ── scroll progress bar ─────────────────────────────────────────────────
  function ensureProgressBar() {
    let bar = document.getElementById('cm-progress');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'cm-progress';
      bar.innerHTML = '<span></span>';
      document.body.appendChild(bar);
    }
    return bar;
  }
  function updateProgress() {
    const bar = document.getElementById('cm-progress');
    if (!bar) return;
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const p = max > 0 ? (h.scrollTop || document.body.scrollTop) / max : 0;
    bar.firstChild.style.transform = 'scaleX(' + Math.min(1, Math.max(0, p)) + ')';
  }
  let ticking = false;
  function onScroll() {
    updateProgress();
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => { sweepReveal(); ticking = false; });
    }
  }
  let progressBound = false;
  function bindProgress() {
    ensureProgressBar();
    if (!progressBound) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      progressBound = true;
    }
    updateProgress();
    // sweep shortly after init so anything already in view (incl. tall cards) shows
    setTimeout(sweepReveal, 240);
  }

  // public API
  window.CMAnims = {
    init: function () {
      // run after layout settles — use a timer (fires even when the tab/iframe
      // is backgrounded) rather than rAF, which pauses without a paint.
      setTimeout(function () { init(); bindProgress(); }, 60);
    },
  };

  // self-init fallback in case the app script's effect hasn't called us yet
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(function () { if (!document.getElementById('cm-progress')) bindProgress(); }, 400); });
  }
})();
