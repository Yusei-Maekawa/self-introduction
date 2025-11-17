/**
 * script.js
 *
 * ============================================================================
 * 📖 ファイル概要 / File Overview
 * ============================================================================
 *
 * 【日本語】
 * ポートフォリオサイトのメインJavaScriptファイル。
 * ページ初期化、アニメーション、AtCoderデータ取得・表示、
 * ユーザーインタラクション処理を担当します。
 *
 * 【主な機能】
 * 1. スプラッシュスクリーン制御(表示・スキップ処理)
 * 2. ナビゲーションバー(ハンバーガーメニュー、スクロール時透明度変更)
 * 3. スムーススクロール
 * 4. スクロールアニメーション(IntersectionObserver使用)
 * 5. AtCoderレーティング取得・表示(JSON/API)
 * 6. レーティング円グラフアニメーション(SVG、12時起点右回転)
 * 7. お問い合わせフォーム(バリデーション、通知)
 * 8. タイピングエフェクト
 * 9. ページトップボタン
 *
 * 【English】
 * Main JavaScript file for the portfolio site.
 * Handles page initialization, animations, AtCoder data fetching/display,
 * and user interaction processing.
 *
 * 【Key Features】
 * 1. Splash screen control (display and skip handling)
 * 2. Navigation bar (hamburger menu, scroll opacity change)
 * 3. Smooth scrolling
 * 4. Scroll animations (using IntersectionObserver)
 * 5. AtCoder rating fetching and display (JSON/API)
 * 6. Rating circle graph animation (SVG, 12 o'clock start, clockwise)
 * 7. Contact form (validation, notifications)
 * 8. Typing effect
 * 9. Scroll-to-top button
 *
 * ============================================================================
 * 🎯 グローバル変数 / Global Variables
 * ============================================================================
 *
 * RATING_COLORS: Array<{min, max, color, name, class}>
 * - 日本語: AtCoderレーティング色境界定義(400点ごと)
 * - English: AtCoder rating color boundary definitions (every 400 points)
 * - 0-399: 灰色(gray), 400-799: 茶色(brown), 800-1199: 緑(green),
 *   1200-1599: 水色(cyan), 1600-1999: 青(blue), 2000-2399: 黄(yellow),
 *   2400-2799: 橙(orange), 2800+: 赤(red)
 *
 * ============================================================================
 * 🔧 主要関数 / Main Functions
 * ============================================================================
 *
 * ◆ ページ初期化 / Page Initialization
 * ────────────────────────────────────────────────────────────────────────────
 *
 * 1. DOMContentLoaded イベントリスナー
 *    - 日本語: ページ読み込み時に基本機能を初期化
 *    - English: Initialize basic features on page load
 *    - 呼び出し: initializeSplashScreen(), initializeNavigation(), etc.
 *
 * 2. initializeSplashScreen()
 *    - 日本語: スプラッシュスクリーン表示・非表示制御
 *    - English: Control splash screen display and hide
 *    - タイミング: 2.5秒後にグローエフェクト → 1秒後フェードアウト
 *    - スキップ: クリック or Enterキー
 *
 * 3. initializeMainContentFeatures()
 *    - 日本語: メインコンテンツの機能を初期化
 *    - English: Initialize main content features
 *    - 呼び出し: initializeScrollAnimations(), initializeAtCoderSection(), etc.
 *
 * ◆ ナビゲーション / Navigation
 * ────────────────────────────────────────────────────────────────────────────
 *
 * 4. initializeNavigation()
 *    - 日本語: ナビゲーションバー制御(ハンバーガーメニュー、スクロール時透明度)
 *    - English: Navigation bar control (hamburger menu, scroll opacity)
 *
 * 5. initializeSmoothScrolling()
 *    - 日本語: スムーススクロール機能
 *    - English: Smooth scrolling feature
 *    - 対象: .nav-link, .hero-buttons .btn
 *
 * ◆ アニメーション / Animations
 * ────────────────────────────────────────────────────────────────────────────
 *
 * 6. initializeScrollAnimations()
 *    - 日本語: スクロールアニメーション設定(IntersectionObserver)
 *    - English: Set up scroll animations (IntersectionObserver)
 *    - 対象: .skill-card, .timeline-item, .contact-item, etc.
 *
 * 7. animateStatNumber(element: HTMLElement)
 *    - 日本語: 数値統計のカウントアップアニメーション
 *    - English: Count-up animation for numeric statistics
 *    - 使用: .stat-number要素
 *
 * 8. initializeTypingEffect()
 *    - 日本語: ヒーローセクションのタイピングエフェクト
 *    - English: Typing effect for hero section
 *    - 使用: typeText(element, text, speed)
 *
 * 9. typeText(element: HTMLElement, text: string, speed: number)
 *    - 日本語: タイプライター実装
 *    - English: Typewriter implementation
 *
 * ◆ AtCoder関連 / AtCoder Related
 * ────────────────────────────────────────────────────────────────────────────
 *
 * 10. initializeAtCoderSection()
 *     - 日本語: AtCoderセクション初期化、スクロールで表示時にアニメーション開始
 *     - English: Initialize AtCoder section, start animation when scrolled into view
 *     - IntersectionObserver使用、初回のみ実行
 *
 * 11. fetchAtCoderData()
 *     - 日本語: AtCoderレーティングデータ取得(優先順位: ローカルJSON → API)
 *     - English: Fetch AtCoder rating data (priority: local JSON → API)
 *     - データソース: data/atcoder-rating.json, AtCoder API
 *
 * 12. parseRatingHistory(ratingHistory: Array): Object
 *     - 日本語: レーティング履歴を解析(アルゴリズム/ヒューリスティック分離)
 *     - English: Parse rating history (separate algorithm/heuristic)
 *
 * 13. updateLastUpdateTime(apiSuccess: boolean, lastUpdated?: string)
 *     - 日本語: 最終更新時刻表示更新
 *     - English: Update last update time display
 *
 * 14. displayAtCoderData(atcoderData: Object)
 *     - 日本語: AtCoderデータをDOMに表示、アニメーション開始
 *     - English: Display AtCoder data in DOM and start animations
 *     - 呼び出し: animateRatingWithColorTransition()
 *
 * 15. animateRatingWithColorTransition(ratingElement, ratingCircle, targetRating)
 *     - 日本語: レーティング値のカウントアップ＋色遷移＋SVG円グラフアニメーション
 *     - English: Rating value count-up + color transition + SVG circle graph animation
 *     - アニメーション: 2.5秒、120fps、easeOutCubic
 *     - 呼び出し: drawRatingProgress()
 *
 * 16. drawRatingProgress(svg, rating, rotationProgressForTop, totalLayersTarget)
 *     - 日本語: SVG円グラフ描画(400点=360度、12時起点右回転)
 *     - English: Draw SVG circle graph (400 points = 360deg, 12 o'clock start, clockwise)
 *     - 各レイヤー: 扇形(pie slice)で描画
 *     - 最上層: 回転アニメーション適用
 *
 * 17. createPieSlicePath(cx, cy, r, startAngleDeg, sweepDeg, color)
 *     - 日本語: 扇形SVGパス生成(12時起点)
 *     - English: Generate pie slice SVG path (12 o'clock origin)
 *     - 戻り値: SVG path要素 or circle要素
 *
 * 18. drawArcSegment(svg, centerX, centerY, startAngle, sweepAngle, color, strokeWidth)
 *     - 日本語: 円弧セグメント描画(旧バージョン用ヘルパー)
 *     - English: Draw arc segment (helper for old version)
 *
 * 19. reloadAtCoderData()
 *     - 日本語: AtCoderデータ手動再読み込み
 *     - English: Manually reload AtCoder data
 *     - 公開: window.reloadAtCoderData
 *
 * ◆ UI・フォーム / UI & Forms
 * ────────────────────────────────────────────────────────────────────────────
 *
 * 20. initializeContactForm()
 *     - 日本語: お問い合わせフォーム初期化(バリデーション、送信シミュレーション)
 *     - English: Initialize contact form (validation, send simulation)
 *
 * 21. isValidEmail(email: string): boolean
 *     - 日本語: メールアドレス正規表現バリデーション
 *     - English: Email regex validation
 *
 * 22. showNotification(message: string, type: string)
 *     - 日本語: フローティング通知表示(success/error/info)
 *     - English: Show floating notification (success/error/info)
 *
 * 23. addScrollToTopButton()
 *     - 日本語: ページトップボタン追加・表示制御
 *     - English: Add scroll-to-top button and control visibility
 *
 * ◆ ユーティリティ / Utilities
 * ────────────────────────────────────────────────────────────────────────────
 *
 * 24. throttle(func: Function, wait: number)
 *     - 日本語: 関数実行スロットリング
 *     - English: Throttle function execution
 *
 * 25. initializeThemeToggle()
 *     - 日本語: テーマ切り替えボタン追加(ダーク/ライト)
 *     - English: Add theme toggle button (dark/light)
 *
 * 26. animateStatValue(element, targetValue)
 *     - 日本語: 統計値アニメーション表示
 *     - English: Animate stat value display
 *
 * 27. animateValueWithColorTransition(element, targetValue, options)
 *     - 日本語: 数値を色遷移付きでアニメーション
 *     - English: Animate value with color transition
 *
 * ============================================================================
 * 🎨 アニメーション仕様 / Animation Specifications
 * ============================================================================
 *
 * SVG円グラフ描画:
 * - 起点: 12時方向(-90度、SVG transform: rotate(-90deg))
 * - 回転: 右回り(時計回り)
 * - 1周: 400点
 * - レイヤー構造: 各400点ブロックを扇形で重ねる
 * - 最上層: 部分的な場合は1周回転して12時で終了
 *
 * カウントアップ:
 * - イージング: easeOutCubic
 * - FPS: 120
 * - デュレーション: 2.5秒(レーティング)、1.5秒(統計値)
 *
 * ============================================================================
 * 🔗 依存関係 / Dependencies
 * ============================================================================
 *
 * 外部ライブラリ: なし(Vanilla JavaScript)
 *
 * DOM要素:
 * - #splash-screen: スプラッシュスクリーン
 * - #main-content: メインコンテンツ
 * - .navbar, .nav-menu, .hamburger: ナビゲーション
 * - #atcoder: AtCoderセクション
 * - .atcoder-card[data-contest-type]: AtCoderカード
 * - .rating-value, .atcoder-rating-circle: レーティング表示
 *
 * データソース:
 * - data/atcoder-rating.json: ローカルJSONデータ
 * - AtCoder API / kenkoooo API: 外部API
 *
 * ============================================================================
 *
 * @author Yusei Maekawa (前川 雄世)
 * @version 1.0.0
 * @since 2025-11-01
 * @updated 2025-11-17
 */

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

