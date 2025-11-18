# 🐛 バグ修正履歴

このファイルでは、開発中に発見・修正したバグの詳細な記録を管理しています。

---

## 2025-11-17: Three.js パーティクル背景が表示されない問題

**症状:**
- Three.jsのコードが実装されているにもかかわらず、3Dパーティクル背景が画面に表示されない
- コンソールに`initializeThreeJS()`関連のログが出力されない
- AtCoderセクション、スキルカード、経験タイムラインなどのコンテンツが消えている

**原因:**
1. **関数の重複定義**: `initializeMainContentFeatures()`が2箇所で定義されており、後の定義（古い実装）が前の定義（新しい実装）を上書きしていた
   - 354行目: 新しい定義（Three.js、GSAP、AtCoderセクションを含む）
   - 1948行目: 古い定義（AtCoderセクションのみ）
   - JavaScriptでは後の定義が優先されるため、Three.js関連の初期化が実行されていなかった

2. **GSAPアニメーションの設定ミス**: ScrollTriggerの`toggleActions`が`'play none none reverse'`になっていたため、スクロールで戻ると要素が非表示になっていた
   - `.skill-card`
   - `.timeline-item`
   - `.atcoder-card`
   - `.goal-card`
   - `.section-title`

**修正内容:**

1. **重複関数の削除**:
   ```javascript
   // 削除: script.js 1948行目付近の古い定義
   function initializeMainContentFeatures() {
       initializeScrollAnimations();
       initializeAtCoderSection();
       setTimeout(() => {
           initializeTypingEffect();
       }, 500);
   }
   ```

2. **GSAPアニメーションの修正**:
   ```javascript
   // 修正前
   toggleActions: 'play none none reverse'
   
   // 修正後
   toggleActions: 'play none none none'
   ```
   - 対象: `.skill-card`, `.timeline-item`, `.atcoder-card`, `.goal-card`, `.section-title`の各ScrollTrigger設定

3. **デバッグログの追加**:
   ```javascript
   // 実行フローを追跡するためのログを追加
   console.log('🎬 DOM Content Loaded - Starting initialization...');
   console.log('💫 Splash screen fade-out complete, showing main content...');
   console.log('🚀 About to call initializeMainContentFeatures...');
   console.log('🎪 Initializing main content features...');
   console.log('🎨 Initializing Three.js...');
   console.log('✅ Three.js loaded successfully');
   console.log('✅ Canvas found, creating scene...');
   console.log('✅ Renderer created, size: ...');
   console.log('🚀 Starting animation loop...');
   console.log('📦 Total particles: 2750');
   ```

**結果:**
- Three.jsの3Dパーティクル背景が正常に表示されるようになった
- AtCoderセクション、スキルカード、経験タイムラインがすべて正常に表示される
- スクロールしても要素が消えなくなった
- 2750個のパーティクルがマウスに追従し、接続線を描画する華やかな背景エフェクトが実装された

**教訓:**
- JavaScriptでは同名関数の重複定義に注意（後の定義が前を上書き）
- 大規模なコード追加時は関数の重複をチェックする
- GSAPの`toggleActions`は`'play none none none'`で要素を永続表示できる
- デバッグログを段階的に追加することで実行フローを追跡できる

## 2025年11月18日

### 抽象カードが消えてしまう問題（最終修正版）

**症状:**
- これまでの軌跡セクションの抽象カード（概要カード）が、ページを再読み込みしたりスクロールすると、フェードアウトして消えてしまう
- 速いスクロールや、これまでの軌跡の部分でリロードすると特に顕著
- 前回の修正（JavaScriptセレクター修正）でも解決しなかった

**根本原因:**
1. **HTMLの構造エラー**: `.abstract-grid`の閉じタグがなく、抽象カードの内容も空だった
   - 抽象カードが実際には存在していなかった
   - タイムラインアイテムが`.abstract-grid`の子要素として扱われていた可能性

2. **GSAPアニメーションの対象範囲**: `gsap.from('.timeline-item', {...})`が広範囲すぎた
   - セレクターが`.timeline-item`全体を対象にしていた
   - `#journey-timeline .timeline-item`に限定すべきだった

**修正内容:**

1. **HTMLの修正** - 抽象カードを復元し、適切に閉じる:
```html
<!-- 修正前 -->
<div class="abstract-grid" aria-hidden="false">

<!-- タイムライン... -->

<!-- 修正後 -->
<div class="abstract-grid" aria-hidden="false">
    <div class="abstract-card" data-target="elementary">...</div>
    <div class="abstract-card" data-target="junior">...</div>
    <div class="abstract-card" data-target="high">...</div>
    <div class="abstract-card" data-target="transfer">...</div>
    <div class="abstract-card" data-target="group-dev">...</div>
    <div class="abstract-card" data-target="atcoder">...</div>
    <div class="abstract-card" data-target="individual">...</div>
    <div class="abstract-card" data-target="future">...</div>
</div>

<!-- タイムライン... -->
```

