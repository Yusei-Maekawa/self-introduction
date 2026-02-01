/**
 * timeline.js
 * タイムライン機能（これまでの軌跡セクション）
 * Timeline functionality (Journey section)
 */

export function initializeLifeJourney() {
    const timelineItems = document.querySelectorAll('#journey-timeline .timeline-item');
    if (!timelineItems || timelineItems.length === 0) return;

    // キーボード操作のための tabindex
    timelineItems.forEach(item => {
        item.setAttribute('tabindex', '0');
    });

    // クリックで詳細を表示するアクション
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('expanded');
            // When expanded, increase max height
            const content = item.querySelector('.timeline-content');
            if (item.classList.contains('expanded')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        });

        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });

    // Scroll reveal for the timeline items - 初期表示を保証
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    timelineItems.forEach(item => {
        // 既に表示されている場合はopacity:0にしない
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (!isVisible) {
            item.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            observer.observe(item);
        } else {
            // 既に表示範囲内の要素はそのまま表示
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.classList.add('revealed');
        }
    });
}
