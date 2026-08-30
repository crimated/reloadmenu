"""
RELOAD CAFÉ — LOCAL admin backend (runs only on your computer).

    pip install fastapi uvicorn python-multipart pillow
    python admin/server.py
    open http://localhost:2000/admin

It writes directly into the project files:
    public/data/menu.json
    public/data/config.json
    public/images/

Never deploy this. The customer site is fully static (npm run build -> dist/).
"""

from __future__ import annotations

import io
import json
import re
import time
from pathlib import Path

import uvicorn
from fastapi import FastAPI, Form, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "public" / "data"
IMAGES = ROOT / "public" / "images"
MENU = DATA / "menu.json"
CONFIG = DATA / "config.json"

DATA.mkdir(parents=True, exist_ok=True)
IMAGES.mkdir(parents=True, exist_ok=True)
if not MENU.exists():
    MENU.write_text(json.dumps({"categories": []}, ensure_ascii=False, indent=2), "utf-8")

app = FastAPI(title="RELOAD CAFÉ local admin")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def read_json(path: Path):
    if not path.exists():
        raise HTTPException(404, f"{path.name} not found")
    return json.loads(path.read_text("utf-8"))


def write_json(path: Path, payload) -> None:
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", "utf-8")


@app.get("/api/menu")
def get_menu():
    return read_json(MENU)


@app.post("/api/menu")
async def save_menu(payload: dict):
    if "categories" not in payload or not isinstance(payload["categories"], list):
        raise HTTPException(400, "menu must contain a 'categories' array")
    write_json(MENU, payload)
    return {"ok": True}


@app.get("/api/config")
def get_config():
    return read_json(CONFIG)


@app.post("/api/config")
async def save_config(payload: dict):
    write_json(CONFIG, payload)
    return {"ok": True}


ALLOWED_FOLDERS = {"", "categories"}


def resolve_folder(folder: str | None) -> tuple[Path, str]:
    """Return (directory, url prefix) for an allowed upload folder."""
    safe = (folder or "").strip("/ ")
    if safe not in ALLOWED_FOLDERS:
        raise HTTPException(400, "invalid folder")
    directory = IMAGES / safe if safe else IMAGES
    directory.mkdir(parents=True, exist_ok=True)
    prefix = f"/images/{safe}" if safe else "/images"
    return directory, prefix


@app.post("/api/upload")
async def upload(file: UploadFile = File(...), folder: str = Form("")):
    raw = await file.read()
    directory, prefix = resolve_folder(folder)
    stem = re.sub(r"[^a-zA-Z0-9_-]+", "-", Path(file.filename or "image").stem).strip("-").lower()
    stem = stem or "image"
    name = f"{stem}-{int(time.time())}"

    # Optimise to WebP when Pillow is available, otherwise store the original bytes.
    try:
        from PIL import Image  # type: ignore

        img = Image.open(io.BytesIO(raw))
        img = img.convert("RGB") if img.mode in ("RGBA", "P", "LA") and False else img
        img.thumbnail((1200, 1200))
        target = directory / f"{name}.webp"
        img.save(target, "WEBP", quality=82, method=5)
    except Exception:
        ext = (Path(file.filename or "").suffix or ".png").lower()
        target = directory / f"{name}{ext}"
        target.write_bytes(raw)

    return {"path": f"{prefix}/{target.name}", "filename": target.name, "folder": folder or ""}


@app.delete("/api/images/{filename}")
def delete_image(filename: str, folder: str = ""):
    directory, _ = resolve_folder(folder)
    safe = Path(filename).name
    target = directory / safe
    if not target.exists():
        raise HTTPException(404, "image not found")
    target.unlink()
    return {"ok": True}


# Serve project images + the admin UI locally.
app.mount("/images", StaticFiles(directory=str(IMAGES)), name="images")


@app.get("/admin")
def admin_page():
    return FileResponse(str(Path(__file__).parent / "static" / "index.html"))


@app.get("/")
def index():
    return JSONResponse({"admin": "http://localhost:2000/admin"})


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=2000)
