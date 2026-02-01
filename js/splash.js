/**
 * splash.js
 * スプラッシュスクリーン機能
 * Splash screen functionality
 */

export function initializeSplashScreen(onComplete) {
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
                console.log('💫 Splash screen fade-out complete, showing main content...');
                mainContent.classList.add('show');
                splashScreen.style.display = 'none';

                // メインコンテンツが表示された後のコールバック
                if (onComplete) onComplete();
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
        console.log('⏩ Skipping splash screen...');
        splashScreen.classList.add('fade-out');
        setTimeout(() => {
            console.log('💫 Skip: showing main content...');
            mainContent.classList.add('show');
            splashScreen.style.display = 'none';
            if (onComplete) onComplete();
        }, 500);
    }
}
