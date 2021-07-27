import Gui from '../lib/Gui';

class AppDisplay extends Gui {
  constructor() {
    super();

    this.render();
  }

  get canvas() {
    return this.shadowRoot.querySelector('canvas');
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        #app-display {
          position: relative;
        }  

        #app-display canvas { 
          border: solid 1px white;
          position: relative;
        }
      </style>

      <div id="app-display">
        <slot name="header"></slot>
        <canvas width="832" height="640"></canvas>
        <slot name="footer"></slot>
      </div>
    `;
  }
}

window.customElements.define('app-display', AppDisplay);
