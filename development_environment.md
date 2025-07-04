# 開発環境セットアップチェックリスト

## 🛠️ 必要な開発環境・ツール

### 1. 基本開発環境

#### 1.1 必須ツール
- [x] **Docker Desktop** - コンテナ化環境
- [x] **Node.js 18+** - JavaScript/TypeScript実行環境
- [x] **Git** - バージョン管理
- [ ] **GitHub Account** - リポジトリ管理・CI/CD
- [ ] **VS Code** - 推奨エディタ
- [ ] **Postman/Insomnia** - API テスト
- [ ] **MySQL Workbench** - データベース管理GUI（オプション）

#### 1.2 VS Code 拡張機能
```bash
# 推奨拡張機能
- PHP Intelephense
- Laravel Extension Pack
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Thunder Client (APIテスト)
- GitLens
- Docker
- Auto Rename Tag
- Bracket Pair Colorizer
- Error Lens
```

### 2. GitHub リポジトリ設定

#### 2.1 リポジトリ作成
```bash
# GitHubでリポジトリを作成後
git init
git add .
git commit -m "Initial commit: Laravel 12 + Next.js setup"
git branch -M main
git remote add origin https://github.com/[username]/seo-article.git
git push -u origin main
```

#### 2.2 ブランチ戦略
```
main (本番)
├── develop (開発)
├── feature/[機能名] (機能開発)
├── hotfix/[修正内容] (緊急修正)
└── release/[バージョン] (リリース準備)
```

### 3. ローカル開発サーバー

#### 3.1 Laravel Sail (Backend)
```bash
# ポート設定
- Laravel API: http://localhost:8000
- MySQL: localhost:3306
- Redis: localhost:6379
- Mailpit: http://localhost:8025
- phpMyAdmin: http://localhost:8080
- MinIO: http://localhost:9001
```

#### 3.2 Next.js (Frontend)
```bash
# 開発サーバー
- Next.js App: http://localhost:3000
- Storybook: http://localhost:6006 (オプション)
```

### 4. 追加で必要な開発ツール

#### 4.1 API 開発・テスト
- **Postman/Insomnia** - API エンドポイントテスト
- **Thunder Client** - VS Code内APIテスト
- **Laravel Telescope** - デバッグ・監視

#### 4.2 データベース管理
- **phpMyAdmin** - Web ベースDB管理（Sailに含まれる）
- **MySQL Workbench** - デスクトップDB管理
- **TablePlus** - モダンなDB管理ツール

#### 4.3 フロントエンド開発
- **React Developer Tools** - ブラウザ拡張
- **Tailwind CSS IntelliSense** - VS Code拡張
- **Storybook** - コンポーネント開発環境

#### 4.4 コード品質管理
- **ESLint** - JavaScript/TypeScript リンター
- **Prettier** - コードフォーマッター
- **PHP CS Fixer** - PHP コードスタイル
- **Husky** - Git hooks管理

### 5. 外部サービス（オプション）

#### 5.1 開発支援サービス
- **Sentry** - エラートラッキング
- **LogRocket** - ユーザーセッション録画
- **Vercel** - フロントエンドホスティング
- **DigitalOcean/AWS** - サーバーホスティング

#### 5.2 CI/CD
- **GitHub Actions** - 自動テスト・デプロイ
- **Docker Hub** - コンテナレジストリ
- **Netlify** - 静的サイトホスティング

## 📋 セットアップ手順

### Step 1: 基本ツールのインストール
```bash
# macOS (Homebrew)
brew install docker
brew install node
brew install git

# Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose nodejs npm git

# Windows
# Docker Desktop, Node.js, Git for Windows をダウンロード
```

### Step 2: VS Code セットアップ
```bash
# VS Code インストール後、推奨拡張機能をインストール
code --install-extension bmewburn.vscode-intelephense-client
code --install-extension onecentlin.laravel-extension-pack
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension bradlc.vscode-tailwindcss
```

### Step 3: GitHub リポジトリセットアップ
```bash
# 1. GitHub で新しいリポジトリを作成
# 2. ローカルでリポジトリを初期化
cd /home/iwasaki/work/seo-article
git init
git add .
git commit -m "Initial commit: Project structure setup"
git branch -M main
git remote add origin https://github.com/[username]/seo-article.git
git push -u origin main
```

### Step 4: 開発環境の起動確認
```bash
# Backend (Laravel Sail)
cd backend
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate

# Frontend (Next.js)
cd ../frontend
npm run dev
```

## 🔧 環境変数設定

### Backend (.env)
```env
APP_NAME="SEO Article System"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=seo_article
DB_USERNAME=sail
DB_PASSWORD=password

SANCTUM_STATEFUL_DOMAINS=localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🧪 テスト環境

### Backend テスト
```bash
# PHPUnit
./vendor/bin/sail artisan test

# 特定のテストファイル
./vendor/bin/sail artisan test tests/Feature/ArticleTest.php
```

### Frontend テスト
```bash
# Jest
npm run test

# E2E テスト (Cypress)
npm run e2e
```

## 📊 監視・デバッグツール

### Laravel Telescope
```bash
# インストール
./vendor/bin/sail composer require laravel/telescope --dev
./vendor/bin/sail artisan telescope:install
./vendor/bin/sail artisan migrate

# アクセス: http://localhost:8000/telescope
```

### React Developer Tools
```bash
# ブラウザ拡張機能をインストール
# Chrome: https://chrome.google.com/webstore/detail/react-developer-tools/
# Firefox: https://addons.mozilla.org/en-US/firefox/addon/react-devtools/
```

## 🚀 パフォーマンス最適化ツール

### Laravel Debugbar
```bash
./vendor/bin/sail composer require barryvdh/laravel-debugbar --dev
```

### Next.js Bundle Analyzer
```bash
cd frontend
npm install --save-dev @next/bundle-analyzer
```

## 🔐 セキュリティツール

### Laravel Security
```bash
# セキュリティ監査
./vendor/bin/sail composer require enlightn/security-checker
./vendor/bin/sail artisan security:check
```

### npm audit
```bash
cd frontend
npm audit
npm audit fix
```

## 📝 ドキュメント生成

### API ドキュメント
```bash
# Laravel API Documentation
./vendor/bin/sail composer require knuckleswtf/scribe
./vendor/bin/sail artisan scribe:generate
```

### コンポーネントドキュメント
```bash
# Storybook
cd frontend
npx storybook@latest init
npm run storybook
```

## 🎯 次のステップ

1. **環境構築の確認** - 全てのサービスが正常に起動するか確認
2. **GitHub Actions設定** - CI/CDパイプラインの構築
3. **コード品質ツール** - ESLint, Prettier, PHP CS Fixerの設定
4. **テスト環境** - 自動テストの実装
5. **監視ツール** - Telescopeやデバッグツールの設定

このチェックリストに従って開発環境を整えることで、効率的で品質の高い開発が可能になります。
