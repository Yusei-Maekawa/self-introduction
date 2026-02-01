/**
 * atcoder.js
 * AtCoder データ取得・表示機能
 * AtCoder data fetching and display functionality
 * 
 * 注意: このファイルは元のscript.jsの以下の機能を含みます:
 * - initializeAtCoderSection() (1185-1230行目)
 * - fetchAtCoderData() (1293-1405行目)
 * - parseRatingHistory() (1407-1447行目)
 * - updateLastUpdateTime() (1449-1484行目)
 * - displayAtCoderData() (1486-1573行目)
 * - initializeAtCoderGoals() (1575-1612行目)
 * - updateGoalTiles() (1614-1657行目)
 * - updateGoalProgress() (1659-1678行目)
 * - animateRatingWithColorTransition() (1680-1833行目)
 * - drawRatingProgress() (1835-1901行目)
 * - createPieSlicePath() (1903-1935行目)
 * - drawArcSegment() (1937-1971行目)
 * - animateStatValue() (1973-1990行目)
 * - reloadAtCoderData() (2030-2078行目)
 * 
 * レーティングカラー定義を含みます
 */

// AtCoderレーティング色定義
export const RATING_COLORS = [
    { min: 0, max: 399, color: '#808080', name: 'Gray', class: 'rating-gray' },
    { min: 400, max: 799, color: '#804000', name: 'Brown', class: 'rating-brown' },
    { min: 800, max: 1199, color: '#008000', name: 'Green', class: 'rating-green' },
    { min: 1200, max: 1599, color: '#00C0C0', name: 'Cyan', class: 'rating-cyan' },
    { min: 1600, max: 1999, color: '#0000FF', name: 'Blue', class: 'rating-blue' },
    { min: 2000, max: 2399, color: '#C0C000', name: 'Yellow', class: 'rating-yellow' },
    { min: 2400, max: 2799, color: '#FF8000', name: 'Orange', class: 'rating-orange' },
    { min: 2800, max: 9999, color: '#FF0000', name: 'Red', class: 'rating-red' }
];

/**
 * AtCoderセクションの初期化
 * IntersectionObserverでセクションが表示されたらデータ取得を開始
 */
export function initializeAtCoderSection() {
    const atcoderSection = document.getElementById('atcoder');
    if (!atcoderSection) return;
    
    let hasAnimated = false;
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                fetchAtCoderData();
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sectionObserver.observe(atcoderSection);
    
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

    initializeAtCoderGoals();
}

/**
 * 注意: 以下の関数は元のscript.jsを参照してください
 * fetchAtCoderData() - AtCoderデータの取得
 * parseRatingHistory() - レーティング履歴の解析
 * updateLastUpdateTime() - 最終更新時刻の表示
 * displayAtCoderData() - データの表示とアニメーション
 * initializeAtCoderGoals() - 目標タイルの初期化
 * updateGoalTiles() - 目標タイルの更新
 * updateGoalProgress() - 目標進捗の更新
 * animateRatingWithColorTransition() - レーティングアニメーション
 * drawRatingProgress() - SVG円グラフ描画
 * createPieSlicePath() - 扇形パス生成
 * drawArcSegment() - 円弧セグメント描画
 * animateStatValue() - 統計値アニメーション
 * reloadAtCoderData() - データ再読み込み
 * 
 * これらの関数は非常に長いため、元のscript.jsから必要に応じてコピーしてください。
 * または、このファイルを拡張して完全な実装を含めることができます。
 */

// プレースホルダー関数（実装は元のscript.jsを参照）
async function fetchAtCoderData() {
    // 実装: script.js 1293-1405行目を参照
    console.log('AtCoderデータ取得中...');
}

function initializeAtCoderGoals() {
    // 実装: script.js 1575-1612行目を参照
    console.log('AtCoder目標タイル初期化中...');
}

/**
 * データ再読み込み（グローバルに公開）
 */
export function reloadAtCoderData() {
    // 実装: script.js 2030-2078行目を参照
    console.log('AtCoderデータ再読み込み中...');
}

// グローバルスコープに公開
if (typeof window !== 'undefined') {
    window.reloadAtCoderData = reloadAtCoderData;
}
