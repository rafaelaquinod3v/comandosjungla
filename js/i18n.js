/**
 * i18n.js - Translation Manager
 */
class I18nManager {
  constructor() {
    this.cache = null;
    this.lang = 'en';
  }

  async load() {
    if (this.cache) return this.cache;
    try {
      const response = await fetch(`/lang/${this.lang}.json`);
      this.cache = await response.json();
      return this.cache;
    } catch (e) {
      console.error('Failed to load translations', e);
      return {};
    }
  }

  get(key) {
    return this.cache ? this.cache[key] : key;
  }
}

export const i18n = new I18nManager();
