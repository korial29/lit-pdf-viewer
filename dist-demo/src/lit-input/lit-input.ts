import { CSSResult, html, nothing, TemplateResult, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import '../lit-icon/lit-icon';

// @ts-ignore
import style from './lit-input.scss';

let nextId = 0;

/**
 * Styled, accessible text input.
 *
 * Always renders a real `<label>` tied to the input via `for`/`id` (even when
 * visually hidden), so screen readers get a proper accessible name instead of
 * relying on `placeholder` alone. The native `input`/`keydown` events already
 * bubble and compose out of the shadow DOM, so consumers can listen directly
 * on the element: `<lit-input @input=${...} @keydown=${...}>`.
 */
@customElement('lit-input')
export class LitInput extends LitElement {
  @property({ type: String }) public value = '';

  /** Accessible name, rendered as a (visually hidden by default) `<label>`. */
  @property({ type: String }) public label = '';

  @property({ type: String }) public placeholder = '';

  @property({ type: Boolean }) public disabled = false;

  /** Shows a "clear" button once the input has a value. */
  @property({ type: Boolean }) public clearable = false;

  @query('input') private _inputEl: HTMLInputElement;

  private _id = `lit-input-${++nextId}`;

  public static get styles(): CSSResult[] {
    return [style];
  }

  public render(): TemplateResult {
    return html`
      <label class="visuallyHidden" for=${this._id}>${this.label}</label>
      <div class="wrapper">
        <input
          id=${this._id}
          type="text"
          .value=${this.value}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          autocomplete="off"
          spellcheck="false"
          @input=${this._handleInput}
        />
        ${
          this.clearable && this.value
            ? html`
                <button
                  type="button"
                  class="clearButton"
                  aria-label="Effacer"
                  @click=${this._handleClear}
                >
                  <lit-icon icon="cross" alt="Effacer"></lit-icon>
                </button>
              `
            : nothing
        }
      </div>
    `;
  }

  /** Focuses the underlying input. */
  public focus(options?: FocusOptions): void {
    this._inputEl?.focus(options);
  }

  /** Selects the underlying input's text. */
  public select(): void {
    this._inputEl?.select();
  }

  private _handleInput(e: InputEvent): void {
    this.value = (<HTMLInputElement>e.target).value;
  }

  private _handleClear(): void {
    this.value = '';
    this._inputEl.value = '';
    this._inputEl.focus();
    // Let consumers react through the same `input` listener they already use.
    this._inputEl.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  }
}
