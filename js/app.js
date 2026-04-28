/**
 * app.js - Main entry point with Integrated Layers
 */
import '../components/i18n-text.js';
import '../components/app-shell.js';
import '../components/app-nav.js';
import '../components/app-toast.js';
import '../components/app-spinner.js';
import '../components/app-error.js';

import { Store } from './store.js';
import { Fortress } from './server.js';
import { i18n } from './i18n.js';

const AppState = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};

class App {
  constructor() {
    this.state = AppState.IDLE;
    this.store = new Store();
    this.fortress = new Fortress();
    this.init();
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  async init() {
    this.setState(AppState.LOADING);
    try {
      await i18n.load();
      await this.store.init();

      // Initial Auth Check (Simulated)
      const auth = this.fortress.handleRequest('/auth');
      if (auth.status === 200) {
        console.log('Fortress Authenticated');
      }

      this.setState(AppState.SUCCESS);
    } catch (e) {
      console.error('Initialization failed', e);
      this.setState(AppState.ERROR);
    }
  }

  render() {
    const spinner = document.querySelector('app-spinner');
    if (spinner) {
      spinner.style.display = (this.state === AppState.LOADING) ? 'block' : 'none';
    }
    console.log(`Current State: ${this.state}`);
  }
}

window.app = new App();
