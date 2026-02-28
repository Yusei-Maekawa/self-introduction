/**
 * splash.js
 * スプラッシュスクリーン v4.0 — ズームイン演出
 *
 * ============================================================================
 * 遷移フロー
 * ============================================================================
 *   1. window load → requestAnimationFrame で .is-ready 付与
 *        CSS: scale(1.06)/blur(10px) → scale(1)/blur(0)（上品な入り）
 *   2. EXIT_MS 後に goHome() → .fade-out 付与
 *        CSS: opacity:0 / scale(0.98) / blur(6px)
 *   3. transitionend(opacity) → splash.remove() → main-content 表示
 *
 * prefers-reduced-motion: EXIT_MS = 700ms、アニメなし
 * ============================================================================
 */

export function initializeSplashScreen(onComplete) {
    const splash      = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');

    if (!splash || !mainContent) {
        console.warn('⚠️ [splash] splash-screen or main-content not found');
        onComplete?.();
        return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const EXIT_MS       = reducedMotion ? 700 : 2900;

    let done = false;

    // ── 完了処理 ──────────────────────────────────────────────────
    function completeSplash() {
        if (done) return;
        done = true;
        console.log('💫 [splash] completeSplash: showing main-content, removing splash');
        mainContent.classList.add('show');
        splash.remove();
        onComplete?.();
    }

    // ── フェードアウト → transitionend → 完了 ────────────────────
    function goHome() {
        if (done) return;
        console.log('🌊 [splash] goHome: adding .fade-out');
        splash.classList.add('fade-out');

        splash.addEventListener('transitionend', (e) => {
            if (e.propertyName !== 'opacity') return;
            console.log('✅ [splash] transitionend(opacity) fired');
            completeSplash();
        }, { once: true });

        // transitionend が来なかった場合のフォールバック
        setTimeout(completeSplash, 1500);
    }

    // ── Step 2: EXIT_MS 後にホーム遷移 ───────────────────────────
    setTimeout(goHome, EXIT_MS);

    // ── クリック / Enter キーでスキップ ──────────────────────────
    function skipSplash() {
        if (done) return;
        console.log('⏩ [splash] skip triggered');
        goHome();
    }

    splash.addEventListener('click', skipSplash, { once: true });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !splash.classList.contains('fade-out')) skipSplash();
    }, { once: true });
}

