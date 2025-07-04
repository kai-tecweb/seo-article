# システム設計書: Laravel 12 + Next.js + MySQL + Laravel Sail

## 1. プロジェクト概要

### 1.1 システム構成
- **バックエンド**: Laravel 12 (PHP 8.3)
- **フロントエンド**: Next.js (React 18)
- **データベース**: MySQL 8.0
- **開発環境**: Laravel Sail (Docker)
- **アーキテクチャ**: API分離型（RESTful API）

### 1.2 開発環境
- **コンテナ化**: Docker + Docker Compose
- **開発ツール**: Laravel Sail
- **パッケージマネージャー**: 
  - PHP: Composer
  - Node.js: npm/yarn

## 2. システムアーキテクチャ

### 2.1 全体構成図
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js       │    │   Laravel 12    │    │     MySQL       │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
│   Port: 3000    │    │   Port: 8000    │    │   Port: 3306    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                │
                    ┌─────────────────┐
                    │   Laravel Sail  │
                    │   (Docker)      │
                    └─────────────────┘
```

### 2.2 ディレクトリ構造
```
seo-article/
├── backend/                    # Laravel 12 プロジェクト
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   └── Api/       # API コントローラー
│   │   │   ├── Middleware/
│   │   │   └── Requests/
│   │   ├── Models/
│   │   ├── Services/          # ビジネスロジック
│   │   └── Repositories/      # データアクセス層
│   ├── database/
│   │   ├── migrations/
│   │   ├── seeders/
│   │   └── factories/
│   ├── routes/
│   │   ├── api.php
│   │   └── web.php
│   ├── tests/
│   ├── docker-compose.yml     # Sail設定
│   └── .env
├── frontend/                   # Next.js プロジェクト
│   ├── src/
│   │   ├── app/              # App Router
│   │   ├── components/
│   │   ├── lib/
│   │   │   ├── api/          # API クライアント
│   │   │   └── utils/
│   │   ├── hooks/
│   │   ├── store/            # 状態管理
│   │   └── types/
│   ├── public/
│   ├── package.json
│   └── .env.local
├── docker-compose.yml          # 統合Docker設定
└── README.md
```

## 3. 技術仕様

### 3.1 Laravel 12 (Backend)

#### 3.1.1 主要機能
- **認証**: Laravel Sanctum
- **API**: RESTful API
- **バリデーション**: Form Request Classes
- **エラーハンドリング**: 統一エラーレスポンス
- **ログ**: Laravel Log
- **キャッシュ**: Redis (オプション)
- **キュー**: Database Queue

#### 3.1.2 APIエンドポイント設計
```
/api/v1/
├── auth/
│   ├── POST /register
│   ├── POST /login
│   ├── POST /logout
│   └── GET /user
├── articles/
│   ├── GET /articles
│   ├── POST /articles
│   ├── GET /articles/{id}
│   ├── PUT /articles/{id}
│   └── DELETE /articles/{id}
└── categories/
    ├── GET /categories
    ├── POST /categories
    └── PUT /categories/{id}
```

#### 3.1.3 データベース設計
```sql
-- ユーザーテーブル
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- カテゴリーテーブル
CREATE TABLE categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 記事テーブル
CREATE TABLE articles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image VARCHAR(255),
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    user_id BIGINT UNSIGNED NOT NULL,
    category_id BIGINT UNSIGNED,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

### 3.2 Next.js (Frontend)

#### 3.2.1 主要機能
- **ルーティング**: App Router
- **状態管理**: Zustand または Context API
- **スタイリング**: Tailwind CSS
- **フォーム**: React Hook Form + Zod
- **HTTP クライアント**: Axios
- **認証**: NextAuth.js または独自実装
- **SEO**: Next.js の組み込み機能

#### 3.2.2 コンポーネント設計
```
components/
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Sidebar.tsx
├── ui/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   └── Card.tsx
├── features/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── articles/
│   │   ├── ArticleList.tsx
│   │   ├── ArticleCard.tsx
│   │   └── ArticleForm.tsx
│   └── categories/
│       └── CategoryList.tsx
└── common/
    ├── Loading.tsx
    └── ErrorBoundary.tsx
```

### 3.3 MySQL データベース

#### 3.3.1 設定
- **バージョン**: MySQL 8.0
- **文字セット**: utf8mb4
- **照合順序**: utf8mb4_unicode_ci
- **エンジン**: InnoDB
- **レプリケーション**: Single Instance（開発環境）

#### 3.3.2 パフォーマンス最適化
- インデックスの適切な設定
- クエリキャッシュの活用
- 接続プールの設定

## 4. Laravel Sail 設定

