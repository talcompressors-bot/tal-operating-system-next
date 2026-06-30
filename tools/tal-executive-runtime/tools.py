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


def _find_line(text: str, patterns: list[str]) -> str:
    lowered_patterns = [pattern.lower() for pattern in patterns]
    for line in text.splitlines():
        lowered = line.lower()
        if any(pattern in lowered for pattern in lowered_patterns):
            cleaned = line.strip()
            if cleaned:
                return cleaned[:500]
    return "UNKNOWN"


def _find_line_with_next_bullet(text: str, pattern: str) -> str:
    lines = text.splitlines()
    for index, line in enumerate(lines):
        if pattern.lower() in line.lower():
            current = line.strip()
            for next_line in lines[index + 1 : index + 6]:
                cleaned = next_line.strip()
                if cleaned.startswith("- "):
                    return f"{current} {cleaned}"[:500]
            return current[:500] if current else "UNKNOWN"
    return "UNKNOWN"


def read_github_state() -> dict[str, str]:
    status = _run_readonly_command(["git", "status", "--short", "--branch"])
    branch = status.splitlines()[0].replace("##", "").strip() if status else "UNKNOWN"
    dirty_lines = [line for line in status.splitlines()[1:] if line.strip()]
    return {
        "branch": branch,
        "status": status,
        "latest_commit": _run_readonly_command(["git", "log", "-1", "--oneline"]),
        "working_tree": "dirty" if dirty_lines else "clean",
    }


def read_project_brain() -> dict[str, str]:
    current_task = _read_text(REPO_ROOT / "project-brain" / "CURRENT_TASK.md")
    task_board = _read_text(REPO_ROOT / "project-brain" / "TASK_BOARD.md")
    return {
        "current_task": current_task,
        "task_board": task_board,
        "summary": "; ".join(
            [
                _find_line(current_task, ["mode:", "mode"]),
                _find_line(current_task, ["current blocker", "blocker"]),
                _find_line(task_board, ["erp sprint 13", "now"]),
            ]
        ),
    }


def read_project_sync() -> dict[str, str]:
    state = _read_text(REPO_ROOT / "PROJECT_SYNC_STATE.md")
    tasks = _read_text(REPO_ROOT / "PROJECT_SYNC_TASKS.md")
    delta = _read_text(REPO_ROOT / "PROJECT_SYNC_DELTA.md")
    return {
        "state": state,
        "tasks": tasks,
        "delta": delta,
        "summary": "; ".join(
            [
                _find_line(state, ["current runtime capability", "current task"]),
                _find_line(tasks, ["next recommended task", "asset workspace"]),
                _find_line(delta, ["what changed", "latest"]),
            ]
        ),
    }


def read_runtime_map() -> dict[str, str]:
    routes = _read_text(REPO_ROOT / "APPLICATION_ROUTE_MAP.md")
    data_coverage = _read_text(REPO_ROOT / "DATA_COVERAGE_AUDIT.md")
    return {
        "routes": routes,
        "data_coverage": data_coverage,
        "summary": "; ".join(
            [
                _find_line(routes, ["/business-cases/service-report/[id]"]),
                _find_line(routes, ["/business-documents/[id]"]),
                _find_line(routes, ["/equipment/[id]"]),
            ]
        ),
    }


def read_company_objectives() -> dict[str, str]:
    protocol = _read_text(REPO_ROOT / "PROJECT_OPERATING_PROTOCOL.md", max_chars=20000)
    business_goal = _find_line_with_next_bullet(protocol, "Primary business goal")
    operational_goal = _find_line_with_next_bullet(protocol, "Primary operational goal")
    ai_goal = _find_line_with_next_bullet(protocol, "Primary AI goal")
    goals = [goal for goal in [business_goal, operational_goal, ai_goal] if goal != "UNKNOWN"]
    summary = "; ".join(goals) if goals else "UNKNOWN"
    if summary == "UNKNOWN":
        return {"summary": "UNKNOWN", "source": "PROJECT_OPERATING_PROTOCOL.md"}
    return {"summary": summary, "source": "PROJECT_OPERATING_PROTOCOL.md"}
