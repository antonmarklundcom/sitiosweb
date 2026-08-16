#!/usr/bin/env bash
#
# Arma el ZIP que se sube a public_html en Hostinger.
#
#   bash tools/build-deploy-zip.sh
#   -> dist/sitiosweb-YYYYMMDD-HHMM.zip
#
# El ZIP no lleva carpeta contenedora: index.php y .htaccess quedan en la raíz.
# Quedan fuera el proyecto React archivado, las referencias de diseño, los .md,
# las herramientas locales y config.local.php (los datos reales se cargan en el
# servidor, no viajan en el paquete).

set -euo pipefail

cd "$(dirname "$0")/.."

OUT_DIR="dist"
STAMP="$(date +%Y%m%d-%H%M)"
ZIP="${OUT_DIR}/sitiosweb-${STAMP}.zip"

mkdir -p "$OUT_DIR"
rm -f "$ZIP"

# Lint antes de empaquetar: no tiene sentido subir PHP que no parsea.
while IFS= read -r -d '' file; do
    php -l "$file" > /dev/null
done < <(find . -name '*.php' -not -path './archive/*' -not -path './dist/*' -print0)
echo "PHP lint OK"

python3 - "$ZIP" <<'PY'
import os, sys, zipfile

zip_path = sys.argv[1]

INCLUDE_FILES = [
    "index.php", "404.php", "privacidad.php", "terminos.php",
    "sitemap.php", "robots.txt", ".htaccess",
]
INCLUDE_DIRS = ["includes", "assets"]
EXCLUDE_NAMES = {"config.local.php", ".DS_Store", "Thumbs.db"}
EXCLUDE_EXT = {".md", ".mjs", ".sh", ".psd", ".zip"}

added = []
with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
    for name in INCLUDE_FILES:
        if os.path.isfile(name):
            z.write(name, name)
            added.append(name)
    for root_dir in INCLUDE_DIRS:
        for root, _dirs, files in os.walk(root_dir):
            for f in sorted(files):
                if f in EXCLUDE_NAMES or os.path.splitext(f)[1].lower() in EXCLUDE_EXT:
                    continue
                path = os.path.join(root, f)
                arc = path.replace(os.sep, "/")   # entradas con barra normal
                z.write(path, arc)
                added.append(arc)

print("\n".join(f"  {a}" for a in added))
print(f"\n{len(added)} archivos -> {zip_path}")
PY

echo
echo "Subir el contenido del ZIP a public_html/ y crear includes/config.local.php en el servidor."
