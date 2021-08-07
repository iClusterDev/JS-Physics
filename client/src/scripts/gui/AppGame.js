import Gui from '../lib/Gui';
import './AppDisplay';
import './AppMessage';
import './AppStatus';
import './AppTitle';
import './AppResult';

class AppGame extends Gui {
  constructor() {
    super();
    this.create();
    this.render();
  }

  get canvas() {
    return this.shadowRoot.querySelector('app-display').canvas;
  }

  create() {}

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        #app-game { 
          font-family: 'Press Start 2P'; 
          position: relative;
        }
      </style>

      <div id="app-game">
        <app-title></app-title>
        <app-result></app-result>

        <!-- rename this to app-play? -->
        <!-- add app-loose? -->
        <!-- add app-win? -->
      
        <app-display></app-display>
      </div>
    `;
  }
}

window.customElements.define('app-game', AppGame);
