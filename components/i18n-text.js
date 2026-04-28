import { i18n } from '../js/i18n.js';

export class I18nText extends HTMLElement {
  static get observedAttributes() { return ['key']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    await i18n.load();
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const key = this.getAttribute('key');
    if (!key) return;
    this.shadowRoot.textContent = i18n.get(key) || key;
  }
}

customElements.define('i18n-text', I18nText);
