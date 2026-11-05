# tools/split.py — index.html에서 그림·폰트를 꺼내 템플릿을 만든다(최초 1회)
import re, base64, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[1]
src = (ROOT / 'index.html').read_text(encoding='utf-8')
img_dir = ROOT / 'assets' / 'img'; font_dir = ROOT / 'assets' / 'font'
img_dir.mkdir(parents=True, exist_ok=True); font_dir.mkdir(parents=True, exist_ok=True)

def img(m):
    key, typ, b64 = m.group(1), m.group(2), m.group(3)
    ext = 'jpg' if typ == 'jpeg' else 'png'
    (img_dir / f'{key}.{ext}').write_bytes(base64.b64decode(b64))
    return f'{key}:"@@IMG:{key}.{ext}@@"'
out = re.sub(r'(\w+):"data:image/(png|jpeg);base64,([A-Za-z0-9+/=]+)"', img, src)

n = [0]
def font(m):
    n[0] += 1; name = f'font{n[0]}.woff2'
    (font_dir / name).write_bytes(base64.b64decode(m.group(1)))
    return f'url(@@FONT:{name}@@)'
out = re.sub(r'url\(data:font/woff2;base64,([A-Za-z0-9+/=]+)\)', font, out)

(ROOT / 'src').mkdir(exist_ok=True)
(ROOT / 'src' / 'index.template.html').write_text(out, encoding='utf-8')
print('images', len(list(img_dir.iterdir())), 'fonts', n[0], 'template bytes', len(out))
