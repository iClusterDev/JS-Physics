import './AppMessage';
import store from '../config/store.config';
import Gui from '../lib/Gui';

class AppResult extends Gui {
  constructor() {
    super();
    this.show =
      store.state.status === 'win' || store.state.status === 'loose'
        ? true
        : false;
    this.result = '';

    this.create();
    this.render();
  }

  create() {
    let self = this;
    store.on('status-change', () => {
      this.show =
        store.state.status === 'win' || store.state.status === 'loose'
          ? true
          : false;
      if (store.state.status === 'win') this.result = 'you win';
      if (store.state.status === 'loose') this.result = 'game over!';
      self.render();
    });
  }

  render() {
    if (this.show) {
      console.log('to show');
      this.shadowRoot.innerHTML = `
        <style>  
          #app-result {
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
          
          #app-result .result {
            font-size: 3rem;
            margin: 0 0 2rem;
            color: cyan;
            font-weight: bold;
            letter-spacing: 4px;
            text-transform: uppercase;
            animation: hue .5s infinite linear;
          }
        </style>
  
        <div id="app-result">
          <div class="result">${this.result}</div>
        </div>
      `;
    } else {
      this.shadowRoot.innerHTML = '';
    }
  }
}

window.customElements.define('app-result', AppResult);
