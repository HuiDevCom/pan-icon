"""Package the current logo directory into the workspace deliverables directory."""
from pathlib import Path
from shutil import copy2
from zipfile import ZipFile, ZIP_DEFLATED

logo = Path(__file__).resolve().parent.parent
cloudrave = logo / "cloudrave"
cloudrave.mkdir(exist_ok=True)
for name in ["logo.svg", "logo_light.svg", "logo192.png", "logo512.png", "favicon.ico"]:
    copy2(logo / name, cloudrave / name)
legal_files = [logo.parent / name for name in ("LICENSE", "NOTICE.md")]
for legal in legal_files:
    if not legal.is_file():
        raise FileNotFoundError(f"Missing required license notice: {legal.name}")
destination = logo.parent / "deliverables" / "fenghui-cloud-logo-kit.zip"
destination.parent.mkdir(parents=True, exist_ok=True)
files = sorted(
    p for p in logo.rglob("*")
    if p.is_file() and p.suffix.lower() != ".zip" and "__pycache__" not in p.parts
)
with ZipFile(destination, "w", ZIP_DEFLATED) as archive:
    for item in files:
        archive.write(item, Path("logo") / item.relative_to(logo))
    for legal in legal_files:
        archive.write(legal, legal.name)
with ZipFile(destination) as archive:
    damaged = archive.testzip()
    if damaged is not None:
        raise RuntimeError(f"Invalid archive member: {damaged}")
print(f"Packaged {len(files)+len(legal_files)} files: {destination}")
