import { html, LitElement, TemplateResult, CSSResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// @ts-ignore
import style from './lit-icon.scss';

@customElement('lit-icon')
export default class LitIcon extends LitElement {
  @property({ type: String }) public icon = '';

  /**
   * Accessible label for the icon. The glyph itself is rendered via an icon
   * font ligature, so its raw text content (e.g. "arrow-up") would otherwise
   * leak into the accessible name/tree. Provide `alt` when the icon stands
   * on its own; omit it when a labeled ancestor (e.g. a button with its own
   * `aria-label`) already names the control, so the icon stays decorative.
   */
  @property({ type: String }) public alt = '';

  public static get styles(): CSSResult[] {
    return [style];
  }

  public render(): TemplateResult {
    return this.alt
      ? html`<span class="icon" role="img" aria-label=${this.alt}>${this.icon}</span>`
      : html`<span class="icon" aria-hidden="true">${this.icon}</span>`;
  }
}
