FROM php:8.2-apache AS base

# Install dependencies
RUN apt-get update

RUN apt-get install curl -y
RUN apt-get install zip unzip -y

RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable pdo_mysql

WORKDIR /var/www/html

COPY ./.conf/000-default.conf /etc/apache2/sites-available/000-default.conf

RUN a2enmod rewrite


FROM base AS deps

# Get Composer
COPY --from=composer /usr/bin/composer /usr/bin/composer
# Get NodeJS
COPY --from=node:20-slim /usr/local/bin /usr/local/bin
# Get npm
COPY --from=node:20-slim /usr/local/lib/node_modules /usr/local/lib/node_modules

COPY ./composer.json ./
COPY ./composer.lock ./

COPY ./package.json ./
COPY ./package-lock.json ./

RUN composer update
RUN npm install

COPY ./ ./

USER www-data


FROM base AS dev

CMD ["npm", "run", "dev"]


FROM base AS prod

CMD ["npm", "run", "build"]