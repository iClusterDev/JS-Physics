import './AppMessage';
import store from '../config/store.config';
import Gui from '../lib/Gui';

class AppTitle extends Gui {
  constructor() {
    super();
    this.show = store.state.status === 'ready' ? true : false;
    this.create();
    this.render();
  }

  create() {
    let self = this;
    store.on('status-change', () => {
      self.show = store.state.status === 'ready' ? true : false;
      self.render();
    });
  }

  render() {
    if (this.show) {
      this.shadowRoot.innerHTML = `
        <style>
          @keyframes hue {
            from {
              filter: hue-rotate(0deg);
            }
            to {
              filter: hue-rotate(-360deg);
            }
          }
  
          #app-title {
            z-index: 10;
            text-align: center;            
            background: black;
            position: fixed;
            top: 0; left: 0;
            width: 100%; 
            height: 100%;            
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          
          #app-title .name {
            font-size: 3rem;
            margin: 0 0 2rem;
            color: cyan;
            font-weight: bold;
            letter-spacing: 4px;
            text-transform: uppercase;
            animation: hue .5s infinite linear;
          }
        </style>
  
        <div id="app-title">
          <div class="name">- bouncer -</div>
          <app-message></app-message>
        </div>
      `;
    } else {
      this.shadowRoot.innerHTML = '';
    }
  }
}

window.customElements.define('app-title', AppTitle);
