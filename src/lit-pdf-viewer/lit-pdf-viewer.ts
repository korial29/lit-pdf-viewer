import { CSSResult, html, TemplateResult, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import {
  getDocument,
  GlobalWorkerOptions,
  InvalidPDFException,
  MissingPDFException,
  PDFDocumentProxy,
  UnexpectedResponseException,
  version,
  build,
  PDFDocumentLoadingTask,
} from 'pdfjs-dist';
// eslint-disable-next-line import/no-unresolved
import { IL10n } from 'pdfjs-dist/types/web/interfaces';
import {
  EventBus,
  PDFLinkService,
  NullL10n,
  PDFViewer,
  PDFFindController,
} from 'pdfjs-dist/web/pdf_viewer';
import { removeAccents } from '../helpers/remove-accents';
import '../lit-pdf-toolbar/lit-pdf-toolbar';
import '../lit-pdf-error/lit-pdf-error';
import { IErrorInfo } from '../types/error';

// @ts-ignore
import style from './lit-pdf-viewer.scss';

GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.min.js';

const DEFAULT_SCALE_DELTA = 1.1;
const MIN_SCALE = 0.25;
const MAX_SCALE = 10.0;
const USE_ONLY_CSS_ZOOM = true;
const MAX_IMAGE_SIZE = 1024 * 1024;
const CMAP_URL = 'pdfjs-dist/cmaps/';
const CMAP_PACKED = true;

@customElement('lit-pdf-viewer')
export class LitPdfViewer extends LitElement {
  @property({ type: String }) public src: string;

  @property({ type: Array }) public searchQueries: string[] = [];

  @property({ type: Boolean }) public entireWord = false;

  @property({ type: String }) public scale = 'auto';

  @property({ type: Number }) public scaleUpdateDelay = 300;

  @property({ type: String }) public authorization: string;

  @property({ type: Boolean, reflect: true }) public loaded: boolean;

  @query('#viewerContainer') private _viewerContainer: HTMLDivElement;

  @state() private _loadingPercent = 0;

  @state() private _errorMessage: string;

  @state() private _errorMoreInfo: string;

  @state() private _openErrorPanel: boolean;

  private _searchQueriesNormalized: string[];

  private _pageNumberEl: HTMLInputElement;

  private _previousPageEl: HTMLButtonElement;

  private _nextPageEl: HTMLButtonElement;

  private _toolbarEl: HTMLElement;

  private _pdfLoadingTask: PDFDocumentLoadingTask;

  private _pdfDocument: PDFDocumentProxy;

  private _pdfViewer: PDFViewer;

  private _pdfLinkService: PDFLinkService;

  private _pdfFindController: PDFFindController;

  private _eventBus: EventBus;

  private _l10n: IL10n;

  private _loadingTaskPromise: Promise<PDFDocumentProxy | void>;

  private _orginalCalculatMatch: PDFFindController['_calculateRegExpMatch'];

  public static get styles(): CSSResult[] {
    return [style];
  }

  public get pagesCount(): number {
    return this._pdfDocument.numPages;
  }

  public get page(): number {
    return this._pdfViewer.currentPageNumber;
  }

  public set page(val) {
    this._pdfViewer.currentPageNumber = val;
  }

  public connectedCallback(): void {
    if (super.connectedCallback) {
      super.connectedCallback();
    }

    window.addEventListener('resize', () => this._handleWindowResise());
  }

  public disconnectedCallback(): void {
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }

    window.removeEventListener('resize', () => this._handleWindowResise());
  }

  public render(): TemplateResult {
    return html`<header>
        <slot
          name="toolbar"
          @toolbarConnected=${this._handleToolbarConnected}
          @zoomIn=${this._handleZoomIn}
          @zoomOut=${this._handleZoomOut}
          @rotateCw=${this._handleRotateCw}
          @rotateCcw=${this._handleRotateCcw}
          @previousPage=${this._handlePrevious}
          @nextPage=${this._handleNext}
          @pageChange=${this._handlePageChange}
        >
          <lit-pdf-toolbar></lit-pdf-toolbar
        ></slot>
      </header>

      <div id="viewerContainer">
        <div id="viewer" class="pdfViewer"></div>
      </div>

      <slot name="loading">
        <div class="modal">
          <div class="modalContent">
            <span class="loadingText">Chargement : ${this._loadingPercent}%</span>
            <div id="loadingBar" class="loadingBar">
              <div class="progress" style="width: ${this._loadingPercent}%"></div>
            </div>
          </div>
        </div>
      </slot>

      <section ?hidden=${!this._openErrorPanel}>
        <slot name="error" @close=${(): void => this._toggleErrorPanel({ open: false })}>
          <lit-pdf-error
            errorMessage=${this._errorMessage}
            errorMoreInfo=${this._errorMoreInfo}
          ></lit-pdf-error>
        </slot>
      </section> `;
  }

  protected firstUpdated(): void {
    this.initViewer();
  }

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('src')) {
      this._loadingTaskPromise = this._open({
        url: this.src,
      });
    }
    if (_changedProperties.has('searchQueries') && this.searchQueries?.length) {
      this._removeAccents();
      this._searchWords();
    }
    if (_changedProperties.has('scale') && this.scale) {
      // Wait render before refresh pdfjs scale
      setTimeout(
        () => this._eventBus.dispatch('scalechanged', { value: this.scale }),
        this.scaleUpdateDelay,
      );
    }
  }

  /**
   * Opens PDF document specified by URL.
   * @returns {Promise} - Returns the promise, which is resolved when document
   *                      is opened.
   */
  private async _open(params: { url: string }): Promise<PDFDocumentProxy | void> {
    if (this._pdfLoadingTask) {
      // We need to destroy already opened document
      return this.close().then(() => {
        // ... and repeat the open() call.
        return this._open(params);
      });
    }

    const { url } = params;
    this.loaded = false;

    // Loading document.
    this._pdfLoadingTask = getDocument({
      url,
      maxImageSize: MAX_IMAGE_SIZE,
      cMapUrl: CMAP_URL,
      cMapPacked: CMAP_PACKED,
    });

    this._pdfLoadingTask.onProgress = (progressData: { loaded: number; total: number }): void => {
      this.progress(progressData.loaded / progressData.total);
    };

    // Document loaded, specifying document for the viewer.
    try {
      this._pdfDocument = await this._pdfLoadingTask.promise;
      this._pdfViewer.setDocument(this._pdfDocument);
      this._pdfLinkService.setDocument(this._pdfDocument);
      this._pdfFindController.setDocument(this._pdfDocument);
      this._toolbarEl.setAttribute('pageCount', `${this.pagesCount}`);
      this.loaded = true;
    } catch (exception) {
      this._handleError(exception);
      this.loaded = true;
    }

    return this._pdfDocument;
  }

  private async _handleError(
    exception: InvalidPDFException | MissingPDFException | UnexpectedResponseException,
  ): Promise<void> {
    const message = exception?.message;
    const { _l10n } = this;
    let loadingErrorMessage: Promise<string>;

    if (exception instanceof InvalidPDFException) {
      // change error message also for other builds
      loadingErrorMessage = _l10n.get('invalid_file_error', null, 'Invalid or corrupted PDF file.');
    } else if (exception instanceof MissingPDFException) {
      // special message for missing PDFs
      loadingErrorMessage = _l10n.get('missing_file_error', null, 'Missing PDF file.');
    } else if (exception instanceof UnexpectedResponseException) {
      loadingErrorMessage = _l10n.get(
        'unexpected_response_error',
        null,
        'Unexpected server response.',
      );
    } else {
      loadingErrorMessage = _l10n.get(
        'loading_error',
        null,
        'An error occurred while loading the PDF.',
      );
    }

    const msg = await loadingErrorMessage;
    this.error(msg, <IErrorInfo>{ message });
  }

  private async error(message: string, moreInfo: IErrorInfo): Promise<void> {
    const { _l10n } = this;
    const moreInfoText = [
      _l10n.get(
        'error_version_info',
        { version: version || '?', build: build || '?' },
        'PDF.js v{{version}} (build: {{build}})',
      ),
    ];

    this._errorMessage = message;
    this._toggleErrorPanel({ open: true });

    if (moreInfo) {
      moreInfoText.push(
        _l10n.get('error_message', { message: moreInfo.message }, 'Message: {{message}}'),
      );
      if (moreInfo.stack) {
        moreInfoText.push(_l10n.get('error_stack', { stack: moreInfo.stack }, 'Stack: {{stack}}'));
      } else {
        if (moreInfo.filename) {
          moreInfoText.push(_l10n.get('error_file', { file: moreInfo.filename }, 'File: {{file}}'));
        }
        if (moreInfo.lineNumber) {
          moreInfoText.push(
            _l10n.get('error_line', { line: moreInfo.lineNumber }, 'Line: {{line}}'),
          );
        }
      }
    }

    const parts = await Promise.all(moreInfoText);
    this._errorMoreInfo = parts.join('\n');
  }

  private _toggleErrorPanel({ open }: { open: boolean }): void {
    this._openErrorPanel = open;
  }

  /**
   * Closes opened PDF document.
   * @returns {Promise} - Returns the promise, which is resolved when all
   *                      destruction is completed.
   */
  private close(): Promise<void> {
    this._toggleErrorPanel({ open: false });

    if (!this._pdfLoadingTask) {
      return Promise.resolve();
    }

    const promise = this._pdfLoadingTask.destroy();
    this._pdfLoadingTask = null;

    if (this._pdfDocument) {
      this._pdfDocument = null;

      this._pdfViewer.setDocument(null);
      this._pdfLinkService.setDocument(null, null);
    }

    return promise;
  }

  private progress(level: number): void {
    const percent = Math.round(level * 100);
    // Updating the bar if value increases.
    if (percent > this._loadingPercent || Number.isNaN(percent)) {
      this._loadingPercent = percent;
    }
  }

  private initViewer(): void {
    this._eventBus = new EventBus();

    this._pdfLinkService = new PDFLinkService({
      eventBus: this._eventBus,
    });

    this._pdfFindController = new PDFFindController({
      linkService: this._pdfLinkService,
      eventBus: this._eventBus,
    });

    /**
     * Mutliple phrase Search
     * Wrap PdfFindController._calculateRegExpMatch for multiple phrase search
     */
    if (this.searchQueries?.length) {
      this._orginalCalculatMatch = this._pdfFindController._calculateRegExpMatch;
      this._pdfFindController._calculateRegExpMatch = (...args): void =>
        this._multiPhraseSearch(...args);
    }

    this._l10n = NullL10n;

    this._pdfViewer = new PDFViewer({
      container: this._viewerContainer,
      removePageBorders: true,
      renderer: null,
      eventBus: this._eventBus,
      linkService: this._pdfLinkService,
      findController: this._pdfFindController,
      l10n: this._l10n,
      useOnlyCssZoom: USE_ONLY_CSS_ZOOM,
    });
    this._pdfLinkService.setViewer(this._pdfViewer);

    this._eventBus.on(
      'pagechanging',
      evt => {
        const page = evt.pageNumber;
        this._pageNumberEl.value = page;
        this._previousPageEl.disabled = page <= 1;
        this._nextPageEl.disabled = page >= this.pagesCount;
      },
      true,
    );

    this._eventBus.on('pagesinit', () => {
      // We can use _pdfViewer now, e.g. let's change default scale.
      this._pdfViewer.currentScaleValue = this.scale;
    });
  }

  private _handleZoomIn(ticks: number): void {
    let newScale = this._pdfViewer.currentScale;
    do {
      newScale = Number((newScale * DEFAULT_SCALE_DELTA).toFixed(2));
      newScale = Math.ceil(newScale * 10) / 10;
      newScale = Math.min(MAX_SCALE, newScale);
      // eslint-disable-next-line no-plusplus, no-param-reassign
    } while (--ticks && newScale < MAX_SCALE);
    this._pdfViewer.currentScaleValue = newScale.toString();
  }

  private _handleZoomOut(ticks: number): void {
    let newScale = this._pdfViewer.currentScale;
    do {
      newScale = Number((newScale / DEFAULT_SCALE_DELTA).toFixed(2));
      newScale = Math.floor(newScale * 10) / 10;
      newScale = Math.max(MIN_SCALE, newScale);
      // eslint-disable-next-line no-plusplus, no-param-reassign
    } while (--ticks && newScale > MIN_SCALE);
    this._pdfViewer.currentScaleValue = newScale.toString();
  }

  private _handleRotateCw(): void {
    this._pdfViewer.pagesRotation += 90;
  }

  private _handleRotateCcw(): void {
    this._pdfViewer.pagesRotation -= 90;
  }

  private _handlePrevious(): void {
    this.page -= 1;
  }

  private _handleNext(): void {
    this.page += 1;
  }

  private _handlePageChange(): void {
    const input = this._pageNumberEl;
    this.page = input.value !== undefined ? Number(input.value) : 0;

    // Ensure that the page number input displays the correct value,
    // even if the value entered by the user was invalid
    // (e.g. a floating point number).
    if (input.value !== this.page.toString()) {
      input.value = this.page.toString();
    }
  }

  private _handleToolbarConnected(e: CustomEvent): void {
    this._toolbarEl = <HTMLElement>e.target;
    this._pageNumberEl = e.detail.pageNumberEl;
    this._previousPageEl = e.detail.previousPageEl;
    this._nextPageEl = e.detail.nextPageEl;
  }

  private _handleWindowResise(): void {
    const { currentScaleValue } = this._pdfViewer;
    if (
      currentScaleValue === 'auto' ||
      currentScaleValue === 'page-fit' ||
      currentScaleValue === 'page-width'
    ) {
      // Note: the scale is constant for 'page-actual'.
      this._pdfViewer.currentScaleValue = currentScaleValue;
    }
    this._pdfViewer.update();
  }

  private async _searchWords(): Promise<void> {
    await this._loadingTaskPromise;
    await this.updateComplete;

    setTimeout(() => {
      this._eventBus.dispatch('find', {
        source: this,
        type: '',
        query: this._searchQueriesNormalized[0],
        caseSensitive: false,
        entireWord: this.entireWord,
        phraseSearch: true,
        findPrevious: false,
        highlightAll: true,
        matchDiacritics: false,
        allowMatchScroll: false,
      });
    }, 500);
  }

  private _removeAccents(): void {
    this._searchQueriesNormalized = this.searchQueries.map(query => removeAccents(query));
  }

  private _multiPhraseSearch(
    initalquery: string,
    entireWord: boolean,
    pageIndex: number,
    pageContent: string,
  ): void {
    this._searchQueriesNormalized.forEach(rawquery => {
      const hasDiacritics = this._pdfFindController._hasDiacritics[pageIndex];
      const [isUnicode, query] = this._pdfFindController._convertToRegExpString(
        rawquery,
        hasDiacritics,
      );
      const flags = `g${isUnicode ? 'u' : ''}${
        this._pdfFindController._state.caseSensitive ? '' : 'i'
      }`;
      const queryRegex = new RegExp(query, flags);

      // Save previous matches
      const savedMatches = [];
      this._pdfFindController._pageMatches[pageIndex]?.forEach((match: number, index: number) => {
        savedMatches.push({
          match,
          length: this._pdfFindController._pageMatchesLength[pageIndex][index],
        });
      });

      // Call pdfjs original CalculatMatch function
      this._orginalCalculatMatch.call(
        this._pdfFindController,
        queryRegex,
        entireWord,
        pageIndex,
        pageContent,
      );

      // Apply previous matches to the new one
      this._pdfFindController._pageMatches[pageIndex]?.forEach((match: number, index: number) => {
        savedMatches.push({
          match,
          length: this._pdfFindController._pageMatchesLength[pageIndex][index],
        });
      });

      // Search matches must be ordered before highlighting
      if (savedMatches.length) {
        savedMatches.sort((a, b) => a.match - b.match);

        this._pdfFindController._pageMatches[pageIndex].length = 0;
        this._pdfFindController._pageMatchesLength[pageIndex].length = 0;
        savedMatches.forEach((item: { match: number; length: number }) => {
          this._pdfFindController._pageMatches[pageIndex].push(item.match);
          this._pdfFindController._pageMatchesLength[pageIndex].push(item.length);
        });
      }
    });
  }
}
