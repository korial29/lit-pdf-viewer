import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import './lit-pdf-viewer/lit-pdf-viewer';

@customElement('lit-app')
export class LitApp extends LitElement {
  public render(): TemplateResult {
    return html` <lit-pdf-viewer
      src="pdf-example.pdf"
      .searchQueries=${['java*', 'loop', 'Dynamic Languages', 'native code']}
    >
    </lit-pdf-viewer>`;
  }
}
