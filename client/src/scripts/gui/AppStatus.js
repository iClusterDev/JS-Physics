import Gui from '../lib/Gui';

class AppStatus extends Gui {
  constructor() {
    super();

    this.create();
    this.render();
  }

  create() {}

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        #app-status {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          margin: 1rem;
          font-size: 0.8rem;
        }
      </style>

      <div id="app-status">LIVES: </div>
    `;
  }
}

window.customElements.define('app-status', AppStatus);
