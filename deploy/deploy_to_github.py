#!/usr/bin/env python3
"""
🚀 GitHub Repository Deployer
Автоматический деплой проекта на GitHub с проверкой всех путей и файлов.

Copyright (c) 2025. All Rights Reserved.
Unauthorized copying, modification, or distribution is strictly prohibited.
"""

import os
import sys
import subprocess
from pathlib import Path
from datetime import datetime

# ============================================================================
# КОНФИГУРАЦИЯ
# ============================================================================

def load_env_file():
    """Загрузить переменные из .env.local"""
    env_path = Path(__file__).parent.parent / ".env.local"
    if env_path.exists():
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, value = line.split("=", 1)
                    os.environ.setdefault(key.strip(), value.strip())

load_env_file()

GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN", "")
GITHUB_USERNAME = os.environ.get("GITHUB_USERNAME", "")
REPO_NAME = os.environ.get("REPO_NAME", "swensidev")

# Файлы и папки для деплоя (относительно корня проекта)
FILES_TO_DEPLOY = [
    "App.tsx",
    "index.tsx",
    "index.html",
    "package.json",
    "package-lock.json",
    "tsconfig.json",
    "vite.config.ts",
    "metadata.json",
    ".gitignore",
]

FOLDERS_TO_DEPLOY = [
    "components",
    ".vscode",
]

# Файлы, которые НЕ нужно деплоить
EXCLUDE_PATTERNS = [
    "node_modules",
    ".env.local",
    ".env",
    "__pycache__",
    "*.pyc",
    ".git",
    "deploy",
]


# ============================================================================
# УТИЛИТЫ
# ============================================================================

class Colors:
    """ANSI цвета для красивого вывода"""
    GREEN = "\033[92m"
    RED = "\033[91m"
    YELLOW = "\033[93m"
    BLUE = "\033[94m"
    CYAN = "\033[96m"
    RESET = "\033[0m"
    BOLD = "\033[1m"


def log_success(msg: str) -> None:
    print(f"{Colors.GREEN}✓{Colors.RESET} {msg}")


def log_error(msg: str) -> None:
    print(f"{Colors.RED}✗{Colors.RESET} {msg}")


def log_warning(msg: str) -> None:
    print(f"{Colors.YELLOW}⚠{Colors.RESET} {msg}")


def log_info(msg: str) -> None:
    print(f"{Colors.BLUE}ℹ{Colors.RESET} {msg}")


def log_header(msg: str) -> None:
    print(f"\n{Colors.CYAN}{Colors.BOLD}{'='*60}{Colors.RESET}")
    print(f"{Colors.CYAN}{Colors.BOLD}{msg:^60}{Colors.RESET}")
    print(f"{Colors.CYAN}{Colors.BOLD}{'='*60}{Colors.RESET}\n")


# ============================================================================
# ПРОВЕРКИ
# ============================================================================

def get_project_root() -> Path:
    """Получить корневую директорию проекта"""
    return Path(__file__).parent.parent.resolve()


def check_paths() -> tuple[bool, list[str], list[str]]:
    """
    Проверить все пути файлов и папок.
    Возвращает: (все_ок, найденные_файлы, отсутствующие_файлы)
    """
    root = get_project_root()
    found = []
    missing = []
    
    log_header("ПРОВЕРКА ПУТЕЙ")
    log_info(f"Корень проекта: {root}")
    
    # Проверка файлов
    print(f"\n{Colors.BOLD}Файлы:{Colors.RESET}")
    for file in FILES_TO_DEPLOY:
        path = root / file
        if path.exists():
            log_success(f"{file}")
            found.append(str(path))
        else:
            log_error(f"{file} - НЕ НАЙДЕН")
            missing.append(file)
    
    # Проверка папок
    print(f"\n{Colors.BOLD}Папки:{Colors.RESET}")
    for folder in FOLDERS_TO_DEPLOY:
        path = root / folder
        if path.exists() and path.is_dir():
            file_count = sum(1 for _ in path.rglob("*") if _.is_file())
            log_success(f"{folder}/ ({file_count} файлов)")
            found.append(str(path))
        else:
            log_error(f"{folder}/ - НЕ НАЙДЕНА")
            missing.append(folder)
    
    return len(missing) == 0, found, missing


def check_git_installed() -> bool:
    """Проверить установлен ли Git"""
    try:
        subprocess.run(["git", "--version"], capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False


def check_credentials() -> tuple[bool, list[str]]:
    """Проверить наличие учетных данных GitHub"""
    missing = []
    
    if not GITHUB_TOKEN:
        missing.append("GITHUB_TOKEN")
    if not GITHUB_USERNAME:
        missing.append("GITHUB_USERNAME")
    
    return len(missing) == 0, missing


# ============================================================================
# ДЕПЛОЙ
# ============================================================================

def init_git_repo(root: Path) -> bool:
    """Инициализировать Git репозиторий"""
    try:
        git_dir = root / ".git"
        if not git_dir.exists():
            subprocess.run(["git", "init"], cwd=root, check=True, capture_output=True)
            log_success("Git репозиторий инициализирован")
        else:
            log_info("Git репозиторий уже существует")
        return True
    except subprocess.CalledProcessError as e:
        log_error(f"Ошибка инициализации Git: {e}")
        return False


def create_github_repo() -> bool:
    """Создать репозиторий на GitHub через API"""
    import urllib.request
    import json
    
    url = "https://api.github.com/user/repos"
    data = json.dumps({
        "name": REPO_NAME,
        "description": "🎱 Pool Landing Page - Modern React/TypeScript Project",
        "private": False,
        "auto_init": False
    }).encode()
    
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
    }
    
    try:
        req = urllib.request.Request(url, data=data, headers=headers, method="POST")
        with urllib.request.urlopen(req) as response:
            if response.status == 201:
                log_success(f"Репозиторий '{REPO_NAME}' создан на GitHub")
                return True
    except urllib.error.HTTPError as e:
        if e.code == 422:
            log_warning(f"Репозиторий '{REPO_NAME}' уже существует")
            return True
        log_error(f"Ошибка создания репозитория: {e.code} - {e.reason}")
    except Exception as e:
        log_error(f"Ошибка: {e}")
    
    return False


