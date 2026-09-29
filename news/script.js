const DATA_URL = window.location.protocol === 'file:' ? 'data/list.json' : 'data/list.json?v=' + Date.now();

const TRANSLATIONS = {
    ru: {
        "bug-report": "Сообщить о баге",
        "nav-changelog": "Ченжлог",
        "nav-news": "Новости",
        "nav-links": "Полезные ссылки",
        "settings-title": "Настройки интерфейса",
        "theme-title": "Цветовая схема",
        "theme-dark": "Тёмная",
        "theme-black": "Чёрная",
        "theme-light": "Светлая",
        "lang-title": "Язык интерфейса",
        "download-btn": "СКАЧАТЬ",
        "page-title": "НОВОСТИ",
        "read-more": "Читать →",
        "back-to-list": "Все новости",
        "not-found-title": "Новость не найдена",
        "not-found-desc": "Запрошенная новость не существует или была удалена.",
        "not-found-btn": "← Вернуться к списку",
        "error-title": "Ошибка загрузки",
        "error-desc": "Не удалось загрузить данные. Попробуйте позже.",
        "no-news": "Новостей пока нет. Следите за обновлениями!",
        "footer": "© 2026 vertexgames. Все права защищены."
    },
    ua: {
        "bug-report": "Повідомити про баг",
        "nav-changelog": "Чейнджлог",
        "nav-news": "Новини",
        "nav-links": "Корисні посилання",
        "settings-title": "Налаштування інтерфейсу",
        "theme-title": "Колірна схема",
        "theme-dark": "Темна",
        "theme-black": "Чорна",
        "theme-light": "Світла",
        "lang-title": "Мова інтерфейсу",
        "download-btn": "ЗАВАНТАЖИТИ",
        "page-title": "НОВИНИ",
        "read-more": "Читати →",
        "back-to-list": "Всі новини",
        "not-found-title": "Новину не знайдено",
        "not-found-desc": "Запитана новина не існує або була видалена.",
        "not-found-btn": "← Повернутися до списку",
        "error-title": "Помилка завантаження",
        "error-desc": "Не вдалося завантажити дані. Спробуйте пізніше.",
        "no-news": "Новин поки немає. Слідкуйте за оновленнями!",
        "footer": "© 2026 vertexgames. Усі права захищені."
    },
    en: {
        "bug-report": "Report a Bug",
        "nav-changelog": "Changelog",
        "nav-news": "News",
        "nav-links": "Useful Links",
        "settings-title": "Interface Settings",
        "theme-title": "Color Scheme",
        "theme-dark": "Dark",
        "theme-black": "Black",
        "theme-light": "Light",
        "lang-title": "Interface Language",
        "download-btn": "DOWNLOAD",
        "page-title": "NEWS",
        "read-more": "Read More →",
        "back-to-list": "All news",
        "not-found-title": "News not found",
        "not-found-desc": "The requested news article does not exist or has been deleted.",
        "not-found-btn": "← Return to list",
        "error-title": "Loading error",
        "error-desc": "Failed to load data. Please try again later.",
        "no-news": "No news yet. Stay tuned!",
        "footer": "© 2026 vertexgames. All rights reserved."
    }
};

const isListPage = document.getElementById('news-grid') !== null;
const isArticlePage = document.getElementById('article-root') !== null;

/* ─────────────────────────────────────────
   Загрузка данных
───────────────────────────────────────── */
let cachedNews = null;
async function loadNews() {
    if (cachedNews) return cachedNews;
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`Ошибка HTTP ${res.status}`);
    cachedNews = await res.json();
    return cachedNews;
}

