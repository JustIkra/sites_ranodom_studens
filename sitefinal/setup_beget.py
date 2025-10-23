#!/usr/bin/env python3
"""
Скрипт для автоматической настройки Django на Beget
Запускать на сервере Beget после загрузки файлов
"""

import os
import subprocess
import sys

def run_command(command, description):
    """Выполнить команду и показать результат"""
    print(f"\n🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} - успешно!")
        if result.stdout:
            print(f"Вывод: {result.stdout}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Ошибка при {description}:")
        print(f"Код ошибки: {e.returncode}")
        print(f"Вывод: {e.stdout}")
        print(f"Ошибки: {e.stderr}")
        return False

def check_environment():
    """Проверить переменные окружения"""
    print("\n🔍 Проверка переменных окружения...")
    
    required_vars = [
        'DJANGO_ENV',
        'MYSQL_DATABASE', 
        'MYSQL_USER',
        'MYSQL_PASSWORD'
    ]
    
    missing_vars = []
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)
    
    if missing_vars:
        print(f"❌ Отсутствуют переменные: {', '.join(missing_vars)}")
        print("Установите их в панели Beget → Веб-настройки → Переменные окружения")
        return False
    else:
        print("✅ Все необходимые переменные окружения установлены")
        return True

def main():
    """Основная функция настройки"""
    print("🚀 Настройка Django на Beget")
    print("=" * 50)
    
    # Проверка переменных окружения
    if not check_environment():
        sys.exit(1)
    
    # Список команд для выполнения
    commands = [
        ("pip install -r requirements_prod.txt", "Установка зависимостей"),
        ("python manage.py check", "Проверка настроек Django"),
        ("python manage.py migrate", "Применение миграций базы данных"),
        ("python manage.py collectstatic --noinput", "Сбор статических файлов"),
    ]
    
    # Выполнение команд
    success_count = 0
    for command, description in commands:
        if run_command(command, description):
            success_count += 1
        else:
            print(f"\n❌ Остановка из-за ошибки при: {description}")
            break
    
    # Результат
    print("\n" + "=" * 50)
    if success_count == len(commands):
        print("🎉 Настройка Django завершена успешно!")
        print("\n📋 Что проверить:")
        print("1. Откройте ваш сайт в браузере")
        print("2. Проверьте админку: ваш-домен.ru/admin")
        print("3. Проверьте API: ваш-домен.ru/api/projects/")
        print("\n🔧 Если нужно создать суперпользователя:")
        print("python manage.py createsuperuser")
    else:
        print(f"❌ Настройка завершена с ошибками ({success_count}/{len(commands)} команд выполнено)")
        print("Проверьте логи выше и исправьте ошибки")

if __name__ == "__main__":
    main()
