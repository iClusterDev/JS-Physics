import store from '../config/store.config';
import Gui from '../lib/Gui';

class AppStatus extends Gui {
  constructor() {
    super();
    this.lives = store.state.lives;
    this.score = 999;

    this.create();
    this.render();
  }

  create() {
    let self = this;
    store.on('lives-change', () => {
      self.lives = store.state.lives;
      self.render();
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        #app-status {
          font-size: 0.8rem;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
        }
      </style>

      <div id="app-status">
        <div class="lives">lives: ${this.lives}</div>
        <div class="score">score: ${this.score}</div>
      </div>
    `;
  }
}

window.customElements.define('app-status', AppStatus);
