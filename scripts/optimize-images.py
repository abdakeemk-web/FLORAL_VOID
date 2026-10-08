"""Create web-sized WebP copies of the portfolio images.

Usage: python3 scripts/optimize-images.py <source-folder> <numbers...>
Example: python3 scripts/optimize-images.py ../images 21 37 8
Writes portfolio-<n>-480.webp and portfolio-<n>-1000.webp to public/images/portfolio.
"""
import sys
from pathlib import Path
from PIL import Image

WIDTHS = (480, 1000)
OUT = Path(__file__).resolve().parent.parent / "public/images/portfolio"


def convert(source, number):
    image = Image.open(Path(source) / f"{number}.jpg").convert("RGB")
    for width in WIDTHS:
        copy = image.copy()
        if copy.width > width:
            copy.thumbnail((width, 10000))
        copy.save(OUT / f"portfolio-{number}-{width}.webp", quality=92, method=6)
    print(f"{number}: original {image.size}")


if __name__ == "__main__":
    folder, numbers = sys.argv[1], sys.argv[2:]
    OUT.mkdir(parents=True, exist_ok=True)
    for n in numbers:
        convert(folder, n)
