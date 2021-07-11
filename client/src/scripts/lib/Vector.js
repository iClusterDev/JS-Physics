class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * length of the vector
   */
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * magnitude of the vector (alias for length)
   */
  get magnitude() {
    return this.length;
  }

  /**
   * to add another vector to this vector
   * @param {*} vec
   * @returns
   */
  add(vec) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
  }

  /**
   *
   * @param {*} vec
   * @returns
   */
  addScalar(scalar) {
    this.x += scalar;
    this.y += scalar;
    return this;
  }

  /**
   *
   * @param {*} vec
   * @returns
   */
  subtract(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
  }

  /**
   *
   * @param {*} vec
   * @returns
   */
  subtractScalar(scalar) {
    this.x -= scalar;
    this.y -= scalar;
    return this;
  }

  /**
   *
   * @param {*} vec
   * @returns
   */
  multiply(vec) {
    this.x *= vec.x;
    this.y *= vec.y;
    return this;
  }

  /**
   *
   * @param {*} vec
   * @returns
   */
  multiplyScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  /**
   *
   * @param {*} vec
   * @returns
   */
  divide(vec) {
    if (vec.x === 0 || vec.y === 0)
      throw new Error('Vector.divide: cannot divide by 0!');
    this.x /= vec.x;
    this.y /= vec.y;
    return this;
  }

  /**
   *
   * @param {*} vec
   * @returns
   */
  divideScalar(scalar) {
    if (scalar === 0)
      throw new Error('Vector.divideScalar: cannot divide by 0!');
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }

  /**
   *
   * @returns
   */
  invert() {
    this.x *= -1;
    this.y *= -1;
    return this;
  }

  /**
   *
   * @returns
   */
  invertX() {
    this.x *= -1;
    return this;
  }

  /**
   *
   * @returns
   */
  invertY() {
    this.y *= -1;
    return this;
  }

  /**
   *
   * @returns
   */
  zero() {
    this.x = 0;
    this.y = 0;
    return this;
  }

  /**
   *
   * @returns
   */
  zeroX() {
    this.x = 0;
    return this;
  }

  /**
   *
   * @returns
   */
  zeroY() {
    this.y = 0;
    return this;
  }

  /**
   *
   * @returns
   */
  normalize() {
    this.divideScalar(this.magnitude);
    return this;
  }

  /**
   *
   * @param {*} vec
   */
  dot(vec) {
    return this.x * vec.x + this.y * vec.y;
  }

  /**
   *
   * @param {*} vec
   */
  cross(vec) {
    return this.x * vec.y - this.y * vec.x;
  }

  /**
   * @static
   * @param {*} arr
   * @returns
   */
  static fromArray(arr) {
    return new Vector(arr[0] || 0, arr[1] || 0);
  }

  /**
   * @static
   * @param {*} obj
   * @returns
   */
  static fromObject(obj) {
    return new Vector(obj.x || 0, obj.y || 0);
  }
}

module.exports = Vector;
