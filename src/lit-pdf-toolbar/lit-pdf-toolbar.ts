import { CSSResult, html, TemplateResult, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import '../lit-icon/lit-icon';

// @ts-ignore
import style from './lit-pdf-toolbar.scss';

@customElement('lit-pdf-toolbar')
export class LitPdfToolbar extends LitElement {
  @property({ type: Number }) public pageCount: number;

  @property({ type: Boolean }) public isPrintDisabled: boolean;

  @property({ type: Boolean }) public isDownloadDisabled: boolean;

  @query('#previous') private _previousPageEl: HTMLButtonElement;

  @query('#next') private _nextPageEl: HTMLButtonElement;

  @query('#pageNumber') private _pageNumberEl: HTMLButtonElement;

  public static get styles(): CSSResult[] {
    return [style];
  }

  public render(): TemplateResult {
    return html`
      <section class="container">
        <button
          class="toolbarButton pageUp"
          title="Previous Page"
          id="previous"
          disabled
          @click=${this._handlePrevious}
        >
          <lit-icon icon="arrow-up" alt="previous"></lit-icon>
        </button>
        <button
          class="toolbarButton pageDown"
          title="Next Page"
          id="next"
          @click=${this._handleNext}
        >
          <lit-icon icon="arrow-down" alt="next"></lit-icon>
        </button>

        <input
          type="number"
          id="pageNumber"
          class="toolbarField pageNumber"
          value="1"
          size="4"
          min="1"
          @change=${this._handlePageChange}
        />
        <span class="pageCount"> / ${this.pageCount}</span>
      </section>

      <span class="separator"></span>

      <section class="container">
        <button
          class="toolbarButton zoomOut"
          title="Zoom Out"
          id="zoomOut"
          @click=${this._handleZoomOut}
        >
          <lit-icon icon="minus" alt="zoom out"></lit-icon>
        </button>
        <button
          class="toolbarButton zoomIn"
          title="Zoom In"
          id="zoomIn"
          @click=${this._handleZoomIn}
        >
          <lit-icon icon="plus" alt="zoom in"></lit-icon>
        </button>
      </section>

      <span class="separator"></span>

      <section class="container">
        <button
          class="toolbarButton rotateCcw"
          title="Rotate counter clockwise"
          id="RotateCcw"
          @click=${this._handleRotateCcw}
        >
          <lit-icon icon="rotate-ccw" alt="Rotate counter clockwise"></lit-icon>
        </button>
        <button
          class="toolbarButton rotateCw"
          title="Rotate clockwise"
          id="RotateCw"
          @click=${this._handleRotateCw}
        >
          <lit-icon icon="rotate-cw" alt="Rotate clockwise"></lit-icon>
        </button>
        <button
          class="toolbarButton print"
          title="Print"
          id="Print"
          @click=${!this.isPrintDisabled && this._handlePrint}
          ?disabled=${this.isPrintDisabled}
        >
          <lit-icon icon="print" alt="Print"></lit-icon>
        </button>

        <button
          class="toolbarButton download"
          title="Download"
          id="Download"
          @click=${!this.isDownloadDisabled && this._handleDownload}
          ?disabled=${this.isDownloadDisabled}
        >
          <lit-icon icon="download" alt="Download"></lit-icon>
        </button>
      </section>
    `;
  }

  protected firstUpdated(): void {
    this.dispatchEvent(
      new CustomEvent('toolbarConnected', {
        bubbles: true,
        detail: {
          previousPageEl: this._previousPageEl,
          nextPageEl: this._nextPageEl,
          pageNumberEl: this._pageNumberEl,
        },
      }),
    );
  }

  private _handleZoomIn(): void {
    this.dispatchEvent(new CustomEvent('zoomIn', { bubbles: true }));
  }

  private _handleZoomOut(): void {
    this.dispatchEvent(new CustomEvent('zoomOut', { bubbles: true }));
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

  private _handleRotateCw(): void {
    this.dispatchEvent(new CustomEvent('rotateCw', { bubbles: true }));
  }

  private _handleRotateCcw(): void {
    this.dispatchEvent(new CustomEvent('rotateCcw', { bubbles: true }));
  }

  private _handlePrint(): void {
    this.dispatchEvent(new CustomEvent('print', { bubbles: true }));
  }

  private _handleDownload(): void {
    this.dispatchEvent(new CustomEvent('download', { bubbles: true }));
  }
}
