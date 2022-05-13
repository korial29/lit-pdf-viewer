import { html, LitElement, TemplateResult, CSSResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// @ts-ignore
import style from './lit-icon.scss';

@customElement('lit-icon')
export default class LitIcon extends LitElement {
  @property({ type: String }) public icon = '';

  public static get styles(): CSSResult[] {
    return [style];
  }

  public render(): TemplateResult {
    return html`<span class="icon">${this.icon}</span>`;
  }
}
