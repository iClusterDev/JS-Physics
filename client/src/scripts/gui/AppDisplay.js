import './AppStatus';
import './AppMessage';
import Gui from '../lib/Gui';

class AppDisplay extends Gui {
  constructor() {
    super();

    this.create();
    this.render();
  }

  get canvas() {
    return this.shadowRoot.querySelector('canvas');
  }

  create() {}

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        #app-display {
          position: relative;
        }

        #app-display .status {
          position: absolute;
          color: white;
          width: 100%;
        }

        #app-display .message {
          position: absolute;
          top: 50%; left: 50%;
          text-align: center;
          transform: translate(-50%, -50%);
        }

        #app-display .buffer {
          border: solid 1px white;
        }
      </style>

      <div id="app-display">
        <app-status class="status"></app-status>
        <app-message class="message"></app-message>
        <canvas class="buffer"></canvas>
      </div>
    `;
  }
}

window.customElements.define('app-display', AppDisplay);
