import { CSSResult, html, TemplateResult, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import '../lit-icon/lit-icon';
import '../lit-input/lit-input';
import { LitInput } from '../lit-input/lit-input';
import { getTranslations, SearchTranslations } from '../i18n/i18n';

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

  /** Locale to translate the search bar into (defaults to the browser's language). */
  @property({ type: String }) public locale: string;

  /** Overrides for individual translation strings. */
  @property({ type: Object }) public translations: Partial<SearchTranslations> = {};

  @query('lit-input') private _inputEl: LitInput;

  @state() private _query = '';

  private _debounceTimeout: ReturnType<typeof setTimeout>;

  public static get styles(): CSSResult[] {
    return [style];
  }

  private get _t(): SearchTranslations {
    return getTranslations(this.locale, { search: this.translations }).search;
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.setAttribute('role', 'search');
    this.setAttribute('aria-label', this._t.searchLabel);

    // Bound to the host (not a specific child) so Escape/Enter work no
    // matter which control inside the bar currently has focus — a listener
    // on `lit-input` alone would miss keydowns from the prev/next/close
    // buttons, which are its siblings, not its descendants.
    this.addEventListener('keydown', this._handleKeydown);

    // Set before the first render so the input already shows the prefilled
    // query on the very first paint, instead of a moment later.
    if (this.query) {
      this._query = this.query;
    }
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('keydown', this._handleKeydown);
  }

  public render(): TemplateResult {
    const hasQuery = this._query.length > 0;
    const t = this._t;

    return html`
      <lit-input
        label=${t.inputLabel}
        placeholder=${t.placeholder}
        .value=${this._query}
        clearable
        @input=${this._handleInput}
      ></lit-input>
      <span
        class="matchCount"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        ?hidden=${!hasQuery}
      >
        ${this.notFound ? t.noResults : `${this.currentMatch} / ${this.matchCount}`}
      </span>
      <button
        class="searchButton"
        title=${t.previous}
        aria-label=${t.previous}
        ?disabled=${!hasQuery || !this.matchCount}
        @click=${this._handlePrevious}
      >
        <lit-icon icon="chevron-up"></lit-icon>
      </button>
      <button
        class="searchButton"
        title=${t.next}
        aria-label=${t.next}
        ?disabled=${!hasQuery || !this.matchCount}
        @click=${this._handleNext}
      >
        <lit-icon icon="chevron-down"></lit-icon>
      </button>
      <button
        class="searchButton"
        title=${t.close}
        aria-label=${t.close}
        @click=${this._handleClose}
      >
        <lit-icon icon="cross"></lit-icon>
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
    if (_changedProperties.has('locale') || _changedProperties.has('translations')) {
      this.setAttribute('aria-label', this._t.searchLabel);
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

  // Arrow function (not a prototype method) so `this` stays bound when
  // passed straight to `addEventListener`/`removeEventListener`.
  private _handleKeydown = (e: KeyboardEvent): void => {
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
  };

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
