"""Filmkorn auf die Website-Fotos rechnen.

Liest die unbearbeiteten Bilder aus design/original/ und schreibt die gekörnten Versionen
nach src/assets/. Galerie: Variante B (Film, ISO 800), alle anderen Fotos (Hero, Team,
Menü): Variante A (fein).

    pip install numpy pillow
    python3 scripts/grain.py
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'design' / 'original'
DST = ROOT / 'src' / 'assets'

VARIANTS = {
    # fein & dezent
    'A': dict(amount=0.016, size=1.2),
    # Film, ISO 800: sichtbares, leicht farbiges Korn, etwas angehobenes Schwarz, leicht entsättigt
    'B': dict(amount=0.028, size=1.5, color=0.15, lift=0.03, contrast=1.05, sat=0.92),
}

def variant_for(rel):
    return 'B' if rel.startswith('gallery/') else 'A'


LUMA = np.array([0.2126, 0.7152, 0.0722], np.float32)


def noise(rng, h, w, size, color):
    """Gauß-Rauschen, auf Korngröße weichgezeichnet und wieder auf Standardabweichung 1 normiert."""
    def one():
        n = rng.normal(0, 1, (h, w)).astype(np.float32)
        if size > 1:
            im = Image.fromarray((n * 40 + 128).clip(0, 255).astype(np.uint8))
            n = (np.asarray(im.filter(ImageFilter.GaussianBlur(size * 0.5)), np.float32) - 128) / 40
            n /= n.std() + 1e-6
        return n

    mono = one()
    if not color:
        return np.stack([mono] * 3, -1)
    return np.stack([mono + color * one() for _ in range(3)], -1)


def grain(img, rng, amount, size, color=0.0, lift=0.0, contrast=1.0, sat=1.0):
    a = np.asarray(img.convert('RGB'), np.float32) / 255
    h, w, _ = a.shape
    a = (a - 0.5) * contrast + 0.5
    lum = a @ LUMA
    a = lum[..., None] + (a - lum[..., None]) * sat
    a = lift + a * (1 - lift)
    # Korn vor allem in den Mitteltönen, wie bei Film
    lum = np.clip(a @ LUMA, 0, 1)
    weight = 4 * lum * (1 - lum) + 0.35
    a = a + noise(rng, h, w, size, color) * amount * weight[..., None]
    return Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8))


def main():
    for i, src in enumerate(sorted(SRC.rglob('*.webp'))):
        rel = src.relative_to(SRC).as_posix()
        variant = variant_for(rel)
        out = grain(Image.open(src), np.random.default_rng(i + 1), **VARIANTS[variant])
        dst = DST / rel
        out.save(dst, 'WEBP', quality=82, method=6)
        print(f'{variant}  {rel:28} {src.stat().st_size // 1024:4} KB -> {dst.stat().st_size // 1024:4} KB')


if __name__ == '__main__':
    main()
