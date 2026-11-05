# tools/fix_herocut.py — 네 모서리에서 검은색 영역을 투명으로 flood fill
from PIL import Image, ImageDraw
import pathlib
p = pathlib.Path(__file__).resolve().parents[1] / 'assets' / 'img' / 'heroCut.png'
im = Image.open(p).convert('RGBA'); w, h = im.size
for xy in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
    if im.getpixel(xy)[:3] == (0, 0, 0):
        ImageDraw.floodfill(im, xy, (0, 0, 0, 0), thresh=40)
im.save(p); print('saved', im.getpixel((0, 0)))
