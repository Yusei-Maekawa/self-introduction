# JavaScript ファイル構成

このディレクトリには、ポートフォリオサイトのJavaScript機能を機能ごとに分割したモジュールが含まれています。

## 📁 ファイル構成

```
js/
├── main.js                    # メインエントリーポイント（すべてのモジュールをインポート）
├── splash.js                  # スプラッシュスクリーン機能
├── navigation.js              # ナビゲーション機能（ハンバーガーメニュー、スムーススクロール）
├── timeline.js                # タイムライン機能（これまでの軌跡セクション）
├── animations.js              # スクロールアニメーション
├── threejs-background.js      # Three.js 3D背景アニメーション
├── gsap-animations.js         # GSAP アニメーション
├── typing-effect.js           # タイピングエフェクト（Typed.js）
├── contact.js                 # お問い合わせフォーム機能
├── utils.js                   # ユーティリティ関数（通知、スクロールトップボタンなど）
└── atcoder.js                 # AtCoder データ取得・表示機能
```

## 🔧 各ファイルの役割

### main.js
- すべてのモジュールをインポート
- 初期化の順序を制御
- DOMContentLoadedイベントを処理

### splash.js
- スプラッシュスクリーン表示・非表示制御
- スキップ機能（クリック、Enterキー）
- グローエフェクト

### navigation.js
- ハンバーガーメニューの開閉
- ナビゲーションバーの透明度変更
- スムーススクロール機能

### timeline.js
- タイムラインアイテムのクリック展開機能
- スクロール時のフェードインアニメーション
- キーボードアクセシビリティ対応

### animations.js
- IntersectionObserverを使用したスクロールアニメーション
- 統計数字のカウントアップアニメーション

### threejs-background.js
- Three.jsを使用した3Dパーティクルシステム
- マウス追従エフェクト
- AtCoderカラーパレット使用

### gsap-animations.js
- GSAPによる高度なアニメーション
- ScrollTriggerプラグイン使用
- セクションごとのアニメーション

### typing-effect.js
- Typed.jsを使用したタイピングエフェクト
- フォールバック実装

### contact.js
- お問い合わせフォームのバリデーション
- 送信処理（シミュレーション）

### utils.js
- 通知メッセージ表示
- スクロールトップボタン
- スロットリング関数

### atcoder.js
- AtCoderデータの取得（JSON/API）
- レーティング表示・アニメーション
- SVG円グラフ描画
- 目標タイル管理

## 🚀 使用方法

### 開発環境
モジュール形式を使用しているため、ローカルでテストする場合はHTTPサーバーが必要です：

```bash
# Python 3の場合
python -m http.server 8000

# Node.jsの場合
npx http-server
```

### 本番環境
index.htmlで以下のようにインポート：

```html
<script type="module" src="js/main.js"></script>
```

## 📝 注意事項

### AtCoderモジュールについて
`atcoder.js`は非常に大きいため、プレースホルダー関数のみを含んでいます。
完全な実装が必要な場合は、元の`script.js`から以下の関数をコピーしてください：

- fetchAtCoderData() (1293-1405行目)
- parseRatingHistory() (1407-1447行目)
- updateLastUpdateTime() (1449-1484行目)
- displayAtCoderData() (1486-1573行目)
- initializeAtCoderGoals() (1575-1612行目)
- updateGoalTiles() (1614-1657行目)
- updateGoalProgress() (1659-1678行目)
- animateRatingWithColorTransition() (1680-1833行目)
- drawRatingProgress() (1835-1901行目)
- createPieSlicePath() (1903-1935行目)
- drawArcSegment() (1937-1971行目)
- animateStatValue() (1973-1990行目)
- reloadAtCoderData() (2030-2078行目)

### 後方互換性
元の`script.js`はバックアップとして保持されています。
問題が発生した場合は、index.htmlで切り替えることができます。

## 🔄 マイグレーション

旧構成から新構成への移行：

1. ✅ `js/`ディレクトリを作成
2. ✅ 機能ごとにファイルを分割
3. ✅ モジュールのexport/import構文を追加
4. ✅ index.htmlを更新してモジュール形式で読み込み
5. ⚠️ atcoder.jsの完全な実装をコピー（必要に応じて）

## 🎯 今後の改善案

- [ ] atcoder.jsの完全な実装を追加
- [ ] TypeScript化
- [ ] ビルドツール導入（Webpack/Vite）
- [ ] テストコード追加
- [ ] コード最小化・バンドル化
