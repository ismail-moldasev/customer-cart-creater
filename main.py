from __future__ import annotations

import argparse
from pathlib import Path

from customer_cards.loader import load_clients, load_style
from customer_cards.renderer import render_cards, save_cards


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Генератор карточек клиентов (мясные заказы)."
    )
    parser.add_argument(
        "clients",
        type=Path,
        help="Путь к файлу .json или .csv со списком клиентов",
    )
    parser.add_argument(
        "-s",
        "--style",
        type=Path,
        default=None,
        help="JSON c настройками стиля (цвета, шрифты, радиусы)",
    )
    parser.add_argument(
        "-o",
        "--output",
        type=Path,
        default=Path("cards.html"),
        help="Файл, куда сохранить результат (HTML)",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    clients = load_clients(args.clients)
    style = load_style(args.style)
    html = render_cards(clients, style)
    destination = save_cards(html, args.output)
    print(f"Сохранено в {destination.resolve()}")


if __name__ == "__main__":
    main()
