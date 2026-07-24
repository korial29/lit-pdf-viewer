export type PdfjsLib = typeof import('pdfjs-dist');
export type PdfjsViewerModule = typeof import('pdfjs-dist/web/pdf_viewer.mjs');

// pdfjs-dist's main-thread API + viewer helpers make up the bulk of this
// library's bundle size. Loading them via `import()` (from here and nowhere
// else) instead of a static import lets bundlers split them into their own
// chunk, so consumers only download them once a `<lit-pdf-viewer>` actually
// connects or a print is triggered — not just for importing the package.
// Memoized so repeated calls (multiple viewer instances, print + view) share
// one fetch/parse instead of re-importing.
let pdfjsLibPromise: Promise<PdfjsLib> | null = null;

let pdfjsViewerPromise: Promise<PdfjsViewerModule> | null = null;

export function loadPdfjsLib(): Promise<PdfjsLib> {
  if (!pdfjsLibPromise) {
    pdfjsLibPromise = import('pdfjs-dist').then(pdfjsLib => {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.min.mjs';
      return pdfjsLib;
    });
  }
  return pdfjsLibPromise;
}

export function loadPdfjsViewer(): Promise<PdfjsViewerModule> {
  if (!pdfjsViewerPromise) {
    // `pdf_viewer.mjs` reads off `globalThis.pdfjsLib` at its own module top
    // level (that's how pdfjs-dist wires the two packages together) instead
    // of importing pdfjs-dist directly, so it must not be evaluated before
    // pdfjs-dist's main entry has finished running and set that global —
    // hence chaining onto `loadPdfjsLib()` here rather than importing in
    // parallel with it.
    pdfjsViewerPromise = loadPdfjsLib().then(() => import('pdfjs-dist/web/pdf_viewer.mjs'));
  }
  return pdfjsViewerPromise;
}