def add_and_commit(root: Path) -> bool:
    """Добавить файлы и создать коммит"""
    try:
        # Добавляем все файлы
        subprocess.run(["git", "add", "."], cwd=root, check=True, capture_output=True)
        log_success("Файлы добавлены в индекс")
        
        # Создаем коммит
        commit_msg = f"🚀 Deploy: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        subprocess.run(
            ["git", "commit", "-m", commit_msg],
            cwd=root, check=True, capture_output=True
        )
        log_success(f"Коммит создан: {commit_msg}")
        return True
    except subprocess.CalledProcessError as e:
        if b"nothing to commit" in e.stdout or b"nothing to commit" in e.stderr:
            log_warning("Нет изменений для коммита")
            return True
        log_error(f"Ошибка коммита: {e}")
        return False


def push_to_github(root: Path) -> bool:
    """Отправить изменения на GitHub"""
    remote_url = f"https://{GITHUB_TOKEN}@github.com/{GITHUB_USERNAME}/{REPO_NAME}.git"
    
    try:
        # Проверяем/добавляем remote
        result = subprocess.run(
            ["git", "remote", "get-url", "origin"],
            cwd=root, capture_output=True
        )
        
        if result.returncode != 0:
            subprocess.run(
                ["git", "remote", "add", "origin", remote_url],
                cwd=root, check=True, capture_output=True
            )
            log_success("Remote 'origin' добавлен")
        else:
            subprocess.run(
                ["git", "remote", "set-url", "origin", remote_url],
                cwd=root, check=True, capture_output=True
            )
            log_info("Remote 'origin' обновлен")
        
        # Пушим
        subprocess.run(
            ["git", "push", "-u", "origin", "main", "--force"],
            cwd=root, check=True, capture_output=True
        )
        log_success("Код отправлен на GitHub!")
        return True
    except subprocess.CalledProcessError as e:
        # Попробуем с веткой master
        try:
            subprocess.run(
                ["git", "push", "-u", "origin", "master", "--force"],
                cwd=root, check=True, capture_output=True
            )
            log_success("Код отправлен на GitHub (ветка master)!")
            return True
        except:
            log_error(f"Ошибка push: {e}")
            return False


# ============================================================================
# MAIN
# ============================================================================

def main():
    """Главная функция деплоя"""
    print(f"""
{Colors.CYAN}{Colors.BOLD}
    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║   🚀 GITHUB DEPLOYER v1.0                                 ║
    ║   Автоматический деплой проекта на GitHub                 ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
{Colors.RESET}""")
    
    root = get_project_root()
    
    # 1. Проверка путей
    paths_ok, found, missing = check_paths()
    
    if not paths_ok:
        log_header("ОШИБКА")
        log_error(f"Отсутствуют файлы/папки: {', '.join(missing)}")
        log_info("Исправьте пути и запустите скрипт снова")
        sys.exit(1)
    
    log_success(f"Все пути проверены: {len(found)} элементов готово к деплою")
    
    # 2. Проверка Git
    log_header("ПРОВЕРКА ОКРУЖЕНИЯ")
    
    if not check_git_installed():
        log_error("Git не установлен!")
        sys.exit(1)
    log_success("Git установлен")
    
    # 3. Проверка учетных данных
    creds_ok, missing_creds = check_credentials()
    
    if not creds_ok:
        log_header("ТРЕБУЮТСЯ УЧЕТНЫЕ ДАННЫЕ")
        log_warning("Установите переменные окружения:")
        for cred in missing_creds:
            print(f"  • {cred}")
        print(f"\n{Colors.YELLOW}Пример:{Colors.RESET}")
        print(f"  set GITHUB_TOKEN=ghp_xxxxxxxxxxxx")
        print(f"  set GITHUB_USERNAME=your_username")
        print(f"  set REPO_NAME=pool-landing")
        sys.exit(1)
    
    log_success("Учетные данные найдены")
    
    # 4. Деплой
    log_header("ДЕПЛОЙ")
    
    if not init_git_repo(root):
        sys.exit(1)
    
    if not create_github_repo():
        log_warning("Продолжаем с существующим репозиторием...")
    
    if not add_and_commit(root):
        sys.exit(1)
    
    if not push_to_github(root):
        sys.exit(1)
    
    # 5. Успех!
    log_header("ГОТОВО!")
    print(f"""
{Colors.GREEN}{Colors.BOLD}
    ✓ Проект успешно задеплоен!
    
    📦 Репозиторий: https://github.com/{GITHUB_USERNAME}/{REPO_NAME}
    
{Colors.RESET}""")


if __name__ == "__main__":
    main()
