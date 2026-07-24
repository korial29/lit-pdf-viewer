import { CSSResult, html, TemplateResult, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
// Type-only: erased at compile time, so these don't pull pdfjs-dist's runtime
// code into this module. The actual runtime values are loaded on demand by
// `loadPdfjsModules()` below — see the comment there for why.
import type {
  PDFDocumentProxy,
  PDFDocumentLoadingTask,
  InvalidPDFException,
  ResponseException,
} from 'pdfjs-dist';
import type {
  EventBus,
  PDFLinkService,
  PDFViewer,
  PDFFindController,
  DownloadManager,
} from 'pdfjs-dist/web/pdf_viewer.mjs';

// Helpers
import { removeAccents } from '../helpers/remove-accents';
import { loadPdfjsLib, loadPdfjsViewer, PdfjsLib } from '../helpers/load-pdfjs';

// Components
import '../lit-pdf-toolbar/lit-pdf-toolbar';
import '../lit-pdf-pagination/lit-pdf-pagination';
import '../lit-pdf-thumbnails/lit-pdf-thumbnails';
import '../lit-pdf-error/lit-pdf-error';
import '../lit-pdf-search/lit-pdf-search';

// Services
import PdfPrintService from '../helpers/print';

import { IErrorInfo } from '../types/error';
import { getTranslations, Translations, TranslationsOverride } from '../i18n/i18n';

// @ts-ignore
import style from './lit-pdf-viewer.scss';

const DEFAULT_SCALE_DELTA = 1.1;
const MIN_SCALE = 0.25;
const MAX_SCALE = 10.0;
const MAX_IMAGE_SIZE = 1024 * 1024;
const CMAP_URL = 'pdfjs-dist/cmaps/';
const CMAP_PACKED = true;
const PAGINATION_HIDE_DELAY = 5000;

@customElement('lit-pdf-viewer')
export class LitPdfViewer extends LitElement {
  /**
   * Url of the PDF to download and display
   */
  @property({ type: String }) public src: string;

  /**
   * If the print src is different from the displayed pdf document.
   * Setting this property will download another document with the specified printSrc and print it
   */
  @property({ type: String }) public printSrc: string;

  @property({ type: String }) public token: string;

  @property({ type: Array }) public searchQueries: string[] = [];

  @property({ type: Boolean }) public entireWord = false;

  @property({ type: String }) public scale = 'auto';

  @property({ type: Number }) public scaleUpdateDelay = 300;

  @property({ type: String }) public authorization: string;

  @property({ type: Boolean, reflect: true }) public loaded: boolean;

  /**
   * Shows the floating find-in-page bar automatically when set (it also
   * shows automatically whenever `searchQueries` is non-empty). It can also
   * be opened at any time with the Ctrl+F / Cmd+F shortcut.
   */
  @property({ type: Boolean, reflect: true }) public isSearchBarDisplayed = false;

  /** Locale to translate the UI into (defaults to the browser's language). */
  @property({ type: String }) public locale: string;

  /** Overrides for individual translation strings, per namespace. */
  @property({ type: Object }) public translations: TranslationsOverride = {};

  @query('#viewerContainer') private _viewerContainer: HTMLDivElement;

  @state() private _loadingPercent = 0;

  @state() private _searchOpen = false;

  @state() private _searchMatchCount = 0;

  @state() private _searchCurrentMatch = 0;

  @state() private _searchNotFound = false;

  /** Prefills the search bar's input when it opens (e.g. from `searchQueries`). */
  @state() private _initialSearchQuery = '';

  private _searchQuery = '';

  @state() private _errorMessage: string;

  @state() private _errorMoreInfo: string;

  @state() private _openErrorPanel: boolean;

  @state() private _paginationVisible = false;

  @state() private _sidebarOpen = false;

  @state() private _isFullscreen = false;

  @state() private _zoomPercent = 100;

  @state() private _currentPage = 1;

  private _searchQueriesNormalized: string[];

  private _pageNumberEl: HTMLInputElement;

  private _previousPageEl: HTMLButtonElement;

  private _nextPageEl: HTMLButtonElement;

  private _toolbarEl: HTMLElement;

  private _paginationEl: HTMLElement;

  private _paginationHideTimeout: ReturnType<typeof setTimeout>;

  private _pdfLoadingTask: PDFDocumentLoadingTask;

  private _pdfDocument: PDFDocumentProxy;

  private _pdfViewer: PDFViewer;

  private _pdfLinkService: PDFLinkService;

  private _pdfFindController: PDFFindController;

  private _downloadManager: DownloadManager;

  private _eventBus: EventBus;

  private _loadingTaskPromise: Promise<PDFDocumentProxy | void>;

  private _pdfjsLib: PdfjsLib;

  /** Resolves once pdfjs-dist's dynamically-imported modules are loaded and `_pdfViewer` etc. are constructed. */
  private _viewerReadyPromise: Promise<void>;

  public static get styles(): CSSResult[] {
    return [style];
  }

  public get pagesCount(): number {
    return this._pdfDocument.numPages;
  }

  public get page(): number {
    return this._pdfViewer.currentPageNumber;
  }

  private get _t(): Translations {
    return getTranslations(this.locale, this.translations);
  }

  public set page(val) {
    this._pdfViewer.currentPageNumber = val;
  }

  public connectedCallback(): void {
    if (super.connectedCallback) {
      super.connectedCallback();
    }

    // Set before the first render (rather than in `updated()`) so the bar is
    // already open on the very first paint when `isSearchBarDisplayed` (or a
    // non-empty `searchQueries`) is present in the initial markup.
    this._searchOpen = this._shouldDisplaySearchBar();
    this._searchQuery = this._initialSearchQuery = this._joinedSearchQueries();

    window.addEventListener('resize', this._handleWindowResise);
    window.addEventListener('keydown', this._handleGlobalKeydown);
    this.addEventListener('fullscreenchange', this._handleFullscreenChange);
  }

  public disconnectedCallback(): void {
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }

    window.removeEventListener('resize', this._handleWindowResise);
    window.removeEventListener('keydown', this._handleGlobalKeydown);
    this.removeEventListener('fullscreenchange', this._handleFullscreenChange);
    this._viewerContainer?.removeEventListener('scroll', this._handleViewerScroll);
    clearTimeout(this._paginationHideTimeout);
  }

  public render(): TemplateResult {
    const t = this._t;

    return html`<header>
        <slot
          name="toolbar"
          @toolbarConnected=${this._handleToolbarConnected}
          @toggleSidebar=${this._handleToggleSidebar}
          @zoomIn=${this._handleZoomIn}
          @zoomOut=${this._handleZoomOut}
          @rotateCw=${this._handleRotateCw}
          @rotateCcw=${this._handleRotateCcw}
          @print=${this._handlePrint}
          @download=${this._handleDownload}
          @toggleSearch=${this._handleToggleSearch}
          @toggleFullscreen=${this._handleToggleFullscreen}
          @zoomChange=${this._handleZoomChange}
        >
          <lit-pdf-toolbar
            isDownloadDisabled
            isPrintDisabled
            ?isSidebarOpen=${this._sidebarOpen}
            ?isFullscreen=${this._isFullscreen}
            zoomPercent=${this._zoomPercent}
            locale=${this.locale}
            .translations=${this.translations?.toolbar}
          ></lit-pdf-toolbar
        ></slot>

        <slot
          name="search"
          @searchQuery=${this._handleSearchQuery}
          @searchNext=${this._handleSearchNext}
          @searchPrevious=${this._handleSearchPrevious}
          @searchClose=${this._handleSearchClose}
        >
          <lit-pdf-search
            ?open=${this._searchOpen}
            query=${this._initialSearchQuery}
            matchCount=${this._searchMatchCount}
            currentMatch=${this._searchCurrentMatch}
            ?notFound=${this._searchNotFound}
            locale=${this.locale}
            .translations=${this.translations?.search}
          ></lit-pdf-search
        ></slot>
      </header>

      <div class="contentWrapper">
        <lit-pdf-thumbnails
          ?open=${this._sidebarOpen}
          .pdfDocument=${this._pdfDocument}
          .currentPage=${this._currentPage}
          locale=${this.locale}
          .translations=${this.translations?.thumbnails}
          @thumbnailSelect=${this._handleThumbnailSelect}
        ></lit-pdf-thumbnails>

        <div class="viewerWrapper">
          <div id="viewerContainer">
            <div id="viewer" class="pdfViewer"></div>
          </div>

          <lit-pdf-pagination
            ?visible=${this._paginationVisible}
            locale=${this.locale}
            .translations=${this.translations?.pagination}
            @paginationConnected=${this._handlePaginationConnected}
            @previousPage=${this._handlePrevious}
            @nextPage=${this._handleNext}
            @pageChange=${this._handlePageChange}
          ></lit-pdf-pagination>
        </div>
      </div>

      <slot name="loading">
        <div class="modal">
          <div class="modalContent">
            <span class="loadingText"
              >${t.viewer.loading.replace('{percent}', `${this._loadingPercent}`)}</span
            >
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
            locale=${this.locale}
            .translations=${this.translations?.error}
          ></lit-pdf-error>
        </slot>
      </section> `;
  }

  protected firstUpdated(): void {
    this._viewerReadyPromise = this.initViewer();
    this._viewerContainer.addEventListener('scroll', this._handleViewerScroll);
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
      this._searchQuery = this._initialSearchQuery = this._joinedSearchQueries();
    }
    if (_changedProperties.has('scale') && this.scale) {
      // Wait render before refresh pdfjs scale
      setTimeout(async () => {
        await this._viewerReadyPromise;
        this._eventBus.dispatch('scalechanged', { value: this.scale });
      }, this.scaleUpdateDelay);
    }
    if (_changedProperties.has('isSearchBarDisplayed') || _changedProperties.has('searchQueries')) {
      this._searchOpen = this._shouldDisplaySearchBar();
    }
  }

  private _shouldDisplaySearchBar(): boolean {
    return this.isSearchBarDisplayed || this.searchQueries?.length > 0;
  }

  private _joinedSearchQueries(): string {
    return this.searchQueries?.length ? this.searchQueries.join(', ') : '';
  }

  /**
   * Opens PDF document specified by URL.
   * @returns {Promise} - Returns the promise, which is resolved when document
   *                      is opened.
   */
  private async _open(params: { url: string }): Promise<PDFDocumentProxy | void> {
    await this._viewerReadyPromise;

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
    this._pdfLoadingTask = this._pdfjsLib.getDocument({
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
      this._paginationEl.setAttribute('pageCount', `${this.pagesCount}`);
      this._toolbarEl.toggleAttribute('isDownloadDisabled', false);
      this._toolbarEl.toggleAttribute('isPrintDisabled', false);
      this.loaded = true;
    } catch (exception) {
      this._handleError(exception);
      this.loaded = true;
    }

    return this._pdfDocument;
  }

  private _handleError(exception: InvalidPDFException | ResponseException): void {
    const message = exception?.message;
    const errorTranslations = this._t.error;
    let loadingErrorMessage: string;

    if (exception instanceof this._pdfjsLib.InvalidPDFException) {
      loadingErrorMessage = errorTranslations.invalidPdf;
    } else if (exception instanceof this._pdfjsLib.ResponseException && exception.missing) {
      // special message for missing PDFs (e.g. HTTP 404)
      loadingErrorMessage = errorTranslations.missingPdf;
    } else if (exception instanceof this._pdfjsLib.ResponseException) {
      loadingErrorMessage = errorTranslations.unexpectedResponse;
    } else {
      loadingErrorMessage = errorTranslations.genericError;
    }

    this.error(loadingErrorMessage, <IErrorInfo>{ message });
  }

  private error(message: string, moreInfo: IErrorInfo): void {
    const errorTranslations = this._t.error;
    const moreInfoText = [
      `PDF.js v${this._pdfjsLib.version || '?'} (build: ${this._pdfjsLib.build || '?'})`,
    ];

    this._errorMessage = message;
    this._toggleErrorPanel({ open: true });

    if (moreInfo) {
      moreInfoText.push(`${errorTranslations.messageLabel}: ${moreInfo.message}`);
      if (moreInfo.stack) {
        moreInfoText.push(`${errorTranslations.stackLabel}: ${moreInfo.stack}`);
      } else {
        if (moreInfo.filename) {
          moreInfoText.push(`${errorTranslations.fileLabel}: ${moreInfo.filename}`);
        }
        if (moreInfo.lineNumber) {
          moreInfoText.push(`${errorTranslations.lineLabel}: ${moreInfo.lineNumber}`);
        }
      }
    }

    this._errorMoreInfo = moreInfoText.join('\n');
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

  private async initViewer(): Promise<void> {
    const [pdfjsLib, pdfjsViewerModule] = await Promise.all([loadPdfjsLib(), loadPdfjsViewer()]);
    const { EventBus, PDFLinkService, PDFViewer, PDFFindController, DownloadManager, FindState } =
      pdfjsViewerModule;
    this._pdfjsLib = pdfjsLib;

    this._eventBus = new EventBus();

    this._pdfLinkService = new PDFLinkService({
      eventBus: this._eventBus,
    });

    this._pdfFindController = new PDFFindController({
      linkService: this._pdfLinkService,
      eventBus: this._eventBus,
    });

    this._downloadManager = new DownloadManager();

    this._pdfViewer = new PDFViewer({
      container: this._viewerContainer,
      removePageBorders: true,
      eventBus: this._eventBus,
      linkService: this._pdfLinkService,
      findController: this._pdfFindController,
      downloadManager: this._downloadManager,
    });
    this._pdfLinkService.setViewer(this._pdfViewer);

    this._eventBus.on(
      'pagechanging',
      evt => {
        const page = evt.pageNumber;
        this._pageNumberEl.value = page;
        this._previousPageEl.disabled = page <= 1;
        this._nextPageEl.disabled = page >= this.pagesCount;
        this._currentPage = page;
      },
      true,
    );

    this._eventBus.on('pagesinit', () => {
      // We can use _pdfViewer now, e.g. let's change default scale.
      this._pdfViewer.currentScaleValue = this.scale;
    });

    this._eventBus.on('scalechanging', ({ scale }) => {
      this._zoomPercent = Math.round(scale * 100);
    });

    this._eventBus.on('updatefindmatchescount', ({ matchesCount }) => {
      this._searchMatchCount = matchesCount.total;
      this._searchCurrentMatch = matchesCount.current;
    });

    this._eventBus.on('updatefindcontrolstate', ({ state, matchesCount }) => {
      this._searchMatchCount = matchesCount.total;
      this._searchCurrentMatch = matchesCount.current;
      this._searchNotFound = state === FindState.NOT_FOUND;
    });
  }

  private _handleZoomIn(ticks: number): void {
    let newScale = this._pdfViewer.currentScale;
    do {
      newScale = Number((newScale * DEFAULT_SCALE_DELTA).toFixed(2));
      newScale = Math.ceil(newScale * 10) / 10;
      newScale = Math.min(MAX_SCALE, newScale);
    } while (--ticks && newScale < MAX_SCALE);
    this._pdfViewer.currentScaleValue = newScale.toString();
  }

  private _handleZoomOut(ticks: number): void {
    let newScale = this._pdfViewer.currentScale;
    do {
      newScale = Number((newScale / DEFAULT_SCALE_DELTA).toFixed(2));
      newScale = Math.floor(newScale * 10) / 10;
      newScale = Math.max(MIN_SCALE, newScale);
    } while (--ticks && newScale > MIN_SCALE);
    this._pdfViewer.currentScaleValue = newScale.toString();
  }

  private _handleZoomChange(e: CustomEvent<{ value: number }>): void {
    const clampedPercent = Math.min(MAX_SCALE * 100, Math.max(MIN_SCALE * 100, e.detail.value));
    this._pdfViewer.currentScaleValue = (clampedPercent / 100).toString();
  }

  private _handleRotateCw(): void {
    this._pdfViewer.pagesRotation += 90;
  }

  private _handleRotateCcw(): void {
    this._pdfViewer.pagesRotation -= 90;
  }

  private _handleToggleSidebar(): void {
    this._sidebarOpen = !this._sidebarOpen;
  }

  private _handleThumbnailSelect(e: CustomEvent<{ pageNumber: number }>): void {
    this.page = e.detail.pageNumber;

    // On narrow screens the sidebar overlays the document instead of sharing
    // the row with it, so close it once a page has been picked to reveal
    // what was just navigated to.
    if (window.matchMedia('(max-width: 600px)').matches) {
      this._sidebarOpen = false;
    }
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

  private async _handlePrint(e: CustomEvent): Promise<void> {
    const toolbar = <HTMLElement>e.target;
    toolbar.toggleAttribute('isPrintDisabled', true);

    const printService = PdfPrintService.getInstance();
    await printService.print({
      printSrc: this.printSrc,
      token: this.token,
      pdfDocument: this._pdfDocument,
    });

    printService.onProgress = (progressData: { loaded: number; total: number }): void => {
      const progress = progressData.loaded / progressData.total;
      this.progress(progress);
      this.loaded = progress === 1;
    };

    toolbar.toggleAttribute('isPrintDisabled', false);
  }

  private async _handleDownload(e: CustomEvent): Promise<void> {
    const toolbar = <HTMLElement>e.target;
    toolbar.toggleAttribute('isDownloadDisabled', true);

    const data = await this._pdfDocument.getData();
    this._downloadManager.download(data, this.src, this._pdfjsLib.getFilenameFromUrl(this.src));

    toolbar.toggleAttribute('isDownloadDisabled', false);
  }

  private _handleToolbarConnected(e: CustomEvent): void {
    this._toolbarEl = <HTMLElement>e.target;
  }

  private _handlePaginationConnected(e: CustomEvent): void {
    this._paginationEl = <HTMLElement>e.target;
    this._pageNumberEl = e.detail.pageNumberEl;
    this._previousPageEl = e.detail.previousPageEl;
    this._nextPageEl = e.detail.nextPageEl;
  }

  private _handleViewerScroll = (): void => {
    this._paginationVisible = true;
    clearTimeout(this._paginationHideTimeout);
    this._paginationHideTimeout = setTimeout(() => {
      this._paginationVisible = false;
    }, PAGINATION_HIDE_DELAY);
  };

  private _handleGlobalKeydown = (e: KeyboardEvent): void => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'f') {
      e.preventDefault();
      this._searchOpen = true;
    }
  };

  private _handleToggleSearch(): void {
    if (this._searchOpen) {
      this._handleSearchClose();
    } else {
      this._searchOpen = true;
    }
  }

  private async _handleToggleFullscreen(): Promise<void> {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await this.requestFullscreen();
    }
  }

  private _handleFullscreenChange = (): void => {
    this._isFullscreen = document.fullscreenElement === this;
  };

  private _handleSearchQuery(e: CustomEvent<{ query: string }>): void {
    this._searchQuery = e.detail.query;
    this._dispatchFind({ type: '', findPrevious: false });
  }

  private _handleSearchNext(): void {
    this._dispatchFind({ type: 'again', findPrevious: false });
  }

  private _handleSearchPrevious(): void {
    this._dispatchFind({ type: 'again', findPrevious: true });
  }

  private _handleSearchClose(): void {
    this._searchOpen = false;
    this._searchQuery = '';
    this._searchMatchCount = 0;
    this._searchCurrentMatch = 0;
    this._searchNotFound = false;
    this._eventBus.dispatch('findbarclose', { source: this });
  }

  private _dispatchFind({ type, findPrevious }: { type: string; findPrevious: boolean }): void {
    const query = this._searchQuery
      .split(',')
      .map(term => removeAccents(term.trim()))
      .filter(Boolean);

    if (!query.length) {
      return;
    }

    this._eventBus.dispatch('find', {
      source: this,
      type,
      query,
      caseSensitive: false,
      entireWord: false,
      findPrevious,
      highlightAll: true,
      matchDiacritics: false,
    });
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
        // Since v6 the find controller natively supports an array of queries
        // for multi-phrase search, replacing the previous internal hack.
        query: this._searchQueriesNormalized,
        caseSensitive: false,
        entireWord: this.entireWord,
        findPrevious: false,
        highlightAll: true,
        matchDiacritics: false,
      });
    }, 500);
  }

  private _removeAccents(): void {
    this._searchQueriesNormalized = this.searchQueries.map(query => removeAccents(query));
  }
}
