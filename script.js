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
    const atcoderCards = document.querySelectorAll('.atcoder-card');
    
    // スクロールアニメーション
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    atcoderCards.forEach(card => observer.observe(card));
    
    // AtCoder APIからデータを取得
    fetchAtCoderData();
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
            
            // レーティングのカウントアップアニメーション（灰→茶→緑→水...と色を変えながら）
            animateRatingWithColorTransition(ratingElement, ratingCircle, targetRating);
            
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
        }
    });
}

// レーティングを色遷移付きでアニメーションする関数
// グローバルのレーティング色境界
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
    const duration = 2500; // 2.5秒
    const steps = 50;
    const increment = targetRating / steps;
    const stepDuration = duration / steps;
    
    let currentRating = 0;
    let stepCount = 0;
    
    // ローカルの配列は使わず、グローバルの RATING_COLORS を使用
    
    const timer = setInterval(() => {
        currentRating += increment;
        stepCount++;
        
        // 現在のレーティングに対応する色を取得
        const colorInfo = RATING_COLORS.find(c => currentRating >= c.min && currentRating <= c.max) || RATING_COLORS[0];
        
        // 色クラスを更新
        ratingCircle.className = 'atcoder-rating-circle';
        ratingCircle.classList.add(colorInfo.class);
        ratingCircle.style.background = `linear-gradient(135deg, ${colorInfo.color}, ${colorInfo.color}dd)`;
        
        // レーティング値を更新
        if (currentRating >= targetRating) {
            ratingElement.textContent = targetRating;
            clearInterval(timer);
            
            // 完了時のパルスエフェクト
            ratingElement.style.transform = 'scale(1.2)';
            setTimeout(() => {
                ratingElement.style.transform = 'scale(1)';
            }, 200);
            
            // ツールチップを設定
            ratingElement.setAttribute('title', `${colorInfo.name}コーダー (${targetRating})`);
        } else {
            ratingElement.textContent = Math.floor(currentRating);
        }
    }, stepDuration);
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
    
    // レート表示をリセット
    const ratingValues = document.querySelectorAll('.rating-value');
    ratingValues.forEach(el => el.textContent = '...');
    
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

