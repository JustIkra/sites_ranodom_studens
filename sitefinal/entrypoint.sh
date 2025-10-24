#!/bin/sh
set -e

APP_USER=${APP_USER:-appuser}

if [ "$(id -u)" = "0" ]; then
  mkdir -p /app/staticfiles /app/media /app/logs
  chown -R "$APP_USER":"$APP_USER" /app/staticfiles /app/media /app/logs 2>/dev/null || true
  exec gosu "$APP_USER" "$0" "$@"
fi

: "${DJANGO_ENV:=local}"
: "${DJANGO_DEBUG:=0}"

python manage.py collectstatic --noinput || true
python manage.py migrate --noinput

if [ "$DJANGO_DEBUG" = "1" ]; then
  exec python manage.py runserver 0.0.0.0:8001
fi

exec gunicorn backend.wsgi:application --bind 0.0.0.0:8001 --workers 3
