/**
 * app-shell component
 * The root container for the application.
 */
export class AppShell extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log('AppShell connected');
  }
}

customElements.define('app-shell', AppShell);
