/**
 * contact.js
 * お問い合わせフォーム機能
 * Contact form functionality
 */

import { showNotification } from './utils.js';

export function initializeContactForm() {
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
