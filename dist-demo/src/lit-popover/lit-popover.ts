import { CSSResult, html, TemplateResult, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

// @ts-ignore
import style from './lit-popover.scss';

/**
 * A small popover menu shown below an anchor element.
 *
 * ```html
 * <lit-popover align="right">
 *   <button slot="anchor">…</button>
 *   <!-- default slot: popover content -->
 *   <button>Action</button>
 * </lit-popover>
 * ```
 *
 * Clicking the anchor toggles the popover; it closes on an outside click or the
 * Escape key (which also returns focus to the anchor). Call `close()` to
 * dismiss it programmatically (e.g. once an action inside it has run).
 *
 * The anchor is expected to declare its own `aria-haspopup`/`aria-label`; this
 * component keeps its `aria-expanded` in sync with `open` and treats the
 * default-slot content as a menu (`role="menu"`, with `role="menuitem"` on
 * each action) — see `lit-pdf-toolbar`'s overflow menu for a full example.
 */
@customElement('lit-popover')
export class LitPopover extends LitElement {
  /** Horizontal edge the popover is aligned to. */
  @property({ type: String }) public align: 'left' | 'right' = 'left';

  /** Whether the popover is currently visible. */
  @property({ type: Boolean, reflect: true }) public open = false;

  @query('slot[name="anchor"]') private _anchorSlot: HTMLSlotElement;

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
      <div class="content" role="menu" data-align=${this.align} ?data-open=${this.open}>
        <slot></slot>
      </div>
    `;
  }

  /** Hide the popover. */
  public close(): void {
    this.open = false;
    this._syncAnchorExpanded();
  }

  protected firstUpdated(): void {
    this._syncAnchorExpanded();
  }

  private _toggle(): void {
    this.open = !this.open;
    this._syncAnchorExpanded();

    if (this.open) {
      this.updateComplete.then(() => this._focusFirstItem());
    }
  }

  private _syncAnchorExpanded(): void {
    const anchor = this._anchorSlot?.assignedElements()[0];
    anchor?.setAttribute('aria-expanded', String(this.open));
  }

  private _focusFirstItem(): void {
    const [firstItem] = this.querySelectorAll<HTMLElement>(':scope > :not([slot])');
    firstItem?.focus();
  }

  private _focusAnchor(): void {
    const anchor = <HTMLElement>this._anchorSlot?.assignedElements()[0];
    anchor?.focus();
  }

  // Arrow functions so `this` stays bound when used as window listeners.
  private _handleOutsideClick = (event: MouseEvent): void => {
    if (this.open && !event.composedPath().includes(this)) {
      this.open = false;
      this._syncAnchorExpanded();
    }
  };

  private _handleKeydown = (event: KeyboardEvent): void => {
    if (this.open && event.key === 'Escape') {
      this.open = false;
      this._syncAnchorExpanded();
      this._focusAnchor();
    }
  };
}
