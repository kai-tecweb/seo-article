#!/bin/bash

# 開発用ユーティリティスクリプト
# SEO記事システム開発支援ツール

set -e

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

# ヘルプ表示
show_help() {
    echo "SEO記事システム開発用ユーティリティ"
    echo ""
    echo "使用法:"
    echo "  ./dev.sh [コマンド]"
    echo ""
    echo "コマンド:"
    echo "  start      - 開発サーバーを起動"
    echo "  stop       - 開発サーバーを停止"
    echo "  restart    - 開発サーバーを再起動"
    echo "  status     - サービスの状態を確認"
    echo "  logs       - ログを表示"
    echo "  migrate    - データベースマイグレーション"
    echo "  seed       - データベースシーダー実行"
    echo "  fresh      - データベースをリセット"
    echo "  test       - テストを実行"
    echo "  lint       - コードのリント"
    echo "  format     - コードのフォーマット"
    echo "  build      - プロダクションビルド"
    echo "  clean      - キャッシュクリア"
    echo "  install    - 依存関係のインストール"
    echo "  update     - パッケージの更新"
    echo "  help       - このヘルプを表示"
}

# 開発サーバーの起動
start_servers() {
    print_info "開発サーバーを起動中..."
    
    # 統合Docker Composeで一括起動
    print_info "Docker Compose で全サービスを起動中..."
    docker-compose up -d
    
    # 起動待機
    sleep 5
    
    # データベースマイグレーション
    if [ -d "backend" ]; then
        print_info "データベースマイグレーションを実行中..."
        docker-compose exec app php artisan migrate --force
    fi
    
    print_success "🚀 開発サーバーが起動しました"
    print_info "サービスURL:"
    echo "  - Laravel API: http://localhost:8000"
    echo "  - Next.js App: http://localhost:3000"
    echo "  - phpMyAdmin: http://localhost:8080"
    echo "  - Mailpit: http://localhost:8025"
}

# 開発サーバーの停止
stop_servers() {
    print_info "開発サーバーを停止中..."
    
    # 統合Docker Composeで一括停止
    docker-compose down
    
    print_success "🛑 開発サーバーが停止しました"
}

# サービスの状態確認
check_status() {
    print_info "サービスの状態を確認中..."
    
    # Laravel Sailの状態
    if [ -d "backend" ]; then
        cd backend
        print_info "Laravel Sail コンテナの状態:"
        ./vendor/bin/sail ps
        cd ..
    fi
    
    # Next.jsの状態
    if [ -f "frontend/.next_pid" ]; then
        cd frontend
        if [ -f ".next_pid" ] && kill -0 $(cat .next_pid) 2>/dev/null; then
            print_success "Next.js 開発サーバーは実行中です"
        else
            print_warning "Next.js 開発サーバーは停止しています"
        fi
        cd ..
    fi
    
    # ポートの確認
    print_info "ポートの使用状況:"
    netstat -tlnp 2>/dev/null | grep -E ':3000|:8000|:3306' || true
}

# ログの表示
show_logs() {
    print_info "ログを表示中..."
    
    if [ -d "backend" ]; then
        cd backend
        print_info "Laravel Sail ログ:"
        ./vendor/bin/sail logs --tail=50
        cd ..
    fi
}

# データベースマイグレーション
run_migration() {
    print_info "データベースマイグレーションを実行中..."
    
    if [ -d "backend" ]; then
        cd backend
        ./vendor/bin/sail artisan migrate
        print_success "マイグレーションが完了しました"
        cd ..
    fi
}

# データベースシーダー実行
run_seeder() {
    print_info "データベースシーダーを実行中..."
    
    if [ -d "backend" ]; then
        cd backend
        ./vendor/bin/sail artisan db:seed
        print_success "シーダーが完了しました"
        cd ..
    fi
}

# データベースリセット
fresh_database() {
    print_warning "データベースをリセットします。既存のデータは失われます。"
    read -p "続行しますか？ (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        if [ -d "backend" ]; then
            cd backend
            ./vendor/bin/sail artisan migrate:fresh --seed
            print_success "データベースがリセットされました"
            cd ..
        fi
    else
        print_info "キャンセルされました"
    fi
}

