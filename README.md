# sharable_assets

Shared design assets for every project in `cyberpunk_apps/`.

- `DESIGN_LANGUAGE.md`: the NEONDECK design language. Read this first.
- `neondeck/`: Svelte 5 library with the tokens, base CSS, effects and components. Its `src/routes/+page.svelte` is the living showcase.
- `reference/`: screenshots of the showcase (desktop + mobile) to check new work against.

## Setup (standard: uv venv + nodeenv)
```bash
cd sharable_assets
uv venv .venv && uv pip install --python .venv nodeenv
.venv/bin/nodeenv -p --node=lts      # installs node/npm into the venv
source .venv/bin/activate
cd neondeck && npm install
npm run dev        # showcase at http://localhost:5173
npm run build      # builds dist/ (tokens.json regenerated, publint checked)
npm run check      # svelte-check
```
