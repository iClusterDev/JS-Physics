const ECSElementTypes = ['ECSEntity', 'ECSSystem', 'ECSComponent'];

/**
 * ECSElement:
 * superclass for ECS system
 */
class ECSElement {
  #id;
  #type;

  constructor(type = null) {
    if (!ECSElementTypes.includes(type))
      throw new Error(
        `ECSElement error: type ${type} is not and ECSElementType!`
      );
    this.#id = `_${Math.random().toString(36).substr(2, 9)}`;
    this.#type = type;
  }

  /**
   * readonly id
   */
  get id() {
    return this.#id;
  }

  /**
   * readonly type
   */
  get type() {
    return this.#type;
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
