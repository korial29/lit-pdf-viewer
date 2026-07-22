import { CSSResult, html, TemplateResult, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import '../lit-icon/lit-icon';
import '../lit-input/lit-input';
import { LitInput } from '../lit-input/lit-input';

// @ts-ignore
import style from './lit-pdf-search.scss';

const QUERY_DEBOUNCE_DELAY = 300;

/**
 * Floating find-in-page bar for `lit-pdf-viewer`. Shown/hidden via the `open`
 * property; the viewer drives it from the `search` attribute and the
 * Ctrl/Cmd+F shortcut.
 */
@customElement('lit-pdf-search')
export class LitPdfSearch extends LitElement {
  @property({ type: Boolean, reflect: true }) public open = false;

  @property({ type: Number }) public matchCount = 0;

  @property({ type: Number }) public currentMatch = 0;

  @property({ type: Boolean }) public notFound = false;

  /** Prefills the input, e.g. with the terms already highlighted via `searchQueries`. */
  @property({ type: String }) public query = '';

  @query('lit-input') private _inputEl: LitInput;

  @state() private _query = '';

  private _debounceTimeout: ReturnType<typeof setTimeout>;

  public static get styles(): CSSResult[] {
    return [style];
  }

  public connectedCallback(): void {
    super.connectedCallback();

    // Set before the first render so the input already shows the prefilled
    // query on the very first paint, instead of a moment later.
    if (this.query) {
      this._query = this.query;
    }
  }

  public render(): TemplateResult {
    const hasQuery = this._query.length > 0;

    return html`
      <lit-input
        label="Rechercher dans le document"
        placeholder="Rechercher..."
        .value=${this._query}
        clearable
        @input=${this._handleInput}
        @keydown=${this._handleKeydown}
      ></lit-input>
      <span class="matchCount" role="status" aria-live="polite" ?hidden=${!hasQuery}>
        ${this.notFound ? 'Aucun résultat' : `${this.currentMatch} / ${this.matchCount}`}
      </span>
      <button
        class="searchButton"
        title="Précédent"
        ?disabled=${!hasQuery || !this.matchCount}
        @click=${this._handlePrevious}
      >
        <lit-icon icon="chevron-up" alt="Précédent"></lit-icon>
      </button>
      <button
        class="searchButton"
        title="Suivant"
        ?disabled=${!hasQuery || !this.matchCount}
        @click=${this._handleNext}
      >
        <lit-icon icon="chevron-down" alt="Suivant"></lit-icon>
      </button>
      <button class="searchButton" title="Fermer" @click=${this._handleClose}>
        <lit-icon icon="cross" alt="Fermer"></lit-icon>
      </button>
    `;
  }

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    // Only adopt it when the field is still empty, so it doesn't clobber
    // whatever the user is actively typing.
    if (_changedProperties.has('query') && this.query && !this._query) {
      this._query = this.query;
    }
    if (_changedProperties.has('open') && this.open) {
      this._inputEl?.focus();
      this._inputEl?.select();
    }
  }

  private _handleInput(e: InputEvent): void {
    this._query = (<LitInput>e.target).value;

    clearTimeout(this._debounceTimeout);
    this._debounceTimeout = setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent('searchQuery', { bubbles: true, detail: { query: this._query } }),
      );
    }, QUERY_DEBOUNCE_DELAY);
  }

  private _handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) {
        this._handlePrevious();
      } else {
        this._handleNext();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this._handleClose();
    }
  }

  private _handleNext(): void {
    if (!this._query) {
      return;
    }
    this.dispatchEvent(new CustomEvent('searchNext', { bubbles: true }));
  }

  private _handlePrevious(): void {
    if (!this._query) {
      return;
    }
    this.dispatchEvent(new CustomEvent('searchPrevious', { bubbles: true }));
  }

  private _handleClose(): void {
    clearTimeout(this._debounceTimeout);
    this.dispatchEvent(new CustomEvent('searchClose', { bubbles: true }));
  }
}
