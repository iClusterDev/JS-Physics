const ECSElementTypes = ['ECSEntity', 'ECSSystem', 'ECSComponent'];

/**
 * ECSElement:
 * superclass for ECS system
 */
class ECSElement {
  #id;
  #type;
  #name;

  constructor(name = '', type = '') {
    if (!name || name.length === 0)
      throw new Error(`ECSElement error: "name" is a required parameter(s)!`);

    if (!type || type.length === 0)
      throw new Error(`ECSElement error: "type" is required parameter(s)!`);

    if (!ECSElementTypes.includes(type))
      throw new Error(
        `ECSElement error: type ${type} is not and ECSElementType!`
      );

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
   * @param {*} ecsElement ECSElement instance
   * @param {*} options { ofType? }
   * @returns Boolean
   */
  static isECSElement(ecsElement = null, options = {}) {
    let { type } = ecsElement ? ecsElement : null;
    let { ofType } = options;
    // prettier-ignore
    return ofType
      ? ECSElementTypes.includes(type) &&
        ECSElementTypes.includes(ofType) &&
        type === ofType
      : ECSElementTypes.includes(type);
  }
}

export default ECSElement;
