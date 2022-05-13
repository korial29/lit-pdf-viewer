# lit-pdf-viewer

A Lit based pdf viewer that uses the Mozilla's pdfjs lib.

## Live demo

https://korial29.github.io/lit-pdf-viewer/

## Basic usage

```html
<lit-pdf-viewer src="pdf-example.pdf"></lit-pdf-viewer>
```

## Installation

### Install the component

```
npm install lit-pdf-viewer
```

### Pdfjs worker and cmaps

The component needs the pdfjs.worker.js to handle the pdf data.

CMaps (Character Maps) are text files that are used in PostScript and other Adobe products to map character codes to character glyphs in CID fonts.  
pdfjs needs the CMap file when it wants to display such CID fonts. For that, you need to provide the CMaps.

Copy the `node_modules/lit-pdf-viewer/pdfjs-dist` folder in your project bundle folder.

### Font icons

The components comes with a custom icon font, displayed in the toolbar.  
Copy `node_modules/lit-pdf-viewer/fonts` and `node_modules/lit-pdf-viewer/style` folders in your project bundle folder.


## Usage
Import the lit-pdf-viewer lib in you component class.  
Set the <lit-pdf-viewer/> element in you render.

```javascript
import 'lit-pdf-viewer';

render() => {
  return html`<lit-pdf-viewer src="pdf-example.pdf"></lit-pdf-viewer>`
}
```

## Features

- [x] Zooming: Support custom levels such as actual size, page fit, and page width
- [x] Navigation between pages
- [x] Can go to the first and last pages quickly
- [x] Search for text
- [x] Multi phrase search
- [x] Rotating
- [x] Text selection and hand tool modes
- [x] Full screen mode
- [x] Download file
- [x] Print
- [x] Accessibility

## Multi phrase search

Add a support for mutliphrase search in the pdf document.

```javascript
const multiplePhrase = [
  'php application',
  'Javascipt is awesome',
  '',
];

<lit-pdf-viewer
  src="pdf-example.pdf"
  .searchQueries=${multiplePhrase}
>
</lit-pdf-viewer>
```
