document.addEventListener('DOMContentLoaded', () => {
    const settingsToggle = document.getElementById('settings-toggle');
    const settingsModal = document.getElementById('settings-modal');
    const modalClose = document.getElementById('modal-close');
    const themeOpts = document.querySelectorAll('.theme-opt');
    const langOpts = document.querySelectorAll('.lang-opt');

    // Словарь локализации страниц
    const TRANSLATIONS = {
        ru: {
            "bug-report": "Сообщить о баге",
            "settings-title": "Конфигурация сайта",
            "lang-title": "Язык интерфейса",
            "theme-title": "Цветовая схема",
            "theme-dark": "Темная",
            "theme-black": "Черная",
            "theme-light": "Светлая",
            "hero-title": "Полезные ссылки",
            "hero-desc": "Официальные ресурсы, поддержка разработки и свежая информация по проекту Fireline.",
            "news-title": "Новости",
            "news-desc": "Актуальные новости, анонсы обновлений и свежая информация о разработке игры.",
            "discord-title": "Сообщество игры (Discord)",
            "discord-desc": "Живое общение с комьюнити, общение с разработчиком.",
            "telegram-title": "Telegram-канал",
            "telegram-desc": "Быстрые новости, опросы, спойлеры разработки.",
            "telegram-chat-title": "Сообщество игры (Telegram)",
            "telegram-chat-desc": "Живое общение с комьюнити, общение с разработчиком.",
            "youtube-title": "YouTube-Канал",
            "youtube-desc": "Официальные видео, демонстрация новых механик в динамике и обзоры техники.",
            "boosty-title": "Наш Boosty",
            "boosty-desc": "Поддержите команду Vertexgames и получите возможность создать собственную наклейку на самолет!",
            "footer-text": "© 2026 vertexgames. Все права защищены.",
            "nav-changelog": "Ченжлог",
            "nav-news": "Новости",
            "nav-links": "Полезные ссылки",
            "download-btn": "СКАЧАТЬ"
        },
        ua: {
            "bug-report": "Повідомити про баг",
            "settings-title": "Конфігурація сайту",
            "lang-title": "Мова інтерфейсу",
            "theme-title": "Колірна схема",
            "theme-dark": "Темна",
            "theme-black": "Чорна",
            "theme-light": "Світла",
            "hero-title": "Корисні посилання",
            "hero-desc": "Офіційні ресурси, підтримка розробки та свіжа інформація щодо проєкту Fireline.",
            "news-title": "Новини",
            "news-desc": "Актуальні новини, анонси оновлень та свіжа інформація про розробку гри.",
            "discord-title": "Спільнота гри (Discord)",
            "discord-desc": "Живе спілкування з ком'юніті, спілкування з розробником.",
            "telegram-title": "Telegram-канал",
            "telegram-desc": "Швидкі новини, опитування, спойлери розробки.",
            "telegram-chat-title": "Спільнота гри (Telegram)",
            "telegram-chat-desc": "Живе спілкування з ком'юніті, спілкування з розробником.",
            "youtube-title": "YouTube-канал",
            "youtube-desc": "Офіційні відео, демонстрація нових механік у динаміці та огляди техніки.",
            "boosty-title": "Наш Boosty",
            "boosty-desc": "Підтримайте команду Vertexgames та отримайте можливість створити власну наліпку на літак!",
            "footer-text": "© 2026 vertexgames. Усі права захищені.",
            "nav-changelog": "Чейнджлог",
            "nav-news": "Новини",
            "nav-links": "Корисні посилання",
            "download-btn": "ЗАВАНТАЖИТИ"
        },
        en: {
            "bug-report": "Report a Bug",
            "settings-title": "Site Configuration",
            "lang-title": "Interface Language",
            "theme-title": "Color Schema",
            "theme-dark": "Dark",
            "theme-black": "Black",
            "theme-light": "Light",
            "hero-title": "Useful Links",
            "hero-desc": "Official resources, development support, and the latest information about the Fireline project.",
            "news-title": "News",
            "news-desc": "Latest news, update announcements, and fresh information about game development.",
            "discord-title": "Game Community (Discord)",
            "discord-desc": "Live chat with the community and interaction with the developer.",
            "telegram-title": "Telegram Channel",
            "telegram-desc": "Quick news, polls, and development spoilers.",
            "telegram-chat-title": "Game Community (Telegram)",
            "telegram-chat-desc": "Live chat with the community and interaction with the developer.",
            "youtube-title": "YouTube Channel",
            "youtube-desc": "Official videos, dynamic showcases of new mechanics, and vehicle reviews.",
            "boosty-title": "Our Boosty",
            "boosty-desc": "Support the Vertexgames team and get the chance to create your own aircraft sticker!",
            "footer-text": "© 2026 vertexgames. All rights reserved.",
            "nav-changelog": "Changelog",
            "nav-news": "News",
            "nav-links": "Useful Links",
            "download-btn": "DOWNLOAD"
        }
    };


    // --- ЛОГИКА СМЕНЫ ЯЗЫКА ---
    const savedLang = localStorage.getItem('fireline-lang') || 'ru';
    applyLanguage(savedLang);

    langOpts.forEach(opt => {
        opt.addEventListener('click', () => {
            const lang = opt.getAttribute('data-lang');
            applyLanguage(lang);
            localStorage.setItem('fireline-lang', lang);
        });
    });

    function applyLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
                // Если внутри элемента есть иконка SVG (например, кнопка бага), не затираем её
                const svg = element.querySelector('svg');
                if (svg) {
                    element.innerHTML = '';
                    element.appendChild(svg);
                    element.appendChild(document.createTextNode(' ' + TRANSLATIONS[lang][key]));
                } else {
                    element.textContent = TRANSLATIONS[lang][key];
                }
            }
        });

        // Подсвечиваем активную кнопку языка
        langOpts.forEach(o => {
            o.classList.toggle('active', o.getAttribute('data-lang') === lang);
        });

        document.documentElement.lang = (lang === 'ua' ? 'uk' : lang);
    }


    // --- ЛОГИКА СМЕНЫ ТЕМЫ ---
    const savedTheme = localStorage.getItem('fireline-theme') || 'dark';
    applyTheme(savedTheme);

    themeOpts.forEach(opt => {
        opt.addEventListener('click', () => {
            const theme = opt.getAttribute('data-theme');
            applyTheme(theme);
            localStorage.setItem('fireline-theme', theme);
        });
    });

    function applyTheme(theme) {
        document.body.classList.remove('theme-black', 'theme-light');
        themeOpts.forEach(o => {
            o.classList.toggle('active', o.getAttribute('data-theme') === theme);
        });

        if (theme === 'black') document.body.classList.add('theme-black');
        if (theme === 'light') document.body.classList.add('theme-light');
    }

    // --- УПРАВЛЕНИЕ МОДАЛЬНЫМ ОКНОМ ---
    settingsToggle.addEventListener('click', () => {
        settingsModal.style.display = 'flex';
        setTimeout(() => settingsModal.classList.add('active'), 10);
    });

    const closeModal = () => {
        settingsModal.classList.remove('active');
        setTimeout(() => settingsModal.style.display = 'none', 250);
    };

    modalClose.addEventListener('click', closeModal);
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) closeModal();
    });

    // --- МОБИЛЬНОЕ МЕНЮ ---
    const burger = document.getElementById('hamburger');
    const menu = document.getElementById('mobile-menu');
    if (burger && menu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('open');
            menu.classList.toggle('open');
        });
    }
});

// --- СИСТЕМА ЧАСТИЦ (АТМОСФЕРНЫЕ ИСКРЫ И ПЕПЕЛ) ---
const canvas = document.getElementById('bg-particles');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    function resizeCanvas() {
        dpr = window.devicePixelRatio || 1;
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
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
                [255, 95, 30],
                [235, 60, 35],
                [255, 145, 40],
                [205, 45, 30],
                [255, 190, 75]
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

    const particleCount = 65;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new EmberParticle(true));
    }

    function animate() {
        if (!canvas || !ctx) return;
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        requestAnimationFrame(animate);
    }
    animate();
}