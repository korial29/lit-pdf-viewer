import { CSSResult, html, TemplateResult, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import '../lit-icon/lit-icon';

// @ts-ignore
import style from './lit-pdf-error.scss';

@customElement('lit-pdf-error')
export class LitPdfError extends LitElement {
  @property({ type: String }) private errorMessage: string;

  @property({ type: String }) private errorMoreInfo: string;

  @query('#errorMoreInfo') private _errorMoreInfo: HTMLTextAreaElement;

  @query('#errorShowMore') private _moreInfoButton: HTMLButtonElement;

  @query('#errorShowLess') private _lessInfoButton: HTMLButtonElement;

  public static get styles(): CSSResult[] {
    return [style];
  }

  public render(): TemplateResult {
    return html`
      <div id="errorWrapper" class="errorWrapper">
        <div class="errorMessageContent">
          <section class="errorMessageLeft">
            <span id="errorMessage">${this.errorMessage}</span>
            <button class="errorButton" id="errorShowMore" @click=${this._handleErrorMoreInfo}>
              <lit-icon icon="chevron-down" alt="more info"></lit-icon>
            </button>
            <button
              class="errorButton"
              id="errorShowLess"
              hidden
              @click=${this._handleErrorLessInfo}
            >
              <lit-icon icon="chevron-up" alt="less info"></lit-icon>
            </button>
          </section>
          <section class="errorMessageRight">
            <button class="errorButton" id="errorClose" @click=${this._handleCloseError}>
              <lit-icon icon="cross" alt="close error"></lit-icon>
            </button>
          </section>
        </div>
        <textarea class="errorMoreInfo" id="errorMoreInfo" hidden="true" readonly="readonly">
${this.errorMoreInfo}</textarea
        >
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
