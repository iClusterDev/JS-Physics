import ECSElement from './ECSElement';

/**
 * ECSComponent:
 * data container with name and id
 */
class ECSComponent extends ECSElement {
  constructor({ name = '', data = {} } = { name: '', data: {} }) {
    super(name, 'ECSComponent');

    // TODO
    // this is a shallow copy
    // deep copy needed here?
    Object.assign(this, { ...data });
    Object.seal(this);
  }
}

export default ECSComponent;
