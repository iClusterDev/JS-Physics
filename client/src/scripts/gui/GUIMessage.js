import game from '../game';
import GUIElement from './GUIElement';

/**
 * ------------------------------------------------------
 * messaging system
 * ------------------------------------------------------
 */
class GUIMessage extends GUIElement {
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

window.customElements.define('gui-message', GUIMessage);
