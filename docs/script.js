/* =========================================================================
   FormX — Landing Page behaviour
   ========================================================================= */
(() => {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const DESKTOP = window.matchMedia('(min-width: 1024px)');

  /* ───────────────────────── CONTENT ───────────────────────── */

  /* Everything below is the fallback used when content.json cannot be loaded
     (opened straight off disk, or the file is missing/corrupt). The live values
     live in site/content.json and are edited through the CMS at /admin. */

  /* Verbatim from the Figma review strip — four reviews on a loop. */
  const REVIEWS = [
    { i: 'J', c: '#1C73E7', t: '"Fabulous company that does fabulous work. FormX is the place to do it.”' },
    { i: 'L', c: '#E94033', t: '“I\'m so glad that we chose them for helping us to build our first home. It came out better than my expectations.”' },
    { i: 'T', c: '#2E6A4E', t: '"Great service! Wonderful and efficient team. So happy with our new ADU!"' },
    { i: 'M', c: '#DC2F8F', t: '"Love the modern design they lead with but found the full customization and optionality to be very refreshing.”' }
  ];

  const QUOTE = '“FormX handled everything with confidence and care. The layout captures the views from every angle...”';
  const TAGS  = ['Indoor–Outdoor Living', 'Built in 7 weeks', '+35% Property Value'];

  /* Project examples. The Figma file marks these as placeholders — swap the
     copy and the `shots` list for real projects. */
  const PROJECTS = [
    {
      name: 'Poolside Guest House', place: 'San Jose',
      hero: 'assets/img/project-1.jpg', quote: QUOTE, tags: TAGS,
      url: 'https://www.formx.com/gallery/e249891a-7b53-4530-ae26-6560ec5b4f7e',
      shots: ['assets/img/project-1.jpg', 'assets/img/space-kitchen.jpg', 'assets/img/space-lounge.jpg', 'assets/img/space-bath.jpg']
    },
    {
      name: 'Premium Studio ADU', place: 'San Jose',
      hero: 'assets/img/project-2.jpg', quote: QUOTE, tags: TAGS,
      url: 'https://www.formx.com/gallery/e249891a-7b53-4530-ae26-6560ec5b4f7e',
      shots: ['assets/img/project-2.jpg', 'assets/img/space-lounge.jpg', 'assets/img/space-bedroom.jpg', 'assets/img/space-kitchen.jpg']
    },
    {
      name: 'Hills Retreat ADU', place: 'Los Altos Hills',
      hero: 'assets/img/project-3.jpg', quote: QUOTE, tags: TAGS,
      url: 'https://www.formx.com/gallery/e249891a-7b53-4530-ae26-6560ec5b4f7e',
      shots: ['assets/img/project-3.jpg', 'assets/img/space-bath.jpg', 'assets/img/space-bedroom.jpg', 'assets/img/space-kitchen.jpg']
    }
  ];

  /* PLACEHOLDER COPY — only "Culinary Space" exists in the Figma file (component
     378:797). The other three tiles are drafted in the same voice so the reveal
     works; replace them with real copy before launch. See README.md. */
  const SPACES = [
    {
      label: 'Culinary Space', img: 'assets/img/space-kitchen.jpg',
      points: [
        ['Custom Cabinetry',      'Premium walnut finishes and elegant details.'],
        ['Chef-Grade Prep Area',  'Spacious countertops built for real cooking.'],
        ['Seamless Flow',         'Open design that connects perfectly with the living space.']
      ]
    },
    {
      label: 'The Lounge', img: 'assets/img/space-lounge.jpg',
      points: [
        ['Light-Filled Volume', 'Full-height glazing that opens straight onto the garden.'],
        ['Flexible Layout',     'One room that works as living space, guest suite, or studio.'],
        ['Warm Materials',      'Oak, linen, and soft plaster used throughout.']
      ]
    },
    {
      label: 'The Sanctuary', img: 'assets/img/space-bedroom.jpg',
      points: [
        ['Quiet by Design',  'Insulated walls and doors that keep the street outside.'],
        ['Built-In Storage', 'Wardrobes and niches integrated into the architecture.'],
        ['Morning Light',    'Windows placed to catch the sun, not the neighbours.']
      ]
    },
    {
      label: 'Wellness Space', img: 'assets/img/space-bath.jpg',
      points: [
        ['Spa-Grade Finishes', 'Large-format tile, stone, and brushed fixtures.'],
        ['Garden Outlook',     'A picture window framing your own green view.'],
        ['Ready for Water',    'Waterproofing and ventilation engineered in from day one.']
      ]
    }
  ];

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ───────────────────────── CONTENT LOADING ───────────────────────── */

  const DEFAULTS = {
    hero:   { type: 'video', src: 'assets/video/hero.mp4',   poster: 'assets/img/hero-poster.jpg' },
    footer: { type: 'video', src: 'assets/video/footer.mp4', poster: 'assets/img/footer-poster.jpg' },
    reviews: REVIEWS.map(r => ({ initial: r.i, color: r.c, text: r.t })),
    projects: PROJECTS.map(p => ({
      name: p.name, place: p.place, image: p.hero, quote: p.quote,
      tags: p.tags, description: '', url: p.url, gallery: p.shots
    }))
  };

  async function loadContent() {
    try {
      const res = await fetch('content.json', { cache: 'no-store' });
      if (!res.ok) throw new Error(res.status);
      const data = await res.json();
      return {
        hero:     { ...DEFAULTS.hero,   ...(data.hero   || {}) },
        footer:   { ...DEFAULTS.footer, ...(data.footer || {}) },
        reviews:  Array.isArray(data.reviews)  && data.reviews.length  ? data.reviews  : DEFAULTS.reviews,
        projects: Array.isArray(data.projects) && data.projects.length ? data.projects : DEFAULTS.projects
      };
    } catch (err) {
      console.warn('[FormX] using built-in content —', err.message);
      return DEFAULTS;
    }
  }

  /* Projects are needed by the lightbox long after load, so keep a live copy. */
  let projects = DEFAULTS.projects;

  /* ───────────────────────── REVIEW MARQUEE ───────────────────────── */

  const reviewCard = r => `
    <li class="review">
      <div class="review__head">
        <span class="review__avatar" style="background:${esc(r.color)}" aria-hidden="true">${esc(r.initial)}</span>
        <img class="review__stars" src="assets/svg/stars.svg" alt="5 out of 5 stars" width="122" height="22" loading="lazy">
      </div>
      <p class="review__text">${esc(r.text)}</p>
    </li>`;

  const track = $('#reviewsTrack');

  function renderReviews(list) {
    if (!track) return;
    // two identical runs so the -50% translate loops seamlessly
    const run = list.map(reviewCard).join('');
    track.innerHTML = run + run;
    track.setAttribute('role', 'list');
    track.setAttribute('aria-label', 'What our clients say on Google');
  }

  /* ───────────────────────── PROJECT GALLERY ───────────────────────── */

  const workTrack = $('#workTrack');

  function renderProjects(list) {
    if (!workTrack) return;
    workTrack.innerHTML = list.map((p, i) => `
      <li class="card">
        <button class="card__frame" type="button" data-project="${i}"
                aria-label="Open the ${esc(p.name)} project gallery">
          <img class="card__img" src="${esc(p.image)}" alt="" loading="${i ? 'lazy' : 'eager'}">
          <span class="card__scrim" aria-hidden="true"></span>
          <span class="card__tags">${(p.tags || []).map(t => `<span class="card__tag">${esc(t)}</span>`).join('')}</span>
          <span class="card__quote">${esc(p.quote)}</span>
          <span class="card__more">Explore more</span>
        </button>
        <div class="card__caption">
          <p class="card__name">${esc(p.name)}</p>
          <p class="card__place">${esc(p.place)}</p>
        </div>
      </li>`).join('');
  }

  const scroller = $('.work__scroller');
  $$('[data-scroll]').forEach(btn => btn.addEventListener('click', () => {
    const card = $('.card', scroller);
    if (!card) return;
    const step = card.getBoundingClientRect().width + 23;
    scroller.scrollBy({ left: btn.dataset.scroll === 'next' ? step : -step, behavior: 'smooth' });
  }));

  /* ───────────────────────── SPACES REVEAL GRID ───────────────────────── */

  const spacesGrid = $('#spacesGrid');
  if (spacesGrid) {
    spacesGrid.innerHTML = SPACES.map(s => `
      <li class="tile" tabindex="0">
        <img class="tile__img" src="${s.img}" alt="" loading="lazy">
        <span class="tile__veil" aria-hidden="true"></span>
        <h3 class="tile__label">${esc(s.label)}</h3>
        <div class="tile__reveal">
          ${s.points.map(([h, b]) => `<div><h4>${esc(h)}</h4><p>${esc(b)}</p></div>`).join('')}
        </div>
      </li>`).join('');
  }

  /* Mobile: each tile opens as it scrolls into view (Figma note:
     "instead of hovering, when you scroll - each one of them opens").
     Desktop keeps the hover/focus behaviour handled entirely in CSS. */
  let tileObserver = null;

  function setupTileReveal() {
    tileObserver?.disconnect();
    tileObserver = null;
    $$('.tile').forEach(t => t.classList.remove('is-open'));
    if (DESKTOP.matches) return;

    tileObserver = new IntersectionObserver(entries => {
      entries.forEach(e => e.target.classList.toggle('is-open', e.isIntersecting));
    }, { rootMargin: '-38% 0px -38% 0px' });

    $$('.tile').forEach(t => tileObserver.observe(t));
  }
  setupTileReveal();
  DESKTOP.addEventListener('change', setupTileReveal);

  /* ───────────────────────── LIGHTBOX ───────────────────────── */

  const lb = $('#lightbox');
  let lastFocus = null;

  function openProject(i) {
    const p = projects[i];
    if (!p || !lb) return;
    lastFocus = document.activeElement;
    $('#lbTitle').textContent = p.name || '';
    $('#lbPlace').textContent = p.place || '';
    $('#lbTags').innerHTML = (p.tags || []).map(t => `<li>${esc(t)}</li>`).join('');
    $('#lbGrid').innerHTML = (p.gallery || []).map(
      src => `<img src="${esc(src)}" alt="${esc(p.name)}" loading="lazy">`).join('');
    $('#lbQuote').textContent = p.quote || '';

    const desc = $('#lbDesc');
    desc.textContent = p.description || '';
    desc.hidden = !p.description;

    const link = $('#lbLink');
    if (p.url) { link.href = p.url; link.hidden = false; } else { link.hidden = true; }

    lb.showModal();
  }

  document.addEventListener('click', e => {
    const frame = e.target.closest('[data-project]');
    if (frame) openProject(Number(frame.dataset.project));
  });

  $('#lbClose')?.addEventListener('click', () => lb.close());
  lb?.addEventListener('click', e => { if (e.target === lb) lb.close(); });
  lb?.addEventListener('close', () => lastFocus?.focus());

  /* ───────────────────────── QUIZ: SHEET + STEPS ───────────────────────── */

  const rail   = $('#quiz');
  const scrim  = $('#scrim');
  const grab   = $('#railGrab');
  const form   = $('#quizForm');
  const nextBt = $('#quizNext');
  const backBt = $('#quizBack');
  const errEl  = $('#quizError');
  const dots   = $$('.quiz__dots li');
  const steps  = $$('.quiz__step[data-step]').filter(s => s.dataset.step !== 'done');
  const done   = $('.quiz__done');

  /* — the mobile bottom sheet — */
  function setSheet(open) {
    if (DESKTOP.matches) return;
    rail.classList.toggle('is-open', open);
    grab.setAttribute('aria-expanded', String(open));
    scrim.hidden = !open;
    if (open) requestAnimationFrame(() => scrim.classList.add('is-on'));
    else scrim.classList.remove('is-on');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) $('.quiz__step.is-active input, .quiz__step.is-active .field__input')?.focus({ preventScroll: true });
  }

  grab?.addEventListener('click', () => setSheet(!rail.classList.contains('is-open')));
  scrim?.addEventListener('click', () => setSheet(false));

  $$('[data-open-quiz]').forEach(b => b.addEventListener('click', () => {
    if (DESKTOP.matches) {
      $('.quiz__step.is-active input')?.focus({ preventScroll: true });
      rail.scrollIntoView({ block: 'start', behavior: 'smooth' });
    } else {
      setSheet(true);
    }
  }));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && rail.classList.contains('is-open')) setSheet(false);
  });

  DESKTOP.addEventListener('change', () => {
    rail.classList.remove('is-open');
    scrim.hidden = true;
    scrim.classList.remove('is-on');
    document.body.style.overflow = '';
  });

  /* — step machine — */
  let step = 0;

  function render() {
    steps.forEach((s, i) => s.classList.toggle('is-active', i === step));
    done?.classList.toggle('is-active', step === steps.length);
    dots.forEach((d, i) => d.classList.toggle('is-on', i === step));

    const finished = step === steps.length;
    backBt.hidden  = step === 0 || finished;
    nextBt.hidden  = finished;
    nextBt.textContent = step === steps.length - 1 ? 'Get my free assessment' : 'Continue';
    $('.quiz__dots').hidden = finished;
    errEl.hidden = true;
  }

  function validate() {
    const active = steps[step];
    const radios = $$('input[type="radio"]', active);
    if (radios.length) {
      if (!radios.some(r => r.checked)) return 'Pick the option that fits best to continue.';
      return null;
    }
    const email = $('input[name="email"]', active);
    const name  = $('input[name="name"]', active);
    if (name && !name.value.trim())  return 'Please add your name so Maria knows who to reply to.';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim()))
      return 'Please add a valid email address.';
    return null;
  }

  /* ── Lead submission ───────────────────────────────────────────────────
     Set LEAD_ENDPOINT to the URL that should receive the enquiry (CRM, form
     service, or your own API). Until it is set the form does NOT send
     anything — it says so on screen and in the console rather than showing a
     confirmation the visitor cannot rely on. */
  const LEAD_ENDPOINT = null;

  async function submitLead(data) {
    if (!LEAD_ENDPOINT) {
      console.warn('[FormX] LEAD_ENDPOINT is not set — this enquiry was NOT sent.', data);
      return { sent: false };
    }
    const res = await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`Lead endpoint responded ${res.status}`);
    return { sent: true };
  }

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const problem = validate();
    if (problem) {
      errEl.textContent = problem;
      errEl.hidden = false;
      return;
    }
    if (step < steps.length - 1) { step++; render(); return; }

    nextBt.disabled = true;
    let result;
    try {
      result = await submitLead(Object.fromEntries(new FormData(form)));
    } catch (err) {
      console.error(err);
      nextBt.disabled = false;
      errEl.textContent = 'Something went wrong sending that. Please try again, or call us on (408) 555-0134.';
      errEl.hidden = false;
      return;
    }
    nextBt.disabled = false;
    $('#quizNotWired').hidden = result.sent;
    step = steps.length;
    render();
  });

  backBt?.addEventListener('click', () => { if (step > 0) { step--; render(); } });

  /* selecting an answer advances the radio steps — fewer taps to a lead */
  form?.addEventListener('change', e => {
    if (e.target.type !== 'radio') return;
    errEl.hidden = true;
    clearTimeout(form._adv);
    form._adv = setTimeout(() => {
      if (step < steps.length - 1) { step++; render(); }
    }, 320);
  });

  render();

  /* ───────────────────────── BACKGROUND MEDIA ───────────────────────── */

  /* The hero and footer backgrounds can each be a video or a still image.
     index.html ships the current ones inline so they render immediately; this
     only rebuilds an element when content.json points somewhere else. */
  function applyMedia(slot, media, { lazy }) {
    const el = $('.' + slot + '__media');
    if (!el || !media || !media.src) return;

    const isVideo = media.type !== 'image';
    const currentSrc = el.tagName === 'VIDEO'
      ? (el.dataset.lazyVideo || el.querySelector('source')?.getAttribute('src') || '')
      : el.getAttribute('src');
    if (isVideo === (el.tagName === 'VIDEO') && currentSrc === media.src) return;

    const next = document.createElement(isVideo ? 'video' : 'img');
    next.className = slot + '__media';
    next.setAttribute('aria-hidden', 'true');
    next.tabIndex = -1;

    if (isVideo) {
      next.muted = true; next.loop = true; next.playsInline = true;
      if (media.poster) next.poster = media.poster;
      if (lazy) {
        next.preload = 'none';
        next.dataset.lazyVideo = media.src;
      } else {
        next.autoplay = true;
        next.preload = 'metadata';
        const source = document.createElement('source');
        source.src = media.src; source.type = 'video/mp4';
        next.append(source);
      }
    } else {
      next.src = media.src;
      next.alt = '';
      next.loading = lazy ? 'lazy' : 'eager';
    }
    el.replaceWith(next);
  }

  /* The footer background is large and sits at the very bottom of the page, so
     it is not fetched until the footer is close to the viewport. Until then the
     element shows its poster frame. */
  function watchLazyVideos() {
    const lazyVideos = $$('[data-lazy-video]');
    if (!lazyVideos.length) return;
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const v = e.target;
        obs.unobserve(v);
        const source = document.createElement('source');
        source.src = v.dataset.lazyVideo;
        source.type = 'video/mp4';
        v.append(source);
        v.load();
        v.play().catch(() => {});   /* a blocked autoplay just leaves the poster */
      });
    }, { rootMargin: '600px 0px' });
    lazyVideos.forEach(v => io.observe(v));
  }

  /* ───────────────────────── ODDS AND ENDS ───────────────────────── */

  $('#year').textContent = new Date().getFullYear();

  /* ───────────────────────── BOOT ───────────────────────── */

  renderReviews(DEFAULTS.reviews);
  renderProjects(DEFAULTS.projects);

  loadContent().then(content => {
    projects = content.projects;
    renderReviews(content.reviews);
    renderProjects(content.projects);
    applyMedia('hero',   content.hero,   { lazy: false });
    applyMedia('footer', content.footer, { lazy: true });
  }).finally(() => {
    watchLazyVideos();
    /* Safari and iOS occasionally ignore the autoplay attribute on a muted
       background video; nudging it is harmless when it is already playing. */
    $$('video[autoplay]').forEach(v => v.play().catch(() => {}));
  });
})();