/* ─────────────────────────────────────────
   Список новостей
───────────────────────────────────────── */
function renderList(news) {
    const grid = document.getElementById('news-grid');
    grid.innerHTML = '';

    const lang = localStorage.getItem('fireline-lang') || 'ru';
    const dict = TRANSLATIONS[lang] || TRANSLATIONS['ru'];

    if (!news || news.length === 0) {
        const noNewsText = dict['no-news'] || 'Новостей пока нет. Следите за обновлениями!';
        grid.innerHTML = `<div class="news-empty">
            <p>${escHtml(noNewsText)}</p>
        </div>`;
        return;
    }

    const readMoreText = dict['read-more'] || 'Читать →';

    news.forEach(item => {
        const title = item[`title_${lang}`] || item.title;
        const description = item[`description_${lang}`] || item.description;
        const date = item[`date_${lang}`] || item.date;

        const card = document.createElement('a');
        card.className = 'news-card';
        card.href = `article.html?slug=${encodeURIComponent(item.slug)}`;
        card.setAttribute('aria-label', title);

        const imgHtml = item.image && item.image !== '...'
            ? `<div class="news-card-img-wrap">
                 <img class="news-card-img" src="${escHtml(item.image)}"
                      alt="${escHtml(title)}"
                      loading="lazy"
                      onerror="handleImageError(this)">
               </div>`
            : `<div class="news-card-img-placeholder">${placeholderSvg()}</div>`;

        const dateHtml = date && date !== '...'
            ? `<div class="news-card-date">${escHtml(date)}</div>`
            : '';

        const descHtml = description && description !== '...'
            ? `<p class="news-card-desc">${escHtml(description)}</p>`
            : '';

        card.innerHTML = `
            ${imgHtml}
            <div class="news-card-body">
                ${dateHtml}
                <h2 class="news-card-title">${escHtml(title)}</h2>
                ${descHtml}
                <span class="news-card-arrow">${escHtml(readMoreText)}</span>
            </div>`;

        grid.appendChild(card);
    });
}

function getLangDict() {
    const lang = localStorage.getItem('fireline-lang') || 'ru';
    return TRANSLATIONS[lang] || TRANSLATIONS['ru'];
}

function initListPage() {
    const grid = document.getElementById('news-grid');
    const dict = getLangDict();

    loadNews()
        .then(renderList)
        .catch(err => {
            console.error('Ошибка загрузки новостей:', err);
            grid.innerHTML = `<div class="news-error">
                <p data-i18n="error-desc">${escHtml(dict['error-desc'] || "Не удалось загрузить новости. Попробуйте позже.")}</p>
            </div>`;
        });
}

/* ─────────────────────────────────────────
   Статья
   ───────────────────────────────────────── */
function renderArticle(item) {
    const root = document.getElementById('article-root');
    const dict = getLangDict();
    const backText = dict['back-to-list'] || 'Все новости';
    const lang = localStorage.getItem('fireline-lang') || 'ru';

    const title = item[`title_${lang}`] || item.title;
    const date = item[`date_${lang}`] || item.date;
    const content = item[`content_${lang}`] || item.content;

    // Обновление мета заголовков вкладки
    document.title = `${title} — Fireline`;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = `${title} — Fireline`;
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.content = `${title} — Fireline`;

    const imgHtml = item.image && item.image !== '...'
        ? `<img class="article-cover" src="${escHtml(item.image)}"
               alt="${escHtml(title)}" loading="eager"
               onerror="handleImageError(this, true)">`
        : `<div class="article-cover-placeholder">${placeholderSvg()}</div>`;

    const dateHtml = date && date !== '...'
        ? `<div class="article-meta">
               <span class="article-date-badge">${escHtml(date)}</span>
           </div>`
        : '';

    // Поддержка переносов строк в тексте
    const contentHtml = formatContent(content);

    root.innerHTML = `
        <a class="article-back" href="index.html" data-i18n="back-to-list">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            ${escHtml(backText)}
        </a>
        ${dateHtml}
        <h1 class="article-title">${escHtml(title)}</h1>
        ${imgHtml}
        <div class="article-content">${contentHtml}</div>`;
}

function renderNotFound(slug) {
    const root = document.getElementById('article-root');
    const dict = getLangDict();
    const backText = dict['back-to-list'] || 'Все новости';
    const notFoundTitle = dict['not-found-title'] || 'Новость не найдена';
    const notFoundDescPattern = dict['not-found-desc'] || 'Запрошенная новость не существует или была удалена.';
    const notFoundBtn = dict['not-found-btn'] || '← Вернуться к списку';

    document.title = `${notFoundTitle} — Fireline`;

    let descHtml = notFoundDescPattern;
    if (descHtml.includes('«') || descHtml.includes('“') || descHtml.includes('article')) {
        descHtml = descHtml.replace('новость', `новость «<strong>${escHtml(slug)}</strong>»`)
            .replace('новина', `новина «<strong>${escHtml(slug)}</strong>»`)
            .replace('article', `article "<strong>${escHtml(slug)}</strong>"`);
    } else {
        descHtml = `${descHtml} (<strong>${escHtml(slug)}</strong>)`;
    }

    root.innerHTML = `
        <a class="article-back" href="index.html" data-i18n="back-to-list">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            ${escHtml(backText)}
        </a>
        <div class="article-not-found">
            <h2 data-i18n="not-found-title">${escHtml(notFoundTitle)}</h2>
            <p>${descHtml}</p>
            <a href="index.html" class="btn btn-primary btn-nav" data-i18n="not-found-btn">${escHtml(notFoundBtn)}</a>
        </div>`;
}

