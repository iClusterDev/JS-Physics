import Gui from '../lib/Gui';

class AppTitle extends Gui {
  constructor() {
    super();
    this.create();
    this.render();
  }

  create() {}

  render() {
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
          text-align: center;
          animation: hue .5s infinite linear;
        }
        
        #app-title .text {
          font-size: 3rem;
          margin: 0 0 2rem;
          color: red;
          font-weight: bold;
          letter-spacing: 4px;
          text-transform: uppercase;
        }
        
        #app-title .info {
          text-transform: uppercase;
          font-size: 0.80rem;
          margin: 0 0 1rem;
        }

        #app-title .action {
          text-transform: capitalize;
          font-size: 0.60rem;
          color: rgb(128, 128, 128);
        }
      </style>

      <div id="app-title">
        <div class="text">- bouncer -</div>
        <div class="info">start a new game</div>
        <div class="action">press enter</div>
      </div>
    `;
  }
}

window.customElements.define('app-title', AppTitle);
