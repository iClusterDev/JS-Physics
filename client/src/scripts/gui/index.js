import game from '../store/game';

/**
 * ------------------------------------------------------
 * element supercless
 * ------------------------------------------------------
 */
class GUIElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(
      document.createElement('template').content.cloneNode(true)
    );
  }

  get element() {
    return this.shadowRoot;
  }
}

/**
 * ------------------------------------------------------
 * messaging system
 * ------------------------------------------------------
 */
class AppMessage extends GUIElement {
  constructor() {
    super();
    this.message = 'LOADING';
    this.pulse = true;
    this.create();
    this.render();
  }

  create() {
    game.on('loading-change', () => {
      if (!game.state.loading) {
        this.message = 'START A NEW GAME';
        this.pulse = false;
      } else {
        this.message = 'LOADING';
        this.pulse = TRUE;
      }
      this.render();
    });
  }

  render() {
    this.element.innerHTML = `
      <style>
        #app-message {
          font-family: 'Press Start 2P';
          position: absolute;
          color: white;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        @keyframes whiteGreyColorAnimation {
          0% { color: white; }
          100% { color: grey; }
        }

        .pulse {
          animation-name: whiteGreyColorAnimation;
          animation-duration: 0.5s;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }
        </style>

        <div id="app-message" class="${this.pulse ? 'pulse' : ''}">
          ${this.message}
        </div>
      `;
  }
}

window.customElements.define('app-message', AppMessage);

/**
 * ------------------------------------------------------
 * rendering dest
 * ------------------------------------------------------
 */
class AppDisplay extends GUIElement {
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
window.customElements.define('app-display', AppDisplay);

/**
 * ------------------------------------------------------
 * root component
 * ------------------------------------------------------
 */
class AppGame extends GUIElement {
  constructor() {
    super();
    this.create();
    this.render();
  }

  create() {}

  render() {
    this.element.innerHTML = `
      <style>
        #app-game {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: black;
        }
      </style>

      <div id="app-game">
        <app-message></app-message>
        <app-display></app-display>
      </div>
      `;
  }
}
window.customElements.define('app-game', AppGame);
