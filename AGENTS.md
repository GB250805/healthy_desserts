# AGENTS.md — Healthy Desserts

## Project overview

Vanilla HTML/CSS/JS single-page app (no build tools, no dependencies, no package.json). Mobile-first prototype for a healthy dessert store aimed at university students. Open `index.html` in a browser to run — no server needed (though `aulas.csv` is fetched via `fetch`, so a local HTTP server is required for that feature).

## Key files

| File | Role |
|---|---|
| `index.html` | SPA shell with all screens, modals, and forms |
| `styles.css` | Mobile-first CSS (~940 lines, no framework) |
| `boot.js` | All logic in a single IIFE (~1020 lines) |
| `aulas.csv` | Valid classroom codes (fetched at runtime via `fetch`) |
| `Data.csv` | Reference/source document only — **not used at runtime** |

## Architecture notes

- **No build step, no package.json, no dependencies.** Open `index.html` in a browser.
- All logic is in `boot.js` as a single IIFE. State is in-memory + `localStorage`.
- The `CATALOG` array in `boot.js` is the source of truth for products. `Data.csv` is a reference document only.
- Classroom validation requires `aulas.csv` to be served alongside `index.html` (fetched via `fetch` with `cache: 'no-store'`). Use a local HTTP server (e.g. `npx serve .` or VS Code Live Server) — opening `index.html` directly via `file://` will fail to load `aulas.csv`.

## Key constants (hardcoded in `boot.js`)

- Admin password: `123456789`
- Max login attempts: `5`, lockout duration: `60s`
- localStorage keys: `healthy-desserts-clean-state-v1` (app state), `healthy-desserts-admin-lock-v1` (admin lockout)
- Classroom format: letter + 3 digits (e.g. `G503`), validated against `aulas.csv`
- Student ID: exactly 9 digits
- Name fields: letters only (including Spanish accented chars)

## Data flow

- `Data.csv` is a reference/source document — **not consumed at runtime**. The real product data lives in the `CATALOG` array in `boot.js`.
- `aulas.csv` is consumed at runtime to validate classroom input.
- All state persists to `localStorage`. Use the "Restablecer demo" button in admin panel or clear `localStorage` to reset.

## Testing

No test framework, no test files. Manual testing only via browser.
