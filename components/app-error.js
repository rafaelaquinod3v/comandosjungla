/**
 * app-error component
 */
export class AppError extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set message(val) {
    this.shadowRoot.innerHTML = `
      <style>
        .error { color: var(--color-error); padding: var(--space-m); border: 1px solid var(--color-error); }
      </style>
      <div class="error" role="alert">
        <strong><i18n-text key="error_prefix">Error:</i18n-text></strong> ${val}
      </div>
    `;
  }
}
customElements.define('app-error', AppError);
