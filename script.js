// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function () {
    initializeSplashScreen();
    // 基本機能は即座に初期化
    initializeNavigation();
    initializeSmoothScrolling();
    initializeContactForm();
});

// スプラッシュスクリーンの初期化
function initializeSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');

    // スプラッシュスクリーンの表示時間（3秒後に遷移開始）
    setTimeout(() => {
        // グローエフェクトを追加
        const splashText = document.querySelector('.splash-text');
        const splashDash = document.querySelector('.splash-dash');

        if (splashText && splashDash) {
            splashText.style.animation += ', pulseGlow 1s ease-in-out';
            splashDash.style.animation += ', pulseGlow 1s ease-in-out 0.2s';
        }

        // 1秒後にフェードアウト開始
        setTimeout(() => {
            splashScreen.classList.add('fade-out');

            // フェードアウト完了後にメインコンテンツ表示
            setTimeout(() => {
                mainContent.classList.add('show');
                splashScreen.style.display = 'none';

                // メインコンテンツが表示された後に重い処理を実行
                initializeMainContentFeatures();
            }, 1000);
        }, 1000);
    }, 2500);

    // クリックでスキップ機能
    splashScreen.addEventListener('click', () => {
        skipSplashScreen();
    });

    // Enterキーでスキップ機能
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !splashScreen.classList.contains('fade-out')) {
            skipSplashScreen();
        }
    });

    function skipSplashScreen() {
        splashScreen.classList.add('fade-out');
        setTimeout(() => {
            mainContent.classList.add('show');
            splashScreen.style.display = 'none';
            initializeMainContentFeatures();
        }, 500);
    }
}

// メインコンテンツの機能を初期化
function initializeMainContentFeatures() {
    initializeScrollAnimations();
    setTimeout(() => {
        initializeTypingEffect();
    }, 500);
}

// ナビゲーション機能
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // ハンバーガーメニューの切り替え
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // メニューリンクをクリックした時にメニューを閉じる
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // スクロール時のナビバーの透明度変更
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// スムーススクロール機能
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');

    [...navLinks, ...heroButtons].forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// スクロールアニメーション
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // アニメーション対象の要素を設定
    const animatedElements = document.querySelectorAll(
        '.skill-card, .timeline-item, .contact-item, .about-text, .about-stats'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 数字カウントアニメーション
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatNumber(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// 統計数字のアニメーション
function animateStatNumber(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/\d/g, '');
    let current = 0;
    const increment = number / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            element.textContent = number + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 30);
}

// タイピングエフェクト
function initializeTypingEffect() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';

        setTimeout(() => {
            typeText(heroSubtitle, originalText, 100);
        }, 1000);
    }
}

function typeText(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// お問い合わせフォーム
function initializeContactForm() {
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // フォームデータの取得
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // バリデーション
            if (!name || !email || !message) {
                showNotification('すべての項目を入力してください。', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('有効なメールアドレスを入力してください。', 'error');
                return;
            }

            // 送信処理のシミュレーション
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = '送信中...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showNotification('メッセージを送信しました。ありがとうございます！', 'success');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// メールアドレスのバリデーション
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 通知メッセージの表示
function showNotification(message, type = 'info') {
    // 既存の通知があれば削除
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // 通知要素の作成
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // スタイルの設定
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '5px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '400px'
    });

    // タイプ別の色設定
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        info: '#3498db'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    // DOMに追加
    document.body.appendChild(notification);

    // アニメーション
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);

    // 自動削除
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// ページトップボタンの追加
function addScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-top-btn';

    Object.assign(button.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: 'var(--secondary-color)',
        color: 'white',
        fontSize: '1.2rem',
        cursor: 'pointer',
        opacity: '0',
        visibility: 'hidden',
        transition: 'all 0.3s ease',
        zIndex: '1000',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // スクロール時の表示/非表示
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });

    document.body.appendChild(button);
}

// ページトップボタンを初期化
window.addEventListener('load', () => {
    addScrollToTopButton();
});

// パフォーマンス最適化: スクロールイベントのスロットリング
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// テーマ切り替え機能（オプション）
function initializeThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';

    Object.assign(themeToggle.style, {
        position: 'fixed',
        top: '50%',
        right: '20px',
        transform: 'translateY(-50%)',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        fontSize: '1.2rem',
        cursor: 'pointer',
        zIndex: '1000',
        transition: 'all 0.3s ease'
    });

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    document.body.appendChild(themeToggle);
}

// ページ遷移アニメーション
const transitionLink = document.querySelector('a[href="experience.html"]');

transitionLink.addEventListener('click', (event) => {
    event.preventDefault();
    const mainContent = document.getElementById('main-content');
    mainContent.classList.add('fade-out');

    setTimeout(() => {
        window.location.href = 'experience.html';
    }, 500); // アニメーションの時間に合わせる
});

// ページ遷移のアニメーションを追加
const links = document.querySelectorAll('a');

links.forEach(link => {
    link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');

        // 内部リンクのみ処理
        if (href && href.endsWith('.html')) {
            event.preventDefault();

            // フェードアウトとスライド効果を適用
            document.body.classList.add('fade-slide-out');

            // 遷移を遅延させる
            setTimeout(() => {
                window.location.href = href;
            }, 800); // CSSアニメーションの時間に合わせる
        }
    });
});
