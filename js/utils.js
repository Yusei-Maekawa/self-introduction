/**
 * utils.js
 * ユーティリティ関数
 * Utility functions
 */

// パフォーマンス最適化: スクロールイベントのスロットリング
export function throttle(func, wait) {
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

// 通知メッセージの表示
export function showNotification(message, type = 'info') {
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
export function addScrollToTopButton() {
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
