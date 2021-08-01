import Gui from '../lib/Gui';

class AppStatus extends Gui {
  constructor() {
    super();
    this.lives = 0;

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
          width: calc(100% - 2rem);
          padding: 1rem;
          font-size: 0.8rem;
          background: green;
        }
      </style>

      <div id="app-status">LIVES: ${this.lives}</div>
    `;
  }

  // static get observedAttributes() {
  //   return ['value'];
  // }

  // attributeChangedCallback(name, oldValue, newValue) {
  //   switch (name) {
  //     case 'value':
  //       this.lives = newValue;
  //       break;

  //     default:
  //       break;
  //   }
  // }
}

window.customElements.define('app-status', AppStatus);
