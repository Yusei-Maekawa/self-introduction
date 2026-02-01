/**
 * typing-effect.js
 * タイピングエフェクト機能
 * Typing effect functionality (Typed.js)
 */

export function initializeTypingEffect() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement && typeof Typed !== 'undefined') {
        const typed = new Typed('#typed-text', {
            strings: [
                '気になることに、躊躇せず行動する！💪',
                '好きこそものの上手なれ！✨',
                '競技プログラミングで日々成長中！🚀',
                '技術で人を楽しませたい！🎮'
            ],
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 2500,
            startDelay: 800,
            loop: true,
            showCursor: true,
            cursorChar: '▮',
            autoInsertCss: true,
            smartBackspace: false,
            fadeOut: false,
            fadeOutDelay: 500
        });
    } else {
        // Typed.jsが読み込まれていない場合のフォールバック
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            const originalText = '気になることに、躊躇せず行動する！ | 好きこそものの上手なれ！';
            heroSubtitle.textContent = '';
            setTimeout(() => {
                typeText(heroSubtitle, originalText, 100);
            }, 1000);
        }
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
