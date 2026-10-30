"""Découpe les photos de démonstration dans les captures Instagram fournies.

Ces images sont des PLACEHOLDERS : basse définition, issues de captures d'écran.
Elles doivent être remplacées par les fichiers originaux des shootings.
Usage : python3 scripts/photos.py <dossier_des_captures>
"""
import sys, os, cv2, numpy as np

SRC = sys.argv[1]
OUT = os.path.join(os.path.dirname(__file__), '..', 'src', 'assets', 'img')
GRID = '951d8dfa-image.jpg'      # grille ICONIC
PROF = '2996443c-image.jpg'      # grille du profil
BOX = '731a6e95-image.jpg'       # publication box

# nom : (fichier, x0, y0, x1, y1) en pixels d'origine
CROPS = {
    'iconic-marron':       (GRID, 4, 448, 354, 914),
    'iconic-jaune-profil': (GRID, 366, 448, 714, 914),
    'iconic-jaune-face':   (GRID, 4, 930, 354, 1396),
    'iconic-couverture':   (GRID, 742, 548, 1036, 916),
    'iconic-portrait-nb':  (GRID, 726, 930, 1078, 1396),
    'leopard':             (PROF, 2, 1414, 352, 1880),
    'veste-volants':       (PROF, 364, 1414, 714, 1880),
    'robe-rouge':          (PROF, 726, 1414, 1078, 1880),
    'box-mains':           (PROF, 2, 1896, 352, 2362),
    'box-table':           (PROF, 726, 1896, 1078, 2362),
    'boubou-blanc':        (PROF, 404, 2380, 584, 2620),
    'kaftan-sauge':        (PROF, 140, 2380, 320, 2620),
    'kaftan-rouille':      (PROF, 856, 2380, 1036, 2620),
    'box-ouverture':       (BOX, 0, 520, 1080, 1960),
}
TARGET_W = 720
SANS_ICONE = {'boubou-blanc', 'box-ouverture', 'iconic-couverture', 'iconic-portrait-nb'}


def efface_icone(c):
    """Retire l'icône blanche d'Instagram (lecture ou carrousel) en haut à droite."""
    h, w = c.shape[:2]
    zone = np.zeros((h, w), np.uint8)
    x0 = int(w * 0.62)
    band = c[0:110, x0:w]
    blanc = (band.min(axis=2) > 228).astype(np.uint8) * 255
    if blanc.sum() / 255 < 40:
        return c
    blanc = cv2.dilate(blanc, np.ones((9, 9), np.uint8))
    zone[0:110, x0:w] = blanc
    return cv2.inpaint(c, zone, 7, cv2.INPAINT_TELEA)

os.makedirs(OUT, exist_ok=True)
for name, (f, x0, y0, x1, y1) in CROPS.items():
    im = cv2.imread(os.path.join(SRC, f))
    c = im[y0:y1, x0:x1].copy()
    if name not in SANS_ICONE:
        c = efface_icone(c)
    h, w = c.shape[:2]
    s = TARGET_W / w
    if s > 1:
        c = cv2.resize(c, (TARGET_W, round(h * s)), interpolation=cv2.INTER_LANCZOS4)
        blur = cv2.GaussianBlur(c, (0, 0), 1.2)
        c = cv2.addWeighted(c, 1.35, blur, -0.35, 0)
    else:
        c = cv2.resize(c, (TARGET_W, round(h * s)), interpolation=cv2.INTER_AREA)
    cv2.imwrite(os.path.join(OUT, name + '.jpg'), c, [cv2.IMWRITE_JPEG_QUALITY, 80, cv2.IMWRITE_JPEG_PROGRESSIVE, 1])
    print(name, w, h, '->', c.shape[1], c.shape[0])
