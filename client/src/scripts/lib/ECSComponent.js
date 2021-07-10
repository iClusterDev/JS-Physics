import ECSElement from './ECSElement';

/**
 * ECSComponent:
 * data container with name and id
 */
class ECSComponent extends ECSElement {
  #name;

  constructor({ name = null, data = {} } = { name: null, data: {} }) {
    super('ECSComponent');

    if (!name)
      throw new Error(
        `ECSComponent error: instance parameter "name" is required!`
      );

    this.#name = name;
    Object.assign(this, data);
    Object.seal(this);
  }

  /**
   * readonly name
   */
  get name() {
    return this.#name;
  }
}

export default ECSComponent;