### 4.1 docker-compose.yml
```yaml
version: '3.8'

services:
  laravel.test:
    build:
      context: ./backend/vendor/laravel/sail/runtimes/8.3
      dockerfile: Dockerfile
    image: sail-8.3/app
    ports:
      - '8000:80'
    environment:
      WWWGROUP: '1000'
      LARAVEL_SAIL: 1
    volumes:
      - './backend:/var/www/html'
    networks:
      - sail
    depends_on:
      - mysql
      - redis
      - minio

  mysql:
    image: 'mysql/mysql-server:8.0'
    ports:
      - '3306:3306'
    environment:
      MYSQL_ROOT_PASSWORD: 'password'
      MYSQL_DATABASE: 'seo_article'
      MYSQL_USER: 'sail'
      MYSQL_PASSWORD: 'password'
    volumes:
      - 'sailmysql:/var/lib/mysql'
    networks:
      - sail

  redis:
    image: 'redis:alpine'
    ports:
      - '6379:6379'
    volumes:
      - 'sailredis:/data'
    networks:
      - sail

  minio:
    image: 'minio/minio:latest'
    ports:
      - '9000:9000'
      - '9001:9001'
    environment:
      MINIO_ROOT_USER: 'sail'
      MINIO_ROOT_PASSWORD: 'password'
    volumes:
      - 'sailminio:/data/minio'
    networks:
      - sail
    command: 'minio server /data/minio --console-address ":9001"'

networks:
  sail:
    driver: bridge

volumes:
  sailmysql:
    driver: local
  sailredis:
    driver: local
  sailminio:
    driver: local
```

### 4.2 Next.js Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

## 5. 開発フロー

### 5.1 セットアップ手順
1. **Laravel プロジェクト作成**
   ```bash
   curl -s https://laravel.build/seo-article | bash
   cd seo-article
   ./vendor/bin/sail up -d
   ```

2. **Next.js プロジェクト作成**
   ```bash
   npx create-next-app@latest frontend --typescript --tailwind --app
   cd frontend
   npm install
   ```

3. **データベース設定**
   ```bash
   ./vendor/bin/sail artisan migrate
   ./vendor/bin/sail artisan db:seed
   ```

### 5.2 開発コマンド
```bash
# Laravel Sail 起動
./vendor/bin/sail up -d

# Next.js 開発サーバー起動
cd frontend && npm run dev

# データベースマイグレーション
./vendor/bin/sail artisan migrate

# テスト実行
./vendor/bin/sail artisan test
```

## 6. セキュリティ対策

### 6.1 認証・認可
- **Laravel Sanctum**: API認証
- **CSRF保護**: フォーム送信時
- **CORS設定**: 適切なオリジン制限
- **レート制限**: API呼び出し制限

### 6.2 データ保護
- **バリデーション**: 入力データの検証
- **SQLインジェクション対策**: Eloquent ORM使用
- **XSS対策**: データエスケープ
- **HTTPS**: 本番環境での強制化

## 7. パフォーマンス最適化

### 7.1 バックエンド
- **キャッシュ**: Redis使用
- **データベース**: インデックス最適化
- **API**: ページネーション実装
- **画像最適化**: 適切なサイズ・フォーマット

### 7.2 フロントエンド
- **コード分割**: Dynamic Imports
- **画像最適化**: next/image使用
- **メタデータ**: SEO最適化
- **静的生成**: SSG/ISR活用

## 8. 監視・ロギング

### 8.1 ログ管理
- **Laravel Log**: 構造化ログ
- **エラートラッキング**: Sentry（オプション）
- **パフォーマンス監視**: New Relic（オプション）

### 8.2 ヘルスチェック
- **API**: ヘルスチェックエンドポイント
- **データベース**: 接続確認
- **外部サービス**: 依存関係確認

## 9. デプロイメント

### 9.1 本番環境
- **インフラ**: AWS/GCP/Azure
- **Webサーバー**: Nginx
- **PHP**: PHP-FPM
- **データベース**: MySQL（マスター・スレーブ）
- **CDN**: CloudFlare

### 9.2 CI/CD
- **GitHub Actions**: 自動テスト・デプロイ
- **Docker**: コンテナ化
- **環境管理**: 開発・ステージング・本番

## 10. まとめ

この設計書は、Laravel 12、Next.js、MySQL、Laravel Sailを使用したモダンなフルスタックWebアプリケーション開発のための包括的なガイドです。各コンポーネントが適切に分離され、スケーラブルで保守しやすいアーキテクチャを提供しています。

開発開始時は、まずバックエンドのAPI設計から始め、その後フロントエンドの実装を進めることを推奨します。