// AtCoderセクションの初期化
function initializeAtCoderSection() {
    const atcoderSection = document.getElementById('atcoder');
    if (!atcoderSection) return;
    
    let hasAnimated = false; // アニメーション実行済みフラグ
    
    // セクションが表示されたときにアニメーションを開始
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                // データを取得してアニメーション開始
                fetchAtCoderData();
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sectionObserver.observe(atcoderSection);
    
    // カードのアニメーション
    const atcoderCards = document.querySelectorAll('.atcoder-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 200);
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    atcoderCards.forEach(card => cardObserver.observe(card));

    // Goals initialization
    initializeAtCoderGoals();
}

// AtCoderのデータを取得する関数
async function fetchAtCoderData() {
    const username = 'Y_Maekawa';
    
    // デフォルトデータ（API取得失敗時やローカル開発時に使用）
    const fallbackData = {
        algo: {
            rating: 271,
            highest: 288,
            rank: '-',
            contests: 20
        },
        heuristic: {
            rating: 1241,
            highest: 1247,
            rank: '-',
            contests: 5
        }
    };
    
    try {
        // 優先順位1: GitHub Actionsで生成されたJSONファイルを読み込む
        console.log('Trying to fetch from local JSON file...');
        try {
            const jsonResponse = await fetch('data/atcoder-rating.json', {
                cache: 'no-cache',
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });
            
            if (jsonResponse.ok) {
                const jsonData = await jsonResponse.json();
                console.log('✅ Successfully loaded data from JSON file:', jsonData);
                
                const atcoderData = {
                    algo: {
                        rating: jsonData.algorithm.current,
                        highest: jsonData.algorithm.highest,
                        highestPerformance: jsonData.algorithm.highestPerformance || 0,
                        rank: jsonData.algorithm.rank === '-' ? '-' : `${jsonData.algorithm.rank}位`,
                        contests: jsonData.algorithm.contests,
                        remaining: jsonData.algorithm.remaining,
                        achieved: jsonData.algorithm.achieved
                    },
                    heuristic: {
                        rating: jsonData.heuristic.current,
                        highest: jsonData.heuristic.highest,
                        highestPerformance: jsonData.heuristic.highestPerformance || 0,
                        rank: jsonData.heuristic.rank === '-' ? '-' : `${jsonData.heuristic.rank}位`,
                        contests: jsonData.heuristic.contests,
                        remaining: jsonData.heuristic.remaining,
                        achieved: jsonData.heuristic.achieved
                    }
                };
                
                displayAtCoderData(atcoderData);
                updateLastUpdateTime(true, jsonData.lastUpdated);
                return;
            }
        } catch (jsonError) {
            console.warn('Failed to load JSON file, trying API...', jsonError.message);
        }
        
        // 優先順位2: AtCoder APIから直接取得を試みる
        const apiEndpoints = [
            `https://atcoder.jp/users/${username}/history/json`,
            `https://kenkoooo.com/atcoder/atcoder-api/v3/user/rating_history?user=${username}`
        ];
        
        let apiSuccess = false;
        
        for (const endpoint of apiEndpoints) {
            try {
                console.log(`Trying API: ${endpoint}`);
                const response = await fetch(endpoint, {
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    const ratingHistory = await response.json();
                    if (ratingHistory && ratingHistory.length > 0) {
                        console.log('✅ API Success:', endpoint);
                        
                        // データを解析
                        const atcoderData = parseRatingHistory(ratingHistory);
                        displayAtCoderData(atcoderData);
                        updateLastUpdateTime(true);
                        return;
                    }
                }
            } catch (apiError) {
                console.warn(`Failed to fetch from ${endpoint}:`, apiError.message);
                continue;
            }
        }
        
        // すべて失敗した場合はフォールバックデータを使用
        console.warn('All data sources failed, using fallback data');
        displayAtCoderData(fallbackData);
        updateLastUpdateTime(false);
        
    } catch (error) {
        console.error('AtCoderデータの取得エラー:', error);
        displayAtCoderData(fallbackData);
        updateLastUpdateTime(false);
    }
}

// レーティング履歴を解析する関数
function parseRatingHistory(ratingHistory) {
    const algoContests = ratingHistory.filter(c => {
        const cid = (c.contest_id || c.ContestScreenName || '').toLowerCase();
        return !cid.includes('ahc') && !cid.includes('marathon');
    });
    
    const heuristicContests = ratingHistory.filter(c => {
        const cid = (c.contest_id || c.ContestScreenName || '').toLowerCase();
        return cid.includes('ahc') || cid.includes('marathon');
    });
    
    const atcoderData = {
        algo: { rating: 271, highest: 288, rank: '-', contests: 0 },
        heuristic: { rating: 1241, highest: 1247, rank: '-', contests: 0 }
    };
    
    if (algoContests.length > 0) {
        const latestAlgo = algoContests[algoContests.length - 1];
        const highestAlgo = Math.max(...algoContests.map(c => c.NewRating || c.new_rating || 0));
        atcoderData.algo = {
            rating: latestAlgo.NewRating || latestAlgo.new_rating || 0,
            highest: highestAlgo,
            rank: (latestAlgo.Place || latestAlgo.place) ? `${latestAlgo.Place || latestAlgo.place}位` : '-',
            contests: algoContests.length
        };
    }
    
    if (heuristicContests.length > 0) {
        const latestHeuristic = heuristicContests[heuristicContests.length - 1];
        const highestHeuristic = Math.max(...heuristicContests.map(c => c.NewRating || c.new_rating || 0));
        atcoderData.heuristic = {
            rating: latestHeuristic.NewRating || latestHeuristic.new_rating || 0,
            highest: highestHeuristic,
            rank: (latestHeuristic.Place || latestHeuristic.place) ? `${latestHeuristic.Place || latestHeuristic.place}位` : '-',
            contests: heuristicContests.length
        };
    }
    
    return atcoderData;
}

// 最終更新時刻を表示
function updateLastUpdateTime(apiSuccess = false, lastUpdated = null) {
    const noteElement = document.querySelector('.atcoder-note p');
    if (noteElement) {
        let timeString;
        
        if (lastUpdated) {
            // JSONファイルから取得した場合は、そのタイムスタンプを使用
            const date = new Date(lastUpdated);
            timeString = date.toLocaleString('ja-JP', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Tokyo'
            });
        } else {
            // 現在時刻を使用
            const now = new Date();
            timeString = now.toLocaleString('ja-JP', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        
        const originalText = '水色コーダー（レート1200以上）を目指して、日々精進中です！';
        const statusText = apiSuccess 
            ? `<span style="color: #00c0c0;">✓ 最新データ</span>` 
            : `<span style="color: #ff8000;">⚠ ローカルデータ</span>`;
        noteElement.innerHTML = `${originalText}<br><small style="color: #888; font-size: 0.85em;">最終更新: ${timeString} | ${statusText}</small>`;
    }
}

// AtCoderデータを表示する関数
function displayAtCoderData(atcoderData) {
    const atcoderCards = document.querySelectorAll('.atcoder-card');
    
    atcoderCards.forEach(card => {
        const contestType = card.getAttribute('data-contest-type');
        const data = atcoderData[contestType];
        
        if (data) {
            // レーティング円の要素
            const ratingElement = card.querySelector('.rating-value');
            const ratingCircle = card.querySelector('.atcoder-rating-circle');
            const targetRating = data.rating;
            
            // data属性を更新
            ratingElement.setAttribute('data-rating', targetRating);
            
            // Ensure initial position is not shifted (clear classes) so animation starts centered
            const ratingAndParticipationContainer = ratingCircle.closest('.rating-and-participation');
            if (ratingAndParticipationContainer) {
                ratingAndParticipationContainer.classList.remove('shift-left');
                ratingAndParticipationContainer.classList.remove('show-participation');
            }

            // レーティングのカウントアップアニメーション（灰→茶→緑→水...と色を変えながら）
            // アニメーション完了後にレート円を左へスライドし、参加回数を表示する
            const contests = data.contests || 0;
            animateRatingWithColorTransition(ratingElement, ratingCircle, targetRating, targetRating)
                .then(() => {
                    try {
                        const container = ratingCircle.closest('.rating-and-participation');
                        if (container) {
                            // 左へスライド
                            container.classList.add('shift-left');

                            // 参加回数をセットしてフェードイン
                            const participationEl = container.querySelector('.participation-count');
                            if (participationEl) {
                                participationEl.setAttribute('data-participation', contests);
                                participationEl.textContent = String(contests);
                            }

                            // show with a short delay so the slide feels natural
                            setTimeout(() => {
                                container.classList.add('show-participation');

                                // pop animation for the count (small scale + fade)
                                const participationCount = container.querySelector('.participation-count');
                                if (participationCount) {
                                    // ensure hidden -> then pop
                                    participationCount.classList.remove('pop');
                                    // trigger in next tick so animation runs
                                    setTimeout(() => participationCount.classList.add('pop'), 20);
                                    // remove pop class after animation so it can replay on reload
                                    setTimeout(() => participationCount.classList.remove('pop'), 800);
                                }
                            }, 220);
                        }
                    } catch (e) {
                        console.warn('Post-rating shift/show participation error', e);
                    }
                });
            
            // 最高レート表示（円形・RATINGと同じ形式）
            const highestStat = card.querySelector('[data-stat="highest"]');
            const highestCircle = card.querySelector('[data-stat-circle="highest"]');
            if (highestStat && highestCircle && data.highest) {
                highestStat.setAttribute('data-rating', data.highest);
                animateRatingWithColorTransition(highestStat, highestCircle, data.highest);
            }
            
            // 最高パフォーマンス表示（円形・RATINGと同じ形式）
            const performanceStat = card.querySelector('[data-stat="performance"]');
            const performanceCircle = card.querySelector('[data-stat-circle="performance"]');
            if (performanceStat && performanceCircle && data.highestPerformance) {
                performanceStat.setAttribute('data-rating', data.highestPerformance);
                animateRatingWithColorTransition(performanceStat, performanceCircle, data.highestPerformance);
            }
            // Update goals tiles and progress for each contest type
            try {
                updateGoalTiles(card, data.rating);
                updateGoalProgress(atcoderData);
            } catch (e) {
                console.warn('Goal tile/progress update error', e);
            }
        }
    });
}

// 初期化: 目標タイルとクリックでの展開を設定
function initializeAtCoderGoals() {
    console.log('🎯 Initializing AtCoder goals...');
    const goalCards = document.querySelectorAll('.goal-card');
    console.log('Found goal cards:', goalCards.length);
    goalCards.forEach(card => {
        const header = card.querySelector('.goal-header');
        // open/close on click and keyboard
        const toggle = () => {
            const expanded = card.classList.toggle('expanded');
            card.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        };

        card.addEventListener('click', toggle);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });

        // Render default tiles from data-target attr (target rating value)
        const tilesEl = card.querySelector('.goal-tiles');
        const targetRating = parseInt(tilesEl.getAttribute('data-target')) || 0;
        tilesEl.innerHTML = '';
        const stack = document.createElement('div');
        stack.className = 'tile-stack';
        // tiles to show are within-color tiles: 1..4 per 100 score
        const within = Math.floor((targetRating % 400) / 100) + 1;
        for (let i = 0; i < within; i++) {
            const t = document.createElement('div');
            t.className = 'tile';
            t.textContent = '^';
            stack.appendChild(t);
        }
        tilesEl.appendChild(stack);
    });
}

// Update goal tiles based on the given rating (to show current tiles)
function updateGoalTiles(card, rating) {
    const tilesEl = card.querySelector('.goal-tiles');
    if (!tilesEl) return;
    const target = parseInt(tilesEl.getAttribute('data-target')) || 0;
    tilesEl.innerHTML = '';

    const curStack = document.createElement('div');
    curStack.className = 'tile-stack';
    const withinCur = Math.floor((rating % 400) / 100) + 1;
    for (let i = 0; i < withinCur; i++) {
        const t = document.createElement('div');
        t.className = 'tile';
        // color tile by rating color
        const colorInfo = RATING_COLORS.find(c => rating >= c.min && rating <= c.max) || RATING_COLORS[0];
        t.style.color = colorInfo.color;
        t.textContent = '^';
        curStack.appendChild(t);
    }
    // show target tiles faintly next to current tile
    const targetStack = document.createElement('div');
    targetStack.className = 'tile-stack';
    const withinTarget = Math.floor((target % 400) / 100) + 1;
    for (let i = 0; i < withinTarget; i++) {
        const t = document.createElement('div');
        t.className = 'tile';
        t.style.opacity = '0.28';
        const colorInfo = RATING_COLORS.find(c => target >= c.min && target <= c.max) || RATING_COLORS[0];
        t.style.color = colorInfo.color;
        t.textContent = '^';
        targetStack.appendChild(t);
    }

    tilesEl.appendChild(curStack);
    tilesEl.appendChild(targetStack);

    // Also update progress bar for nearest target in the card
    const targetVal = parseInt(tilesEl.getAttribute('data-target')) || 0;
    const progressBar = card.querySelector('.goal-progress-fill');
    if (progressBar && targetVal > 0) {
        const percent = Math.floor((Math.min(rating, targetVal) / targetVal) * 100);
        progressBar.style.width = `${percent}%`;
    }
}

// Update goal progress: show current rating and contest counts
function updateGoalProgress(atcoderData) {
    const el = document.getElementById('goal-progress');
    if (!el) return;
    const algo = atcoderData.algo;
    const heur = atcoderData.heuristic;
    el.innerHTML = `アルゴリズム：現在 ${algo.rating} (${algo.contests} 回参加)　／　ヒューリスティック：現在 ${heur.rating} (${heur.contests} 回参加)`;
}

// レーティングを色遷移付きでアニメーションする関数
// グローバルのレーティング色境界（400点ごとに色が変わる）
const RATING_COLORS = [
    { min: 0, max: 399, color: '#808080', name: 'グレー', class: 'rating-gray' },
    { min: 400, max: 799, color: '#804000', name: '茶色', class: 'rating-brown' },
    { min: 800, max: 1199, color: '#008000', name: '緑', class: 'rating-green' },
    { min: 1200, max: 1599, color: '#00c0c0', name: '水色', class: 'rating-cyan' },
    { min: 1600, max: 1999, color: '#0000ff', name: 'ブルー', class: 'rating-blue' },
    { min: 2000, max: 2399, color: '#c0c000', name: 'イエロー', class: 'rating-yellow' },
    { min: 2400, max: 2799, color: '#ff8000', name: 'オレンジ', class: 'rating-orange' },
    { min: 2800, max: 9999, color: '#ff0000', name: 'レッド', class: 'rating-red' }
];

function animateRatingWithColorTransition(ratingElement, ratingCircle, targetRating) {
    return new Promise((resolve) => {
        const duration = 3000; // 3秒
        const fps = 120;
        const totalFrames = Math.floor(duration / (1000 / fps));
        let currentFrame = 0;
    
    // 円グラフ用のSVG要素を作成
    let progressCircle = ratingCircle.querySelector('.rating-progress-circle');
    if (!progressCircle) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('rating-progress-circle');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.transform = 'rotate(0deg)'; // 12時の位置から開始
        
        progressCircle = svg;
        ratingCircle.insertBefore(svg, ratingCircle.firstChild);
    }
    
    // 既存のパスをクリア
    progressCircle.innerHTML = '';
    
    // イージング関数（easeOutCubic）
    const easeOutCubic = (t) => {
        return 1 - Math.pow(1 - t, 3);
    };

    // ヘルパー: 16進カラーから相対輝度を計算して、最適なテキスト色('#000' or '#fff')を返す
    function getContrastTextColor(hex) {
        if (!hex) return '#fff';
        // normalize
        const h = hex.replace('#', '');
        const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        // sRGB -> linear
        const srgb = [r, g, b].map(v => v / 255).map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
        const lum = 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
        // WCAG threshold ~0.179 => choose black for light backgrounds
        return lum > 0.179 ? '#000' : '#fff';
    }
    
    const totalLayersTarget = Math.max(1, Math.ceil(targetRating / 400));
    const targetHasPartial = (targetRating % 400) !== 0;

    const timer = setInterval(() => {
        currentFrame++;
        const progress = currentFrame / totalFrames;
        const easedProgress = easeOutCubic(progress);
        const currentRating = Math.floor(targetRating * easedProgress);
        
        // レーティング値を更新
        ratingElement.textContent = currentRating;
        // 現在値に応じてテキストの色を調整（背景色に溶けないようコントラストを確保）
        try {
            const currentColorInfo = RATING_COLORS.find(c => currentRating >= c.min && currentRating <= c.max) || RATING_COLORS[0];
            if (currentColorInfo) {
                // テキストをレート色にして強調
                ratingElement.style.color = currentColorInfo.color;
                ratingElement.style.fontWeight = '800';

                // クラスの同期（既存のrating-クラスをクリアして追加）
                RATING_COLORS.forEach(cl => ratingElement.classList.remove(cl.class));
                ratingElement.classList.add(currentColorInfo.class);

                // 輝度に応じてアウトライン／シャドウ色を選ぶ
                const h = currentColorInfo.color.replace('#', '');
                const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
                const r = (bigint >> 16) & 255;
                const g = (bigint >> 8) & 255;
                const b = bigint & 255;
                const srgb = [r, g, b].map(v => v / 255).map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
                const lum = 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];

                const outlineColor = lum > 0.5 ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.85)';
                // WebKit系のテキストアウトライン（幅は見た目に合わせて調整）
                ratingElement.style.webkitTextStroke = '0.8px ' + outlineColor;
                // テキストシャドウも付与して視認性を更に強化
                ratingElement.style.textShadow = lum > 0.5 ? '2px 2px 6px rgba(0,0,0,0.45)' : '1px 1px 4px rgba(0,0,0,0.25)';
            }
        } catch (e) {
            // 保守: エラーが出てもアニメーション自体は継続
            console.warn('Color emphasis calc error', e);
        }
        
        // 円グラフを描画（レート400 = 1回転）
        // 最後の色（target層）が部分的な場合は、その層で1周する演出を行うため
        // 現在表示している層が目標の最終層であれば回転角を適用する
        const currentLayer = Math.max(1, Math.ceil(currentRating / 400));
        let rotationProgressForTop = 0;
        if (targetHasPartial && currentLayer === totalLayersTarget) {
            rotationProgressForTop = easedProgress; // 0..1 -> 0..360deg
        }
        drawRatingProgress(progressCircle, currentRating, rotationProgressForTop, totalLayersTarget);
        
        // アニメーション完了
        if (progress >= 1) {
            ratingElement.textContent = targetRating;
            clearInterval(timer);
            
            // 最終的な円グラフを描画
            // 最終描画ではトップ層が部分的であれば必ず1周させる（途中で止まらない）
            const finalRotation = targetHasPartial ? 1 : 0;
            drawRatingProgress(progressCircle, targetRating, finalRotation, totalLayersTarget);
            
            // 最終的な色を設定
            const finalColorInfo = RATING_COLORS.find(c => targetRating >= c.min && targetRating <= c.max) || RATING_COLORS[0];
            
            // 完了時のパルスエフェクト
            ratingElement.style.transform = 'scale(1.15)';
            setTimeout(() => {
                ratingElement.style.transform = 'scale(1)';
            }, 300);
            
            // ツールチップを設定
            ratingElement.setAttribute('title', `${finalColorInfo.name}コーダー (${targetRating})`);
            // 最終状態でも色強調を適用
            try {
                ratingElement.style.color = finalColorInfo.color;
                ratingElement.style.fontWeight = '800';
                RATING_COLORS.forEach(cl => ratingElement.classList.remove(cl.class));
                ratingElement.classList.add(finalColorInfo.class);
                const h2 = finalColorInfo.color.replace('#', '');
                const bigint2 = parseInt(h2.length === 3 ? h2.split('').map(c => c + c).join('') : h2, 16);
                const rr = (bigint2 >> 16) & 255;
                const gg = (bigint2 >> 8) & 255;
                const bb = bigint2 & 255;
                const srgb2 = [rr, gg, bb].map(v => v / 255).map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
                const lum2 = 0.2126 * srgb2[0] + 0.7152 * srgb2[1] + 0.0722 * srgb2[2];
                const outlineColor2 = lum2 > 0.5 ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.85)';
                ratingElement.style.webkitTextStroke = '0.8px ' + outlineColor2;
                ratingElement.style.textShadow = lum2 > 0.5 ? '2px 2px 6px rgba(0,0,0,0.45)' : '1px 1px 4px rgba(0,0,0,0.25)';
            } catch (e) {
                console.warn('Final color emphasis calc error', e);
            }

            // resolve Promise to indicate animation completion
            try { resolve(); } catch (e) { /* ignore */ }
        }
    }, 1000 / fps);
    // end of promise
});
}

