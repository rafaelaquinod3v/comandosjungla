/**
 * app-toast component
 * For displaying brief messages to the user.
 */
export class AppToast extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  show(message, duration = 3000) {
    this.shadowRoot.innerHTML = `
      <style>
        .toast {
          background: var(--color-surface-raised);
          color: var(--color-text);
          padding: var(--space-s) var(--space-m);
          border: 1px solid var(--color-border);
          border-radius: var(--radius);
          box-shadow: var(--shadow-md);
        }
      </style>
      <div class="toast" role="alert">${message}</div>
    `;
    setTimeout(() => { this.shadowRoot.innerHTML = ''; }, duration);
  }
}

customElements.define('app-toast', AppToast);
