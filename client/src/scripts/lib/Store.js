import Emitter from './Emitter';

/**
 * Game store (singleton)
 *
 * A configurable state management system.
 * Inherits from Emitter
 */
class Store extends Emitter {
  #mutations;
  #actions;
  #status;

  constructor(
    { state = {}, actions = {}, mutations = {} } = {
      state: {},
      actions: {},
      mutations: {},
    }
  ) {
    if (Store.instance) {
      return Store.instance;
    } else {
      super();
      this.#mutations = mutations;
      this.#actions = actions;
      this.#status = 'resting';

      const self = this;
      self.state = state;
      self.state = new Proxy(self.state, {
        set: function (state, key, value) {
          if (!state.hasOwnProperty(key))
            throw new Error(`The key "${key}" is not declared`);
          if (self.#status !== 'mutation')
            throw new Error(`Use a mutation to set "${key}" to "${value}"`);

          Reflect.set(state, key, value);
          self.emit(`${key}-change`, self.state[key]);
          self.#status = 'resting';
          return true;
        },
      });

      Object.freeze(this);
      return this;
    }
  }

  /**
   * To dispatch a configured action
   * @param {*} actionKey
   * @param {*} payload
   * @returns
   */
  dispatch(actionKey, payload) {
    if (typeof this.#actions[actionKey] !== 'function')
      throw new Error(`Action ${actionKey} doesn't exist!`);
    this.#status = 'action';
    this.#actions[actionKey](this, payload);
    return true;
  }

  /**
   * To commit a configured mutation
   * @param {*} mutationKey
   * @param {*} payload
   * @returns
   */
  commit(mutationKey, payload) {
    if (typeof this.#mutations[mutationKey] !== 'function')
      throw new Error(`Mutation ${mutationKey} doesn't exist!`);
    this.#status = 'mutation';
    this.#mutations[mutationKey](this.state, payload);
    return true;
  }
}

export default Store;
