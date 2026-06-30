"""Read-only evidence tools for the Tal Executive Runtime POC."""

from __future__ import annotations

import subprocess
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]


def _read_text(path: Path, max_chars: int = 4000) -> str:
    if not path.exists():
        return f"MISSING: {path.relative_to(REPO_ROOT)}"
    return path.read_text(encoding="utf-8", errors="replace")[:max_chars]


def _run_readonly_command(args: list[str]) -> str:
    result = subprocess.run(
        args,
        cwd=REPO_ROOT,
        check=False,
        capture_output=True,
        text=True,
        timeout=10,
    )
    output = "\n".join(part for part in [result.stdout.strip(), result.stderr.strip()] if part)
    return output[:4000]


def read_github_state() -> dict[str, str]:
    return {
        "status": _run_readonly_command(["git", "status", "--short", "--branch"]),
        "latest_commit": _run_readonly_command(["git", "log", "-1", "--oneline"]),
    }


def read_project_brain() -> dict[str, str]:
    return {
        "current_task": _read_text(REPO_ROOT / "project-brain" / "CURRENT_TASK.md"),
        "task_board": _read_text(REPO_ROOT / "project-brain" / "TASK_BOARD.md"),
    }


def read_project_sync() -> dict[str, str]:
    return {
        "state": _read_text(REPO_ROOT / "PROJECT_SYNC_STATE.md"),
        "tasks": _read_text(REPO_ROOT / "PROJECT_SYNC_TASKS.md"),
    }


def read_runtime_map() -> dict[str, str]:
    return {
        "routes": _read_text(REPO_ROOT / "APPLICATION_ROUTE_MAP.md"),
        "data_coverage": _read_text(REPO_ROOT / "DATA_COVERAGE_AUDIT.md"),
    }
