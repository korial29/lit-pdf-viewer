import { CSSResult, html, TemplateResult, LitElement, nothing, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist';
import { getTranslations, ThumbnailsTranslations } from '../i18n/i18n';

// @ts-ignore
import style from './lit-pdf-thumbnails.scss';

/** Target CSS width (px) a thumbnail canvas is rendered at, before device-pixel scaling. */
const THUMBNAIL_WIDTH = 110;

/**
 * Sidebar panel for `lit-pdf-viewer` listing a thumbnail per page. Shown/
 * hidden via the `open` property. Thumbnails render once, the first time the
 * panel is opened for a given document, rather than upfront while hidden.
 */
@customElement('lit-pdf-thumbnails')
export class LitPdfThumbnails extends LitElement {
  @property({ attribute: false }) public pdfDocument: PDFDocumentProxy | null = null;

  @property({ type: Boolean, reflect: true }) public open = false;

  @property({ type: Number }) public currentPage = 1;

  /** Locale to translate the panel into (defaults to the browser's language). */
  @property({ type: String }) public locale: string;

  /** Overrides for individual translation strings. */
  @property({ type: Object }) public translations: Partial<ThumbnailsTranslations> = {};

  private _renderedPages = new Set<number>();

  private _renderTasks = new Map<number, RenderTask>();

  public static get styles(): CSSResult[] {
    return [style];
  }

  private get _t(): ThumbnailsTranslations {
    return getTranslations(this.locale, { thumbnails: this.translations }).thumbnails;
  }

  private get _pageCount(): number {
    return this.pdfDocument?.numPages ?? 0;
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.setAttribute('role', 'navigation');
    this.setAttribute('aria-label', this._t.thumbnailsLabel);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();

    this._cancelPendingRenders();
  }

  public render(): TemplateResult {
    const t = this._t;

    if (!this._pageCount) {
      return html``;
    }

    return html`
      <ul class="list">
        ${Array.from({ length: this._pageCount }, (_value, index) => index + 1).map(
          pageNumber => html`
            <li>
              <button
                class="thumbnail"
                ?data-current=${pageNumber === this.currentPage}
                aria-current=${pageNumber === this.currentPage ? 'page' : nothing}
                aria-label=${t.pageLabel.replace('{number}', `${pageNumber}`)}
                data-page=${pageNumber}
                @click=${(): void => this._handleSelect(pageNumber)}
              >
                <canvas class="canvas"></canvas>
              </button>
              <span class="pageNumber" aria-hidden="true">${pageNumber}</span>
            </li>
          `,
        )}
      </ul>
    `;
  }

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('pdfDocument')) {
      this._cancelPendingRenders();
      this._renderedPages.clear();
    }
    if ((changedProperties.has('pdfDocument') || changedProperties.has('open')) && this.open) {
      this._renderThumbnails();
    }
    if (changedProperties.has('currentPage')) {
      this._scrollCurrentIntoView();
    }
    if (changedProperties.has('locale') || changedProperties.has('translations')) {
      this.setAttribute('aria-label', this._t.thumbnailsLabel);
    }
  }

  private _renderThumbnails(): void {
    this.renderRoot.querySelectorAll<HTMLElement>('.thumbnail').forEach(el => {
      this._renderThumbnail(Number(el.dataset.page));
    });
  }

  private async _renderThumbnail(pageNumber: number): Promise<void> {
    if (this._renderedPages.has(pageNumber) || !this.pdfDocument) {
      return;
    }
    this._renderedPages.add(pageNumber);

    const canvas = this.renderRoot.querySelector<HTMLCanvasElement>(
      `.thumbnail[data-page="${pageNumber}"] canvas`,
    );
    const context = canvas?.getContext('2d');
    if (!canvas || !context) {
      this._renderedPages.delete(pageNumber);
      return;
    }

    const page = await this.pdfDocument.getPage(pageNumber);
    const unscaledViewport = page.getViewport({ scale: 1 });
    const scale = THUMBNAIL_WIDTH / unscaledViewport.width;
    const viewport = page.getViewport({ scale });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderTask = page.render({ canvas, canvasContext: context, viewport });
    this._renderTasks.set(pageNumber, renderTask);

    try {
      await renderTask.promise;
    } catch {
      this._renderedPages.delete(pageNumber);
    } finally {
      this._renderTasks.delete(pageNumber);
    }
  }

  private _cancelPendingRenders(): void {
    this._renderTasks.forEach(task => task.cancel());
    this._renderTasks.clear();
  }

  private _scrollCurrentIntoView(): void {
    this.renderRoot.querySelector('.thumbnail[data-current]')?.scrollIntoView({ block: 'nearest' });
  }

  private _handleSelect(pageNumber: number): void {
    this.dispatchEvent(
      new CustomEvent('thumbnailSelect', { bubbles: true, detail: { pageNumber } }),
    );
  }
}
