const ECSElementTypes = ['ECSEntity', 'ECSSystem', 'ECSComponent'];

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

  get id() {
    return this.#id;
  }

  get type() {
    return this.#type;
  }

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
