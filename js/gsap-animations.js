/**
 * gsap-animations.js
 * GSAP アニメーション機能
 * GSAP animation functionality
 */

export function initializeGSAP() {
    // GSAPが読み込まれているか確認
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded, using fallback animations');
        return;
    }

    // ScrollTriggerプラグインを登録
    gsap.registerPlugin(ScrollTrigger);

    // ヒーローセクションのアニメーション
    gsap.from('.hero-welcome-text', {
        duration: 1.2,
        y: -50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.2
    });

    gsap.from('.hero-name', {
        duration: 1,
        scale: 0.8,
        opacity: 0,
        ease: 'back.out(1.7)',
        delay: 0.5
    });

    gsap.from('.hero-buttons .btn', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out',
        delay: 1.2
    });

    gsap.from('.hero-image', {
        duration: 1,
        x: 100,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.8
    });

    // スキルカードのアニメーション
    gsap.from('.skill-card', {
        scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        duration: 0.6,
        y: 50,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'all'
    });

    // タイムラインアイテムのアニメーション
    const timelineItemsToAnimate = gsap.utils.toArray('#journey-timeline .timeline-item');
    if (timelineItemsToAnimate.length > 0) {
        gsap.from(timelineItemsToAnimate, {
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            duration: 0.8,
            x: -100,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out',
            clearProps: 'all'
        });
    }

    // AtCoderカードのアニメーション
    gsap.from('.atcoder-card', {
        scrollTrigger: {
            trigger: '.atcoder-cards',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        duration: 1,
        scale: 0.8,
        opacity: 0,
        stagger: 0.3,
        ease: 'elastic.out(1, 0.5)',
        clearProps: 'all'
    });

    // セクションタイトルのアニメーション
    gsap.utils.toArray('.section-title').forEach((title, index) => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            duration: 1,
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            ease: 'power3.out',
            clearProps: 'all'
        });
    });

    // ナビゲーションバーの背景色変更
    ScrollTrigger.create({
        start: 'top -100',
        end: 99999,
        toggleClass: {
            className: 'scrolled',
            targets: '.navbar'
        }
    });
}
