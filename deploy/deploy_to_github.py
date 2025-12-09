#!/usr/bin/env python3
"""
🚀 GitHub Pages Deployer v2.0
Автоматический билд и деплой на GitHub Pages.
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

GITHUB_USERNAME = os.environ.get("GITHUB_USERNAME", "swensi17")
REPO_NAME = os.environ.get("REPO_NAME", "swensidev")


# ============================================================================
# УТИЛИТЫ
# ============================================================================

class Colors:
    GREEN = "\033[92m"
    RED = "\033[91m"
    YELLOW = "\033[93m"
    BLUE = "\033[94m"
    CYAN = "\033[96m"
    RESET = "\033[0m"
    BOLD = "\033[1m"


def log_success(msg): print(f"{Colors.GREEN}✓{Colors.RESET} {msg}")
def log_error(msg): print(f"{Colors.RED}✗{Colors.RESET} {msg}")
def log_warning(msg): print(f"{Colors.YELLOW}⚠{Colors.RESET} {msg}")
def log_info(msg): print(f"{Colors.BLUE}ℹ{Colors.RESET} {msg}")

def log_header(msg):
    print(f"\n{Colors.CYAN}{Colors.BOLD}{'='*50}{Colors.RESET}")
    print(f"{Colors.CYAN}{Colors.BOLD}{msg:^50}{Colors.RESET}")
    print(f"{Colors.CYAN}{Colors.BOLD}{'='*50}{Colors.RESET}\n")


def run_cmd(cmd, cwd=None, check=True, capture=False):
    """Выполнить команду"""
    try:
        # На Windows нужен shell=True для npm/npx
        result = subprocess.run(
            cmd,
            cwd=cwd,
            check=check,
            capture_output=capture,
            text=True,
            shell=True
        )
        return True, result.stdout if capture else ""
    except subprocess.CalledProcessError as e:
        return False, e.stderr if capture else str(e)
    except FileNotFoundError as e:
        return False, str(e)


def get_root():
    return Path(__file__).parent.parent.resolve()


# ============================================================================
# ДЕПЛОЙ
# ============================================================================

def check_node():
    """Проверить Node.js"""
    ok, _ = run_cmd(["node", "--version"], capture=True)
    return ok


def check_npm():
    """Проверить npm"""
    ok, _ = run_cmd(["npm", "--version"], capture=True)
    return ok


def install_deps(root):
    """Установить зависимости если нужно"""
    node_modules = root / "node_modules"
    if not node_modules.exists():
        log_info("Устанавливаю зависимости...")
        ok, err = run_cmd(["npm", "install"], cwd=root)
        if not ok:
            log_error(f"Ошибка установки: {err}")
            return False
        log_success("Зависимости установлены")
    return True


def build_project(root):
    """Собрать проект"""
    log_info("Собираю проект...")
    ok, err = run_cmd(["npm", "run", "build"], cwd=root)
    if not ok:
        log_error(f"Ошибка сборки: {err}")
        return False
    log_success("Проект собран")
    return True


def deploy_to_gh_pages(root):
    """Деплой на GitHub Pages через gh-pages"""
    log_info("Деплою на GitHub Pages...")
    
    # Проверяем есть ли gh-pages
    ok, _ = run_cmd(["npx", "gh-pages", "--version"], cwd=root, capture=True)
    
    # Деплоим
    ok, err = run_cmd(["npx", "gh-pages", "-d", "dist"], cwd=root, capture=True)
    if not ok:
        log_error(f"Ошибка деплоя: {err}")
        return False
    
    log_success("Задеплоено на GitHub Pages!")
    return True


def commit_source(root):
    """Закоммитить исходники в master"""
    log_info("Сохраняю исходники...")
    
    run_cmd(["git", "add", "."], cwd=root)
    
    commit_msg = f"🚀 Update: {datetime.now().strftime('%Y-%m-%d %H:%M')}"
    ok, _ = run_cmd(["git", "commit", "-m", commit_msg], cwd=root, check=False, capture=True)
    
    # Пушим исходники
    ok, err = run_cmd(["git", "push", "origin", "master"], cwd=root, check=False, capture=True)
    if not ok:
        # Пробуем main
        ok, err = run_cmd(["git", "push", "origin", "main"], cwd=root, check=False, capture=True)
    
    if ok:
        log_success("Исходники сохранены")
    else:
        log_warning("Не удалось запушить исходники (возможно нет изменений)")
    
    return True


# ============================================================================
# MAIN
# ============================================================================

def main():
    print(f"""
{Colors.CYAN}{Colors.BOLD}
  ╔════════════════════════════════════════════╗
  ║  🚀 GITHUB PAGES DEPLOYER v2.0             ║
  ║  Билд + Деплой в одну команду              ║
  ╚════════════════════════════════════════════╝
{Colors.RESET}""")

    root = get_root()
    
    # Проверки
    log_header("ПРОВЕРКА")
    
    if not check_node():
        log_error("Node.js не установлен!")
        sys.exit(1)
    log_success("Node.js найден")
    
    if not check_npm():
        log_error("npm не установлен!")
        sys.exit(1)
    log_success("npm найден")
    
    # Установка зависимостей
    log_header("ПОДГОТОВКА")
    
    if not install_deps(root):
        sys.exit(1)
    
    # Билд
    log_header("СБОРКА")
    
    if not build_project(root):
        sys.exit(1)
    
    # Проверяем что dist создан
    dist = root / "dist"
    if not dist.exists():
        log_error("Папка dist не создана!")
        sys.exit(1)
    
    files = list(dist.rglob("*"))
    log_success(f"Собрано {len([f for f in files if f.is_file()])} файлов")
    
    # Коммит исходников
    log_header("СОХРАНЕНИЕ")
    commit_source(root)
    
    # Деплой
    log_header("ДЕПЛОЙ")
    
    if not deploy_to_gh_pages(root):
        sys.exit(1)
    
    # Готово
    log_header("ГОТОВО!")
    print(f"""
{Colors.GREEN}{Colors.BOLD}
  ✓ Сайт успешно задеплоен!
  
  🌐 {Colors.RESET}https://{GITHUB_USERNAME}.github.io/{REPO_NAME}
  
{Colors.YELLOW}  ⏱  Подожди 1-2 минуты для обновления{Colors.RESET}
""")


if __name__ == "__main__":
    main()
