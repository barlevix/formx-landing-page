/* FormX CMS — editor behaviour.

   Loads docs/content.json, edits it in place as a plain object, and PUTs the
   whole document back. Files go up as raw bytes to /api/upload, which returns
   the path to store. No framework, no build step. */
(() => {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const statusEl = $('#status');
  const saveBtn  = $('#save');

  let content = null;
  let dirty = false;

  /* ── status line ───────────────────────────────────────────────────── */

  let statusTimer;
  function status(text, kind = '') {
    clearTimeout(statusTimer);
    statusEl.textContent = text;
    statusEl.className = 'status' + (kind ? ' is-' + kind : '');
    if (kind === 'ok') statusTimer = setTimeout(() => status(''), 2600);
  }

  function markDirty() {
    dirty = true;
    status('Unsaved changes');
  }

  window.addEventListener('beforeunload', e => {
    if (dirty) { e.preventDefault(); e.returnValue = ''; }
  });

  /* ── uploading ─────────────────────────────────────────────────────── */

  async function upload(file) {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'X-Filename': encodeURIComponent(file.name), 'Content-Type': 'application/octet-stream' },
      body: file
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `upload failed (${res.status})`);
    return data.path;
  }

  /* Wire a file input so picking a file uploads it and hands back the path. */
  function onPick(input, done) {
    input.addEventListener('change', async () => {
      const files = [...input.files];
      if (!files.length) return;
      const box = input.closest('.media, .project__media, .detail, .row') || document.body;
      box.classList.add('is-busy');
      status(`Uploading ${files.length > 1 ? files.length + ' files' : files[0].name}…`);
      try {
        const paths = [];
        for (const f of files) paths.push(await upload(f));
        done(paths);
        markDirty();
        status('Uploaded — remember to save', 'ok');
      } catch (err) {
        status(err.message, 'error');
      } finally {
        box.classList.remove('is-busy');
        input.value = '';
      }
    });
  }

  /* ── previews ──────────────────────────────────────────────────────── */

  function renderPreview(el, src, type) {
    el.innerHTML = '';
    if (!src) { el.textContent = 'Nothing chosen yet'; return; }
    const bust = src + (src.includes('?') ? '&' : '?') + 'v=' + Date.now();
    if (type === 'video') {
      const v = document.createElement('video');
      v.src = '/' + bust; v.muted = true; v.loop = true;
      v.playsInline = true; v.autoplay = true;
      el.append(v);
    } else {
      const i = document.createElement('img');
      i.src = '/' + bust; i.alt = '';
      el.append(i);
    }
  }

  /* ── backgrounds (hero + footer) ───────────────────────────────────── */

  function setupMedia(slot) {
    const box = $(`.media[data-slot="${slot}"]`);
    const data = content[slot];
    const previewEl = $('[data-preview]', box);
    const pathEl = $('[data-path]', box);
    const posterRow = $('[data-poster-row]', box);
    const posterPath = $('[data-poster-path]', box);

    function paint() {
      renderPreview(previewEl, data.src, data.type);
      pathEl.textContent = data.src || '';
      const isVideo = data.type === 'video';
      posterRow.hidden = !isVideo;
      posterPath.hidden = !isVideo;
      posterPath.textContent = isVideo ? 'Poster: ' + (data.poster || 'none') : '';
      $$(`input[name="${slot}-type"]`, box).forEach(r => { r.checked = r.value === data.type; });
    }

    $$(`input[name="${slot}-type"]`, box).forEach(radio => {
      radio.addEventListener('change', () => {
        if (!radio.checked) return;
        data.type = radio.value;
        paint();
        markDirty();
      });
    });

    onPick($('[data-upload="src"]', box), ([path]) => {
      data.src = path;
      // an uploaded video keeps its poster; a still image does not need one
      paint();
    });
    onPick($('[data-upload="poster"]', box), ([path]) => {
      data.poster = path;
      paint();
    });

    paint();
  }

  /* ── generic list plumbing ─────────────────────────────────────────── */

  function bindFields(row, item, after) {
    $$('[data-field]', row).forEach(input => {
      const key = input.dataset.field;
      const isTags = key === 'tags';
      input.value = isTags ? (item.tags || []).join(', ') : (item[key] ?? '');
      input.addEventListener('input', () => {
        item[key] = isTags
          ? input.value.split(',').map(t => t.trim()).filter(Boolean)
          : input.value;
        markDirty();
        after && after();
      });
    });
  }

  function bindRowControls(row, list, item, rerender) {
    $$('[data-move]', row).forEach(btn => btn.addEventListener('click', () => {
      const from = list.indexOf(item);
      const to = from + Number(btn.dataset.move);
      if (to < 0 || to >= list.length) return;
      list.splice(to, 0, list.splice(from, 1)[0]);
      markDirty();
      rerender();
    }));
    $('[data-remove]', row).addEventListener('click', () => {
      const label = item.name ? `“${item.name}”` : 'this item';
      if (!confirm(`Delete ${label}? This cannot be undone once you save.`)) return;
      list.splice(list.indexOf(item), 1);
      markDirty();
      rerender();
    });
  }

  function updateMoveButtons(container) {
    const rows = [...container.children];
    rows.forEach((row, i) => {
      const up = $('[data-move="-1"]', row);
      const down = $('[data-move="1"]', row);
      if (up) up.disabled = i === 0;
      if (down) down.disabled = i === rows.length - 1;
    });
  }

  /* ── reviews ───────────────────────────────────────────────────────── */

  function renderReviews() {
    const box = $('#reviews');
    box.innerHTML = '';
    content.reviews.forEach(item => {
      const row = $('#tpl-review').content.firstElementChild.cloneNode(true);
      bindFields(row, item);
      bindRowControls(row, content.reviews, item, renderReviews);
      box.append(row);
    });
    updateMoveButtons(box);
  }

  /* ── projects ──────────────────────────────────────────────────────── */

  function renderProjects() {
    const box = $('#projects');
    box.innerHTML = '';
    content.projects.forEach(item => {
      const row = $('#tpl-project').content.firstElementChild.cloneNode(true);
      const titleEl = $('[data-title]', row);
      const previewEl = $('[data-preview]', row);
      const pathEl = $('[data-path]', row);
      const galleryEl = $('[data-gallery]', row);

      const paintTitle = () => { titleEl.textContent = item.name || 'Untitled project'; };
      const paintMain = () => {
        renderPreview(previewEl, item.image, 'image');
        pathEl.textContent = item.image || '';
      };

      function paintGallery() {
        galleryEl.innerHTML = '';
        (item.gallery || []).forEach(src => {
          const fig = document.createElement('figure');
          const img = document.createElement('img');
          img.src = '/' + src; img.alt = '';
          const del = document.createElement('button');
          del.type = 'button'; del.textContent = '✕';
          del.setAttribute('aria-label', 'Remove this image');
          del.addEventListener('click', () => {
            item.gallery.splice(item.gallery.indexOf(src), 1);
            markDirty();
            paintGallery();
          });
          fig.append(img, del);
          galleryEl.append(fig);
        });
      }

      bindFields(row, item, paintTitle);
      bindRowControls(row, content.projects, item, renderProjects);
      onPick($('[data-upload="image"]', row), ([path]) => { item.image = path; paintMain(); });
      onPick($('[data-upload="gallery"]', row), paths => {
        item.gallery = (item.gallery || []).concat(paths);
        paintGallery();
      });

      paintTitle(); paintMain(); paintGallery();
      box.append(row);
    });
    updateMoveButtons(box);
  }

  /* ── add buttons ───────────────────────────────────────────────────── */

  const BLANK = {
    review:  () => ({ initial: 'A', color: '#1C73E7', text: '' }),
    project: () => ({ name: '', place: '', image: '', quote: '', tags: [],
                      description: '', url: '', gallery: [] })
  };

  $$('[data-add]').forEach(btn => btn.addEventListener('click', () => {
    const kind = btn.dataset.add;
    const list = kind === 'review' ? content.reviews : content.projects;
    list.push(BLANK[kind]());
    markDirty();
    (kind === 'review' ? renderReviews : renderProjects)();
    const box = kind === 'review' ? $('#reviews') : $('#projects');
    box.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));

  /* ── saving ────────────────────────────────────────────────────────── */

  saveBtn.addEventListener('click', async () => {
    saveBtn.disabled = true;
    status('Saving…');
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content, null, 2)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `save failed (${res.status})`);
      dirty = false;
      status('Saved', 'ok');
    } catch (err) {
      status(err.message, 'error');
    } finally {
      saveBtn.disabled = false;
    }
  });

  /* ── boot ──────────────────────────────────────────────────────────── */

  (async () => {
    try {
      const res = await fetch('/content.json', { cache: 'no-store' });
      if (!res.ok) throw new Error(`could not load content.json (${res.status})`);
      content = await res.json();
    } catch (err) {
      $('#loading').textContent = err.message + ' — is cms.py running?';
      return;
    }

    content.hero ||= { type: 'video', src: '', poster: '' };
    content.footer ||= { type: 'video', src: '', poster: '' };
    content.reviews ||= [];
    content.projects ||= [];

    setupMedia('hero');
    setupMedia('footer');
    renderReviews();
    renderProjects();

    $('#loading').hidden = true;
    $('#page').hidden = false;
  })();
})();
