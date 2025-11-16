# コード ドキュメント

このドキュメントでは、ポートフォリオサイトの各ファイルで使用されている関数、変数、クラス、IDなどを一覧化しています。

---

## 📄 index.html

### HTML要素のID一覧
| ID名 | 用途 |
|------|------|
| `splash-screen` | スプラッシュスクリーン全体のコンテナ |
| `main-content` | メインコンテンツ全体のコンテナ |
| `home` | ホーム（ヒーロー）セクション |
| `about` | 自己紹介セクション |
| `skills` | スキルセクション |
| `atcoder` | AtCoder競技プログラミングセクション |
| `experience` | 経験・タイムラインセクション |
| `contact` | お問い合わせセクション |
| `name` | コンタクトフォーム - 名前入力欄 |
| `email` | コンタクトフォーム - メールアドレス入力欄 |
| `message` | コンタクトフォーム - メッセージ入力欄 |

### クラス名一覧
| クラス名 | 用途 |
|---------|------|
| `splash-screen` | スプラッシュスクリーン全体 |
| `splash-content` | スプラッシュスクリーンのコンテンツラッパー |
| `splash-title` | スプラッシュスクリーンのタイトル |
| `splash-text` | スプラッシュスクリーンのテキスト「私の住処へようこそ！」 |
| `splash-dash` | スプラッシュスクリーンのダッシュ「ーーー」 |
| `main-content` | メインコンテンツ全体 |
| `navbar` | ナビゲーションバー全体 |
| `nav-container` | ナビゲーションバーのコンテナ |
| `nav-logo` | ナビゲーションバーのロゴ部分 |
| `nav-menu` | ナビゲーションメニューリスト |
| `nav-item` | ナビゲーションメニューの各項目 |
| `nav-link` | ナビゲーションリンク |
| `hamburger` | ハンバーガーメニューアイコン |
| `bar` | ハンバーガーメニューの各バー |
| `hero` | ヒーローセクション全体 |
| `hero-container` | ヒーローセクションのコンテナ |
| `hero-content` | ヒーローセクションのコンテンツ |
| `hero-welcome` | ヒーローセクションのウェルカムメッセージ |
| `hero-welcome-text` | ウェルカムメッセージのテキスト |
| `hero-title` | ヒーローセクションのタイトル |
| `hero-name` | 名前の表示部分 |
| `hero-subtitle` | ヒーローセクションのサブタイトル（キャッチフレーズ） |
| `hero-buttons` | ヒーローセクションのボタングループ |
| `hero-image` | ヒーローセクションの画像部分 |
| `btn` | 汎用ボタンスタイル |
| `btn-primary` | プライマリボタン（赤色） |
| `btn-secondary` | セカンダリボタン（透明・枠線のみ） |
| `image-placeholder` | 画像プレースホルダー |
| `about` | 自己紹介セクション |
| `container` | 各セクション共通のコンテナ |
| `section-header` | セクションヘッダー |
| `section-title` | セクションタイトル |
| `section-subtitle` | セクションサブタイトル |
| `about-content` | 自己紹介コンテンツ |
| `about-text` | 自己紹介テキスト |
| `about-stats` | 統計情報グリッド |
| `stat` | 統計カード |
| `stat-number` | 統計数値 |
| `stat-label` | 統計ラベル |
| `about-image` | 自己紹介セクションの画像部分 |
| `skills` | スキルセクション |
| `skills-grid` | スキルカードのグリッド |
| `skill-card` | スキルカード |
| `skill-icon` | スキルアイコン |
| `atcoder-section` | AtCoderセクション全体 |
| `atcoder-cards` | AtCoderカードのコンテナ |
| `atcoder-card` | AtCoderカード（アルゴリズム・ヒューリスティック） |
| `atcoder-card-header` | AtCoderカードのヘッダー |
| `atcoder-rating-circle` | レーティング表示の円形要素 |
| `rating-value` | レーティング数値 |
| `rating-label` | レーティングラベル「Rating」 |
| `atcoder-stats` | AtCoder統計情報 |
| `stat-item` | 統計項目 |
| `stat-value` | 統計値（最高レート、順位） |
| `stat-name` | 統計名 |
| `atcoder-link` | AtCoderプロフィールへのリンク |
| `atcoder-note` | AtCoder目標メッセージ |
| `atcoder-reload-btn` | AtCoderデータ更新ボタン |
| `experience` | 経験セクション |
| `timeline` | タイムライン |
| `timeline-item` | タイムライン項目 |
| `timeline-date` | タイムライン日付 |
| `timeline-content` | タイムラインコンテンツ |
| `timeline-tags` | タイムラインタグ |
| `tag` | タグ（技術スタック） |
| `contact` | お問い合わせセクション |
| `contact-content` | お問い合わせコンテンツ |
| `contact-info` | 連絡先情報 |
| `contact-item` | 連絡先項目 |
| `contact-icon` | 連絡先アイコン |
| `contact-details` | 連絡先詳細 |
| `contact-form` | お問い合わせフォーム |
| `form-group` | フォームグループ |
| `footer` | フッター |
| `footer-content` | フッターコンテンツ |
| `social-links` | ソーシャルリンク |
| `social-link` | ソーシャルリンク個別 |

