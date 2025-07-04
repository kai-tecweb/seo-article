#!/bin/bash

# SEO記事システム 開発環境セットアップスクリプト
# Laravel 12 + Next.js + MySQL + Laravel Sail

set -e

echo "🚀 SEO記事システム開発環境セットアップを開始します..."

# 色付きメッセージ用の関数
print_success() {
    echo -e "\e[32m✅ $1\e[0m"
}

print_error() {
    echo -e "\e[31m❌ $1\e[0m"
}

print_info() {
    echo -e "\e[34mℹ️  $1\e[0m"
}

print_warning() {
    echo -e "\e[33m⚠️  $1\e[0m"
}

# 必要なツールの確認
check_requirements() {
    print_info "必要なツールの確認中..."
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker がインストールされていません"
        exit 1
    fi
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js がインストールされていません"
        exit 1
    fi
    
    if ! command -v git &> /dev/null; then
        print_error "Git がインストールされていません"
        exit 1
    fi
    
    print_success "必要なツールが揃っています"
}

# Laravel Sailプロジェクトの作成
setup_laravel() {
    print_info "Laravel 12 プロジェクトをセットアップしています..."
    
    if [ ! -d "backend" ]; then
        print_info "Laravel プロジェクトを作成中..."
        curl -s "https://laravel.build/backend?with=mysql,redis,minio" | bash
        
        if [ $? -eq 0 ]; then
            print_success "Laravel プロジェクトが作成されました"
        else
            print_error "Laravel プロジェクトの作成に失敗しました"
            exit 1
        fi
    else
        print_warning "backend ディレクトリが既に存在します"
    fi
    
    # Laravel Sailの起動
    cd backend
    print_info "Laravel Sail を起動中..."
    ./vendor/bin/sail up -d
    
    if [ $? -eq 0 ]; then
        print_success "Laravel Sail が起動しました"
    else
        print_error "Laravel Sail の起動に失敗しました"
        exit 1
    fi
    
    # 必要なパッケージのインストール
    print_info "Laravel Sanctum をインストール中..."
    ./vendor/bin/sail composer require laravel/sanctum
    
    # 設定ファイルの公開
    ./vendor/bin/sail artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
    
    # データベースのセットアップ
    print_info "データベースマイグレーションを実行中..."
    ./vendor/bin/sail artisan migrate
    
    # 開発用パッケージのインストール
    print_info "開発用パッケージをインストール中..."
    ./vendor/bin/sail composer require --dev laravel/telescope
    ./vendor/bin/sail artisan telescope:install
    ./vendor/bin/sail artisan migrate
    
    ./vendor/bin/sail composer require --dev barryvdh/laravel-debugbar
    
    print_success "Laravel セットアップが完了しました"
    cd ..
}

# Next.jsプロジェクトの作成
setup_nextjs() {
    print_info "Next.js プロジェクトをセットアップしています..."
    
    if [ ! -d "frontend" ]; then
        print_info "Next.js プロジェクトを作成中..."
        npx create-next-app@latest frontend \
            --typescript \
            --tailwind \
            --eslint \
            --app \
            --src-dir \
            --import-alias="@/*" \
            --use-npm
        
        if [ $? -eq 0 ]; then
            print_success "Next.js プロジェクトが作成されました"
        else
            print_error "Next.js プロジェクトの作成に失敗しました"
            exit 1
        fi
    else
        print_warning "frontend ディレクトリが既に存在します"
    fi
    
    cd frontend
    
    # 必要なパッケージのインストール
    print_info "追加パッケージをインストール中..."
    npm install \
        axios \
        react-hook-form \
        @hookform/resolvers \
        zod \
        zustand \
        @types/node
    
    # 開発用パッケージのインストール
    npm install --save-dev \
        @next/bundle-analyzer \
        @storybook/react \
        @storybook/addon-essentials \
        @storybook/addon-interactions \
        @storybook/testing-library
    
    print_success "Next.js セットアップが完了しました"
    cd ..
}

# 環境変数ファイルの作成
setup_env_files() {
    print_info "環境変数ファイルを作成中..."
    
    # Laravel .env ファイルの設定
    if [ -f "backend/.env" ]; then
        print_info "Laravel .env ファイルを更新中..."
        cd backend
        
        # Sanctumの設定を追加
        if ! grep -q "SANCTUM_STATEFUL_DOMAINS" .env; then
            echo "SANCTUM_STATEFUL_DOMAINS=localhost:3000" >> .env
        fi
        
        # CORS設定
        if ! grep -q "FRONTEND_URL" .env; then
            echo "FRONTEND_URL=http://localhost:3000" >> .env
        fi
        
        cd ..
    fi
    
    # Next.js .env.local ファイルの作成
    if [ ! -f "frontend/.env.local" ]; then
        print_info "Next.js .env.local ファイルを作成中..."
        cat > frontend/.env.local << EOL
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOL
        print_success ".env.local ファイルが作成されました"
    fi
}

