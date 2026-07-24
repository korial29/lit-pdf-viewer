# lit-pdf-viewer

[![npm version](https://img.shields.io/npm/v/lit-pdf-viewer.svg)](https://www.npmjs.com/package/lit-pdf-viewer)
[![npm downloads](https://img.shields.io/npm/dm/lit-pdf-viewer.svg)](https://www.npmjs.com/package/lit-pdf-viewer)
[![bundle size](https://img.shields.io/bundlephobia/minzip/lit-pdf-viewer)](https://bundlephobia.com/package/lit-pdf-viewer)
[![license](https://img.shields.io/npm/l/lit-pdf-viewer.svg)](LICENSE)

A [Lit](https://lit.dev) web component for displaying PDFs, built on top of Mozilla's [PDF.js](https://mozilla.github.io/pdf.js/).

## Live demo

https://korial29.github.io/lit-pdf-viewer/

---

## Installation

```sh
npm install lit-pdf-viewer
```

### Copy static assets

The component requires three sets of static files to be served alongside your app.

**1. PDF.js worker and CMaps**

PDF.js offloads PDF parsing to a worker thread. CMaps (Character Maps) are needed to render CID fonts correctly.

Copy the bundled `pdfjs-dist` folder into your public/bundle directory:

```sh
cp -r node_modules/lit-pdf-viewer/dist/pdfjs-dist <your-public-dir>/pdfjs-dist
```

**2. Icon font**

The toolbar uses a custom icon font.

```sh
cp -r node_modules/lit-pdf-viewer/dist/fonts  <your-public-dir>/fonts
cp -r node_modules/lit-pdf-viewer/dist/style  <your-public-dir>/style
```

Your final public directory should look like:

```
public/
├── pdfjs-dist/
│   ├── build/
│   │   └── pdf.worker.min.mjs
│   └── cmaps/
├── fonts/
└── style/
```

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
