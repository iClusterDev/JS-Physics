import GUIElement from './GUIElement';

/**
 * ------------------------------------------------------
 * rendering dest
 * ------------------------------------------------------
 */
class GUIDisplay extends GUIElement {
  constructor() {
    super();

    this.create();
    this.render();
  }

  // TO DELETE
  // get context() {
  //   return this.shadowRoot.querySelector('canvas').getContext('2d');
  // }

  get canvas() {
    return this.shadowRoot.querySelector('canvas');
  }

  create() {}

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        #app-display { border: solid 1px white; }
      </style>

      <canvas id="app-display"></canvas>
    `;
  }
}
// class GUIDisplay extends GUIElement {
//   #aspectRatio = null;
//   #maxWidth = null;

//   constructor() {
//     super();
//     this.width = 832;
//     this.height = 640;
//     this.#maxWidth = this.width;
//     this.#aspectRatio = this.height / this.width;

//     this.create();
//     this.render();
//   }

//   get context() {
//     return this.shadowRoot.querySelector('canvas').getContext('2d');
//   }

//   create() {
//     window.addEventListener('resize', (e) => {
//       e.preventDefault();
//       this.#resize();
//     });
//     this.#resize();
//   }

//   render() {
//     this.shadowRoot.innerHTML = `
//       <style>
//         #app-display { border: solid 1px white; }
//       </style>

//       <canvas id="app-display"></canvas>
//     `;
//     // <canvas id="app-display" width="${this.width}" height="${this.height}"></canvas>
//   }

//   #resize() {
//     const { innerWidth: width, innerHeight: height } = window;
//     let newWidth,
//       newHeight = 0;
//     if (height / width >= this.#aspectRatio) {
//       newWidth = width;
//       newHeight = width * this.#aspectRatio;
//     } else {
//       newWidth = height / this.#aspectRatio;
//       newHeight = height;
//     }
//     if (newWidth >= this.#maxWidth) {
//       this.width = this.#maxWidth;
//       this.height = this.#maxWidth * this.#aspectRatio;
//     } else {
//       this.width = newWidth;
//       this.height = newHeight;

//       // this.render();
//       this.context.canvas.width = this.width;
//       this.context.canvas.height = this.height;
//       // console.log(this.context.canvas.width, this.context.canvas.height);
//     }
//   }
// }

window.customElements.define('gui-display', GUIDisplay);
