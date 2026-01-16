# Engawa// Portfolio Website

インディーゲーム開発者 Engawa// のポートフォリオサイトです。

## 🚀 デプロイ方法（GitHub Pages）

### 1. GitHubリポジトリの作成

1. GitHubで新しいリポジトリを作成
   - リポジトリ名: `portfolio` または `engawa-portfolio`
   - Public に設定

2. ローカルでGit初期化とプッシュ
```bash
cd e:\Portfolio
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. GitHub Pages の有効化

1. リポジトリの `Settings` → `Pages`
2. Source: `Deploy from a branch`
3. Branch: `main` / `/ (root)`
4. Save

数分後に `https://YOUR_USERNAME.github.io/YOUR_REPO/` でアクセス可能になります。

### 3. カスタムドメイン（オプション）

1. `CNAME` ファイルを作成し、ドメイン名を記載
2. ドメインのDNS設定で GitHub Pages を指定

---

## 📝 コンテンツの更新方法

### ゲーム作品の追加・編集

**ファイル**: `data/games.json`

```json
{
    "id": "game-id",
    "title": "ゲームタイトル",
    "description": "短い説明",
    "fullDescription": "モーダルに表示される詳細な説明",
    "thumbnail": "images/games/game-id/thumbnail.png",
    "screenshots": [
        "images/games/game-id/screenshot1.png",
        "images/games/game-id/screenshot2.png"
    ],
    "engine": "Unity",
    "genre": "アクション / RPG",
    "status": "開発中",
    "links": {
        "steam": "https://store.steampowered.com/app/...",
        "unityroom": "https://unityroom.com/games/...",
        "itchio": "https://....itch.io/...",
        "googleplay": "https://play.google.com/store/apps/...",
        "youtube": "https://youtube.com/watch?v=..."
    }
}
```

**画像の追加**:
1. `images/games/[game-id]/` フォルダを作成
2. スクリーンショットを配置
3. JSONの `screenshots` 配列にパスを追加

### イラストの追加・編集

**ファイル**: `data/illustrations.json`

```json
{
    "id": "illustration-id",
    "title": "イラストタイトル",
    "image": "images/illustrations/illustration.jpg",
    "thumbnail": "images/illustrations/illustration_thumb.jpg",
    "category": "ファンアート",
    "date": "2024-01"
}
```

**画像の追加**:
1. 画像を `images/illustrations/` に配置
2. JSONに新しいオブジェクトを追加

### プロフィールの編集

**ファイル**: `index.html`

- `hero` セクション: 名前・肩書き・SNSリンク
- `about` セクション: 自己紹介・スキル・ツール

### SNSリンクの変更

`index.html` 内の以下の箇所を編集：
- ヒーローセクションの `.hero-social`
- フッターの `.footer-social`

---

## 🎨 カスタマイズ

### テーマカラーの変更

**ファイル**: `css/themes.css`

```css
:root {
    --color-accent: #4ecca3;  /* メインアクセントカラー */
    --color-accent-hover: #3db892;
}
```

### フォントの変更

1. `index.html` の Google Fonts リンクを変更
2. `css/themes.css` の `--font-sans` を変更

---

## 📁 ファイル構成

```
Portfolio/
├── index.html          # メインページ
├── policy.html         # ポリシーページ
├── 404.html            # 404エラーページ
├── css/
│   ├── style.css       # メインスタイル
│   └── themes.css      # テーマ変数
├── js/
│   ├── main.js         # 共通機能
│   ├── theme.js        # テーマ切り替え
│   ├── works.js        # ゲーム作品表示
│   └── gallery.js      # イラストギャラリー
├── data/
│   ├── games.json      # ゲームデータ
│   └── illustrations.json  # イラストデータ
└── images/
    ├── icon.jpg        # プロフィールアイコン
    ├── games/          # ゲーム画像
    └── illustrations/  # イラスト画像
```

---

## ⚡ ローカルでのテスト

JSONを読み込むため、ローカルサーバーが必要です：

```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve

# VS Code
Live Server 拡張機能を使用
```

ブラウザで `http://localhost:8000` にアクセス

---

## 📜 ライセンス

© 2024 Engawa//. All rights reserved.
