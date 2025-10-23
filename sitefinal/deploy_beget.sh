#!/bin/bash
# Скрипт для деплоя на Beget

echo "=== Деплой Django проекта на Beget ==="

# 1. Активировать виртуальное окружение
echo "Активация виртуального окружения..."
source venv/bin/activate

# 2. Установить зависимости для продакшена
echo "Установка зависимостей..."
pip install -r requirements_prod.txt

# 3. Применить миграции
echo "Применение миграций..."
python manage.py migrate

# 4. Собрать статические файлы
echo "Сбор статических файлов..."
python manage.py collectstatic --noinput

# 5. Создать суперпользователя (если нужно)
echo "Создание суперпользователя..."
python manage.py createsuperuser --noinput --username admin --email admin@example.com || echo "Суперпользователь уже существует"

echo "=== Деплой завершен! ==="
echo "Сайт должен быть доступен по вашему домену"
