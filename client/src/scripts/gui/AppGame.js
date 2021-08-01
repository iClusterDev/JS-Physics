import Gui from '../lib/Gui';
import './AppDisplay';
import './AppMessage';
import './AppStatus';
import './AppTitle';

class AppGame extends Gui {
  constructor() {
    super();
    this.create();
    this.render();
  }

  /**
   * getter canvas
   */
  get canvas() {
    return this.shadowRoot.querySelector('app-display').canvas;
  }

  create() {
    // do something
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        #app-game { 
          font-family: 'Press Start 2P'; 
          position: relative;
          color: white;
          display: block;
        }
      </style>

      <div id="app-game">
        <app-title></app-title>
        <app-display></app-display>
        <!-- <div id="status">status</div> -->
        <!-- <canvas id="display"></canvas> -->
        <!-- <app-message></app-message> --> 
      </div>
    `;
  }
}

// class AppGame extends Gui {
//   constructor() {
//     super();
//     this.create();
//     this.render();
//   }

//   /**
//    * getter canvas
//    */
//   get canvas() {
//     return this.shadowRoot.querySelector('app-display').canvas;
//   }

//   /**
//    * getter display (canvas alias)
//    */
//   get display() {
//     return this.shadowRoot.querySelector('app-display').canvas;
//   }

//   create() {
//     // do something
//   }

//   render() {
//     this.shadowRoot.innerHTML = `
//       <style>
//         #app-game { font-family: 'Press Start 2P'; color: white; }
//       </style>

//       <div id="app-game">
//         <app-display>
//           <app-status slot="display-header" value="100"></app-status>
//         </app-display>
//         <app-message></app-message>
//       </div>
//     `;
//   }
// }

window.customElements.define('app-game', AppGame);
