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
            #app-message .info {
              text-transform: uppercase;
              color: white;
              font-size: 0.80rem;
              margin: 0 0 1rem;
            }

            #app-message .action {
              text-transform: capitalize;
              color: rgb(128, 128, 128);
              font-size: 0.60rem;
            }
    
            @media only screen and (max-width: 600px) {
              #app-message .info {
                font-size: 0.70rem;
              }
    
              #app-message .action {
                font-size: 0.50rem;
              }
            }
          </style>
          
          <div id="app-message">
            ${text ? `<div class="info">${text}</div>` : ''}
            ${subtext ? `<div class="action">${subtext}</div>` : ''}
          </div>
        `;
    } else {
      this.shadowRoot.innerHTML = '';
    }
  }
}

window.customElements.define('app-message', AppMessage);
