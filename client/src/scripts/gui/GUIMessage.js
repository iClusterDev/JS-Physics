import game from '../game';
import GUIElement from './GUIElement';

class GUIMessage extends GUIElement {
  constructor() {
    super();
    this.message = game.state.message;

    this.create();
    this.render();
  }

  create() {
    game.on('message-change', () => {
      this.message = game.state.message;
      this.render();
    });
  }

  render() {
    let { text = '', subtext = '' } = this.message;
    if (text.length > 0 || subtext.length > 0) {
      this.shadowRoot.innerHTML = `
          <style>
            #app-message {
              font-family: 'Press Start 2P';
              position: absolute;
              color: white;
              top: 50%;
              left: 50%;
              text-align: center;
              transform: translate(-50%, -50%);
            }

            .message-text {
              font-size: 1rem;
              margin-bottom: 1rem;
              text-transform: uppercase;
            }

            .message-subtext {
              font-size: 0.80rem;
              color: #9999;
            }
    
            @media only screen and (max-width: 600px) {
              .message-text {
                font-size: 0.80rem;
              }
    
              .message-subtext {
                font-size: 0.60rem;
              }
            }
          </style>
          
          <div id="app-message">
            ${text ? `<div class="message-text">${text}</div>` : ''}
            ${subtext ? `<div class="message-subtext">${subtext}</div>` : ''}
          </div>
        `;
    } else {
      this.shadowRoot.innerHTML = '';
    }
  }
}

window.customElements.define('gui-message', GUIMessage);
