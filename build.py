"""Rebuild index.html from src/page.html and data/wiki.json."""
import pathlib
root = pathlib.Path(__file__).parent
data = (root / "data" / "wiki.json").read_text(encoding="utf-8").replace("</", "<\\/")
page = (root / "src" / "page.html").read_text(encoding="utf-8").replace("__DATA__", data)
(root / "index.html").write_text(page, encoding="utf-8")
print("Wrote index.html")
