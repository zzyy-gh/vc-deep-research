"""Post-save safety net for investment-memo render scripts.

validate_pptx_rels(path) — walks every slide*.xml inside the saved pptx
and diffs rId references against slide*.xml.rels. Raises ValueError if
any are dangling. Catches the corruption that triggers PowerPoint's
"needs repair" prompt before the file ever leaves the renderer.

Slide cloning itself is delegated to document-skills:pptx — that skill
knows how to copy slides, chart parts, OLE objects, SVG blips, etc.
This file deliberately holds no cloning logic; it is the only persistent
helper, and it is content-agnostic.

Render scripts must call validate_pptx_rels(OUT) immediately after
prs.save(OUT). If it raises, the deck is broken — fix and re-render.
"""
import re
import zipfile


def validate_pptx_rels(path):
    """Walk every slide*.xml and check rId references resolve in its rels.

    Raises ValueError listing any dangling rIds.
    """
    rid_re = re.compile(r'r:(?:embed|id|link)="(rId\d+)"')
    have_re = re.compile(r'Id="(rId\d+)"')
    bad = []
    with zipfile.ZipFile(path) as z:
        for name in z.namelist():
            if not (name.startswith('ppt/slides/slide') and name.endswith('.xml')):
                continue
            xml = z.read(name).decode()
            rels_name = name.replace('slides/', 'slides/_rels/') + '.rels'
            try:
                rels = z.read(rels_name).decode()
            except KeyError:
                rels = ''
            referenced = set(rid_re.findall(xml))
            present = set(have_re.findall(rels))
            missing = referenced - present
            if missing:
                bad.append(f'{name}: missing {sorted(missing)}')
    if bad:
        raise ValueError(
            'Dangling slide rIds (file would trigger PowerPoint repair):\n  '
            + '\n  '.join(bad)
        )
