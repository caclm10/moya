FROM php:8.2-apache

# Install dependencies
RUN apt-get update

RUN apt-get install curl -y
RUN apt-get install sudo -y
RUN apt-get install nano -y
RUN apt-get install zip unzip -y

RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable pdo_mysql

COPY ./.conf/000-default.conf /etc/apache2/sites-available/000-default.conf

COPY ./ /var/www/html

RUN a2enmod rewrite

RUN useradd -ms /bin/bash app && \
    usermod -a -G app app

RUN chown -R app:www-data /var/www/html && \
    chmod -R 775 /var/www/html

USER app
WORKDIR /var/www/html

COPY --from=composer /usr/bin/composer /usr/bin/composer
RUN composer update

# Get NodeJS
COPY --from=node:20-slim /usr/local/bin /usr/local/bin
# Get npm
COPY --from=node:20-slim /usr/local/lib/node_modules /usr/local/lib/node_modules
RUN npm install