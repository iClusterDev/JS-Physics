import ECSElement from './ECSElement';

/**
 * ECSEntity:
 * components container with id
 */
class ECSEntity extends ECSElement {
  constructor() {
    super('ECSEntity');
    this.components = {};
  }

  /**
   * to add a new ECSComponent to this entity
   * @param {*} component ECSComponent instance
   * @returns this
   */
  addComponent(component = null) {
    if (ECSElement.isECSElement(component, { ofType: 'ECSComponent' }))
      // TODO
      // add component only if that's not already there
      this.components[component.name] = component;
    return this;
  }

  /**
   * to remove an existing ECSComponent from this entity
   * @param {*} componentName String
   * @returns this
   */
  removeComponent(componentName = '') {
    if (
      componentName.toString().length > 0 &&
      this.components.hasOwnProperty(componentName.toString())
    ) {
      delete this.components[componentName];
    }
    return this;
  }

  /**
   * to console.log this entity in a Json format
   * utility to dump on disk and import
   */
  print() {
    console.log(
      JSON.stringify(
        {
          id: this.id,
          type: this.type,
          components: this.components,
        },
        null,
        2
      )
    );
    return this;
  }
}

export default ECSEntity;
