# SEO記事システム - Laravel 12 + Next.js + MySQL

## 🚀 クイックスタート

### 前提条件
- Docker Desktop
- Node.js 18+
- Git

### 一発セットアップ
```bash
# 1. 自動セットアップ実行
./setup.sh

# 2. 開発サーバー起動
./dev.sh start
```

### 手動セットアップ
```bash
# 1. 環境変数設定
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# 2. 全サービス起動
docker-compose up -d

# 3. データベースセットアップ
docker-compose exec app php artisan migrate --seed
```

## 📋 開発コマンド

```bash
./dev.sh start      # 開発サーバー起動
./dev.sh stop       # 開発サーバー停止
./dev.sh restart    # 再起動
./dev.sh test       # テスト実行
./dev.sh migrate    # DB マイグレーション
./dev.sh fresh      # DB リセット
./dev.sh help       # ヘルプ表示
```

## 🔗 サービスURL

- **Laravel API**: http://localhost:8000
- **Next.js App**: http://localhost:3000
- **phpMyAdmin**: http://localhost:8080
- **Mailpit**: http://localhost:8025

## 📁 プロジェクト構造

```
seo-article/
├── backend/                    # Laravel 12 API
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   ├── Models/
│   │   ├── Services/          # ビジネスロジック
│   │   └── Repositories/      # データアクセス層
│   └── routes/api.php
├── frontend/                   # Next.js App
│   ├── src/
│   │   ├── app/              # App Router
│   │   ├── components/
│   │   ├── lib/api/          # API クライアント
│   │   └── types/
│   └── package.json
└── docker-compose.yml          # 統合Docker設定
```

## 🛠️ 技術スタック

- **Backend**: Laravel 12 + MySQL + Redis
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Development**: Docker + Laravel Sail
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Auth**: Laravel Sanctum

## 📚 ドキュメント

### 詳細な設計書とガイド
1. **[システム設計書](system_design.md)** - 全体的なシステム設計とアーキテクチャ
2. **[セットアップガイド](setup_guide.md)** - 詳細なセットアップ手順
3. **[実装サンプル](implementation_samples.md)** - 具体的なコード例

### API仕様
- **認証**: `/api/v1/auth/*`
- **記事**: `/api/v1/articles`
- **カテゴリー**: `/api/v1/categories`

## 🔧 開発コマンド

### Laravel Sail
```bash
# コンテナ起動
./vendor/bin/sail up -d

# コンテナ停止
./vendor/bin/sail down

# Artisan コマンド
./vendor/bin/sail artisan make:controller Api/SampleController
./vendor/bin/sail artisan make:model Sample -m
./vendor/bin/sail artisan migrate

# テスト実行
./vendor/bin/sail artisan test
```

### Next.js
```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm run start

# 型チェック
npm run type-check
```

## 🧪 テスト

### バックエンドテスト
```bash
# PHPUnit テスト実行
./vendor/bin/sail artisan test

# 特定のテストクラス実行
./vendor/bin/sail artisan test --filter=ArticleTest
```

### フロントエンドテスト
```bash
# Jest テスト実行
npm run test

# カバレッジ確認
npm run test:coverage
```

## 📦 デプロイ

### 本番環境への導入
1. **サーバー準備**: AWS/GCP/Azure等のクラウドサービス
2. **Docker設定**: 本番用docker-compose.yml
3. **環境変数**: .env.production設定
4. **SSL証明書**: Let's Encrypt等で設定
5. **CI/CD**: GitHub Actions等で自動デプロイ

### GitHub Actions の設定

以下のシークレットをGitHubリポジトリに設定してください：

#### 必須シークレット
```bash
# アプリケーション設定
APP_KEY=base64:ランダムなキー    # php artisan key:generate で生成

# データベース設定
DB_PASSWORD=本番用パスワード
REDIS_PASSWORD=本番用パスワード

# 本番環境デプロイ用
DEPLOY_HOST=デプロイ先サーバーのホスト
DEPLOY_USER=デプロイ用ユーザー
DEPLOY_KEY=SSH秘密鍵
```

#### シークレット設定コマンド
```bash
# GitHub CLI を使用してシークレットを設定
gh secret set APP_KEY
gh secret set DB_PASSWORD
gh secret set REDIS_PASSWORD
gh secret set DEPLOY_HOST
gh secret set DEPLOY_USER
gh secret set DEPLOY_KEY
```

## 🛡️ セキュリティ

### 実装済み対策
- CSRF保護
- XSS対策
- SQLインジェクション対策
- 認証・認可（Laravel Sanctum）
- レート制限
- HTTPS強制（本番環境）

## 🐛 トラブルシューティング

### よくある問題と解決方法

#### 1. ポート競合エラー
```bash
# 使用中のポートを確認
sudo netstat -tlnp | grep :8000

# 該当プロセスを終了
sudo kill -9 [PID]
```

#### 2. Docker権限エラー
```bash
# ユーザーをdockerグループに追加
sudo usermod -aG docker $USER

# 再ログイン後、権限確認
docker ps
```

#### 3. データベース接続エラー
```bash
# コンテナ状態確認
./vendor/bin/sail ps

# データベース再構築
./vendor/bin/sail artisan migrate:fresh --seed
```

## 🤝 コントリビューション

### 開発フロー
1. Issueの作成
2. Feature branchの作成
3. 実装とテスト
4. Pull Requestの作成
5. コードレビュー
6. マージ

### コーディング規約
- **Laravel**: PSR-12 準拠
- **Next.js**: ESLint + Prettier
- **TypeScript**: 厳密な型チェック
- **Git**: Conventional Commits

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 👥 メンテナー

- **バックエンド**: Laravel 12 + MySQL
- **フロントエンド**: Next.js + TypeScript
- **インフラ**: Docker + Laravel Sail

## 🔗 関連リンク

- [Laravel 12 公式ドキュメント](https://laravel.com/docs/12.x)
- [Next.js 14 公式ドキュメント](https://nextjs.org/docs)
- [Laravel Sail 公式ドキュメント](https://laravel.com/docs/12.x/sail)
- [Tailwind CSS 公式ドキュメント](https://tailwindcss.com/docs)

## 📊 プロジェクト進捗

### Phase 1: 基盤構築 ✅
- [x] 環境セットアップ
- [x] 基本設計
- [x] 認証システム
- [x] 基本CRUD操作

### Phase 2: 機能拡張 🚧
- [ ] 画像アップロード
- [ ] SEO最適化
- [ ] 検索機能
- [ ] パフォーマンス最適化

### Phase 3: 本番対応 📋
- [ ] セキュリティ強化
- [ ] 監視・ログ
- [ ] デプロイ自動化
- [ ] 負荷テスト

---

📝 **最終更新**: 2025年7月4日  
🔄 **バージョン**: 1.0.0  
👨‍💻 **開発者**: Laravel + Next.js チーム
