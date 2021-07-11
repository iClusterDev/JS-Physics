import ECSElement from './ECSElement';

/**
 * ECSSystem:
 * behavior system
 */
class ECSSystem extends ECSElement {
  #onNext;

  constructor(
    { name = '', onNext = (...params) => {} } = {
      name: '',
      onNext: (...params) => {},
    }
  ) {
    super(name, 'ECSSystem');
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
