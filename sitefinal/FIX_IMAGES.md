# Исправление проблемы с картинками на продакшене

## Проблема
Картинки не отображаются на сайте https://my-russian-potencial.ru

## Причины и решения

### 1. Статические файлы не собраны
**Решение:** Выполните на хостинге:
```bash
python manage.py collectstatic --noinput
```

### 2. Статические файлы не загружены на хостинг
**Решение:** Убедитесь, что папка `staticfiles/` загружена на хостинг со всеми изображениями:
- `staticfiles/images/` - должна содержать все картинки
- `staticfiles/assets/` - должна содержать JavaScript файлы

### 3. Неправильные настройки Django
**Решение:** Обновите переменные окружения в панели Beget:

```
DJANGO_ENV=production
DJANGO_DEBUG=0
DJANGO_ALLOWED_HOSTS=my-russian-potencial.ru,www.my-russian-potencial.ru
DJANGO_CORS_ORIGINS=https://my-russian-potencial.ru,https://www.my-russian-potencial.ru
DJANGO_CSRF_TRUSTED_ORIGINS=https://my-russian-potencial.ru,https://www.my-russian-potencial.ru
```

### 4. Проблемы с WhiteNoise
**Решение:** Убедитесь, что WhiteNoise middleware включен в settings.py (уже есть)

## Пошаговое исправление

### Шаг 1: Загрузите обновленные файлы
Загрузите на хостинг:
- Обновленный `backend/settings.py`
- Папку `static/` (если есть изменения)
- Файл `beget_env_production.txt`

### Шаг 2: Обновите переменные окружения
В панели Beget добавьте переменные из `beget_env_production.txt`

### Шаг 3: Выполните команды на хостинге
```bash
# Активировать виртуальное окружение
source venv/bin/activate

# Установить зависимости
pip install -r requirements_prod.txt

# Применить миграции
python manage.py migrate

# Собрать статические файлы
python manage.py collectstatic --noinput

# Перезапустить приложение
```

### Шаг 4: Проверьте файлы
Убедитесь, что на хостинге есть:
- `staticfiles/images/` с всеми картинками
- `staticfiles/assets/` с JavaScript файлами

### Шаг 5: Проверьте сайт
Откройте https://my-russian-potencial.ru и проверьте:
- Загружается ли главная страница
- Отображаются ли картинки
- Работает ли админка: https://my-russian-potencial.ru/admin

## Диагностика

Если картинки все еще не работают:

1. Откройте консоль браузера (F12)
2. Посмотрите на ошибки 404 для изображений
3. Проверьте, что пути к изображениям правильные
4. Убедитесь, что файлы действительно загружены на хостинг

## Контакты для поддержки
Если проблема не решается, проверьте логи в панели Beget или обратитесь в поддержку хостинга.

