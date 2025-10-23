#!/bin/sh
set -e

APP_USER=${APP_USER:-appuser}

if [ "$(id -u)" = "0" ]; then
  mkdir -p /app/staticfiles
  chown -R "$APP_USER":"$APP_USER" /app/staticfiles 2>/dev/null || true
  exec gosu "$APP_USER" "$0" "$@"
fi

# Default envs
: "${DJANGO_DEBUG:=0}"
: "${DJANGO_ALLOWED_HOSTS:=localhost,127.0.0.1}"

python manage.py collectstatic --noinput || true
python manage.py migrate --noinput

if [ "$DJANGO_DEBUG" = "1" ]; then
  exec python manage.py runserver 0.0.0.0:8000
fi

exec gunicorn ll_project.wsgi:application --bind 0.0.0.0:8000 --workers 3
