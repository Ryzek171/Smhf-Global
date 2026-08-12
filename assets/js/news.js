/* ==========================================================================
   SMHF GLOBAL — NEWS ENGINE (Dawn.com + Google News via rss2json — CORS-safe)
   ========================================================================== */

const RSS2JSON_BASE = 'https://api.rss2json.com/v1/api.json';

// Dawn.com feeds have real images (native publisher feed).
// Google News is used where Dawn doesn't have a solid dedicated feed.
const CATEGORY_FEEDS = {
  general:       { url: 'https://www.dawn.com/feeds/home',     source: 'Dawn.com',    google: false },
  business:      { url: 'https://www.dawn.com/feeds/business', source: 'Dawn.com',    google: false },
  technology:    { url: 'https://news.google.com/rss/headlines/section/topic/TECHNOLOGY?hl=en-PK&gl=PK&ceid=PK:en', source: 'Google News', google: true },
  sports:        { url: 'https://www.dawn.com/feeds/sport',    source: 'Dawn.com',    google: false },
  entertainment: { url: 'https://news.google.com/rss/headlines/section/topic/ENTERTAINMENT?hl=en-PK&gl=PK&ceid=PK:en', source: 'Google News', google: true }
};

const state = {
  currentCategory: 'general',
  articles: [],
  loadedTitles: new Set(),
  page: 0
};

const PLACEHOLDER_IMG = 'assets/images/latest/image1.png';

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  loadNewsCategory('general');
});

/* Exposed globally so script.js category tabs can call it */
window.loadNewsCategory = function (category) {
  state.currentCategory = category;
  state.articles = [];
  state.loadedTitles.clear();
  state.page = 0;
  showSkeletons();
  fetchCategoryFeed(category, true);
};

