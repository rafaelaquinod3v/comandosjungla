/**
 * app-nav component
 * Primary navigation for the application.
 */
export class AppNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        nav { display: flex; gap: var(--space-m); }
        a { color: var(--color-primary); text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
      <nav>
        <a href="/"><i18n-text key="nav_home">Home</i18n-text></a>
        <a href="/about"><i18n-text key="nav_about">About</i18n-text></a>
      </nav>
    `;
  }
}

customElements.define('app-nav', AppNav);