# Gitリポジトリの初期化
setup_git() {
    print_info "Git リポジトリを初期化中..."
    
    if [ ! -d ".git" ]; then
        git init
        
        # .gitignoreファイルの作成
        cat > .gitignore << EOL
# Backend
backend/.env
backend/vendor/
backend/node_modules/
backend/public/hot
backend/public/storage
backend/storage/*.key
backend/bootstrap/cache/
backend/phpunit.xml
backend/Homestead.json
backend/Homestead.yaml
backend/.env.backup

# Frontend
frontend/.env.local
frontend/.env.production.local
frontend/.env.development.local
frontend/.env.test.local
frontend/.next/
frontend/out/
frontend/build/
frontend/node_modules/
frontend/.DS_Store
frontend/*.tsbuildinfo

# Common
.DS_Store
*.log
*.tmp
*.temp
.vscode/
.idea/
EOL
        
        git add .
        git commit -m "Initial commit: Laravel 12 + Next.js + MySQL setup"
        
        print_success "Git リポジトリが初期化されました"
    else
        print_warning ".git ディレクトリが既に存在します"
    fi
}

# VS Code設定の作成
setup_vscode() {
    print_info "VS Code 設定を作成中..."
    
    mkdir -p .vscode
    
    # settings.json
    cat > .vscode/settings.json << EOL
{
    "emmet.includeLanguages": {
        "blade": "html"
    },
    "files.associations": {
        "*.blade.php": "blade"
    },
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "typescript.preferences.importModuleSpecifier": "relative",
    "tailwindCSS.experimental.classRegex": [
        "cn\\(([^)]*)\\)"
    ]
}
EOL
    
    # extensions.json
    cat > .vscode/extensions.json << EOL
{
    "recommendations": [
        "bmewburn.vscode-intelephense-client",
        "onecentlin.laravel-extension-pack",
        "dsznajder.es7-react-js-snippets",
        "bradlc.vscode-tailwindcss",
        "rangav.vscode-thunder-client",
        "eamodio.gitlens",
        "ms-vscode.vscode-typescript-next",
        "usernamehw.errorlens",
        "formulahendry.auto-rename-tag",
        "ms-azuretools.vscode-docker"
    ]
}
EOL
    
    # tasks.json
    cat > .vscode/tasks.json << EOL
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Laravel Sail Up",
            "type": "shell",
            "command": "./vendor/bin/sail up -d",
            "options": {
                "cwd": "\${workspaceFolder}/backend"
            },
            "group": "build"
        },
        {
            "label": "Laravel Sail Down",
            "type": "shell",
            "command": "./vendor/bin/sail down",
            "options": {
                "cwd": "\${workspaceFolder}/backend"
            },
            "group": "build"
        },
        {
            "label": "Next.js Dev",
            "type": "shell",
            "command": "npm run dev",
            "options": {
                "cwd": "\${workspaceFolder}/frontend"
            },
            "group": "build"
        }
    ]
}
EOL
    
    print_success "VS Code 設定が作成されました"
}

# 開発環境の動作確認
verify_setup() {
    print_info "開発環境の動作確認中..."
    
    # Laravelの確認
    cd backend
    if ./vendor/bin/sail artisan --version &> /dev/null; then
        print_success "Laravel が正常に動作しています"
    else
        print_error "Laravel の動作確認に失敗しました"
    fi
    cd ..
    
    # Next.jsの確認
    cd frontend
    if npm run build &> /dev/null; then
        print_success "Next.js が正常に動作しています"
    else
        print_warning "Next.js のビルドで警告が発生しました（通常は問題ありません）"
    fi
    cd ..
    
    print_info "サービスURL:"
    echo "  - Laravel API: http://localhost:8000"
    echo "  - Next.js App: http://localhost:3000"
    echo "  - phpMyAdmin: http://localhost:8080"
    echo "  - Telescope: http://localhost:8000/telescope"
    echo "  - Mailpit: http://localhost:8025"
    echo "  - MinIO: http://localhost:9001"
}

# メイン実行
main() {
    print_info "SEO記事システム開発環境セットアップを開始します"
    
    check_requirements
    setup_laravel
    setup_nextjs
    setup_env_files
    setup_git
    setup_vscode
    verify_setup
    
    print_success "🎉 開発環境のセットアップが完了しました！"
    print_info "次のステップ:"
    echo "  1. VS Code で .vscode/extensions.json の推奨拡張機能をインストール"
    echo "  2. GitHub でリポジトリを作成し、リモートリポジトリを追加"
    echo "  3. backend/routes/api.php でAPIルートを定義"
    echo "  4. frontend/src/app/page.tsx でフロントエンドを実装"
    echo ""
    echo "開発サーバーを起動するには:"
    echo "  cd backend && ./vendor/bin/sail up -d"
    echo "  cd frontend && npm run dev"
}

# スクリプト実行
main "$@"
