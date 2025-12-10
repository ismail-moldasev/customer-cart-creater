from __future__ import annotations

import csv
import json
from pathlib import Path
from typing import Iterable, List

from .models import Client, StyleConfig


def load_clients(path: Path) -> List[Client]:
    path = path.expanduser()
    if not path.exists():
        raise FileNotFoundError(f"Файл с клиентами не найден: {path}")

    if path.suffix.lower() == ".json":
        data = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(data, list):
            raise ValueError("JSON должен содержать список клиентов")
        return [Client(**_normalize_record(entry)) for entry in data]

    if path.suffix.lower() == ".csv":
        clients: List[Client] = []
        with path.open(newline="", encoding="utf-8") as handle:
            reader = csv.DictReader(handle)
            for row in reader:
                clients.append(Client(**_normalize_record(row)))
        return clients

    raise ValueError("Поддерживаются только .json или .csv")


def load_style(path: Path | None) -> StyleConfig:
    base = StyleConfig()
    if path is None:
        return base

    path = path.expanduser()
    if not path.exists():
        raise FileNotFoundError(f"Файл оформления не найден: {path}")

    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError("Файл стилей должен содержать объект с параметрами")
    return base.merged(data)


def _normalize_record(entry: dict) -> dict:
    normalized = {
        "name": entry.get("name") or entry.get("имя") or "Клиент",
        "meat": entry.get("meat") or entry.get("мясо") or "",
        "cut": entry.get("cut") or entry.get("часть") or "",
        "weight": entry.get("weight") or entry.get("количество") or "",
        "notes": entry.get("notes") or entry.get("комментарий") or None,
    }
    return normalized


__all__ = ["load_clients", "load_style"]
