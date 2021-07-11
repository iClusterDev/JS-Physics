class Buffer {
  #buffer;
  #color;

  /**
   * Game Buffer
   *
   * Generic offscreen canvas.
   * Width and Height are required parameters;
   * if the id parameter is padssed in, the canvas
   * will be taken from the DOM
   *
   * @param {*} config - configuration object
   * @param {*} config.id - (*optional) String: DOM canvas element id
   * @param {*} config.width - Number: canvas width
   * @param {*} config.height - Number: canvas height
   * @param {*} config.color - String: canvas color
   *
   * @getter canvas
   * @getter height
   * @getter width
   * @method draw()
   * @method clear()
   */
  constructor(config = {}) {
    const { id = '', width = 0, height = 0, color = 'transparent' } = config;
    if (width === 0 || height === 0)
      throw new Error(`Buffer: width and height are required!`);

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

  get context() {
    return this.#buffer;
  }

  get canvas() {
    return this.#buffer.canvas;
  }

  get width() {
    return this.#buffer.canvas.width;
  }

  get height() {
    return this.#buffer.canvas.height;
  }

  get color() {
    return this.#color;
  }

  set color(color = 'transparent') {
    this.#buffer.fillStyle = color;
    this.#buffer.fillRect(0, 0, this.width, this.height);
  }

  clear(rectX = null, rectY = null, rectW = null, rectH = null) {
    this.#buffer.clearRect(
      rectX || 0,
      rectY || 0,
      rectW || this.#buffer.canvas.width,
      rectH || this.#buffer.canvas.height
    );
  }

  draw(
    source,
    sourceX,
    sourceY,
    sourceW,
    sourceH,
    destX = null,
    destY = null,
    destW = null,
    destH = null
  ) {
    this.#buffer.drawImage(
      source,
      sourceX,
      sourceY,
      sourceW,
      sourceH,
      destX || 0,
      destY || 0,
      destW || this.#buffer.canvas.width,
      destH || this.#buffer.canvas.height
    );
  }
}

export default Buffer;
