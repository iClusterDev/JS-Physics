import Element from './Element';

/**
 * Component:
 * data container with name and id
 */
class Component extends Element {
  constructor({ name = '', data = {} } = { name: '', data: {} }) {
    super(name, 'Component');

    Object.assign(this, { ...data });
    Object.seal(this);
  }
}

export default Component;
