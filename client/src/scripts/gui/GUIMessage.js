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

            transform: translate(-50%, -50%);
          }
  
          @media only screen and (max-width: 600px) {
            #app-message {
              font-size: 0.75rem;
            }
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
          
          <div id="app-message">
            ${text ? `<div>${text}</div>` : ''}
            ${subtext ? `<div>${subtext}</div>` : ''}
          </div>
        `;
    } else {
      this.shadowRoot.innerHTML = '';
    }
  }
}

// class GUIMessage extends GUIElement {
//   constructor() {
//     super();
//     this.message = 'LOADING';
//     this.pulse = true;
//     this.create();
//     this.render();
//   }

//   create() {
//     game.on('loading-change', () => {
//       if (!game.state.loading) {
//         this.message = 'START A NEW GAME';
//         this.pulse = false;
//       } else {
//         this.message = 'LOADING';
//         this.pulse = TRUE;
//       }
//       this.render();
//     });
//   }

//   render() {
//     this.shadowRoot.innerHTML = `
//       <style>
//         #app-message {
//           font-family: 'Press Start 2P';
//           position: absolute;
//           color: white;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//         }

//         @keyframes whiteGreyColorAnimation {
//           0% { color: white; }
//           100% { color: grey; }
//         }

//         .pulse {
//           animation-name: whiteGreyColorAnimation;
//           animation-duration: 0.5s;
//           animation-iteration-count: infinite;
//           animation-direction: alternate;
//         }
//         </style>

//         <div id="app-message" class="${this.pulse ? 'pulse' : ''}">
//           ${this.message}
//         </div>
//       `;
//   }
// }

window.customElements.define('gui-message', GUIMessage);
