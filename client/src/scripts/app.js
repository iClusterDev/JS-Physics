import ECSElement from './lib/ECSElement';

/**
 * ECSEntity
 * ...
 * ...
 */
class ECSEntity extends ECSElement {
  #components;

  constructor() {
    super('ECSEntity');
    this.#components = [];
  }

  /**
   * print
   * to console.log this entity in a Json format
   */
  print() {
    console.log(
      JSON.stringify(
        {
          id: this.id,
          type: this.type,
          components: this.#components,
        },
        null,
        2
      )
    );
    return this;
  }

  /**
   * addComponent
   * to add a new ECSComponent to this entity
   * @param {*} component
   * @returns
   */
  addComponent(component = null) {
    if (ECSElement.isECSElement(component, { ofType: 'ECSComponent' }))
      this.#components.push(component);
    return this;
  }

  /**
   * removeComponent
   * to remove an existing ECSComponent from this entity
   * @param {*} componentName
   * @returns this
   */
  removeComponent(ecsComponentName = '') {
    this.#components = this.#components.filter((component) => {
      return component.name !== ecsComponentName;
    });
    return this;
  }
}

class SuperDummyComponent {
  constructor() {
    this.type = 'ECSComponent';
  }
}

class DummyComponent extends SuperDummyComponent {
  constructor() {
    super();
    this.name = 'dummy';
  }
}

const entity = new ECSEntity();
entity
  .print()
  .addComponent(new DummyComponent())
  .print()
  .removeComponent('dummy')
  .print();