/* ---------- FETCH: CATEGORY FEED (via rss2json, CORS-safe) ---------- */
async function fetchCategoryFeed(category, isFirstLoad = false) {
  const feedMeta = CATEGORY_FEEDS[category] || CATEGORY_FEEDS.general;
  const url = `${RSS2JSON_BASE}?rss_url=${encodeURIComponent(feedMeta.url)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`rss2json error: ${res.status}`);
    const data = await res.json();
    if (data.status !== 'ok') throw new Error(data.message || 'Feed error');

    let articles = (data.items || []).map(item => parseNewsItem(item, feedMeta));

    // If a dedicated feed comes back thin, top up with a Google News search
    if (articles.length < 6) {
      const extra = await fetchByQuery(categoryKeyword(category));
      articles = mergeUnique(articles, extra);
    }

    if (!articles.length) throw new Error('No articles returned');

    addArticles(articles, isFirstLoad);
    if (isFirstLoad) {
      renderSpotlight();
      renderMostRead();
      renderTicker();
      animateCounter(articles.length + Math.floor(Math.random() * 15) + 20);
    }
  } catch (err) {
    console.error('News fetch failed:', err);
    if (isFirstLoad) renderErrorState();
  }
}

/* ---------- FETCH: SEARCH (used for "Load More" + search box + fallback) ---------- */
async function fetchByQuery(query) {
  const feedUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-PK&gl=PK&ceid=PK:en`;
  const url = `${RSS2JSON_BASE}?rss_url=${encodeURIComponent(feedUrl)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`rss2json search error: ${res.status}`);
    const data = await res.json();
    if (data.status !== 'ok') return [];
    return (data.items || []).map(item => parseNewsItem(item, { source: 'Google News', google: true }));
  } catch (err) {
    console.error('News search failed:', err);
    return [];
  }
}

/* ---------- PARSE: RSS item -> our article shape ---------- */
function parseNewsItem(item, feedMeta) {
  let title = item.title || 'Untitled';
  let sourceName = feedMeta.source;

  // Google News titles look like: "Headline text - Source Name"
  if (feedMeta.google) {
    const sepIndex = title.lastIndexOf(' - ');
    if (sepIndex > -1) {
      sourceName = title.slice(sepIndex + 3).trim();
      title = title.slice(0, sepIndex).trim();
    }
  }

  const html = item.description || item.content || '';
  const imgMatch = html.match(/<img[^>]+src="([^">]+)"/i);
  const image = item.thumbnail || (imgMatch ? imgMatch[1] : '') || '';

  const cleanDesc = html.replace(/<[^>]*>/g, '').trim();

  return {
    title,
    description: cleanDesc || 'Tap to read the full story.',
    url: item.link,
    image,
    publishedAt: item.pubDate,
    source: { name: sourceName }
  };
}

function categoryKeyword(category) {
  const map = {
    general: 'Pakistan',
    business: 'Pakistan economy',
    technology: 'technology',
    sports: 'cricket',
    entertainment: 'entertainment celebrity'
  };
  return map[category] || 'Pakistan';
}

function mergeUnique(base, extra) {
  const seen = new Set(base.map(a => a.title));
  const merged = [...base];
  extra.forEach(a => {
    if (!seen.has(a.title)) { merged.push(a); seen.add(a.title); }
  });
  return merged;
}

/* ---------- ARTICLE HANDOFF (encode full article into the URL — no storage needed) ---------- */
function storeAndLink(article) {
  const payload = JSON.stringify({
    title: article.title,
    description: article.description,
    url: article.url,
    image: article.image,
    publishedAt: article.publishedAt,
    source: article.source
  });
  const encoded = btoa(unescape(encodeURIComponent(payload)));
  return `display.html?data=${encodeURIComponent(encoded)}`;
}

/* ---------- STATE + RENDER: GRID ---------- */
function addArticles(articles, replace) {
  const fresh = articles.filter(a => !state.loadedTitles.has(a.title));
  fresh.forEach(a => state.loadedTitles.add(a.title));
  state.articles = replace ? fresh : [...state.articles, fresh];
  renderGrid(fresh, replace);
}

function showSkeletons() {
  const grid = document.getElementById('newsGrid');
  if (!grid) return;
  grid.innerHTML = Array(6).fill('<div class="skeleton-card"></div>').join('');
}

function renderGrid(articles, replace) {
  const grid = document.getElementById('newsGrid');
  if (!grid) return;
  if (replace) grid.innerHTML = '';

  articles.forEach((a, i) => {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.setAttribute('data-animate', 'fade-up');
    card.setAttribute('data-delay', (i % 3) * 100);
    card.innerHTML = `
      <a href="${storeAndLink(a)}" target="_blank" rel="noopener" class="news-card-img">
        <img src="${a.image || PLACEHOLDER_IMG}" alt="" loading="lazy"
             onerror="this.src='${PLACEHOLDER_IMG}'">
        <span class="news-card-cat">${state.currentCategory}</span>
      </a>
      <div class="news-card-body">
        <div class="news-card-meta">
          <span>${a.source?.name || 'SMHF Global'}</span>
          <span>•</span>
          <span>${timeAgo(a.publishedAt)}</span>
          <span>•</span>
          <span>${readingTime(a.description)}</span>
        </div>
        <h3>${escapeHTML(a.title)}</h3>
        <p>${escapeHTML(truncateText(a.description, 110) || 'No description available.')}</p>
        <a href="${storeAndLink(a)}" target="_blank" rel="noopener" class="news-card-link">
          Read Story <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    `;
    grid.appendChild(card);

    requestAnimationFrame(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      observer.observe(card);
    });
  });
}

/* ---------- RENDER: SPOTLIGHT (featured + most read) ---------- */
function renderSpotlight() {
  const main = document.getElementById('spotlightMain');
  if (!main || !state.articles.length) return;
  const top = state.articles[0];

  main.classList.remove('skeleton-card');
  main.innerHTML = `
    <img src="${top.image || PLACEHOLDER_IMG}" alt="" onerror="this.src='${PLACEHOLDER_IMG}'">
    <div class="spotlight-content">
      <span class="news-card-cat">${state.currentCategory}</span>
      <h2>${escapeHTML(top.title)}</h2>
      <p>${escapeHTML(truncateText(top.description, 180))}</p>
      <a href="${storeAndLink(top)}" target="_blank" rel="noopener" class="btn btn-primary">
        Read Full Story <i class="fa-solid fa-arrow-right"></i>
      </a>
    </div>
  `;
}

function renderMostRead() {
  const list = document.getElementById('mostReadList');
  if (!list) return;
  const items = state.articles.slice(1, 6);
  if (!items.length) return;

  list.innerHTML = items.map((a, i) => `
    <a href="${sanitizeUrl(a.url)}" target="_blank" rel="noopener" class="most-read-item">
      <span class="most-read-rank">${String(i + 1).padStart(2, '0')}</span>
      <div>
        <h5>${escapeHTML(a.title)}</h5>
        <span>${a.source?.name || 'SMHF'} • ${timeAgo(a.publishedAt)}</span>
      </div>
    </a>
  `).join('');
}

/* ---------- RENDER: TICKER ---------- */
function renderTicker() {
  const track = document.getElementById('tickerTrack');
  if (!track || !state.articles.length) return;
  const headlines = state.articles.slice(0, 8).map(a => `<span>${escapeHTML(a.title)}</span>`).join('');
  track.innerHTML = headlines + headlines;
}

/* ---------- LIVE COUNTER ---------- */
function animateCounter(target) {
  const el = document.getElementById('liveCounter');
  if (!el) return;
  let current = 0;
  const step = Math.max(1, Math.floor(target / 40));
  const interval = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(interval); }
    el.textContent = current;
  }, 30);
}

/* ---------- LOAD MORE ---------- */
document.getElementById('loadMoreBtn')?.addEventListener('click', async function () {
  this.classList.add('loading');
  this.querySelector('.btn-text').textContent = 'Loading...';

  state.page++;
  const extra = await fetchByQuery(categoryKeyword(state.currentCategory));
  const fresh = extra.filter(a => !state.loadedTitles.has(a.title));

  if (fresh.length) {
    fresh.forEach(a => state.loadedTitles.add(a.title));
    state.articles.push(...fresh);
    renderGrid(fresh, false);
  } else {
    this.querySelector('.btn-text').textContent = 'No More Stories';
    this.disabled = true;
  }

  this.classList.remove('loading');
  if (!this.disabled) this.querySelector('.btn-text').textContent = 'Load More';
});

/* ---------- SEARCH ---------- */
const searchInputEl = document.getElementById('searchInput');
let searchTimeout;
searchInputEl?.addEventListener('input', (e) => {
  clearTimeout(searchTimeout);
  const q = e.target.value.trim();
  const resultsEl = document.getElementById('searchResults');
  if (!q) { resultsEl.innerHTML = ''; return; }

  resultsEl.innerHTML = '<p style="color:var(--text-dim)">Searching...</p>';
  searchTimeout = setTimeout(async () => {
    const results = await fetchByQuery(q);
    if (!results.length) {
      resultsEl.innerHTML = '<p style="color:var(--text-dim)">No results found.</p>';
      return;
    }
    resultsEl.innerHTML = results.slice(0, 6).map(a => `
      <a href="${storeAndLink(a)}" target="_blank" rel="noopener" class="most-read-item" style="margin-bottom:10px;">
        <img src="${a.image || PLACEHOLDER_IMG}" style="width:70px;height:50px;object-fit:cover;border-radius:8px;" onerror="this.src='${PLACEHOLDER_IMG}'">
        <div>
          <h5>${escapeHTML(a.title)}</h5>
          <span>${a.source?.name || 'SMHF'} • ${timeAgo(a.publishedAt)}</span>
        </div>
      </a>
    `).join('');
  }, 450);
});

/* ---------- ERROR STATE ---------- */
function renderErrorState() {
  const grid = document.getElementById('newsGrid');
  if (grid) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--text-dim);">
        <i class="fa-solid fa-triangle-exclamation" style="font-size:28px; margin-bottom:12px; color:var(--danger);"></i>
        <p>Unable to load news right now. Please refresh or try again shortly.</p>
      </div>`;
  }
  const ticker = document.getElementById('tickerTrack');
  if (ticker) ticker.innerHTML = '<span>Unable to load latest headlines — please refresh.</span>';
}

/* ---------- UTILITIES ---------- */
function escapeHTML(str = '') {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
function sanitizeUrl(url) {
  try { return new URL(url).href; } catch { return '#'; }
}
function timeAgo(dateStr) {
  if (!dateStr) return 'Recently';
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
  if (diff < 1) return 'Just now';
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
}
function readingTime(text = '') {
  const words = text.split(' ').length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}
function truncateText(text, maxLen) {
  if (!text) return '';
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, maxLen).replace(/\s+\S*$/, '') + '…';
}
