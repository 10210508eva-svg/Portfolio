# Riley Fang — Portfolio

Personal portfolio site. Plain HTML/CSS/JS — no build step.

## Structure
```
index.html                 Home (envelope hero, about, projects, contact)
rehabilitation.html        Case study: Rehabilitation App
cseed.html                 Case study: CSEED Website
flavor-fingerprint.html    Case study: Flavor Fingerprint
assets/
  envelope.js              Hero envelope animation (auto-plays; tap envelope to replay)
  desktop.js               Doodling, dock highlight, pencil texture filters
  hero/                    Cut-out photos used in the hero
  ff/, rehab/              Case-study images
```

## Publish with GitHub Pages
1. Create a repo (e.g. `username.github.io` for a root URL).
2. Upload everything in this folder to the repo root (keep the `assets/` folder).
3. Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)` → Save.
4. Your site will be live at `https://username.github.io/` in a minute or two.

## Editing
- Text and layout: edit the `.html` files directly.
- Hero animation timing: `assets/envelope.js`.
- Doodling and dock: `assets/desktop.js`.