function showArticleSkeleton() {
    const root = document.getElementById('article-root');
    const dict = getLangDict();
    const backText = dict['back-to-list'] || 'Все новости';

    root.innerHTML = `
        <a class="article-back" href="index.html" data-i18n="back-to-list">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            ${escHtml(backText)}
        </a>
        <div class="skeleton-block skeleton-title"></div>
        <div class="skeleton-block skeleton-img"></div>
        <div class="skeleton-block skeleton-line" style="width:90%"></div>
        <div class="skeleton-block skeleton-line" style="width:75%"></div>
        <div class="skeleton-block skeleton-line" style="width:85%"></div>
        <div class="skeleton-block skeleton-line" style="width:60%"></div>`;
}


function initArticlePage() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug') || '';

    showArticleSkeleton();

    if (!slug) {
        renderNotFound('(не указан)');
        return;
    }

    loadNews()
        .then(news => {
            const item = news.find(n => n.slug === slug);
            if (item) {
                renderArticle(item);
            } else {
                renderNotFound(slug);
            }
        })
        .catch(err => {
            console.error('Ошибка загрузки статьи:', err);
            const root = document.getElementById('article-root');
            const dict = getLangDict();
            const backText = dict['back-to-list'] || 'Все новости';
            const errorTitle = dict['error-title'] || 'Ошибка загрузки';
            const errorDesc = dict['error-desc'] || 'Не удалось загрузить данные. Попробуйте позже.';
            root.innerHTML = `
                <a class="article-back" href="index.html" data-i18n="back-to-list">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                         stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                    ${escHtml(backText)}
                </a>
                <div class="article-not-found">
                    <h2 data-i18n="error-title">${escHtml(errorTitle)}</h2>
                    <p data-i18n="error-desc">${escHtml(errorDesc)}</p>
                </div>`;
        });
}

/* ─────────────────────────────────────────
   Утилиты
───────────────────────────────────────── */

/** Экранирование HTML */
function escHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/** Простое форматирование: пустые строки → абзацы */
function formatContent(text) {
    if (!text || text === '...') {
        const lang = localStorage.getItem('fireline-lang') || 'ru';
        if (lang === 'en') return '<p>Article content has not been added yet.</p>';
        if (lang === 'ua') return '<p>Текст статті ще не додано.</p>';
        return '<p>Текст статьи ещё не добавлен.</p>';
    }
    return text
        .split(/\n\n+/)
        .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
        .join('');
}