2. **GSAPアニメーションの修正** - タイムラインアイテムを明示的に指定:
```javascript
// 修正前
gsap.from('.timeline-item', {
    scrollTrigger: {...},
    // ...
});

// 修正後
const timelineItemsToAnimate = gsap.utils.toArray('#journey-timeline .timeline-item');
if (timelineItemsToAnimate.length > 0) {
    gsap.from(timelineItemsToAnimate, {
        scrollTrigger: {...},
        // ...
    });
}
```

**影響範囲:**
- `index.html`: `.abstract-grid`セクション（行514-560付近）
- `script.js`: `initializeGSAPAnimations()`関数内のタイムラインアニメーション（行773-787付近）

**結果:**
- 抽象カードが正しく表示される
- スクロールやリロード時にカードが消えなくなる
- GSAPアニメーションはタイムラインアイテムのみに適用される
- HTML構造が正しくなり、CSS/JSの動作が安定する

**教訓:**
- HTMLの構造エラー（閉じタグ忘れ）は予期しない動作を引き起こす
- GSAPセレクターは具体的に（`#id .class`形式で）指定する
- `gsap.utils.toArray()`で要素を明示的に取得することで、意図しない要素の対象化を防げる
- デバッグ時はHTML構造を最初に確認すべき

### 抽象カードが消えてしまう問題（修正版2・不完全）

**症状:**
- これまでの軌跡セクションの抽象カード（概要カード）が、ページを再読み込みしたりスクロールすると、フェードアウトして消えてしまう
- カードの位置でリロードすると特に顕著
- CSS修正（`!important`追加）だけでは解決しなかった

**原因:**
- `script.js`の`setupScrollAnimations()`関数（行433付近）で、IntersectionObserverが広範囲の要素にスクロールアニメーションを設定
- セレクター`.timeline-item`が抽象カード（`.abstract-card`も技術的には何らかの要素）を含んでいた可能性
- `animatedElements.forEach`で`opacity: 0`を設定する際、`.abstract-grid`内の要素をチェックしていなかった

**修正内容:**
1. `script.js`のセレクターを修正：
```javascript
// 修正前
const animatedElements = document.querySelectorAll(
    '.skill-card, .timeline-item, .contact-item, .about-text, .about-stats, #journey-timeline .timeline-item'
);

// 修正後
const animatedElements = document.querySelectorAll(
    '.skill-card, .timeline-item:not(.abstract-card), .contact-item, .about-text, .about-stats, #journey-timeline .timeline-item'
);
```

2. `.abstract-grid`内の要素を明示的に除外：
```javascript
animatedElements.forEach(el => {
    // .abstract-cardやその子要素は除外
    if (el.closest('.abstract-grid')) return;
    
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
```

**影響範囲:**
- `script.js`: `setupScrollAnimations()`関数（行433-453付近）

**結果:**
- 抽象カードがスクロールやリロード時に消えなくなる
- `.abstract-grid`内の要素はIntersectionObserverの対象外となる
- 他のスクロールアニメーションは正常に動作

**教訓:**
- CSSの`!important`だけではJavaScriptによる動的なスタイル変更は防げない
- IntersectionObserverのセレクター設計時は、除外すべき要素を明確にする
- `el.closest()`を使って親要素をチェックすることで、確実に除外できる

### 抽象カードが消えてしまう問題（初回修正・不完全）

**症状:**
- これまでの軌跡セクションの抽象カード（概要カード）が、ページを再読み込みしたりスクロールすると、フェードアウトして消えてしまう
- カードの位置でリロードすると特に顕著

**原因:**
- `script.js`の`initializeLifeJourney()`関数内で、IntersectionObserverがタイムラインアイテムに対してスクロールアニメーションを設定
- その際、`opacity: 0`と`transform: translateY(20px)`を初期状態として設定
- 抽象カード自体は対象外だが、CSS継承やスクロール位置によって影響を受ける可能性があった

**修正内容:**
1. `.abstract-card`と`.abstract-grid`に`opacity: 1 !important;`を追加
2. `.abstract-card`に`transform: none !important;`を追加
3. これにより、抽象カードは常に表示状態を維持

**影響範囲:**
- `styles.css`: `.abstract-card`と`.abstract-grid`のスタイル定義

**結果:**
- 不十分な修正だった（JavaScriptの動的スタイル変更には無効）


---

## テンプレート（今後のバグ修正用）

```markdown
## YYYY-MM-DD: [バグの簡潔なタイトル]

**症状:**
- [ユーザーが見た問題の説明]

**原因:**
- [根本原因の技術的説明]

**修正内容:**
```[言語]
// 修正前のコード
// 修正後のコード
```

**結果:**
- [修正後の動作]

**教訓:**
- [今後のために学んだこと]
```

---
