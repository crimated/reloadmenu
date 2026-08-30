# RELOAD CAFÉ — Local Admin (offline only)

This tool runs **only on your computer**. It is never deployed and there is no
link to it from the public website.

## Run

```bash
pip install -r admin/requirements.txt
python admin/server.py
# open http://localhost:2000/admin
```

## What it does

It edits project files directly:

- `public/data/menu.json` — categories + products (Arabic/English names and
  descriptions, price, image, availability, extras, sort order)
- `public/data/config.json` — restaurant name, logo, tagline, colors, WhatsApp
  number, location URL, Instagram, address, working hours
- `public/images/` — real image files (converted to WebP, max 1200px)

## API

| Method | Endpoint                | Purpose                     |
| ------ | ----------------------- | --------------------------- |
| GET    | `/api/menu`             | read menu.json              |
| POST   | `/api/menu`             | write menu.json             |
| GET    | `/api/config`           | read config.json            |
| POST   | `/api/config`           | write config.json           |
| POST   | `/api/upload`           | save image into public/images |
| DELETE | `/api/images/{name}`    | delete image file           |

## Publish workflow

```
local admin  ->  public/data/*.json + public/images/  ->  npm run build  ->  dist/  ->  Cloudflare Pages
```

## Reusing for another café

Copy the project, replace `public/data/config.json`, `public/data/menu.json` and
`public/images/`. No React component needs to change.
