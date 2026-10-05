# Riley Fang — Portfolio

Plain HTML site, no build step. Works on GitHub Pages as-is.

```
index.html               Home (about, projects, contact)
rehabilitation.html      Rehabilitation App case study
cseed.html               CSEED Website case study
flavor-fingerprint.html  Flavor Fingerprint case study
assets/                  Images
.nojekyll                Tells GitHub Pages to serve files as-is
```

## Publish on GitHub Pages

1. Create a repo named **`<your-username>.github.io`** (this gives you `https://<your-username>.github.io`). Any other name works too — it'll live at `https://<your-username>.github.io/<repo-name>/`.
2. Upload everything in this folder to the repo root (drag & drop on github.com → **Add file → Upload files**, or `git push`).
3. Repo **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main` / `(root)` → Save.
4. Wait ~1 minute, then open the URL shown on that page.

## Editing

- Text: open the `.html` file, find the sentence, change it, commit.
- Images: drop a new file into `assets/` with the same name, or update the `src="assets/…"` path.
- Fonts load from Google Fonts (Caveat, Figtree, Courier Prime).

## Preview locally

Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000.
