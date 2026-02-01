/**
 * main.js
 * メインエントリーポイント
 * Main entry point - モジュールのインポートと初期化
 */

// モジュールのインポート
import { initializeSplashScreen } from './splash.js';
import { initializeNavigation, initializeSmoothScrolling } from './navigation.js';
import { initializeScrollAnimations } from './animations.js';
import { initializeThreeJS } from './threejs-background.js';
import { initializeGSAP } from './gsap-animations.js';
import { initializeTypingEffect } from './typing-effect.js';
import { initializeContactForm } from './contact.js';
import { addScrollToTopButton } from './utils.js';
import { initializeAtCoderSection } from './atcoder.js';
import { initializeLifeJourney } from './timeline.js';

/**
 * メインコンテンツの機能を初期化
 */
function initializeMainContentFeatures() {
    console.log('🎪 Initializing main content features...');
    
    initializeThreeJS();
    initializeGSAP();
    initializeScrollAnimations();
    initializeAtCoderSection();
    
    setTimeout(() => {
        initializeTypingEffect();
    }, 500);
    
    // タイムライン初期化（存在する場合のみ）
    try {
        initializeLifeJourney();
    } catch (e) {
        console.log('Timeline section not found, skipping...');
    }
}

/**
 * ページ読み込み時の初期化
 */
document.addEventListener('DOMContentLoaded', function () {
    console.log('🎬 DOM Content Loaded - Starting initialization...');
    
    // スプラッシュスクリーン初期化（完了後にメインコンテンツを初期化）
    initializeSplashScreen(() => {
        console.log('🚀 Splash complete, initializing main features...');
        initializeMainContentFeatures();
    });
    
    // 基本機能は即座に初期化
    initializeNavigation();
    initializeSmoothScrolling();
    initializeContactForm();
});

/**
 * ページ完全読み込み後の初期化
 */
window.addEventListener('load', () => {
    addScrollToTopButton();
});

console.log('✅ Main.js loaded');
