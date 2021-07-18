import GUIElement from './GUIElement';

/**
 * ------------------------------------------------------
 * rendering dest
 * ------------------------------------------------------
 */
class GUIDisplay extends GUIElement {
  #aspectRatio = null;
  #maxWidth = null;

  constructor() {
    super();
    this.width = 832;
    this.height = 640;
    this.#maxWidth = this.width;
    this.#aspectRatio = this.height / this.width;

    this.create();
    this.render();
  }

  create() {
    window.addEventListener('resize', (e) => {
      e.preventDefault();
      this.#resize();
      this.render();
    });
  }

  render() {
    this.element.innerHTML = `
      <style>
        #app-display { border: solid 1px white; }
      </style>

      <canvas id="app-display" width="${this.width}" height="${this.height}"></canvas>
    `;
  }

  #resize() {
    const { innerWidth: width, innerHeight: height } = window;
    let newWidth,
      newHeight = 0;
    if (height / width >= this.#aspectRatio) {
      newWidth = width;
      newHeight = width * this.#aspectRatio;
    } else {
      newWidth = height / this.#aspectRatio;
      newHeight = height;
    }
    if (newWidth >= this.#maxWidth) {
      this.width = this.#maxWidth;
      this.height = this.#maxWidth * this.#aspectRatio;
    } else {
      this.width = newWidth;
      this.height = newHeight;
    }
  }
}

window.customElements.define('gui-display', GUIDisplay);
