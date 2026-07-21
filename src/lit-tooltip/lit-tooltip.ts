import { CSSResult, html, TemplateResult, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// @ts-ignore
import style from './lit-tooltip.scss';

/**
 * A small popover shown below an anchor element.
 *
 * ```html
 * <lit-tooltip align="right">
 *   <button slot="anchor">…</button>
 *   <!-- default slot: popover content -->
 *   <button>Action</button>
 * </lit-tooltip>
 * ```
 *
 * Clicking the anchor toggles the popover; it closes on an outside click or the
 * Escape key. Call `close()` to dismiss it programmatically (e.g. once an action
 * inside it has run).
 */
@customElement('lit-tooltip')
export class LitTooltip extends LitElement {
  /** Horizontal edge the popover is aligned to. */
  @property({ type: String }) public align: 'left' | 'right' = 'left';

  /** Whether the popover is currently visible. */
  @property({ type: Boolean, reflect: true }) public open = false;

  public static get styles(): CSSResult[] {
    return [style];
  }

  public connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('click', this._handleOutsideClick, true);
    window.addEventListener('keydown', this._handleKeydown, true);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('click', this._handleOutsideClick, true);
    window.removeEventListener('keydown', this._handleKeydown, true);
  }

  public render(): TemplateResult {
    return html`
      <div class="anchor" @click=${this._toggle}>
        <slot name="anchor"></slot>
      </div>
      <div class="content" data-align=${this.align} ?data-open=${this.open}>
        <slot></slot>
      </div>
    `;
  }

  /** Hide the popover. */
  public close(): void {
    this.open = false;
  }

  private _toggle(): void {
    this.open = !this.open;
  }

  // Arrow functions so `this` stays bound when used as window listeners.
  private _handleOutsideClick = (event: MouseEvent): void => {
    if (this.open && !event.composedPath().includes(this)) {
      this.open = false;
    }
  };

  private _handleKeydown = (event: KeyboardEvent): void => {
    if (this.open && event.key === 'Escape') {
      this.open = false;
    }
  };
}
