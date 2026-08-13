/* ==========================================================================
   SMHF GLOBAL — CORE UI SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- PRELOADER ---------- */
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) preloader.classList.add('hide');
}
window.addEventListener('load', () => setTimeout(hidePreloader, 300));
setTimeout(hidePreloader, 2500); // safety net — never gets stuck

  /* ---------- YEAR IN FOOTER ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- THEME TOGGLE ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;
  const savedTheme = localStorage.getItem('smhf-theme');
  if (savedTheme) htmlEl.setAttribute('data-theme', savedTheme);

  themeToggle?.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('smhf-theme', next);
  });

  /* ---------- MOBILE DRAWER ---------- */
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');

  function closeDrawer() {
    hamburger?.classList.remove('active');
    drawer?.classList.remove('active');
    drawerOverlay?.classList.remove('active');
  }

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    drawer?.classList.toggle('active');
    drawerOverlay?.classList.toggle('active');
  });
  drawerOverlay?.addEventListener('click', closeDrawer);
  drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

  /* ---------- SEARCH OVERLAY ---------- */
  const searchToggle = document.getElementById('searchToggle');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');

  searchToggle?.addEventListener('click', () => {
    searchOverlay?.classList.add('active');
    setTimeout(() => searchInput?.focus(), 300);
  });
  searchClose?.addEventListener('click', () => searchOverlay?.classList.remove('active'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') searchOverlay?.classList.remove('active');
  });

  /* ---------- HEADER HIDE ON SCROLL DOWN ---------- */
  const header = document.getElementById('siteHeader');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (header) {
      if (current > lastScroll && current > 200) header.classList.add('hide-nav');
      else header.classList.remove('hide-nav');
    }
    lastScroll = current;
  });

  /* ---------- READING PROGRESS BAR ---------- */
  const progressBar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  });

  /* ---------- SCROLL TO TOP ---------- */
  const scrollTopBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) scrollTopBtn?.classList.add('show');
    else scrollTopBtn?.classList.remove('show');
  });
  scrollTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- CURSOR GLOW (desktop only) ---------- */
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
  }

  /* ---------- SCROLL REVEAL ANIMATIONS ---------- */
  const animatedEls = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('in-view'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  animatedEls.forEach(el => observer.observe(el));

  /* ---------- CATEGORY TABS ---------- */
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.dataset.category;
      if (typeof window.loadNewsCategory === 'function') {
        window.loadNewsCategory(category);
      }
      document.getElementById('trending')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Footer category links also trigger category switch
  document.querySelectorAll('.footer-col a[data-category]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const category = link.dataset.category;
      tabs.forEach(t => t.classList.toggle('active', t.dataset.category === category));
      if (typeof window.loadNewsCategory === 'function') {
        window.loadNewsCategory(category);
      }
      document.getElementById('trending')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ---------- NEWSLETTER FORM (front-end only feedback) ---------- */
  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = newsletterForm.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Subscribed ✓';
    btn.style.opacity = '0.8';
    newsletterForm.reset();
    setTimeout(() => { btn.textContent = originalText; btn.style.opacity = '1'; }, 2500);
  });

  /* ---------- WEATHER WIDGET ---------- */
  loadWeather();
  setInterval(updateClock, 1000 * 30);
  updateClock();

  /* ---------- PARTICLE BACKGROUND (hero canvas) ---------- */
  initParticles();

});

/* ==========================================================================
   WEATHER (OpenWeatherMap)
   ========================================================================== */
async function loadWeather() {
  const apiKey = '0515fa3a97c1dd00f5313a2d038a0a24';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Karachi&units=metric&appid=${apiKey}`;
  const tempEl = document.getElementById('weatherTemp');
  const descEl = document.getElementById('weatherDesc');

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Weather fetch failed');
    const data = await res.json();
    if (tempEl) tempEl.textContent = Math.round(data.main.temp) + '°C';
    if (descEl) descEl.textContent = data.weather?.[0]?.description || 'Clear';
  } catch (err) {
    if (tempEl) tempEl.textContent = '--°';
    if (descEl) descEl.textContent = 'Unavailable';
    console.error('Weather error:', err);
  }
}

function updateClock() {
  const timeEl = document.getElementById('weatherTime');
  if (!timeEl) return;
  const now = new Date().toLocaleTimeString('en-US', {
    timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit'
  });
  timeEl.textContent = now;
}

/* ==========================================================================
   PARTICLE CANVAS (lightweight, no library)
   ========================================================================== */
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let width, height;

  function resize() {
    const hero = canvas.closest('.hero');
    width = canvas.width = hero.offsetWidth;
    height = canvas.height = hero.offsetHeight;
  }

  function createParticles() {
    const count = Math.min(60, Math.floor((width * height) / 22000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.15
    }));
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 217, 255, ${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  resize();
  createParticles();
  animate();
  window.addEventListener('resize', () => { resize(); createParticles(); });
}