/** SVG-плейсхолдер для отсутствующих изображений */
function placeholderSvg() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                 stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
    </svg>`;
}

function handleImageError(img, isArticle = false) {
    img.onerror = null;
    if (isArticle) {
        img.outerHTML = `<div class="article-cover-placeholder">${placeholderSvg()}</div>`;
    } else {
        const parent = img.parentElement;
        if (parent) {
            parent.innerHTML = `<div class="news-card-img-placeholder">${placeholderSvg()}</div>`;
        }
    }
}

/* ─────────────────────────────────────────
   Управление темой
───────────────────────────────────────── */
function initTheme() {
    const saved = localStorage.getItem('fireline-theme') || 'dark';
    document.body.className = `theme-${saved}`;
    document.querySelectorAll('.theme-opt').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === saved);
    });
}

function initSettingsModal() {
    const toggleBtn = document.getElementById('settings-toggle');
    const modal = document.getElementById('settings-modal');
    const closeBtn = document.getElementById('modal-close');

    if (!toggleBtn || !modal) return;

    toggleBtn.addEventListener('click', () => modal.classList.toggle('open'));
    closeBtn?.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });

    document.querySelectorAll('.theme-opt').forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            document.body.className = `theme-${theme}`;
            localStorage.setItem('fireline-theme', theme);
            document.querySelectorAll('.theme-opt').forEach(b =>
                b.classList.toggle('active', b === btn));
        });
    });
}

/* ─────────────────────────────────────────
   Мобильное меню
───────────────────────────────────────── */
function initHamburger() {
    const burger = document.getElementById('hamburger');
    const menu = document.getElementById('mobile-menu');
    if (!burger || !menu) return;

    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        menu.classList.toggle('open');
    });
}

/* ─────────────────────────────────────────
   Язык
───────────────────────────────────────── */
function initLanguage() {
    const langOpts = document.querySelectorAll('.lang-opt');
    const savedLang = localStorage.getItem('fireline-lang') || 'ru';
    applyLanguage(savedLang);

    langOpts.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            applyLanguage(lang);
            localStorage.setItem('fireline-lang', lang);

            // Ре-рендеринг списка новостей или статьи при смене языка
            if (isListPage) initListPage();
            if (isArticlePage) initArticlePage();
        });
    });
}

function applyLanguage(lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS['ru'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (!dict[key]) return;
        const svg = el.querySelector('svg');
        if (svg) {
            el.innerHTML = '';
            el.appendChild(svg);
            el.appendChild(document.createTextNode(' ' + dict[key]));
        } else {
            el.textContent = dict[key];
        }
    });
    document.querySelectorAll('.lang-opt').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    document.documentElement.lang = lang === 'ua' ? 'uk' : lang;
}

/* ─────────────────────────────────────────
   Партиклы (Атмосферные искры и пепел)
───────────────────────────────────────── */
function initParticles() {
    const particleCanvas = document.getElementById('radar-particles');
    if (!particleCanvas) return;

    const ctx = particleCanvas.getContext('2d');
    let dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    function resizeCanvas() {
        dpr = window.devicePixelRatio || 1;
        width = window.innerWidth;
        height = window.innerHeight;
        particleCanvas.width = width * dpr;
        particleCanvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class EmberParticle {
        constructor(isInitial = false) {
            this.reset(isInitial);
        }

        reset(isInitial = false) {
            this.x = Math.random() * width;
            this.y = isInitial ? Math.random() * height : height + Math.random() * 25;
            this.baseX = this.x;
            this.size = Math.random() * 1.0 + 0.5; // 0.5 - 1.5px
            
            this.angle = Math.random() * Math.PI * 2;
            this.waveSpeed = Math.random() * 0.02 + 0.008;
            this.waveAmplitude = Math.random() * 18 + 6;
            
            this.speedY = Math.random() * 0.7 + 0.45;
            this.speedX = (Math.random() - 0.5) * 0.25;
            
            this.maxLife = Math.random() * 800 + 600;
            this.life = isInitial ? Math.random() * this.maxLife : 0;
            this.baseAlpha = Math.random() * 0.5 + 0.35;
            this.flickerSpeed = Math.random() * 0.08 + 0.03;
            
            const palettes = [
                [255, 95, 30],   // Яркий оранжево-красный
                [235, 60, 35],   // Огненно-красный
                [255, 145, 40],  // Золотисто-янтарный
                [205, 45, 30],   // Тлеющий багровый
                [255, 190, 75]   // Раскалённая искра
            ];
            this.rgb = palettes[Math.floor(Math.random() * palettes.length)];
            this.alpha = 0;
        }

        update() {
            this.life++;
            this.y -= this.speedY;
            this.baseX += this.speedX;
            this.angle += this.waveSpeed;
            this.x = this.baseX + Math.sin(this.angle) * this.waveAmplitude;

            const progress = this.life / this.maxLife;
            let alphaFactor = 1;
            if (progress < 0.1) {
                alphaFactor = progress / 0.1;
            } else if (progress > 0.75) {
                alphaFactor = (1 - progress) / 0.25;
            }

            if (this.y < height * 0.1) {
                alphaFactor *= Math.max(0, this.y / (height * 0.1));
            }

            const flicker = Math.sin(this.life * this.flickerSpeed) * 0.12;
            this.alpha = Math.max(0, Math.min(1, (this.baseAlpha + flicker) * alphaFactor));

            if (this.life >= this.maxLife || this.y < -25 || this.x < -40 || this.x > width + 40 || this.alpha <= 0.005) {
                this.reset(false);
            }
        }

        draw() {
            if (this.alpha <= 0.01) return;
            const [r, g, b] = this.rgb;

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.alpha})`;
            ctx.fill();

            if (this.size > 1.0 && this.alpha > 0.3) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 2.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.alpha * 0.22})`;
                ctx.fill();
            }
        }
    }

    const particleCount = 70;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new EmberParticle(true));
    }

    function animateParticles() {
        if (!particleCanvas || !ctx) return;
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

/* ─────────────────────────────────────────
   Инициализация
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSettingsModal();
    initHamburger();
    initLanguage();
    initParticles();

    if (isListPage) initListPage();
    if (isArticlePage) initArticlePage();
});
