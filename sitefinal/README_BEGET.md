# Деплой на Beget

## Пошаговая инструкция

### 1. Подготовка файлов
- Убедитесь, что у вас есть собранный фронтенд в папке `new-zakaz/dist`
- Файлы готовы к загрузке на хостинг

### 2. Настройка в панели Beget

#### 2.1. Создание Python приложения
1. Зайдите в панель Beget
2. Создайте новое Python приложение
3. Укажите версию Python 3.11+ (рекомендуется 3.11)

#### 2.2. Настройка переменных окружения
В панели Beget -> Веб-настройки -> Переменные окружения добавьте:

```
DJANGO_ENV=production
DJANGO_DEBUG=0
DJANGO_ALLOWED_HOSTS=ваш-домен.beget.tech,www.ваш-домен.beget.tech
DJANGO_CORS_ORIGINS=https://ваш-домен.beget.tech,https://www.ваш-домен.beget.tech
DJANGO_CSRF_TRUSTED_ORIGINS=https://ваш-домен.beget.tech,https://www.ваш-домен.beget.tech
MYSQL_DATABASE=iliaydtp_store
MYSQL_USER=iliaydtp
MYSQL_PASSWORD=29092006LiPO
MYSQL_HOST=localhost
MYSQL_PORT=3306
SECRET_KEY=сгенерируйте-новый-секретный-ключ
```

#### 2.3. Настройка WSGI
- WSGI модуль: `backend.wsgi:application`
- Рабочая директория: корень проекта (где находится manage.py)

### 3. Загрузка файлов
1. Загрузите все файлы проекта на хостинг
2. Убедитесь, что структура папок сохранена

### 4. Установка зависимостей
В терминале Beget выполните:

```bash
# Активировать виртуальное окружение
source venv/bin/activate

# Установить зависимости
pip install -r requirements_prod.txt

# Применить миграции
python manage.py migrate

# Собрать статические файлы
python manage.py collectstatic --noinput

# Создать суперпользователя (опционально)
python manage.py createsuperuser
```

### 5. Настройка домена
1. В панели Beget привяжите ваш домен к Python приложению
2. Включите SSL сертификат (Let's Encrypt)
3. Обновите переменные окружения с вашим доменом

### 6. Проверка
- Откройте ваш сайт в браузере
- Проверьте админку: `ваш-домен/admin`
- Проверьте API: `ваш-домен/api/projects/`

## Возможные проблемы

### Ошибка 500
- Проверьте логи в панели Beget
- Убедитесь, что все переменные окружения установлены
- Проверьте, что миграции применены

### Статические файлы не загружаются
- Выполните `python manage.py collectstatic --noinput`
- Проверьте настройки STATIC_ROOT в settings.py

### Ошибки базы данных
- Убедитесь, что MySQL база создана
- Проверьте правильность данных подключения
- Выполните миграции

## Файлы для деплоя
- `requirements_prod.txt` - зависимости для продакшена
- `deploy_beget.sh` - скрипт автоматического деплоя
- `beget_env_example.txt` - пример переменных окружения
