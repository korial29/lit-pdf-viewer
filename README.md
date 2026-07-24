# lit-pdf-viewer

[![npm version](https://img.shields.io/npm/v/lit-pdf-viewer.svg)](https://www.npmjs.com/package/lit-pdf-viewer)
[![npm downloads](https://img.shields.io/npm/dm/lit-pdf-viewer.svg)](https://www.npmjs.com/package/lit-pdf-viewer)
[![bundle size](https://img.shields.io/bundlephobia/minzip/lit-pdf-viewer)](https://bundlephobia.com/package/lit-pdf-viewer)
[![license](https://img.shields.io/npm/l/lit-pdf-viewer.svg)](LICENSE)

A [Lit](https://lit.dev) web component for displaying PDFs, built on top of Mozilla's [PDF.js](https://mozilla.github.io/pdf.js/).

## Framework-agnostic, light to add

`<lit-pdf-viewer>` is a native [Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) — no adapter or wrapper needed to use it. Drop it into React, Vue, Angular, Svelte, or a plain HTML page; it behaves the same everywhere because custom elements are a browser primitive, not a framework integration.

Adding it to a project costs about **17 KB gzipped** (`dist/index.mjs`, `lit` runtime included) — that's the whole component before any PDF is involved. [PDF.js](https://mozilla.github.io/pdf.js/) itself (~196 KB gzipped) is loaded lazily via a dynamic `import()`, only once a `<lit-pdf-viewer>` actually connects to the page or a print is triggered, not just for having the package in your bundle.

## Live demo

https://korial29.github.io/lit-pdf-viewer/

---

## Installation

```sh
npm install lit-pdf-viewer
```

### Copy static assets

The component requires the PDF.js worker, CMaps, and icon font to be served
as static files alongside your app.

```sh
npx lit-pdf-viewer-install <your-public-dir>
```

Copies `pdfjs-dist`, `fonts`, and `style` into `<your-public-dir>`. Omit the
argument and it will prompt you for the target directory. Your final public
directory should look like:

```
public/
├── pdfjs-dist/
│   ├── build/
│   │   └── pdf.worker.min.mjs
│   └── cmaps/
├── fonts/
└── style/
```

Prefer to copy them yourself? They're the same files under
`node_modules/lit-pdf-viewer/dist/{pdfjs-dist,fonts,style}`.

---

## Basic usage

```html
<script type="module">
  import 'lit-pdf-viewer';
</script>

<lit-pdf-viewer src="path/to/document.pdf"></lit-pdf-viewer>
```

Inside a Lit component:

```ts
import 'lit-pdf-viewer';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('my-app')
class MyApp extends LitElement {
  render() {
    return html`<lit-pdf-viewer src="path/to/document.pdf"></lit-pdf-viewer>`;
  }
}
```

### Sizing

The component fills the height of its host, so give the host a height. Without
one it collapses and nothing shows.

```css
lit-pdf-viewer {
  display: block;
  height: 100vh; /* or 100%, a fixed height, a flex/grid track… */
}
```

On small screens the toolbar's rotation buttons collapse into a `⋯` overflow
menu so the whole bar fits in one row.

---

## Properties

| Property          | Type       | Default  | Description                                                                 |
|-------------------|------------|----------|-----------------------------------------------------------------------------|
| `src`             | `string`   | —        | URL of the PDF to load and display.                                         |
| `printSrc`        | `string`   | —        | Alternative PDF URL used when printing (falls back to `src` if not set).   |
| `authorization`   | `string`   | —        | `Authorization` header value for authenticated PDF requests.               |
| `token`           | `string`   | —        | Alias for bearer token (passed as `Authorization: Bearer <token>`).        |
| `scale`           | `string`   | `'auto'` | Initial zoom level. Accepts `'auto'`, `'page-fit'`, `'page-width'`, or a numeric value (e.g. `'1.5'`). |
| `scaleUpdateDelay`| `number`   | `300`    | Debounce delay in ms before re-rendering after a zoom change.              |
| `searchQueries`   | `string[]` | `[]`     | List of phrases to highlight in the document (multi-phrase search).        |
| `entireWord`      | `boolean`  | `false`  | When `true`, search matches whole words only.                              |
| `loaded`          | `boolean`  | `false`  | Reflects `true` once the document is fully loaded. Read-only, reflected as an attribute. |
| `locale`          | `string`   | —        | Forces the UI language (`'en'`, `'fr'`, `'es'`, or `'de'`). Defaults to the browser's language, falling back to English if unsupported. |
| `translations`    | `object`   | `{}`     | Overrides individual translation strings, grouped by namespace (`toolbar`, `search`, `error`, `viewer`). Merged on top of the resolved locale. |

---

## Internationalization (i18n)

The toolbar, search bar, error panel, and loading indicator are translated out
of the box in English, French, Spanish, and German. The language is picked
automatically from the browser (`navigator.language`), with English as the
fallback for unsupported languages.

```html
<!-- Uses the browser's language automatically -->
<lit-pdf-viewer src="doc.pdf"></lit-pdf-viewer>
```

Force a specific language with the `locale` property:

```html
<lit-pdf-viewer src="doc.pdf" locale="es"></lit-pdf-viewer>
```

Override individual strings (or add a language of your own) with
`translations`. Only the keys you provide are overridden — everything else
falls back to the resolved locale:

```ts
html`
  <lit-pdf-viewer
    src="doc.pdf"
    locale="en"
    .translations=${{
      toolbar: { print: 'Print document' },
      search: { placeholder: 'Find in this document...' },
    }}
  ></lit-pdf-viewer>
`;
```

---

## Theming

Every visual surface — the toolbar background, buttons, icons, borders, the
search bar, tooltips, popovers, and the error banner — is driven by CSS custom
properties with sensible defaults baked in. Set the ones you want to override
on `lit-pdf-viewer` (or any ancestor, e.g. `:root`); they inherit down through
every nested shadow root automatically.

```css
lit-pdf-viewer {
  --litpdf-toolbar-background: #1e1e1e;
  --litpdf-icon-color: #eee;
  --litpdf-accent-color: #ff6b35;
  --litpdf-surface-background: #2a2a2a;
  --litpdf-text-color: #eee;
}
```

| Variable                            | Default                            | Affects                                                     |
|--------------------------------------|-------------------------------------|--------------------------------------------------------------|
| `--litpdf-accent-color`              | `#5f49d1`                          | Button hover borders, focus rings, loading bar               |
| `--litpdf-focus-ring-color`          | `var(--litpdf-accent-color)`       | Keyboard focus ring on buttons and inputs                    |
| `--litpdf-toolbar-background`        | `#fff`                             | Toolbar (header) background                                  |
| `--litpdf-toolbar-shadow`            | `0 1px 3px rgba(30, 16, 106, .15)` | Toolbar drop shadow                                           |
| `--litpdf-button-background`         | `transparent`                      | Toolbar/search button background (idle)                      |
| `--litpdf-button-background-hover`   | tinted accent                      | Toolbar/search button background (hover)                     |
| `--litpdf-button-border-hover`       | `var(--litpdf-accent-color)`       | Toolbar/search button border (hover)                         |
| `--litpdf-button-radius`             | `4px`                              | Toolbar button corner radius                                 |
| `--litpdf-icon-color`                | `#222`                             | Default icon/text color in the toolbar and search bar        |
| `--litpdf-icon-color-hover`          | `#737373` (toolbar) / accent (search) | Icon color on button hover                                |
| `--litpdf-text-color`                | `#222`                             | Primary text (input values, error "more info" text)          |
| `--litpdf-text-color-muted`          | `#737373`                          | Secondary text (page count, match count, placeholders)        |
| `--litpdf-border-color`              | `#ccc`                             | Separators, page-number field, input borders                 |
| `--litpdf-border-color-hover`        | `#737373`                          | Borders on hover                                              |
| `--litpdf-surface-background`        | `#fff`                             | Search bar, popovers, inputs, modal                           |
| `--litpdf-surface-background-hover`  | `#eee`                             | Subtle hover surfaces (e.g. the input's clear button)         |
| `--litpdf-surface-shadow`            | `2px 2px 3px rgba(30, 16, 106, .25)` | Search bar, popovers, modal drop shadow                     |
| `--litpdf-tooltip-background`        | `#222`                             | Tooltip background                                            |
| `--litpdf-tooltip-color`             | `#fff`                             | Tooltip text                                                  |
| `--litpdf-error-background`          | `#ff5555`                          | Error banner background                                       |
| `--litpdf-error-color`               | `#fff`                             | Error banner text and icons                                   |
| `--highlight-color`                  | `rgb(255 247 0 / 0.4)`             | Search-match highlight color (set on `lit-pdf-viewer` itself, no `--litpdf-` prefix — kept for backward compatibility) |

---

## Examples

### Authenticated PDF

```html
<lit-pdf-viewer
  src="https://api.example.com/documents/123.pdf"
  authorization="Bearer eyJhbGciOiJIUzI1NiJ9..."
></lit-pdf-viewer>
```

### Custom initial zoom

```html
<!-- Fit the full page in view -->
<lit-pdf-viewer src="doc.pdf" scale="page-fit"></lit-pdf-viewer>

<!-- Stretch to page width -->
<lit-pdf-viewer src="doc.pdf" scale="page-width"></lit-pdf-viewer>

<!-- Fixed zoom level (1.5×) -->
<lit-pdf-viewer src="doc.pdf" scale="1.5"></lit-pdf-viewer>
```

### Multi-phrase search

Highlight multiple terms at once in the document:

```ts
const terms = ['invoice total', 'due date'];

html`
  <lit-pdf-viewer
    src="invoice.pdf"
    .searchQueries=${terms}
  ></lit-pdf-viewer>
`;
```

### Separate print source

Load a display-optimised PDF but print a higher-quality version:

```html
<lit-pdf-viewer
  src="document-screen.pdf"
  printSrc="document-print.pdf"
></lit-pdf-viewer>
```

### React to load completion

The `loaded` attribute is reflected once the PDF is ready, so you can target it with CSS or listen to attribute mutations:

```css
lit-pdf-viewer:not([loaded]) {
  opacity: 0.4;
}
lit-pdf-viewer[loaded] {
  opacity: 1;
  transition: opacity 0.2s;
}
```

---

## Features

- [x] Zoom — page fit, page width, actual size, custom levels
- [x] Page navigation — previous/next, first/last, direct page input
- [x] Text search with multi-phrase support
- [x] Whole-word search mode
- [x] Rotate clockwise / counter-clockwise
- [x] Text selection and hand tool modes
- [x] Full-screen mode
- [x] Download
- [x] Print (with optional separate print source)
- [x] Accessibility
- [x] Internationalization (English, French, Spanish, German — with browser detection and overrides)

---

## License

[Apache-2.0](LICENSE)
