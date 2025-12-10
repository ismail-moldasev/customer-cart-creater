from __future__ import annotations

from datetime import datetime
from pathlib import Path
from typing import Iterable

from .models import Client, StyleConfig


def render_cards(clients: Iterable[Client], style: StyleConfig) -> str:
    card_markup = "\n".join(_render_card(client, style) for client in clients)
    return f"""<!doctype html>
<html lang=\"ru\">
<head>
  <meta charset=\"utf-8\" />
  <title>{style.header_text}</title>
  <style>
    :root {{
      --bg: {style.background_color};
      --text: {style.text_color};
      --accent: {style.accent_color};
      --radius: {style.border_radius};
      --shadow: {style.shadow};
      --spacing: {style.spacing};
      --width: {style.card_width};
      --font: {style.font_family};
    }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      background: linear-gradient(135deg, #fffaf4, #fff1e3);
      font-family: var(--font);
      color: var(--text);
      min-height: 100vh;
    }}
    .page {{
      max-width: 1200px;
      margin: 0 auto;
      padding: 32px;
    }}
    h1 {{
      margin: 0 0 24px;
      font-size: 28px;
      color: var(--accent);
      letter-spacing: 0.5px;
    }}
    .grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(var(--width), 1fr));
      gap: 18px;
    }}
    .card {{
      background: var(--bg);
      border-radius: var(--radius);
      padding: var(--spacing);
      box-shadow: var(--shadow);
      border: 1px solid rgba(0,0,0,0.04);
    }}
    .card__header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }}
    .card__name {{
      font-size: 20px;
      font-weight: 700;
    }}
    .badge {{
      background: rgba(211, 84, 0, 0.12);
      color: var(--accent);
      padding: 6px 10px;
      border-radius: 999px;
      font-weight: 600;
      font-size: 12px;
    }}
    ul {{
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: 6px;
    }}
    li {{
      background: rgba(0,0,0,0.02);
      padding: 8px 10px;
      border-radius: 8px;
      font-size: 14px;
    }}
    footer {{
      margin-top: 30px;
      color: rgba(0,0,0,0.5);
      font-size: 12px;
      text-align: right;
    }}
  </style>
</head>
<body>
  <div class=\"page\">
    <h1>{style.header_text}</h1>
    <div class=\"grid\">
      {card_markup}
    </div>
    <footer>Сгенерировано {datetime.now().strftime('%d.%m.%Y %H:%M')}</footer>
  </div>
</body>
</html>"""


def _render_card(client: Client, style: StyleConfig) -> str:
    lines = "\n".join(f"<li>{line}</li>" for line in client.to_display_lines())
    badge = client.meat or "Заказ"
    return f"""
    <article class=\"card\">
      <div class=\"card__header\">
        <div class=\"card__name\">{client.name}</div>
        <div class=\"badge\">{badge}</div>
      </div>
      <ul>
        {lines}
      </ul>
    </article>
    """


def save_cards(html: str, destination: Path) -> Path:
    destination = destination.expanduser()
    destination.write_text(html, encoding="utf-8")
    return destination


__all__ = ["render_cards", "save_cards"]
