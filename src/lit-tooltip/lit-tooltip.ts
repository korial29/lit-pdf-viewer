import { CSSResult, html, TemplateResult, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

// @ts-ignore
import style from './lit-tooltip.scss';

let nextId = 0;

/**
 * A plain-text tooltip shown below an anchor element on hover/focus.
 *
 * ```html
 * <lit-tooltip text="Previous Page">
 *   <button>…</button>
 * </lit-tooltip>
 * ```
 *
 * Shows on `mouseenter`/`focusin` of the anchor, hides on `mouseleave`,
 * `focusout` or Escape. The anchor gets `aria-describedby` pointing at the
 * tooltip content so screen readers announce the text without it needing to
 * duplicate the anchor's own `aria-label`.
 */
@customElement('lit-tooltip')
export class LitTooltip extends LitElement {
  /** Text shown in the tooltip. */
  @property({ type: String }) public text = '';

  @state() private _visible = false;

  @query('slot') private _slot: HTMLSlotElement;

  private _id = `lit-tooltip-${nextId++}`;

  public static get styles(): CSSResult[] {
    return [style];
  }

  public render(): TemplateResult {
    return html`
      <div
        class="anchor"
        @mouseenter=${this._show}
        @mouseleave=${this._hide}
        @focusin=${this._show}
        @focusout=${this._hide}
        @keydown=${this._handleKeydown}
      >
        <slot></slot>
      </div>
      <div
        class="content"
        role="tooltip"
        id=${this._id}
        aria-label=${this.text}
        ?data-visible=${this._visible}
      >
        ${this.text}
      </div>
    `;
  }

  protected firstUpdated(): void {
    const anchor = this._slot?.assignedElements()[0];
    anchor?.setAttribute('aria-describedby', this._id);
  }

  private _show = (): void => {
    this._visible = true;
  };

  private _hide = (): void => {
    this._visible = false;
  };

  private _handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      this._visible = false;
    }
  };
}
