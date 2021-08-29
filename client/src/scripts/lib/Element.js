const elementTypes = ['Entity', 'System', 'Component'];

/**
 * Element:
 * superclass for ECS system
 */
class Element {
  #id;
  #type;
  #name;

  constructor(name = '', type = '') {
    if (!name || name.length === 0)
      throw new Error(`Element error: "name" is a required parameter(s)!`);

    if (!type || type.length === 0)
      throw new Error(`Element error: "type" is required parameter(s)!`);

    if (!elementTypes.includes(type))
      throw new Error(`Element error: type ${type} is not and ElementType!`);

    this.#id = `_${Math.random().toString(36).substr(2, 9)}`;
    this.#type = type;
    this.#name = name;
  }

  // readonly id
  get id() {
    return this.#id;
  }

  // readonly type
  get type() {
    return this.#type;
  }

  // readonly name
  get name() {
    return this.#name;
  }

  /**
   * to typecheck the instance parameter passed in
   * @param {*} ecsElement Element instance
   * @param {*} options { ofType? }
   * @returns Boolean
   */
  static isElement(ecsElement = null, options = {}) {
    let { type } = ecsElement ? ecsElement : null;
    let { ofType } = options;
    // prettier-ignore
    return ofType
      ? elementTypes.includes(type) &&
        elementTypes.includes(ofType) &&
        type === ofType
      : elementTypes.includes(type);
  }
}

export default Element;
