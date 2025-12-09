#!/usr/bin/env python3
"""
SWENSI DEVELOPER - Локальный сервер для запуска сайта
Запуск: python run_server.py
"""

import subprocess
import sys
import os

def check_node():
    """Проверка установки Node.js"""
    try:
        result = subprocess.run('node --version', capture_output=True, text=True, shell=True)
        if result.returncode == 0:
            print(f"✅ Node.js установлен: {result.stdout.strip()}")
            return True
        else:
            print("❌ Node.js не найден! Установите Node.js: https://nodejs.org/")
            return False
    except Exception:
        print("❌ Node.js не найден! Установите Node.js: https://nodejs.org/")
        return False

def check_npm():
    """Проверка установки npm"""
    try:
        result = subprocess.run('npm --version', capture_output=True, text=True, shell=True)
        if result.returncode == 0:
            print(f"✅ npm установлен: {result.stdout.strip()}")
            return True
        else:
            print("❌ npm не найден!")
            return False
    except Exception:
        print("❌ npm не найден!")
        return False

def install_dependencies():
    """Установка зависимостей"""
    print("\n📦 Установка зависимостей...")
    result = subprocess.run(['npm', 'install'], shell=True)
    if result.returncode == 0:
        print("✅ Зависимости установлены!")
        return True
    else:
        print("❌ Ошибка установки зависимостей")
        return False

def run_dev_server():
    """Запуск dev сервера"""
    print("\n🚀 Запуск сервера разработки...")
    print("=" * 50)
    print("🌐 Сайт будет доступен по адресу: http://localhost:5173")
    print("📱 Telegram: @swensi17")
    print("=" * 50)
    print("\nНажмите Ctrl+C для остановки сервера\n")
    
    try:
        subprocess.run(['npm', 'run', 'dev'], shell=True)
    except KeyboardInterrupt:
        print("\n\n👋 Сервер остановлен. До встречи!")

def main():
    print("=" * 50)
    print("  📛 SWENSI DEVELOPER 🔨")
    print("  Локальный сервер для сайта-портфолио")
    print("=" * 50)
    
    if not check_node():
        sys.exit(1)
    
    if not check_npm():
        sys.exit(1)
    
    # Проверяем наличие node_modules
    if not os.path.exists('node_modules'):
        if not install_dependencies():
            sys.exit(1)
    else:
        print("✅ Зависимости уже установлены")
    
    run_dev_server()

if __name__ == "__main__":
    main()
