document.addEventListener('DOMContentLoaded', () => {
    // ---------- ПЕРЕВОДЫ ----------
    const translations = {
        ru: {
            logo: "Fireline", "nav-changelog": "Ченжлог", "nav-links": "Полезные ссылки", "nav-news": "Новости",
            "bug-report": "Сообщить о баге", "download-btn": "СКАЧАТЬ", "hero-subtitle": "2d игра про боевые самолеты. Воздушные бои, ракеты, огонь в небе. Скачивай игру для Windows или Android.",
            "hero-download": "ПЕРЕЙТИ К СКАЧИВАНИЮ", "android-windows": "Android + Windows", "scroll-hint": "ПРОКРУТИ ВНИЗ",
            "hero-download-android": "Скачать для Android", "hero-download-windows": "Скачать для Windows",
            "hero-version-info": "v1.13 • 250 MB • Бесплатно • Без рекламы",
            "showcase-tag": "МЕДИА И ГЕЙМПЛЕЙ", "showcase-title": "В ЭПИЦЕНТРЕ СРАЖЕНИЙ",
            "showcase-subtitle": "Ощути динамику настоящих воздушных дуэлей, тактических манёвров и мощных ракетных атак.",
            "showcase-video-title": "Трейлер", "showcase-video-badge": "Показ игры",
            "video-ready-title": "Геймплей Fireline", "video-ready-desc": "Файл видео trailer.mp4 будет воспроизведён здесь",
            "showcase-screenshots-title": "Скриншоты", "carousel-hint": "Нажмите на изображение для просмотра",
            "screenshot-1-caption": "Воздушный Бой",
            "screenshot-2-caption": "Ангар и кастомизация техники",
            "screenshot-3-caption": "Мультиплеер",
            "screenshot-4-caption": "Бой против ЗРК",
            "community-tag": "НАШЕ СООБЩЕСТВО", "subscribers-label": "ПОДПИСЧИКОВ В TELEGRAM",
            "community-subtitle": "Присоединяйся к нашему штабу. Там публикуются свежие тестовые сборки, патчноуты и идет живое обсуждение проекта.",
            "open-channel": "ОТКРЫТЬ КАНАЛ →", "gameplay-tag": "ГЕЙМПЛЕЙ", "about-game": "О ИГРЕ",
            "feature-1-title": "АВИАЦИЯ", "feature-1-desc": "Управляй истребителями в воздушных схватках. Ракеты, манёвры, огонь в небе.",
            "feature-2-title": "БЕЗ ИНТЕРНЕТА", "feature-2-desc": "Полный офлайн-режим. Метро, дорога, где угодно — без WiFi.",
            "feature-3-title": "Android + Windows", "feature-3-desc": "Оптимизировано под Android + Windows. Плавный геймплей даже на бюджетных устройствах.",
            "feature-4-title": "ПОЛНОСТЬЮ БЕСПЛАТНО", "feature-4-desc": "Без подписок, без доната, без рекламы. Просто скачай и играй.",
            "cta-title": "ГОТОВ В БОЙ?", "cta-desc": "Нажми на кнопку ниже, чтобы перейти на платформу загрузки и установить актуальную версию игры.",
            "cta-button": "СКАЧАТЬ ИГРУ", "cta-notes": "Бесплатно • Android + Windows • Без рекламы",
            "footer": "© 2026 firelinefan. Все права защищены.", "settings-title": "Настройки интерфейса",
            "theme-title": "Цветовая схема", "theme-dark": "Тёмная", "theme-black": "Чёрная", "theme-light": "Светлая",
            "lang-title": "Язык интерфейса", vertex: "VERTEX INTERACTIVE"
        },
        ua: {
            logo: "Fireline", "nav-changelog": "Ченжлог", "nav-links": "Корисні посилання", "nav-news": "Новини",
            "bug-report": "Повідомити про баг", "download-btn": "ЗАВАНТАЖИТИ", "hero-subtitle": "2d гра про бойові літаки. Повітряні бої, ракети, вогонь у небі. Завантажуй гру для Windows або Android.",
            "hero-download": "ПЕРЕЙТИ ДО ЗАВАНТАЖЕННЯ", "android-windows": "Android + Windows", "scroll-hint": "ПРОКРУТИ ВНИЗ",
            "hero-download-android": "Завантажити для Android", "hero-download-windows": "Завантажити для Windows",
            "hero-version-info": "v1.13 • 250 MB • Безкоштовно • Без реклами",
            "showcase-tag": "МЕДІА ТА ГЕЙМПЛЕЙ", "showcase-title": "В ЕПІЦЕНТРІ БИТВ",
            "showcase-subtitle": "Відчуй динаміку справжніх повітряних дуелей, тактичних маневрів та потужних ракетних атак.",
            "showcase-video-title": "Трейлер", "showcase-video-badge": "Показ гри",
            "video-ready-title": "Геймплей Fireline", "video-ready-desc": "Файл відео trailer.mp4 буде відтворено тут",
            "showcase-screenshots-title": "Скріншоти", "carousel-hint": "Натисніть на зображення для перегляду",
            "screenshot-1-caption": "Повітряний Бій",
            "screenshot-2-caption": "Ангар та кастомізація техніки",
            "screenshot-3-caption": "Мультиплеєр",
            "screenshot-4-caption": "Бій проти ЗРК",
            "community-tag": "НАША СПІЛЬНОТА", "subscribers-label": "ПІДПИСНИКІВ У TELEGRAM",
            "community-subtitle": "Приєднуйся до нашого штабу. Там публікуються свіжі тестові збірки, патчноуты та відбувається живе обговорення проєкту.",
            "open-channel": "ВІДКРИТИ КАНАЛ →", "gameplay-tag": "ГЕЙМПЛЕЙ", "about-game": "ПРО ГРУ",
            "feature-1-title": "АВІАЦІЯ", "feature-1-desc": "Керуй винищувачами в повітряних сутичках. Ракети, маневри, вогонь у небі.",
            "feature-2-title": "БЕЗ ІНТЕРНЕТУ", "feature-2-desc": "Повний офлайн-режим. Метро, дорога, де завгодно — без WiFi.",
            "feature-3-title": "Android + Windows", "feature-3-desc": "Оптимізовано під Android + Windows. Плавний геймплей навіть на бюджетних пристроях.",
            "feature-4-title": "ПОВНІСТЮ БЕЗКОШТОВНО", "feature-4-desc": "Без підписок, без донату, без реклами. Просто завантаж і грай.",
            "cta-title": "ГОТОВИЙ ДО БОЮ?", "cta-desc": "Натисни кнопку нижче, щоб перейти на платформу завантаження та встановити актуальну версію гри.",
            "cta-button": "ЗАВАНТАЖИТИ ГРУ", "cta-notes": "Безкоштовно • Android + Windows • Без реклами",
            "footer": "© 2026 firelinefan. Усі права захищені.", "settings-title": "Налаштування інтерфейсу",
            "theme-title": "Кольорова схема", "theme-dark": "Темна", "theme-black": "Чорна", "theme-light": "Світла",
            "lang-title": "Мова інтерфейсу", vertex: "VERTEX INTERACTIVE"
        },
        en: {
            logo: "Fireline", "nav-changelog": "Changelog", "nav-links": "Useful links", "nav-news": "News",
            "bug-report": "Report a bug", "download-btn": "DOWNLOAD", "hero-subtitle": "2D combat aircraft game. Air battles, missiles, fire in the sky. Download the game for Windows or Android.",
            "hero-download": "GO TO DOWNLOAD", "android-windows": "Android + Windows", "scroll-hint": "SCROLL DOWN",
            "hero-download-android": "Download for Android", "hero-download-windows": "Download for Windows",
            "hero-version-info": "v1.13 • 250 MB • Free • No ads",
            "showcase-tag": "MEDIA & GAMEPLAY", "showcase-title": "IN THE HEART OF BATTLE",
            "showcase-subtitle": "Experience the dynamics of authentic dogfights, tactical maneuvers, and heavy missile strikes.",
            "showcase-video-title": "Trailer", "showcase-video-badge": "Ggame showcase",
            "video-ready-title": "Fireline Gameplay", "video-ready-desc": "Video file trailer.mp4 will be played here",
            "showcase-screenshots-title": "Screenshots", "carousel-hint": "Click on image to view",
            "screenshot-1-caption": "Fight",
            "screenshot-2-caption": "Hangar",
            "screenshot-3-caption": "Multiplayer",
            "screenshot-4-caption": "Battle vs SAM",
            "community-tag": "OUR COMMUNITY", "subscribers-label": "SUBSCRIBERS IN TELEGRAM",
            "community-subtitle": "Join our team. Fresh test builds, patch notes, and live discussions are published there.",
            "open-channel": "OPEN CHANNEL →", "gameplay-tag": "GAMEPLAY", "about-game": "ABOUT GAME",
            "feature-1-title": "AVIATION", "feature-1-desc": "Control fighters in aerial combat. Missiles, maneuvers, fire in the sky.",
            "feature-2-title": "OFFLINE", "feature-2-desc": "Full offline mode. Subway, road, anywhere — no WiFi needed.",
            "feature-3-title": "Android + Windows", "feature-3-desc": "Optimized for Android + Windows. Smooth gameplay even on budget devices.",
            "feature-4-title": "COMPLETELY FREE", "feature-4-desc": "No subscriptions, no donations, no ads. Just download and play.",
            "cta-title": "READY FOR BATTLE?", "cta-desc": "Click the button below to go to the download platform and install the latest version.",
            "cta-button": "DOWNLOAD GAME", "cta-notes": "Free • Android + Windows • No ads",
            "footer": "© 2026 firelinefan. All rights reserved.", "settings-title": "Interface Settings",
            "theme-title": "Color scheme", "theme-dark": "Dark", "theme-black": "Black", "theme-light": "Light",
            "lang-title": "Interface Language", vertex: "VERTEX INTERACTIVE"
        }
    };

    let currentLang = localStorage.getItem('fireline-lang') || 'ru';
    let currentTheme = localStorage.getItem('fireline-theme') || 'dark';

    // Применение перевода
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('fireline-lang', lang);
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[lang][key];
                } else {
                    const svg = el.querySelector('svg');
                    if (svg && el.childNodes.length === 1) {
                        el.innerHTML = svg.outerHTML + ' ' + translations[lang][key];
                    } else {
                        el.textContent = translations[lang][key];
                    }
                }
            }
        });
        document.querySelectorAll('.lang-opt').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
        document.documentElement.lang = (lang === 'ua' ? 'uk' : lang);
        if (typeof window.updateLightboxCaption === 'function') {
            window.updateLightboxCaption();
        }
    }

    function applyTheme(theme) {
        currentTheme = theme;
        localStorage.setItem('fireline-theme', theme);
        document.body.classList.remove('theme-dark', 'theme-black', 'theme-light');
        if (theme !== 'dark') document.body.classList.add(`theme-${theme}`);
        document.querySelectorAll('.theme-opt').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
        });
    }

    // ---------- СЧЁТЧИК ----------
    const counterElement = document.getElementById('sub-counter');
    if (counterElement) {
        const animationDuration = 2500;
        let targetValue = 5322; // запаска
        let animationStartTime = null;
        let animationFrame = null;

        // заранее запрашиваем актуальное число подписчиков
        const subscribersPromise = fetch('https://delicate-sun-b0fb.welloty403.workers.dev')
            .then(r => r.json())
            .then(data => {
                if (data && data.count) {
                    targetValue = data.count;
                }
            })
            .catch(err => console.error('Не удалось получить число подписчиков:', err));

        function step(currentTime) {
            if (!animationStartTime) animationStartTime = currentTime;
            const elapsed = currentTime - animationStartTime;
            if (elapsed < animationDuration) {
                const progress = elapsed / animationDuration;
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentCount = Math.floor(easeProgress * targetValue);
                counterElement.textContent = currentCount.toLocaleString('ru-RU');
                animationFrame = requestAnimationFrame(step);
            } else {
                counterElement.textContent = targetValue.toLocaleString('ru-RU');
                cancelAnimationFrame(animationFrame);
            }
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    subscribersPromise.finally(() => {
                        animationStartTime = null;
                        animationFrame = requestAnimationFrame(step);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(counterElement);
    }

    // ---------- ПАРТИКЛЫ (АТМОСФЕРНЫЕ ИСКРЫ И ПЕПЕЛ) ----------
    const particleCanvas = document.getElementById('radar-particles');
    if (particleCanvas) {
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
                // Размер частиц: 0.5 - 1.5px
                this.size = Math.random() * 1.0 + 0.5;

                // Волнообразная траектория
                this.angle = Math.random() * Math.PI * 2;
                this.waveSpeed = Math.random() * 0.02 + 0.008;
                this.waveAmplitude = Math.random() * 18 + 6;

                // Скорость подъёма и дрейфа
                this.speedY = Math.random() * 0.7 + 0.45;
                this.speedX = (Math.random() - 0.5) * 0.25;

                // Жизненный цикл (хватает для подъёма через весь экран)
                this.maxLife = Math.random() * 800 + 600;
                this.life = isInitial ? Math.random() * this.maxLife : 0;
                this.baseAlpha = Math.random() * 0.5 + 0.35;
                this.flickerSpeed = Math.random() * 0.08 + 0.03;

                // Огненно-оранжевые и красные градиентные оттенки
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

                // Плавное появление (fade-in) и затухание (fade-out)
                const progress = this.life / this.maxLife;
                let alphaFactor = 1;
                if (progress < 0.1) {
                    alphaFactor = progress / 0.1;
                } else if (progress > 0.75) {
                    alphaFactor = (1 - progress) / 0.25;
                }

                // Затухание только у самой верхней кромки экрана
                if (this.y < height * 0.1) {
                    alphaFactor *= Math.max(0, this.y / (height * 0.1));
                }

                // Мерцание тлеющей частицы
                const flicker = Math.sin(this.life * this.flickerSpeed) * 0.12;
                this.alpha = Math.max(0, Math.min(1, (this.baseAlpha + flicker) * alphaFactor));

                if (this.life >= this.maxLife || this.y < -25 || this.x < -40 || this.x > width + 40 || this.alpha <= 0.005) {
                    this.reset(false);
                }
            }

            draw() {
                if (this.alpha <= 0.01) return;
                const [r, g, b] = this.rgb;

                // Тлеющая искра
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.alpha})`;
                ctx.fill();

                // Неоновый ореол для горячих искр
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

    // ---------- МОДАЛЬНОЕ ОКНО НАСТРОЕК ----------
    const modal = document.getElementById('settings-modal');
    const settingsToggle = document.getElementById('settings-toggle');
    const modalClose = document.getElementById('modal-close');
    if (settingsToggle && modal) {
        settingsToggle.addEventListener('click', () => modal.classList.add('open'));
        modalClose.addEventListener('click', () => modal.classList.remove('open'));
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('open')) modal.classList.remove('open');
        });
    }

    // ---------- ТЕМА ----------
    document.querySelectorAll('.theme-opt').forEach(btn => {
        btn.addEventListener('click', () => applyTheme(btn.getAttribute('data-theme')));
    });
    // ---------- ЯЗЫК ----------
    document.querySelectorAll('.lang-opt').forEach(btn => {
        btn.addEventListener('click', () => applyLanguage(btn.getAttribute('data-lang')));
    });

    // Применяем сохранённые
    applyTheme(currentTheme);
    applyLanguage(currentLang);

    // ---------- ГАМБУРГЕР-МЕНЮ ----------
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });
    }

    // ---------- SHOWCASE: КАРУСЕЛЬ СКРИНШОТОВ ----------
    const carouselTrack = document.getElementById('carousel-track');
    const carouselContainer = document.getElementById('screenshot-carousel');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dots = document.querySelectorAll('#carousel-dots .dot');
    const slides = document.querySelectorAll('.carousel-slide');

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoplayTimer = null;

    function goToSlide(index) {
        if (totalSlides === 0) return;
        currentSlide = (index + totalSlides) % totalSlides;

        const slideWidth = slides[0].offsetWidth;
        const gap = 16;
        const offset = currentSlide * (slideWidth + gap);

        if (carouselTrack) {
            carouselTrack.style.transform = `translateX(-${offset}px)`;
        }

        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
            resetAutoplay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
            resetAutoplay();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoplay();
        });
    });

    // Автопрокрутка
    function startAutoplay() {
        if (autoplayTimer || totalSlides <= 1) return;
        autoplayTimer = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5500);
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoplay);
        carouselContainer.addEventListener('mouseleave', startAutoplay);
        carouselContainer.addEventListener('touchstart', stopAutoplay, { passive: true });
        carouselContainer.addEventListener('touchend', startAutoplay, { passive: true });

        // Сенсорное управление (Touch swipe)
        let touchStartX = 0;
        let touchEndX = 0;

        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 40) {
                if (diff > 0) {
                    goToSlide(currentSlide + 1);
                } else {
                    goToSlide(currentSlide - 1);
                }
            }
        }, { passive: true });
    }

    // Пересчет при изменении размеров экрана
    window.addEventListener('resize', () => {
        goToSlide(currentSlide);
    });

    goToSlide(0);
    startAutoplay();

    // 3. Лайтбокс (Lightbox Modal) для скриншотов
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxPlaceholder = document.getElementById('lightbox-placeholder');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    let currentLightboxIndex = 0;

    function getSlideCaption(index) {
        const slide = slides[index];
        if (!slide) return '';
        const captionKey = slide.getAttribute('data-caption-key');
        if (captionKey && translations[currentLang] && translations[currentLang][captionKey]) {
            return translations[currentLang][captionKey];
        }
        const captionEl = slide.querySelector('.slide-caption');
        return captionEl ? captionEl.textContent : '';
    }

    function updateLightboxContent(index) {
        if (totalSlides === 0) return;
        currentLightboxIndex = (index + totalSlides) % totalSlides;

        const slide = slides[currentLightboxIndex];
        const slideImg = slide.querySelector('.slide-img');

        if (lightboxCounter) {
            lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${totalSlides}`;
        }

        if (lightboxCaption) {
            lightboxCaption.textContent = getSlideCaption(currentLightboxIndex);
        }

        if (slideImg && slideImg.complete && slideImg.naturalWidth > 0) {
            lightboxImg.src = slideImg.src;
            lightboxImg.alt = slideImg.alt;
            lightboxImg.style.display = 'block';
            if (lightboxPlaceholder) lightboxPlaceholder.style.display = 'none';
        } else {
            // Если скриншот еще не загружен пользователем, показываем стилизованный HUD плейсхолдер
            lightboxImg.style.display = 'none';
            if (lightboxPlaceholder) {
                lightboxPlaceholder.style.display = 'flex';
                const pText = lightboxPlaceholder.querySelector('span');
                if (pText) pText.textContent = getSlideCaption(currentLightboxIndex);
            }
        }
    }

    window.updateLightboxCaption = function () {
        if (lightboxModal && lightboxModal.classList.contains('open')) {
            updateLightboxContent(currentLightboxIndex);
        }
    };

    function openLightbox(index) {
        updateLightboxContent(index);
        lightboxModal.classList.add('open');
        lightboxModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightboxModal.classList.remove('open');
        lightboxModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            updateLightboxContent(currentLightboxIndex - 1);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            updateLightboxContent(currentLightboxIndex + 1);
        });
    }

    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }

    // Клавиатурная навигация
    window.addEventListener('keydown', (e) => {
        if (lightboxModal && lightboxModal.classList.contains('open')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                updateLightboxContent(currentLightboxIndex - 1);
            } else if (e.key === 'ArrowRight') {
                updateLightboxContent(currentLightboxIndex + 1);
            }
        }
    });
});