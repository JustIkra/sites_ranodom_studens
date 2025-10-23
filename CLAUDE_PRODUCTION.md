# Production Deployment Guide

Complete guide for deploying to production on **172.30.4.14** via **ZeroTier** with **Nginx Proxy Manager**.

---

## Quick Start

For быстрого запуска на IP 172.30.4.14:

## 1) Контекст и цели
- Стек: два Django‑сервиса в Docker (`sitefinal` + React SPA, `visitka` – классический Django) из корня `docker-compose.yml`.
- Цель: поднять прод‑окружение на IP `172.30.4.14`, затем добавить домен (и SSL).
- Условия: `DJANGO_DEBUG=0`, корректные `ALLOWED_HOSTS`, собранная статика и фронтенд‑бандл, миграции применены, прокси (Nginx) выдаёт 80/443.

## 2) Предварительные проверки
- Кодовая база актуальна и собирается локально: `docker-compose up --build` (см. docker-compose.yml:1).
- Файлы настроек:
  - `sitefinal/backend/settings.py` (переменные окружения: `DJANGO_ENV`, `DJANGO_DEBUG`, `DJANGO_ALLOWED_HOSTS`, CORS/CSRF).
  - `visitka/ll_project/settings.py` (переменные окружения: `DJANGO_DEBUG`, `DJANGO_ALLOWED_HOSTS`).
- Секреты НЕ коммитим. Используем `.env`/панель хостинга. Примеры: `sitefinal/beget_env_example.txt`, `sitefinal/beget_env_production.txt`.

## 3) Переменные окружения (прод)
Установить для ОБОИХ сервисов:
- `DJANGO_DEBUG=0`
- `DJANGO_ALLOWED_HOSTS=172.30.4.14` (позже добавить `your.domain,www.your.domain`)
- Секреты: `SECRET_KEY` (для sitefinal), `DJANGO_SECRET_KEY` (для visitka)
- По необходимости: `DJANGO_CORS_ORIGINS`, `DJANGO_CSRF_TRUSTED_ORIGINS` с доменами

В Docker Compose (docker-compose.yml:1):
- Для `sitefinal` и `visitka` заменить `DJANGO_DEBUG=1` → `DJANGO_DEBUG=0`.
- В `DJANGO_ALLOWED_HOSTS` оставить `172.30.4.14`, позже дописать домены через запятую.

Пример (фрагмент):
```
services:
  sitefinal:
    environment:
      - DJANGO_ENV=production
      - DJANGO_DEBUG=0
      - SECRET_KEY=${FINAL_SECRET_KEY}
      - DJANGO_ALLOWED_HOSTS=172.30.4.14,your.domain,www.your.domain
  visitka:
    environment:
      - DJANGO_DEBUG=0
      - DJANGO_ALLOWED_HOSTS=172.30.4.14,your.domain,www.your.domain
      - DJANGO_SECRET_KEY=${VISITKA_SECRET_KEY}
```

## 4) Фронтенд сборка и статика (sitefinal)
- Собрать фронтенд:
  - `cd sitefinal/new-zakaz && npm ci || npm install && npm run build`
- Перенести бандл в `static` (если обновлялись ассеты):
  - Скопировать содержимое `dist/assets/*` → `sitefinal/static/assets/`
  - В `sitefinal/templates/index.html` путь к JS должен указывать на актуальный хэш‑файл в `/static/assets/`.
- В контейнерах статика собирается командой `collectstatic` из `entrypoint.sh` автоматически. Вне Docker запустить:
  - `cd sitefinal && python manage.py collectstatic --noinput`

## 5) Сборка и запуск (Docker, прод)
Команды с сервера (на IP 172.30.4.14):
1. `docker-compose pull || true` (если используете реестр)
2. `docker-compose build --no-cache`
3. `docker-compose up -d`
4. Проверить логи: `docker logs -f sitefinal` и `docker logs -f visitka`

Важно:
- Обе images запускают `gunicorn` при `DJANGO_DEBUG=0` (см. sitefinal/entrypoint.sh:1, visitka/entrypoint.sh:1).
- Миграции применяются автоматически на старте; проверить `python manage.py migrate` при необходимости.

## 6) Реверс‑прокси (Nginx)
Рекомендуем разнести сервисы по хостам: основной домен → `sitefinal:8001`, поддомен `visitka` → `visitka:8000`.

Пример `/etc/nginx/sites-available/sitefinal`:
```
server {
  listen 80;
  server_name 172.30.4.14 your.domain www.your.domain;

  location / {
    proxy_pass http://127.0.0.1:8001;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}

server {
  listen 80;
  server_name visitka.your.domain;

  location / {
    proxy_pass http://127.0.0.1:8000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```
Активировать сайт, перезапустить Nginx: `nginx -t && systemctl reload nginx`.

## 7) SSL (после подключения домена)
С установкой домена выпустить сертификаты Let's Encrypt:
- `apt-get install -y certbot python3-certbot-nginx`
- `certbot --nginx -d your.domain -d www.your.domain`
- Для `visitka`: `certbot --nginx -d visitka.your.domain`
Проверьте автоматическое продление: `systemctl status certbot.timer`.

## 8) Beget (если нужен деплой туда)
- Просмотреть и адаптировать `sitefinal/deploy_beget.sh` и `sitefinal/deploy_production.sh`.
- Заполнить переменные окружения для прод: `sitefinal/beget_env_production.txt` (не хранить реальные ключи в репозитории).
- Убедиться, что `DJANGO_ENV=production`, `DJANGO_DEBUG=0`, `DJANGO_ALLOWED_HOSTS` содержит IP/домены.

## 9) Проверки после выката
- `GET http://172.30.4.14/` отдаёт SPA, `/api/` отвечает (sitefinal/backend/urls.py:1).
- `GET http://172.30.4.14:8000/` открывает visitka (или по поддомену `visitka.your.domain`).
- Админка доступна только по TLS и доверенным хостам, `DEBUG=False`.
- Статика грузится из `/static/`, ошибки 404 отсутствуют.

## 10) Обновления, логи и откат
- Перекат: `docker-compose pull && docker-compose up -d` или `--build` при локальной сборке.
- Логи: `docker logs -f sitefinal`, `docker logs -f visitka`.
- Откат: держать предыдущие образы/tags, переключить версию и перезапустить compose.

## 11) Шпаргалка для Claude (команды)
```
# 0) Подготовка окружения
sed -i '' 's/DJANGO_DEBUG=1/DJANGO_DEBUG=0/g' docker-compose.yml
# Дополнить ALLOWED_HOSTS доменами позднее

# 1) Фронтенд build → static
cd sitefinal/new-zakaz && npm ci || npm install && npm run build
cp -r dist/assets/* ../static/assets/

# 2) Сборка и запуск
cd ../.. && docker-compose build --no-cache && docker-compose up -d

# 3) Проверки
docker logs --tail=200 sitefinal
docker logs --tail=200 visitka
curl -I http://172.30.4.14/

# 4) После привязки домена — SSL
sudo certbot --nginx -d your.domain -d www.your.domain
sudo certbot --nginx -d visitka.your.domain
```

## 12) Безопасность и настройки
- Не хранить реальные ключи и пароли в git.
- Задать уникальные `SECRET_KEY`/`DJANGO_SECRET_KEY`.
- Отключить `DEBUG` в проде, ограничить `ALLOWED_HOSTS` IP/доменами.
- Настроить `CSRF_TRUSTED_ORIGINS` и CORS для доменов.

