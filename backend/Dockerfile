FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
  git \
  curl \
  libpng-dev \
  libonig-dev \
  libxml2-dev \
  zip \
  unzip \
  supervisor \
  nginx \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy composer files
COPY composer.json composer.lock ./

# Install dependencies without dev packages and without scripts
RUN composer install --no-dev --no-scripts --optimize-autoloader

# Copy application files
COPY . .

# Run composer scripts after copying all files
RUN composer run-script post-autoload-dump

# Copy configurations
COPY nginx.conf /etc/nginx/nginx.conf
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Create directories
RUN mkdir -p /var/log/nginx \
  && mkdir -p /var/log/supervisor \
  && mkdir -p /run/nginx \
  && mkdir -p /var/www/html/storage/logs \
  && mkdir -p /var/www/html/storage/framework/cache \
  && mkdir -p /var/www/html/storage/framework/sessions \
  && mkdir -p /var/www/html/storage/framework/views

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
  && chmod -R 755 /var/www/html/storage

# Expose port
EXPOSE 8000

# Start supervisor
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
