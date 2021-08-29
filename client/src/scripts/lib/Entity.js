import Element from './Element';

/**
 * Entity:
 * components container with id
 */
class Entity extends Element {
  constructor({ name = '', components = [] } = { name: '', components: [] }) {
    super(name, 'Entity');
    this.components = {};
    if (components.length > 0) {
      let self = this;
      components.forEach((component) => {
        this.addComponent(component);
      });
    }
  }

  /**
   * to initialize a component of this entity
   * @param {*} componentName
   * @param {*} data
   * @returns
   */
  setComponent(componentName = '', data = {}) {
    let componentNameStr = componentName.toString();
    if (this.components.hasOwnProperty(componentNameStr)) {
      for (const key in data) {
        if (this.components[componentNameStr].hasOwnProperty(key))
          this.components[componentNameStr][key] = data[key];
      }
    }
    return this;
  }

  /**
   * to add a new Component to this entity
   * @param {*} component Component instance
   * @returns this
   */
  addComponent(component = null) {
    if (Element.isElement(component, { ofType: 'Component' }))
      // TODO
      // this is a shallow copy
      // deep copy needed here?
      this.components[component.name] = { ...component };
    return this;
  }

  /**
   * to remove an existing Component from this entity
   * @param {*} componentName String
   * @returns this
   */
  removeComponent(componentName = '') {
    let componentNameStr = componentName.toString();
    if (
      componentNameStr.length > 0 &&
      this.components.hasOwnProperty(componentNameStr)
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
          name: this.name,
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

export default Entity;
