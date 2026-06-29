(() => {
  'use strict';

  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.panel');
  const toast = document.getElementById('toast');

  // Floating hearts
  const heartsContainer = document.getElementById('hearts');
  const heartEmojis = ['💕', '💗', '💖', '💓', '🌸', '✨', '💝', '🌹'];

  function spawnHeart() {
    const el = document.createElement('span');
    el.classList.add('heart');
    el.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    const duration = 6 + Math.random() * 8;
    el.style.animationDuration = duration + 's';
    el.style.animationDelay = Math.random() * 4 + 's';
    el.style.fontSize = (0.9 + Math.random() * 1.2) + 'rem';
    heartsContainer.appendChild(el);
    setTimeout(() => el.remove(), (duration + 4) * 1000);
  }

  for (let i = 0; i < 12; i++) spawnHeart();
  setInterval(spawnHeart, 1800);

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      panels.forEach(p => { p.classList.remove('active'); p.hidden = true; });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      panel.classList.add('active');
      panel.hidden = false;
    });
  });

  // Toast helper
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  // Show toast on Formspree success by watching [data-fs-success] visibility
  const successMessages = {
    question:    'Vegas got your question! 💬✨',
    admire:      'Your secret is safe with the universe 🤫💕',
    appointment: "It's a date! Vegas can't wait 💖📅",
  };

  Object.entries(successMessages).forEach(([key, msg]) => {
    const el = document.querySelector(`[data-fs-success="${key}"]`);
    if (!el) return;
    new MutationObserver(() => {
      if (el.style.display !== 'none') showToast(msg);
    }).observe(el, { attributes: true, attributeFilter: ['style'] });
  });

  // Set min date to today
  document.getElementById('appt-date').setAttribute('min', new Date().toISOString().split('T')[0]);
})();
