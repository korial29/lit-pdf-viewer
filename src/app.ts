import { css, CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import './lit-pdf-viewer/lit-pdf-viewer';

@customElement('lit-app')
export class LitApp extends LitElement {
  public static get styles(): CSSResult[] {
    return [
      css`
        :host {
          display: block;
          height: 100vh;
          /* Use the dynamic viewport height on mobile so the viewer isn't
             clipped by the browser's collapsing address bar. */
          height: 100dvh;
        }
      `,
    ];
  }

  public render(): TemplateResult {
    return html` <lit-pdf-viewer
      src="pdf-example.pdf"
      .searchQueries=${['java*', 'loop', 'Dynamic Languages', 'native code']}
    >
    </lit-pdf-viewer>`;
  }
}
