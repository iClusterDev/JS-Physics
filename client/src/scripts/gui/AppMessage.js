import store from '../config/store.config';
import Gui from '../lib/Gui';

class AppMessage extends Gui {
  #message;

  constructor() {
    super();
    this.#message = store.state.message;

    this.create();
    this.render();
  }

  create() {
    store.on('message-change', () => {
      this.#message = store.state.message;
      this.render();
    });
  }

  render() {
    let { text = '', subtext = '' } = this.#message;
    if (text.length > 0 || subtext.length > 0) {
      this.shadowRoot.innerHTML = `
          <style>
            #app-message {
              position: absolute;
              top: 50%;
              left: 50%;
              text-align: center;
              transform: translate(-50%, -50%);
            }

            #app-message .message-text {
              margin-bottom: 1rem;
              text-transform: uppercase;
            }

            #app-message .message-subtext {
              font-size: 0.80rem;
              color: #9999;
            }
    
            @media only screen and (max-width: 600px) {
              #app-message .message-text {
                font-size: 0.80rem;
              }
    
              #app-message .message-subtext {
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

window.customElements.define('app-message', AppMessage);
