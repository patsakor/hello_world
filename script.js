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

  // Spawn hearts periodically
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

  // Question form
  document.getElementById('form-question').addEventListener('submit', e => {
    e.preventDefault();
    const topic = document.getElementById('topic').value;
    const question = document.getElementById('question-text').value.trim();
    if (!topic || !question) return;

    console.log('Question submitted:', { topic, question });
    showToast('Miki received your question 💬✨');
    e.target.reset();
  });

  // Admiration form
  document.getElementById('form-admire').addEventListener('submit', e => {
    e.preventDefault();
    const message = document.getElementById('admire-message').value.trim();
    if (!message) return;

    console.log('Secret admiration:', { message });
    showToast('Your secret is safe with the universe 🤫💕');
    e.target.reset();
  });

  // Appointment form
  document.getElementById('form-appointment').addEventListener('submit', e => {
    e.preventDefault();
    const date = document.getElementById('appt-date').value;
    const time = document.getElementById('appt-time').value;
    const activity = document.getElementById('appt-activity').value.trim();
    const notes = document.getElementById('appt-notes').value.trim();
    if (!date || !time || !activity) return;

    console.log('Appointment booked:', { date, time, activity, notes });
    showToast("It's a date! Miki can't wait 💖📅");
    e.target.reset();
  });

  // Set min date to today
  document.getElementById('appt-date').setAttribute('min', new Date().toISOString().split('T')[0]);
})();
