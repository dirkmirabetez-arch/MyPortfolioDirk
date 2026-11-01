// Theme (light = grey & white, dark = charcoal grey)
const root = document.documentElement;
try { const saved = localStorage.getItem('theme'); if (saved) root.dataset.theme = saved; } catch (e) {}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.theme-toggle');
  const sync = () => { if (toggle) toggle.textContent = root.dataset.theme === 'dark' ? '☀️' : '🌙'; };
  sync();
  if (toggle) toggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    sync();
  });

  // Copy buttons
  document.querySelectorAll('.copy').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      try { await navigator.clipboard.writeText(text); } catch (e) {
        const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove();
      }
      btn.textContent = 'COPIED'; btn.classList.add('done');
      setTimeout(() => { btn.textContent = 'COPY'; btn.classList.remove('done'); }, 1400);
    });
  });

  // Floating petals
  const spots = [[6,12],[28,8],[52,18],[85,14],[92,48],[4,55],[40,86],[70,82],[18,78],[60,40]];
  spots.forEach(([l, t], i) => {
    const s = document.createElement('div');
    s.className = 'petal';
    s.style.left = l + 'vw'; s.style.top = t + 'vh';
    s.style.fontSize = (14 + (i % 4) * 8) + 'px';
    s.style.animationDelay = (i * 0.8) + 's';
    s.textContent = '✿';
    document.body.appendChild(s);
  });

  // Photo fallback (shows initials if photo.jpg is missing)
  const img = document.querySelector('.photo img');
  if (img) img.addEventListener('error', () => {
    img.remove();
    const i = document.createElement('div'); i.className = 'initials'; i.textContent = 'DM';
    document.querySelector('.photo').appendChild(i);
  });
  document.querySelectorAll('.avatar img').forEach(im => im.addEventListener('error', () => im.remove()));

  // Keyboard navigation with arrow keys
  document.addEventListener('keydown', e => {
    const next = document.querySelector('.btn.next'), prev = document.querySelector('.btn.prev');
    if (e.key === 'ArrowRight' && next) location.href = next.href;
    if (e.key === 'ArrowLeft' && prev) location.href = prev.href;
  });
});
