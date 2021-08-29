import Element from './Element';

/**
 * System:
 * behavior system
 */
class System extends Element {
  #onNext;

  constructor(
    { name = '', use = [], ignore = [], onNext = (...params) => {} } = {
      name: '',
      use: [],
      ignore: [],
      onNext: (...params) => {},
    }
  ) {
    super(name, 'System');
    this.use = use;
    this.ignore = ignore;
    this.#onNext = onNext;
  }

  /**
   * to perform the entity data mutation
   * every next tick
   * @param  {...any} params
   */
  next(...params) {
    this.#onNext(...params);
  }
}

export default System;
