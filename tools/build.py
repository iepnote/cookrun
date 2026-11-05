# tools/build.py — 템플릿 + assets → index.html
import re, base64, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[1]
tpl = (ROOT / 'src' / 'index.template.html').read_text(encoding='utf-8')
MIME = {'png': 'image/png', 'jpg': 'image/jpeg'}
def img(m):
    name = m.group(1); ext = name.rsplit('.', 1)[1]
    data = base64.b64encode((ROOT / 'assets' / 'img' / name).read_bytes()).decode()
    return f'data:{MIME[ext]};base64,{data}'
out = re.sub(r'@@IMG:([\w.]+)@@', img, tpl)
def font(m):
    data = base64.b64encode((ROOT / 'assets' / 'font' / m.group(1)).read_bytes()).decode()
    return f'data:font/woff2;base64,{data}'
out = re.sub(r'@@FONT:([\w.]+)@@', font, out)
assert '@@' not in out, '치환되지 않은 자리표시자가 있음'
(ROOT / 'index.html').write_text(out, encoding='utf-8')
print('index.html', len(out.encode()), 'bytes')