### data属性一覧
| data属性 | 用途 |
|---------|------|
| `data-contest-type="algo"` | アルゴリズム部門カードの識別 |
| `data-contest-type="heuristic"` | ヒューリスティック部門カードの識別 |
| `data-rating="0"` | レーティング値（初期値0、JavaScriptで更新） |
| `data-stat="highest"` | 最高レート表示要素 |
| `data-stat="rank"` | 順位表示要素 |

---

## 🎨 styles.css

### CSS変数（カスタムプロパティ）一覧
| 変数名 | 値 | 用途 |
|-------|-----|------|
| `--primary-color` | `#2c3e50` | プライマリカラー（ダークブルー） |
| `--secondary-color` | `#3498db` | セカンダリカラー（ブルー） |
| `--accent-color` | `#e74c3c` | アクセントカラー（レッド） |
| `--text-color` | `#333` | メインテキストカラー |
| `--text-light` | `#666` | ライトテキストカラー |
| `--background-color` | `#fff` | 背景色 |
| `--section-bg` | `#f8f9fa` | セクション背景色 |
| `--border-color` | `#e0e0e0` | ボーダーカラー |
| `--shadow` | `0 2px 10px rgba(0, 0, 0, 0.1)` | 基本シャドウ |
| `--shadow-hover` | `0 5px 20px rgba(0, 0, 0, 0.15)` | ホバー時シャドウ |
| `--transition` | `all 0.3s ease` | 基本トランジション |

### アニメーション名一覧
| アニメーション名 | 用途 |
|---------------|------|
| `fadeIn` | フェードイン |
| `fadeInUp` | 下からフェードイン |
| `fadeInDown` | 上からフェードイン |
| `slideIn` | 左からスライドイン |
| `slideInRight` | 右からスライドイン |
| `countUp` | カウントアップアニメーション |
| `pulse` | パルスアニメーション |
| `float` | 浮遊アニメーション |
| `splashFadeIn` | スプラッシュスクリーンのフェードイン |
| `splashSlideIn` | スプラッシュスクリーンのスライドイン |
| `splashDashGrow` | スプラッシュスクリーンのダッシュ成長 |
| `wave` | 波アニメーション |

### 主要クラスセレクタ一覧
すべてのクラスを記載すると膨大になるため、主要なものを抜粋：

**レイアウト関連:**
- `.container` - コンテンツコンテナ（最大幅1200px）
- `.navbar` - ナビゲーションバー
- `.nav-container` - ナビゲーションコンテナ
- `.nav-menu` - ナビゲーションメニュー
- `.hero-container` - ヒーローセクションコンテナ
- `.about-content` - 自己紹介コンテンツ
- `.skills-grid` - スキルグリッド
- `.atcoder-cards` - AtCoderカードコンテナ
- `.timeline` - タイムライン

**スプラッシュスクリーン関連:**
- `.splash-screen` - スプラッシュスクリーン全体
- `.splash-content` - スプラッシュコンテンツ
- `.splash-title` - スプラッシュタイトル
- `.splash-text` - スプラッシュテキスト
- `.splash-dash` - スプラッシュダッシュ

**AtCoder関連:**
- `.atcoder-section` - AtCoderセクション
- `.atcoder-card` - AtCoderカード
- `.atcoder-rating-circle` - レーティング円形表示
- `.rating-value` - レーティング値
- `.atcoder-reload-btn` - リロードボタン
- `.rating-gray` ~ `.rating-red` - レーティング色クラス（8段階）

**ボタン・インタラクション:**
- `.btn` - 汎用ボタン
- `.btn-primary` - プライマリボタン
- `.btn-secondary` - セカンダリボタン
- `.hamburger` - ハンバーガーメニュー
- `.scroll-to-top` - トップへ戻るボタン

**レスポンシブ関連:**
- `@media (max-width: 768px)` - タブレット・スマホ対応
- `@media (max-width: 480px)` - スマホ対応

---

## ⚙️ script.js

### グローバル変数一覧
| 変数名 | 型 | 用途 |
|-------|-----|------|
| `atcoderData` | Object | AtCoderのデータを保持するグローバルオブジェクト |

### 関数一覧

