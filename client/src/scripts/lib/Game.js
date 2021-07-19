import Emitter from './Emitter';

// TODO
// should be a singleton?
class Game extends Emitter {
  #mutations;
  #actions;
  #status;

  constructor(config = {}) {
    super();
    const { state = {}, actions = {}, mutations = {} } = config;
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
  }

  dispatch(actionKey, payload) {
    if (typeof this.#actions[actionKey] !== 'function')
      throw new Error(`Action ${actionKey} doesn't exist!`);
    this.#status = 'action';
    this.#actions[actionKey](this, payload);
    return true;
  }

  commit(mutationKey, payload) {
    if (typeof this.#mutations[mutationKey] !== 'function')
      throw new Error(`Mutation ${mutationKey} doesn't exist!`);
    this.#status = 'mutation';
    this.#mutations[mutationKey](this.state, payload);
    return true;
  }
}

export default Game;
