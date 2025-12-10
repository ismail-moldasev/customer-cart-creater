from __future__ import annotations

from dataclasses import dataclass, field
from typing import List, Optional


@dataclass
class Client:
    """Данные о клиенте и планируемой покупке."""

    name: str
    meat: str
    cut: str
    weight: str
    notes: Optional[str] = None

    def to_display_lines(self) -> List[str]:
        lines = [
            f"Мясо: {self.meat}",
            f"Часть/разделка: {self.cut}",
            f"Количество: {self.weight}",
        ]
        if self.notes:
            lines.append(f"Комментарий: {self.notes}")
        return lines


@dataclass
class StyleConfig:
    """Параметры оформления карточек."""

    background_color: str = "#fff8f2"
    text_color: str = "#1f1f1f"
    accent_color: str = "#d35400"
    border_radius: str = "12px"
    font_family: str = "'Inter', system-ui, -apple-system, sans-serif"
    card_width: str = "320px"
    shadow: str = "0 10px 25px rgba(0,0,0,0.08)"
    spacing: str = "14px"
    header_text: str = "Карточки клиентов"

    def merged(self, overrides: Optional[dict]) -> "StyleConfig":
        if not overrides:
            return self
        data = {**self.__dict__, **overrides}
        return StyleConfig(**data)


__all__ = ["Client", "StyleConfig"]