#### 初期化関数
| 関数名 | パラメータ | 戻り値 | 用途 |
|-------|----------|--------|------|
| `initializeSplashScreen()` | なし | なし | スプラッシュスクリーンの表示・非表示制御 |
| `initializeNavigation()` | なし | なし | ナビゲーションバーの動作（ハンバーガーメニュー、スクロール時の背景変化） |
| `initializeSmoothScrolling()` | なし | なし | スムーズスクロールの設定 |
| `initializeScrollAnimations()` | なし | なし | スクロール時のアニメーション設定（Intersection Observer使用） |
| `initializeTypingEffect()` | なし | なし | タイピングエフェクトの初期化 |
| `initializeContactForm()` | なし | なし | お問い合わせフォームのバリデーションと送信処理 |
| `addScrollToTopButton()` | なし | なし | トップへ戻るボタンの追加と動作設定 |
| `initializeThemeToggle()` | なし | なし | テーマ切り替え機能の初期化（ダーク/ライトモード） |
| `initializeAtCoderSection()` | なし | なし | AtCoderセクションの初期化とデータ取得 |
| `initializeMainContentFeatures()` | なし | なし | メインコンテンツの各機能を初期化（統計アニメーション等） |

#### アニメーション関連関数
| 関数名 | パラメータ | 戻り値 | 用途 |
|-------|----------|--------|------|
| `animateStatNumber(element, target, duration)` | `element`: DOM要素<br>`target`: 目標数値<br>`duration`: アニメーション時間(ms) | なし | 統計数値のカウントアップアニメーション |
| `typeText(element, text, speed)` | `element`: DOM要素<br>`text`: 表示テキスト<br>`speed`: タイピング速度(ms) | `Promise` | タイピングエフェクトでテキストを表示 |
| `animateRatingCount(element, targetRating, duration)` | `element`: DOM要素<br>`targetRating`: 目標レーティング<br>`duration`: アニメーション時間(ms) | なし | レーティング数値のカウントアップアニメーション |
| `animateValueWithColorTransition(element, targetValue, options)` | `element`: DOM要素<br>`targetValue`: 目標値<br>`options`: {duration, steps, applyClass} | なし | 任意の数値要素を色遷移付きでアニメーション表示（最高レート・最高パフォーマンス用） |

#### AtCoder関連関数
| 関数名 | パラメータ | 戻り値 | 用途 |
|-------|----------|--------|------|
| `fetchAtCoderData(username)` | `username`: AtCoderユーザー名 | `Promise<Object>` | AtCoder APIからデータを取得 |
| `displayAtCoderData(data)` | `data`: AtCoderデータオブジェクト | なし | 取得したAtCoderデータを画面に表示 |
| `updateLastUpdateTime()` | なし | なし | 最終更新時刻を表示 |
| `reloadAtCoderData()` | なし | なし | AtCoderデータを手動で再読み込み（グローバル関数） |

#### ユーティリティ関数
| 関数名 | パラメータ | 戻り値 | 用途 |
|-------|----------|--------|------|
| `isValidEmail(email)` | `email`: メールアドレス文字列 | `boolean` | メールアドレスのバリデーション |
| `showNotification(message, type)` | `message`: 通知メッセージ<br>`type`: 通知タイプ('success', 'error') | なし | 通知メッセージを表示 |
| `throttle(func, delay)` | `func`: 実行する関数<br>`delay`: 遅延時間(ms) | `Function` | 関数の実行頻度を制限（スロットリング） |

### 主要な変数（関数内ローカル変数）

#### initializeSplashScreen内
- `splashScreen`: スプラッシュスクリーン要素
- `mainContent`: メインコンテンツ要素
- `skipSplash`: スプラッシュスキップ関数

#### initializeNavigation内
- `hamburger`: ハンバーガーメニュー要素
- `navMenu`: ナビゲーションメニュー要素
- `navLinks`: ナビゲーションリンクのNodeList
- `navbar`: ナビゲーションバー要素

#### initializeScrollAnimations内
- `observer`: IntersectionObserver インスタンス
- `animatedElements`: アニメーション対象要素のNodeList

#### initializeAtCoderSection内
- `username`: AtCoderユーザー名（"Y_Maekawa"）
- `atcoderCards`: AtCoderカード要素のNodeList

#### fetchAtCoderData内
- `apiUrl`: AtCoder API URL
- `response`: fetch APIのレスポンス
- `ratingHistory`: レーティング履歴配列
- `algoRatings`: アルゴリズム部門のレーティング配列
- `heuristicRatings`: ヒューリスティック部門のレーティング配列
- `latestAlgo`: 最新のアルゴリズム部門データ
- `latestHeuristic`: 最新のヒューリスティック部門データ

#### displayAtCoderData内
- `card`: AtCoderカード要素
- `contestType`: コンテストタイプ（'algo' or 'heuristic'）
- `data`: 表示するデータ（algo or heuristic）
- `ratingElement`: レーティング表示要素
- `highestElement`: 最高レート表示要素
- `rankElement`: 順位表示要素
- `currentRating`: 現在のレーティング
- `highestRating`: 最高レーティング
- `rank`: 順位
- `gradientColor`: グラデーションカラー（レーティングに応じて変化）
- `colorName`: カラー名（rating-gray, rating-brown など）

