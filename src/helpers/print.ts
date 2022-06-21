// eslint-disable-next-line import/no-unresolved
import { PDFDocumentProxy, getDocument, PixelsPerInch } from 'pdfjs-dist';
// @ts-ignore
import printStyle from './print.scss';

export interface IPrintParams {
  printSrc: string;
  token: string;
  pdfDocument: PDFDocumentProxy;
}

export default class PdfPrintService {
  private static _instance: PdfPrintService;

  private _pdfDocument: PDFDocumentProxy;

  private _currentPage: number;

  private _printContainer: HTMLDivElement;

  private _url: string;

  private _aborted: boolean;

  public static getInstance(): PdfPrintService {
    if (!PdfPrintService._instance) {
      PdfPrintService._instance = new PdfPrintService();
    }

    return PdfPrintService._instance;
  }

  public onProgress(progressData: { loaded: number; total: number }): void {
    return null;
  }

  public async print({ printSrc, token, pdfDocument }: IPrintParams): Promise<void> {
    const hasChanged = this._hasChanged(printSrc, pdfDocument);
    this._url = printSrc;
    this._pdfDocument = pdfDocument;
    this._aborted = false;

    if (printSrc || pdfDocument) {
      const isIframe = <HTMLIFrameElement>document.getElementById('printPage');
      let ifrm: HTMLIFrameElement;

      this._printContainer = document.createElement('div');
      this._printContainer.setAttribute('id', 'printPageContainer');

      if (isIframe) {
        ifrm = isIframe;
      } else {
        ifrm = this._createIframe();
      }

      if (!hasChanged) {
        this._print(ifrm);
      } else {
        this._reinitProgress();
        await this._renderPdf({ printSrc, token, pdfDocument });
        this._copyCanvasInIframe(ifrm);
        this._print(ifrm);
      }
    }
  }

  private async _renderPdf({ printSrc, token, pdfDocument }: IPrintParams): Promise<void> {
    try {
      let newPdfDocument = pdfDocument;
      if (!newPdfDocument) {
        const httpHeaders = token ? { Authorization: `Bearer ${token}` } : {};
        const loadingTask = getDocument({
          url: printSrc,
          httpHeaders,
        });
        newPdfDocument = await loadingTask.promise;
      }

      const pageCount = newPdfDocument.numPages;

      if (!this._aborted) {
        await this._renderPages(pdfDocument, pageCount);
      }
    } catch (e) {
      this._abort();
      throw e;
    }
  }

  private _renderPages(pdfDocument: PDFDocumentProxy, pageCount: number): Promise<void> {
    const renderNextPage = (resolve, reject): Promise<void> => {
      // eslint-disable-next-line no-plusplus
      if (++this._currentPage >= pageCount) {
        this.onProgress({ loaded: pageCount, total: pageCount });
        resolve();
        return;
      }
      const index = this._currentPage;
      this.onProgress({ loaded: index, total: pageCount });
      this._renderPage(pdfDocument, index + 1, { width: 640, height: 840 }).then(() => {
        renderNextPage(resolve, reject);
      }, reject);
    };
    return new Promise(renderNextPage);
  }

  private async _renderPage(
    pdfDocument: PDFDocumentProxy,
    pageNumber: number,
    size: { width: number; height: number },
  ): Promise<void> {
    if (!this._aborted) {
      const canvas = document.createElement('canvas');
      const wrapper = document.createElement('div');
      wrapper.className = 'printedPage';
      wrapper.appendChild(canvas);
      this._printContainer.appendChild(wrapper);

      // The size of the canvas in pixels for printing.
      const PRINT_RESOLUTION = 124;
      const PRINT_UNITS = PRINT_RESOLUTION / PixelsPerInch.PDF;
      canvas.width = Math.floor(size.width * PRINT_UNITS);
      canvas.height = Math.floor(size.height * PRINT_UNITS);

      const ctx = canvas.getContext('2d');
      ctx.save();
      ctx.fillStyle = 'rgb(255, 255, 255)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      const pdfPage = await pdfDocument.getPage(pageNumber);
      const renderContext = {
        canvasContext: ctx,
        transform: [PRINT_UNITS, 0, 0, PRINT_UNITS, 0, 0],
        viewport: pdfPage.getViewport({ scale: 1 }),
        intent: 'print',
      };
      await pdfPage.render(renderContext).promise;
    }
  }

  private _reinitProgress(): void {
    this.onProgress({ loaded: 0, total: 1 });
    this._currentPage = -1;
  }

  private _abort = (): void => {
    this._url = undefined;
    this._aborted = true;
  };

  private _hasChanged(printSrc: string, pdfDocument: PDFDocumentProxy): boolean {
    return this._pdfDocument !== pdfDocument || this._url !== printSrc;
  }

  private _createIframe(): HTMLIFrameElement {
    const ifrm = document.createElement('iframe');
    ifrm.style.position = 'absolute';
    ifrm.style.top = '-10000px';
    ifrm.setAttribute('sandbox', 'allow-modals allow-same-origin allow-scripts');
    ifrm.setAttribute('id', 'printPage');
    document.body.appendChild(ifrm);

    this._setIframeStyle(ifrm);

    return ifrm;
  }

  private _setIframeStyle(ifrm: HTMLIFrameElement): void {
    const iframeDocument = ifrm.contentDocument || ifrm.contentWindow.document;
    const style = document.createElement('style');
    style.textContent = printStyle.cssText;
    iframeDocument.head.appendChild(style);
  }

  private _copyCanvasInIframe(ifrm: HTMLIFrameElement): void {
    const iframeDocument = ifrm.contentDocument || ifrm.contentWindow.document;
    const ifrmBody = iframeDocument.documentElement.querySelector('body');
    ifrmBody.innerHTML = '';
    ifrmBody.appendChild(this._printContainer);
  }

  private _print(ifrm: HTMLIFrameElement): void {
    if (!this._aborted) {
      setTimeout(() => {
        // eslint-disable-next-line dot-notation
        if (window.frames['printPage'].print) {
          // eslint-disable-next-line dot-notation
          window.frames['printPage'].focus(); // Required for IE
          // eslint-disable-next-line dot-notation
          window.frames['printPage'].print();
        } else {
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          ifrm.contentWindow.__container__ = ifrm;
          ifrm.contentWindow.focus(); // Required for IE
          ifrm.contentWindow.print();
        }
      }, 500);
    }
  }
}
