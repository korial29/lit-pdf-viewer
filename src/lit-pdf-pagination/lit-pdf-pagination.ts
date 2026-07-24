import { CSSResult, html, TemplateResult, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import '../lit-icon/lit-icon';
import '../lit-tooltip/lit-tooltip';
import { getTranslations, PaginationTranslations } from '../i18n/i18n';

// @ts-ignore
import style from './lit-pdf-pagination.scss';

/**
 * Floating page-navigation pill for `lit-pdf-viewer`. Shown/hidden via the
 * `visible` property; the viewer shows it while the document scrolls and
 * auto-hides it a few seconds after scrolling stops.
 */
@customElement('lit-pdf-pagination')
export class LitPdfPagination extends LitElement {
  @property({ type: Number }) public pageCount: number;

  @property({ type: Boolean, reflect: true }) public visible = false;

  /** Locale to translate the pagination pill into (defaults to the browser's language). */
  @property({ type: String }) public locale: string;

  /** Overrides for individual translation strings. */
  @property({ type: Object }) public translations: Partial<PaginationTranslations> = {};

  @query('#previous') private _previousPageEl: HTMLButtonElement;

  @query('#next') private _nextPageEl: HTMLButtonElement;

  @query('#pageNumber') private _pageNumberEl: HTMLButtonElement;

  public static get styles(): CSSResult[] {
    return [style];
  }

  private get _t(): PaginationTranslations {
    return getTranslations(this.locale, { pagination: this.translations }).pagination;
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.setAttribute('role', 'group');
    this.setAttribute('aria-label', this._t.paginationLabel);
  }

  public render(): TemplateResult {
    const t = this._t;

    return html`
      <lit-tooltip text=${t.previousPage}>
        <button
          class="toolbarButton pageUp"
          aria-label=${t.previousPage}
          id="previous"
          disabled
          @click=${this._handlePrevious}
        >
          <lit-icon icon="arrow-up"></lit-icon>
        </button>
      </lit-tooltip>
      <lit-tooltip text=${t.nextPage}>
        <button
          class="toolbarButton pageDown"
          aria-label=${t.nextPage}
          id="next"
          @click=${this._handleNext}
        >
          <lit-icon icon="arrow-down"></lit-icon>
        </button>
      </lit-tooltip>

      <input
        type="number"
        id="pageNumber"
        class="toolbarField pageNumber"
        value="1"
        size="4"
        min="1"
        aria-label=${t.pageNumber}
        aria-describedby="pageCount"
        @change=${this._handlePageChange}
      />
      <span class="pageCount" id="pageCount"> / ${this.pageCount}</span>
    `;
  }

  protected updated(changedProperties: Map<PropertyKey, unknown>): void {
    if (changedProperties.has('locale') || changedProperties.has('translations')) {
      this.setAttribute('aria-label', this._t.paginationLabel);
    }
  }

  protected firstUpdated(): void {
    this.dispatchEvent(
      new CustomEvent('paginationConnected', {
        bubbles: true,
        detail: {
          previousPageEl: this._previousPageEl,
          nextPageEl: this._nextPageEl,
          pageNumberEl: this._pageNumberEl,
        },
      }),
    );
  }

  private _handlePrevious(): void {
    this.dispatchEvent(new CustomEvent('previousPage', { bubbles: true }));
  }

  private _handleNext(): void {
    this.dispatchEvent(new CustomEvent('nextPage', { bubbles: true }));
  }

  private _handlePageChange(): void {
    this.dispatchEvent(new CustomEvent('pageChange', { bubbles: true }));
  }
}