### AtCoderレーティング色分け定数 (グローバル)
レーティングに応じた色分けロジック（displayAtCoderData内で使用）:
- `0-399`: グレー（gray）
- `400-799`: ブラウン（brown）
- `800-1199`: グリーン（green）
- `1200-1599`: シアン（cyan）
- `1600-1999`: ブルー（blue）
- `2000-2399`: イエロー（yellow）
- `2400-2799`: オレンジ（orange）
- `2800以上`: レッド（red）

※ この配列は `script.js` 内の `RATING_COLORS` 定数として定義され、`animateRatingWithColorTransition` と `animateValueWithColorTransition` に使われます。

### AtCoder JSON の拡張フィールド
`generate_atcoder_data.py`により出力されるJSONに次のフィールドを追加しました:
- `algorithm.highestPerformance` - アルゴリズム部門での最高パフォーマンス（数値）
- `heuristic.highestPerformance` - ヒューリスティック部門での最高パフォーマンス（数値）

### APIエンドポイント
| URL | 用途 |
|-----|------|
| `https://kenkoooo.com/atcoder/atcoder-api/v3/user/rating?user=Y_Maekawa` | AtCoderレーティング履歴取得 |

### フォールバックデータ
API取得失敗時に使用されるデータ:
```javascript
{
    algo: {
        current: 271,
        highest: 288,
        rank: '-'
    },
    heuristic: {
        current: 1241,
        highest: 1247,
        rank: '-'
    }
}
```

### イベントリスナー一覧
- `DOMContentLoaded`: ページ読み込み完了時に全機能を初期化
- `scroll`: スクロール時にナビゲーションバーの背景変化、トップへ戻るボタンの表示制御
- `click`: ハンバーガーメニュー、ナビゲーションリンク、スプラッシュスクリーン、トップへ戻るボタン
- `keydown`: Enterキーでスプラッシュスクリーンをスキップ
- `submit`: お問い合わせフォームの送信

---

## 📊 データフロー

### AtCoderデータ取得フロー
1. `initializeAtCoderSection()` 実行
2. `fetchAtCoderData("Y_Maekawa")` でAPI呼び出し
3. レスポンスをアルゴリズム部門とヒューリスティック部門に分離
4. 各部門の最新データを抽出（current, highest, rank）
5. `displayAtCoderData(data)` でDOM更新
6. `animateRatingCount()` でカウントアップアニメーション実行
7. レーティングに応じた色クラスを適用

### スプラッシュスクリーン表示フロー
1. ページ読み込み時、`splash-screen`が全画面表示
2. 3秒後に自動的に`main-content`へ遷移
3. クリックまたはEnterキーで即座にスキップ可能
4. フェードアウトアニメーションで滑らかに遷移

### スクロールアニメーション
1. `IntersectionObserver`で要素の可視状態を監視
2. 要素が画面内に入ると、`.animate`クラスを追加
3. CSSアニメーション（fadeInUp, slideIn等）が実行される

---

## 🔧 使用技術・ライブラリ

### 外部ライブラリ
- **Font Awesome 6.0.0**: アイコン表示
- **Google Fonts (Noto Sans JP)**: 日本語フォント

### JavaScript API
- **Fetch API**: AtCoderデータの取得
- **Intersection Observer API**: スクロールアニメーション
- **Promise/Async-Await**: 非同期処理

### CSS機能
- **CSS Grid**: レイアウト
- **CSS Flexbox**: フレキシブルレイアウト
- **CSS Custom Properties**: 色・サイズ変数管理
- **CSS Animations**: 各種アニメーション
- **CSS Transitions**: ホバー効果等

---

## 📝 メモ

### AtCoder API仕様
- **エンドポイント**: kenkoooo.com/atcoder/atcoder-api/v3
- **CORS**: CORS対応済み（AtCoder公式APIは非対応のため、AtCoder Problemsを使用）
- **レスポンス形式**: JSON配列、各オブジェクトに`NewRating`, `OldRating`, `Place`, `ContestName`等を含む
- **更新頻度**: 手動更新ボタンで再取得可能

### レスポンシブデザイン
- **768px以下**: タブレット対応（ナビゲーションがハンバーガーメニューに変化）
- **480px以下**: スマートフォン対応（グリッドが1カラムに変化）

### パフォーマンス最適化
- `throttle()`関数でスクロールイベントの実行頻度を制限
- Intersection Observerでビューポート内の要素のみアニメーション
- CSSアニメーションをGPUアクセラレーション対応（transform, opacity使用）

---

以上が、各ファイルで使用されている関数、変数、クラス、IDの一覧です。