// 円グラフを描画する関数（レート400 = 360度）
// drawRatingProgress: filled-circle stacking version
// svg: SVG element
// rating: current rating to represent
// rotationProgressForTop: 0..1, how much the topmost layer has rotated (1 -> full 360deg)
// totalLayersTarget: total number of layers for the final target (used to determine which layer is topmost)
function drawRatingProgress(svg, rating, rotationProgressForTop = 0, totalLayersTarget = 1) {
    // 親要素からサイズを取得してSVGの座標を合わせる
    const parent = svg.parentElement;
    const rect = parent.getBoundingClientRect();
    const size = Math.min(rect.width, rect.height);
    const center = size / 2;
    const radius = size / 2 - 10; // 少し内側に描画

    // SVGのviewBoxを設定してスケーラブルに描画
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`);

    // SVGをクリア
    svg.innerHTML = '';

    // 背景円（薄いグレー）
    const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    bgCircle.setAttribute('cx', center);
    bgCircle.setAttribute('cy', center);
    bgCircle.setAttribute('r', radius);
    bgCircle.setAttribute('fill', '#2b2b2b');
    svg.appendChild(bgCircle);

    // レーティングを400で割った商と余り（ただし最低1層は表示）
    const fullRotations = Math.floor(rating / 400);
    const remainder = rating % 400;
    const layersToShow = Math.max(1, Math.ceil(rating / 400));

    // 描画する各レイヤー（0が最下層）
    // すべての層で扇形（pie slice）を使い、12時方向から右回転で描画
    for (let layer = 0; layer < layersToShow; layer++) {
        const colorInfo = RATING_COLORS[layer] || RATING_COLORS[RATING_COLORS.length - 1];

        // このレイヤーのレート範囲
        const layerStart = layer * 400;
        const layerEnd = (layer + 1) * 400;
        
        // このレイヤーで描画する角度を計算
        let sweep = 360; // デフォルトは360度（完全な円）
        
        if (rating < layerEnd) {
            // このレイヤーは部分的
            const ratingInLayer = rating - layerStart;
            sweep = (ratingInLayer / 400) * 360;
        }

        // 最上層かどうか
        const isTop = (layer === layersToShow - 1) && (layersToShow === totalLayersTarget);

        // グループを作って回転を適用できるようにする
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        
        // 最上層でかつ回転進捗が指定されている場合は、さらに回転を適用
        let angle = 0;
        if (isTop && rotationProgressForTop > 0) {
            angle = rotationProgressForTop * 360;
        }
        if (angle !== 0) {
            g.setAttribute('transform', `rotate(${angle} ${center} ${center})`);
        }

        // 扇形（pie slice）で描画（12時方向が起点）
        const slice = createPieSlicePath(center, center, radius, 0, sweep, colorInfo.color);
        g.appendChild(slice);
        svg.appendChild(g);
    }
}

// 中心から弧で囲まれた扇形パスを作る（startAngleは0が12時, 時計回り正）
function createPieSlicePath(cx, cy, r, startAngleDeg, sweepDeg, color) {
    // sweepDeg may be 0..360
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    if (sweepDeg <= 0) return path;

    if (sweepDeg >= 360) {
        // full circle as a path
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', r);
        circle.setAttribute('fill', color);
        return circle;
    }

    const startRad = (startAngleDeg - 90) * Math.PI / 180; // adjust so 0deg = 12時
    const endRad = (startAngleDeg + sweepDeg - 90) * Math.PI / 180;

    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);

    const largeArc = sweepDeg > 180 ? 1 : 0;

    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    path.setAttribute('d', d);
    path.setAttribute('fill', color);
    return path;
}

// 円の一部を描画する関数
// 円弧（セグメント）を描画する関数
// startAngle: 開始角度（度）、sweepAngle: 描画する角度幅（度）
function drawArcSegment(svg, centerX, centerY, startAngle, sweepAngle, color, strokeWidth) {
    if (sweepAngle <= 0) return;

    // 360度の場合は2つの180度弧に分割して描画（SVGのarcは単一で360度を表現できないため）
    if (sweepAngle >= 360) {
        drawArcSegment(svg, centerX, centerY, startAngle, 180, color, strokeWidth);
        drawArcSegment(svg, centerX, centerY, startAngle + 180, 180, color, strokeWidth);
        return;
    }

    const endAngle = startAngle + sweepAngle;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    // 内径（strokeが収まるように少し内側に）
    const r = centerX - 10;

    const x1 = centerX + r * Math.cos(startRad);
    const y1 = centerY + r * Math.sin(startRad);
    const x2 = centerX + r * Math.cos(endRad);
    const y2 = centerY + r * Math.sin(endRad);

    const largeArc = sweepAngle > 180 ? 1 : 0;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const d = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;

    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', strokeWidth);
    path.setAttribute('stroke-linecap', 'round');
    svg.appendChild(path);
}

// 統計値をアニメーション表示する関数
function animateStatValue(element, targetValue) {
    const duration = 1500;
    const steps = 40;
    const increment = targetValue / steps;
    const stepDuration = duration / steps;
    
    let currentValue = 0;
    
    const timer = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= targetValue) {
            element.textContent = targetValue;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(currentValue);
        }
    }, stepDuration);
}

    // 任意の数値要素を色遷移付きでアニメーションする汎用関数
    function animateValueWithColorTransition(element, targetValue, options = {}) {
        const duration = options.duration || 1200;
        const steps = options.steps || 30;
        const increment = targetValue / steps;
        const stepDuration = duration / steps;
        const applyClass = options.applyClass !== undefined ? options.applyClass : true;
    
        let currentValue = 0;
    
        const clearColorClasses = () => {
            RATING_COLORS.forEach(c => element.classList.remove(c.class));
        };
    
        const timer = setInterval(() => {
            currentValue += increment;
        
            // カラー境界に応じたクラスを更新
            const colorInfo = RATING_COLORS.find(c => currentValue >= c.min && currentValue <= c.max) || RATING_COLORS[0];
            if (applyClass) {
                clearColorClasses();
                element.classList.add(colorInfo.class);
            } else {
                // inline color fallback
                element.style.color = colorInfo.color;
            }
        
            if (currentValue >= targetValue) {
                element.textContent = targetValue;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(currentValue);
            }
        }, stepDuration);
    }

// メインコンテンツの機能を初期化
function initializeMainContentFeatures() {
    initializeScrollAnimations();
    initializeAtCoderSection();
    setTimeout(() => {
        initializeTypingEffect();
    }, 500);
}

// データを手動で再読み込み
function reloadAtCoderData() {
    const btn = document.querySelector('.atcoder-reload-btn');
    if (btn) {
        btn.classList.add('loading');
        btn.disabled = true;
    }
    
    // レート表示をリセット（0から始める）
    const ratingValues = document.querySelectorAll('.rating-value');
    ratingValues.forEach(el => {
        el.textContent = '0';
        el.setAttribute('data-rating', '0');
    });
    
    // 円の色もリセット
    const ratingCircles = document.querySelectorAll('.atcoder-rating-circle');
    ratingCircles.forEach(circle => {
        circle.className = 'atcoder-rating-circle';
        circle.classList.add('rating-gray');
        circle.style.background = 'linear-gradient(135deg, #808080, #808080dd)';
        circle.style.boxShadow = '0 10px 30px #80808066';
    });

    // リセット: shift/show-participation を外す (再読み込みで再アニメ可)
    const ratingContainers = document.querySelectorAll('.rating-and-participation');
    ratingContainers.forEach(container => {
        container.classList.remove('shift-left');
        container.classList.remove('show-participation');
        const pCount = container.querySelector('.participation-count');
        if (pCount) {
            pCount.setAttribute('data-participation', '0');
            pCount.textContent = '0';
            pCount.classList.remove('pop');
        }
    });
    
    // データを再取得
    fetchAtCoderData().finally(() => {
        if (btn) {
            setTimeout(() => {
                btn.classList.remove('loading');
                btn.disabled = false;
            }, 500);
        }
    });
}

// グローバルスコープに公開
window.reloadAtCoderData = reloadAtCoderData;

