from __future__ import annotations

from pathlib import Path

from flask import Flask, render_template


def create_app() -> Flask:
    app = Flask(
        __name__,
        template_folder=str(Path("templates")),
        static_folder=str(Path("static")),
    )

    @app.route("/")
    def index():
        return render_template("index.html")

    return app


def main() -> None:
    app = create_app()
    app.run(host="0.0.0.0", port=8000, debug=True)


if __name__ == "__main__":
    main()
