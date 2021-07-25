import ECSElement from './ECSElement';

/**
 * ECSComponent:
 * data container with name and id
 */
class ECSComponent extends ECSElement {
  constructor({ name = '', data = {} } = { name: '', data: {} }) {
    super(name, 'ECSComponent');

    Object.assign(this, { ...data });
    Object.seal(this);
  }
}

export default ECSComponent;
