import store from '../config/store.config';
import Gui from '../lib/Gui';

class AppDisplay extends Gui {
  constructor() {
    super();
    this.statusLives = store.state.lives;
    this.create();
    this.render();
  }

  get canvas() {
    return this.shadowRoot.querySelector('canvas');
  }

  create() {
    let self = this;
    store.on('lives-change', () => {
      self.statusLives = store.state.lives;
      self.render();
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        #app-display {
          position: relative;
        }

        #app-display .buffer {
          border: solid 1px white;
        }

        #app-display .status {
          font-size: 0.8rem;
          position: absolute;
          padding: 1rem;
          width: calc(100% - 2rem);
        }
      </style>

      <div id="app-display">
        <div class="status">lives: ${this.statusLives}</div>
        <canvas class="buffer"></canvas>
      </div>
    `;
  }
}

window.customElements.define('app-display', AppDisplay);

// import Gui from '../lib/Gui';

// class AppDisplay extends Gui {
//   constructor() {
//     super();
//     this.render();
//   }

//   get canvas() {
//     return this.shadowRoot.querySelector('canvas');
//   }

//   render() {
//     this.shadowRoot.innerHTML = `
//       <style>
//         #app-display {
//           position: relative;
//         }

//         #app-display canvas {
//           position: relative;
//           border: solid 1px white;
//         }
//       </style>

//       <div id="app-display">
//         <slot name="display-header"></slot>
//         <canvas width="832" height="640"></canvas>
//       </div>
//     `;
//   }
// }

// window.customElements.define('app-display', AppDisplay);
