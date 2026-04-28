/**
 * app-spinner component
 */
export class AppSpinner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        .spinner { width: 24px; height: 24px; border: 3px solid var(--color-border); border-top-color: var(--color-primary); border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      </style>
      <div class="spinner" role="status" aria-label="Loading">
        <span class="sr-only"><i18n-text key="loading">Loading...</i18n-text></span>
      </div>
    `;
  }
}
customElements.define('app-spinner', AppSpinner);
