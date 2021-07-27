import Gui from '../lib/Gui';
import './AppDisplay';
import './AppMessage';
import './AppStatus';

class AppGame extends Gui {
  constructor() {
    super();
    this.create();
    this.render();
  }

  /**
   * getter canvas
   */
  get canvas() {
    return this.shadowRoot.querySelector('app-display').canvas;
  }

  /**
   * getter display (canvas alias)
   */
  get display() {
    return this.shadowRoot.querySelector('app-display').canvas;
  }

  create() {}

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        #app-game {
          font-family: 'Press Start 2P';
          color: white;
        }
      </style>

      <div id="app-game">
        <app-display>
          <app-status slot="header"></app-status>
        </app-display>
        <app-message></app-message>
      </div>
    `;
  }
}

window.customElements.define('app-game', AppGame);
