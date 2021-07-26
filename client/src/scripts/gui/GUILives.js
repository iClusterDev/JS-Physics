import store from '../config/store.config';
import GUIElement from './GUIElement';

class GUILives extends GUIElement {
  constructor() {
    super();
    this.lives = store.state.lives;
    this.create();
    this.render();
  }

  create() {
    store.on('lives-change', () => {
      this.lives = store.state.lives;
      this.render();
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        #gui-lives { 
          color: white;
          font-size: 2rem; 
        }
      </style>

      <div id="gui-lives">${this.lives}</div>
    `;
  }
}

window.customElements.define('gui-lives', GUILives);
