import GUIElement from './GUIElement';

class GUIDisplay extends GUIElement {
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
          border: solid 1px white; 
        }
      </style>

      <canvas id="app-display"></canvas>
    `;
  }
}

window.customElements.define('gui-display', GUIDisplay);