# テストの実行
run_tests() {
    print_info "テストを実行中..."
    
    # Laravel テスト
    if [ -d "backend" ]; then
        cd backend
        print_info "Laravel テストを実行中..."
        ./vendor/bin/sail artisan test
        cd ..
    fi
    
    # Next.js テスト
    if [ -d "frontend" ]; then
        cd frontend
        print_info "Next.js テストを実行中..."
        npm run test --passWithNoTests
        cd ..
    fi
    
    print_success "全てのテストが完了しました"
}

# コードのリント
run_lint() {
    print_info "コードのリントを実行中..."
    
    # Laravel (PHP CS Fixer)
    if [ -d "backend" ]; then
        cd backend
        if ./vendor/bin/sail composer show | grep -q "php-cs-fixer"; then
            print_info "PHP CS Fixer を実行中..."
            ./vendor/bin/sail composer run lint
        fi
        cd ..
    fi
    
    # Next.js (ESLint)
    if [ -d "frontend" ]; then
        cd frontend
        print_info "ESLint を実行中..."
        npm run lint
        cd ..
    fi
    
    print_success "リントが完了しました"
}

# コードのフォーマット
format_code() {
    print_info "コードのフォーマットを実行中..."
    
    # Laravel
    if [ -d "backend" ]; then
        cd backend
        if ./vendor/bin/sail composer show | grep -q "php-cs-fixer"; then
            print_info "PHP CS Fixer でフォーマット中..."
            ./vendor/bin/sail composer run format
        fi
        cd ..
    fi
    
    # Next.js
    if [ -d "frontend" ]; then
        cd frontend
        if [ -f "package.json" ] && grep -q "prettier" package.json; then
            print_info "Prettier でフォーマット中..."
            npm run format
        fi
        cd ..
    fi
    
    print_success "フォーマットが完了しました"
}

# プロダクションビルド
build_production() {
    print_info "プロダクションビルドを実行中..."
    
    # Laravel
    if [ -d "backend" ]; then
        cd backend
        print_info "Laravel の最適化を実行中..."
        ./vendor/bin/sail artisan config:cache
        ./vendor/bin/sail artisan route:cache
        ./vendor/bin/sail artisan view:cache
        cd ..
    fi
    
    # Next.js
    if [ -d "frontend" ]; then
        cd frontend
        print_info "Next.js をビルド中..."
        npm run build
        cd ..
    fi
    
    print_success "プロダクションビルドが完了しました"
}

# キャッシュクリア
clear_cache() {
    print_info "キャッシュをクリア中..."
    
    # Laravel
    if [ -d "backend" ]; then
        cd backend
        ./vendor/bin/sail artisan cache:clear
        ./vendor/bin/sail artisan config:clear
        ./vendor/bin/sail artisan route:clear
        ./vendor/bin/sail artisan view:clear
        print_success "Laravel キャッシュがクリアされました"
        cd ..
    fi
    
    # Next.js
    if [ -d "frontend" ]; then
        cd frontend
        rm -rf .next
        print_success "Next.js キャッシュがクリアされました"
        cd ..
    fi
}

# 依存関係のインストール
install_dependencies() {
    print_info "依存関係をインストール中..."
    
    # Laravel
    if [ -d "backend" ]; then
        cd backend
        ./vendor/bin/sail composer install
        cd ..
    fi
    
    # Next.js
    if [ -d "frontend" ]; then
        cd frontend
        npm install
        cd ..
    fi
    
    print_success "依存関係のインストールが完了しました"
}

# パッケージの更新
update_packages() {
    print_info "パッケージを更新中..."
    
    # Laravel
    if [ -d "backend" ]; then
        cd backend
        ./vendor/bin/sail composer update
        cd ..
    fi
    
    # Next.js
    if [ -d "frontend" ]; then
        cd frontend
        npm update
        cd ..
    fi
    
    print_success "パッケージの更新が完了しました"
}

# メイン処理
main() {
    case "${1:-help}" in
        start)
            start_servers
            ;;
        stop)
            stop_servers
            ;;
        restart)
            stop_servers
            sleep 2
            start_servers
            ;;
        status)
            check_status
            ;;
        logs)
            show_logs
            ;;
        migrate)
            run_migration
            ;;
        seed)
            run_seeder
            ;;
        fresh)
            fresh_database
            ;;
        test)
            run_tests
            ;;
        lint)
            run_lint
            ;;
        format)
            format_code
            ;;
        build)
            build_production
            ;;
        clean)
            clear_cache
            ;;
        install)
            install_dependencies
            ;;
        update)
            update_packages
            ;;
        help|*)
            show_help
            ;;
    esac
}

# スクリプト実行
main "$@"
