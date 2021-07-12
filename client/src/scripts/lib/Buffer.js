/**
 * Game Buffer:
 * Generic offscreen/onscreen canvas.
 * Width and Height are required parameters;
 * if the id parameter is padssed in, the canvas
 * will be taken from the DOM and will be onscreen
 */
class Buffer {
  #buffer;
  #color;

  constructor(
    { id = '', width = 0, height = 0, color = 'transparent' } = {
      id: '',
      width: 0,
      height: 0,
      color: 'transparent',
    }
  ) {
    if (width === 0 || height === 0)
      throw new Error(`Buffer: width and height are required parameters!`);

    if (id.length > 0) {
      const canvas = document.querySelector(id);
      canvas.width = width;
      canvas.height = height;
      this.#buffer = canvas.getContext('2d');
    } else {
      this.#buffer = new OffscreenCanvas(width, height).getContext('2d');
    }

    this.#color = color;
    this.#buffer.imageSmoothingEnabled = false;
    if (color !== 'transparent') {
      this.#buffer.fillStyle = this.#color;
      this.#buffer.fillRect(0, 0, width, height);
    }
  }

  // readonly context
  get context() {
    return this.#buffer;
  }

  // readonly canvas
  get canvas() {
    return this.#buffer.canvas;
  }

  // readonly width
  get width() {
    return this.#buffer.canvas.width;
  }

  // readonly height
  get height() {
    return this.#buffer.canvas.height;
  }
  // color getter
  get color() {
    return this.#color;
  }

  // color setter
  set color(color = 'transparent') {
    this.#buffer.fillStyle = color;
    this.#buffer.fillRect(0, 0, this.width, this.height);
  }
}

export default Buffer;
