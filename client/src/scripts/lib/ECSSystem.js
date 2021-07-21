import ECSElement from './ECSElement';

/**
 * ECSSystem:
 * behavior system
 */
class ECSSystem extends ECSElement {
  #onNext;

  constructor(
    { name = '', use = [], ignore = [], onNext = (...params) => {} } = {
      name: '',
      use: [],
      ignore: [],
      onNext: (...params) => {},
    }
  ) {
    super(name, 'ECSSystem');
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

export default ECSSystem;
