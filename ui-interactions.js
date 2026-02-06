/**
 * ui-interactions.js
 * 
 * ============================================================================
 * 📖 ファイル概要 / File Overview
 * ============================================================================
 * 
 * 【日本語】
 * UI強化用のJavaScript
 * - スクロール進捗バー
 * - パララックス効果
 * - スクロールアニメーション
 * - カードのtilt効果（マウス追従）
 * 
 * @author Yusei Maekawa (前川 雄世)
 * @version 1.0.0
 * @created 2026-02-06
 * ============================================================================
 */

(function() {
    'use strict';

    // ============================================================================
    // スクロール進捗バー / Scroll Progress Bar
    // ============================================================================
    
    function initScrollProgress() {
        // プログレスバー要素を作成
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        // スクロールイベント
        function updateProgress() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / documentHeight) * 100;
            
            progressBar.style.width = `${Math.min(progress, 100)}%`;
        }

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress(); // 初回実行
    }

    // ============================================================================
    // スクロールインジケーター / Scroll Indicator
    // ============================================================================
    
    function initScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        indicator.innerHTML = `
            <span class="scroll-indicator-text">Scroll</span>
            <div class="scroll-indicator-arrow"></div>
        `;
        document.body.appendChild(indicator);

        // スクロールしたら非表示
        function hideIndicator() {
            if (window.scrollY > 100) {
                indicator.style.opacity = '0';
                indicator.style.pointerEvents = 'none';
            } else {
                indicator.style.opacity = '1';
                indicator.style.pointerEvents = 'auto';
            }
        }

        window.addEventListener('scroll', hideIndicator, { passive: true });
    }

    // ============================================================================
    // スクロールアニメーション強化 / Enhanced Scroll Animations
    // ============================================================================
    
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.scroll-fade-up, .scroll-scale');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // スタガーディレイを追加
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, index * 100);
                }
            });
        }, observerOptions);

        elements.forEach(element => {
            observer.observe(element);
        });
    }

    // ============================================================================
    // カードのTilt効果（3D） / Card Tilt Effect
    // ============================================================================
    
    function initCardTilt() {
        const cards = document.querySelectorAll('.skill-card, .atcoder-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateY(-10px) 
                    scale(1.02)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
            });
        });
    }

    // ============================================================================
    // パララックス効果 / Parallax Effect
    // ============================================================================
    
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-fast');
        
        function updateParallax() {
            const scrolled = window.scrollY;
            
            parallaxElements.forEach(element => {
                const speed = element.classList.contains('parallax-slow') ? 0.5 : 0.3;
                const offset = scrolled * speed;
                element.style.transform = `translateY(${offset}px)`;
            });
        }

        window.addEventListener('scroll', updateParallax, { passive: true });
    }

    // ============================================================================
    // ボタンのリップルエフェクト強化 / Enhanced Ripple Effect
    // ============================================================================
    
    function initRippleEffect() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    top: ${y}px;
                    left: ${x}px;
                    pointer-events: none;
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // リップルアニメーション
        if (!document.getElementById('ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ============================================================================
    // セクション区切り線のアニメーション / Section Divider Animation
    // ============================================================================
    
    function addSectionDividers() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            if (index < sections.length - 1) { // 最後のセクション以外
                const divider = document.createElement('div');
                divider.className = 'section-divider';
                section.after(divider);
            }
        });
    }

    // ============================================================================
    // スムーズスクロール強化 / Enhanced Smooth Scroll
    // ============================================================================
    
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#!') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // ナビゲーションバーの高さ分
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================================================
    // 初期化 / Initialization
    // ============================================================================
    
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🎨 UI Enhancements initialized');
        
        initScrollProgress();
        initScrollIndicator();
        initScrollAnimations();
        initCardTilt();
        initParallax();
        initRippleEffect();
        addSectionDividers();
        initSmoothScroll();
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

})();
