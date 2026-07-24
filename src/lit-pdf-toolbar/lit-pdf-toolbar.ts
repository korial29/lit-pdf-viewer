import { CSSResult, html, TemplateResult, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../lit-icon/lit-icon';
import '../lit-tooltip/lit-tooltip';
import '../lit-popover/lit-popover';
import { getTranslations, ToolbarTranslations } from '../i18n/i18n';

// @ts-ignore
import style from './lit-pdf-toolbar.scss';

@customElement('lit-pdf-toolbar')
export class LitPdfToolbar extends LitElement {
  @property({ type: Boolean }) public isPrintDisabled: boolean;

  @property({ type: Boolean }) public isDownloadDisabled: boolean;

  @property({ type: Boolean }) public isSidebarOpen: boolean;

  /** Locale to translate the toolbar into (defaults to the browser's language). */
  @property({ type: String }) public locale: string;

  /** Overrides for individual translation strings. */
  @property({ type: Object }) public translations: Partial<ToolbarTranslations> = {};

  public static get styles(): CSSResult[] {
    return [style];
  }

  private get _t(): ToolbarTranslations {
    return getTranslations(this.locale, { toolbar: this.translations }).toolbar;
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.setAttribute('role', 'toolbar');
    this.setAttribute('aria-label', this._t.toolbarLabel);
  }

  public render(): TemplateResult {
    const t = this._t;

    return html`
      <section class="container" role="group" aria-label=${t.sidebarControls}>
        <lit-tooltip text=${t.toggleSidebar}>
          <button
            class="toolbarButton sidebarToggle"
            aria-label=${t.toggleSidebar}
            aria-expanded=${this.isSidebarOpen ? 'true' : 'false'}
            @click=${this._handleToggleSidebar}
          >
            <span class="sidebarIcon" aria-hidden="true">☰</span>
          </button>
        </lit-tooltip>
      </section>

      <span class="separator" role="separator" aria-orientation="vertical"></span>

      <section class="container" role="group" aria-label=${t.zoomControls}>
        <lit-tooltip text=${t.zoomOut}>
          <button
            class="toolbarButton zoomOut"
            aria-label=${t.zoomOut}
            id="zoomOut"
            @click=${this._handleZoomOut}
          >
            <lit-icon icon="minus"></lit-icon>
          </button>
        </lit-tooltip>
        <lit-tooltip text=${t.zoomIn}>
          <button
            class="toolbarButton zoomIn"
            aria-label=${t.zoomIn}
            id="zoomIn"
            @click=${this._handleZoomIn}
          >
            <lit-icon icon="plus"></lit-icon>
          </button>
        </lit-tooltip>
      </section>

      <span class="separator" role="separator" aria-orientation="vertical"></span>

      <section class="container actions" role="group" aria-label=${t.documentActions}>
        <!-- Secondary actions: inline on desktop, hidden on small screens where
             they move into the "..." overflow menu below. -->
        <lit-tooltip class="inlineOnly" text=${t.rotateCounterClockwise}>
          <button
            class="toolbarButton rotateCcw"
            aria-label=${t.rotateCounterClockwise}
            @click=${this._handleRotateCcw}
          >
            <lit-icon icon="rotate-ccw"></lit-icon>
          </button>
        </lit-tooltip>
        <lit-tooltip class="inlineOnly" text=${t.rotateClockwise}>
          <button
            class="toolbarButton rotateCw"
            aria-label=${t.rotateClockwise}
            @click=${this._handleRotateCw}
          >
            <lit-icon icon="rotate-cw"></lit-icon>
          </button>
        </lit-tooltip>
        <lit-tooltip text=${t.print}>
          <button
            class="toolbarButton print"
            aria-label=${t.print}
            @click=${!this.isPrintDisabled && this._handlePrint}
            ?disabled=${this.isPrintDisabled}
          >
            <lit-icon icon="print"></lit-icon>
          </button>
        </lit-tooltip>

        <lit-tooltip text=${t.download}>
          <button
            class="toolbarButton download"
            aria-label=${t.download}
            @click=${!this.isDownloadDisabled && this._handleDownload}
            ?disabled=${this.isDownloadDisabled}
          >
            <lit-icon icon="download"></lit-icon>
          </button>
        </lit-tooltip>

        <!-- On small screens the rotate buttons collapse into this "..."
             overflow menu, pinned to the far right. It is hidden on desktop. -->
        <lit-tooltip class="moreWrapper" text=${t.more}>
          <lit-popover class="morePopover" align="right">
            <button
              slot="anchor"
              class="toolbarButton more"
              aria-label=${t.more}
              aria-haspopup="menu"
            >
              <span class="moreIcon" aria-hidden="true">⋯</span>
            </button>

            <button
              class="toolbarButton rotateCcw"
              title=${t.rotateCounterClockwise}
              aria-label=${t.rotateCounterClockwise}
              role="menuitem"
              @click=${this._handleRotateCcw}
            >
              <lit-icon icon="rotate-ccw"></lit-icon>
            </button>
            <button
              class="toolbarButton rotateCw"
              title=${t.rotateClockwise}
              aria-label=${t.rotateClockwise}
              role="menuitem"
              @click=${this._handleRotateCw}
            >
              <lit-icon icon="rotate-cw"></lit-icon>
            </button>
          </lit-popover>
        </lit-tooltip>
      </section>
    `;
  }

  protected updated(changedProperties: Map<PropertyKey, unknown>): void {
    if (changedProperties.has('locale') || changedProperties.has('translations')) {
      this.setAttribute('aria-label', this._t.toolbarLabel);
    }
  }

  protected firstUpdated(): void {
    this.dispatchEvent(new CustomEvent('toolbarConnected', { bubbles: true }));
  }

  private _handleToggleSidebar(): void {
    this.dispatchEvent(new CustomEvent('toggleSidebar', { bubbles: true }));
  }

  private _handleZoomIn(): void {
    this.dispatchEvent(new CustomEvent('zoomIn', { bubbles: true }));
  }

  private _handleZoomOut(): void {
    this.dispatchEvent(new CustomEvent('zoomOut', { bubbles: true }));
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
