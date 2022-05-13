import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import './lit-pdf-viewer/lit-pdf-viewer';

@customElement('lit-app')
export class LitApp extends LitElement {
  public render(): TemplateResult {
    return html` <lit-pdf-viewer
      src="pdf-example.pdf"
      .searchQueries=${[
        'php',
        'java',
        'fibre',
        'application mobile',
        'professionnelles',
        'gagnant deux fois successives aux',
      ]}
    >
    </lit-pdf-viewer>`;
  }
}
