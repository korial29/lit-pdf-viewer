import { CSSResult, html, TemplateResult, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import '../lit-icon/lit-icon';
import { getTranslations, ErrorTranslations } from '../i18n/i18n';

// @ts-ignore
import style from './lit-pdf-error.scss';

@customElement('lit-pdf-error')
export class LitPdfError extends LitElement {
  /** Locale to translate the error panel into (defaults to the browser's language). */
  @property({ type: String }) public locale: string;

  /** Overrides for individual translation strings. */
  @property({ type: Object }) public translations: Partial<ErrorTranslations> = {};

  @property({ type: String }) private errorMessage: string;

  @property({ type: String }) private errorMoreInfo: string;

  @query('#errorMoreInfo') private _errorMoreInfo: HTMLTextAreaElement;

  @query('#errorShowMore') private _moreInfoButton: HTMLButtonElement;

  @query('#errorShowLess') private _lessInfoButton: HTMLButtonElement;

  public static get styles(): CSSResult[] {
    return [style];
  }

  private get _t(): ErrorTranslations {
    return getTranslations(this.locale, { error: this.translations }).error;
  }

  public render(): TemplateResult {
    const t = this._t;

    return html`
      <div id="errorWrapper" class="errorWrapper">
        <div class="errorMessageContent">
          <section class="errorMessageLeft">
            <span id="errorMessage">${this.errorMessage}</span>
            <button class="errorButton" id="errorShowMore" @click=${this._handleErrorMoreInfo}>
              <lit-icon icon="chevron-down" alt=${t.moreInfo}></lit-icon>
            </button>
            <button
              class="errorButton"
              id="errorShowLess"
              hidden
              @click=${this._handleErrorLessInfo}
            >
              <lit-icon icon="chevron-up" alt=${t.lessInfo}></lit-icon>
            </button>
          </section>
          <section class="errorMessageRight">
            <button class="errorButton" id="errorClose" @click=${this._handleCloseError}>
              <lit-icon icon="cross" alt=${t.closeError}></lit-icon>
            </button>
          </section>
        </div>
        <textarea class="errorMoreInfo" id="errorMoreInfo" hidden="true" readonly="readonly">
${this.errorMoreInfo}</textarea>
      </div>
    `;
  }

  private _handleErrorMoreInfo(): void {
    this._errorMoreInfo.hidden = false;
    this._moreInfoButton.hidden = true;
    this._lessInfoButton.hidden = false;
    this._errorMoreInfo.style.height = `${this._errorMoreInfo.scrollHeight}px`;
  }

  private _handleErrorLessInfo(): void {
    this._errorMoreInfo.hidden = true;
    this._moreInfoButton.hidden = false;
    this._lessInfoButton.hidden = true;
  }

  private _handleCloseError(): void {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true }));
  }
}
