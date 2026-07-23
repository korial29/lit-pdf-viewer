# AGENTS.md

Instructions for AI agents (Claude Code and similar) working in this repo.

## What this is

`lit-pdf-viewer` is a standalone [Lit](https://lit.dev) web component wrapping
Mozilla's [PDF.js](https://mozilla.github.io/pdf.js/), published to npm. No
backend, no framework beyond Lit — plain TypeScript + SCSS custom elements.

## Structure

```
src/
  index.js              # public entry point (what npm consumers import)
  app.ts                # demo app shell (used by www/, not shipped to npm)
  lit-pdf-viewer/        # main component
  lit-pdf-toolbar/       # one folder per component: Component.ts + Component.scss
  lit-pdf-search/
  lit-pdf-error/
  lit-input/
  lit-icon/
  lit-tooltip/
  helpers/
  types/
assets/                 # fonts + shared SCSS, copied into dist/www as static files
www/                    # demo app served in dev and deployed to GitHub Pages
```

Each component is self-contained: `<name>.ts` (Lit element) + `<name>.scss`
(imported via the custom `litScssPlugin` in `vite.config.js`, which compiles
SCSS to a Lit `css` tagged template at build/dev time — don't try to import
`.scss` any other way).

## Running the demo

```sh
npm start
```

This copies `pdfjs-dist`, `assets`, and `src` into `www/` and serves `www/`
with Vite. **Important:** the copy only happens once at startup — if the dev
server is already running and you edit files under `src/`, `www/src` goes
stale (Vite has no watcher mirroring `src/` → `www/src`). To pick up edits
without restarting:

```sh
rm -rf www/src && cp -r src www
```

Then reload the browser. Do **not** run `vite build --outDir www/src` to
"refresh" it — that empties the directory and only emits a bundled
`index.mjs`, deleting `app.ts` and the component subfolders `www/index.html`
actually references, which breaks the demo. If that happens, recover with the
`cp -r src www` command above.

## Build targets

- `npm run build` — builds the library (`dist/`), the thing published to npm.
- `npm run build:demo` (`BUILD_DEMO=true`) — builds the demo app (`dist-demo/`),
  deployed to GitHub Pages via `.github/workflows/deploy-pages.yml`.

## Before committing

```sh
npm run lint   # prettier --check + eslint + tsc --noEmit
npm run build
npm run test:ci
```

These three are exactly what `ci.yml`'s `verify` check runs — make sure all
three pass locally before opening a PR. `npm run format` auto-fixes what it
can (prettier + eslint --fix).

## Git / PR conventions

Single-branch model — see `.github/CI.md` for the full picture.

- Branch off `master` (short-lived: `feature/*`, `fix/*`, `hotfix/*`, `chore/*`).
- Open the PR back into `master`.
- Add **exactly one** release label — required by the `require-release-label`
  check (`pr-validation.yml`):
  - `release:major` — breaking change
  - `release:minor` — new feature, backward compatible
  - `release:patch` — bug fix
  - `release:skip` — no release (docs, chore, internal)
- Merging with a `release:*` label (not `skip`) triggers `release.yml`, which
  tags, publishes to npm, and creates the GitHub Release after manual
  approval. `package.json`'s `version` field is just a baseline — the actual
  next version is computed from the latest git tag, not bumped in a commit.
- No Jira/ticket system here — this is a personal OSS project, not an iAdvize
  repo. PR titles/descriptions in English, conventional-commit style
  (`feat:`, `fix:`, `chore:`, …).

## Testing

Vitest + `@open-wc/testing-helpers`, jsdom environment (configured in
`vite.config.js`). No test files exist yet in `src/` — when adding one, colocate
it with the component (`*.test.ts` or `*.spec.ts` next to `*.ts`).
