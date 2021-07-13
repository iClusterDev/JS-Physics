class Emitter {
  #events;

  constructor() {
    this.#events = {};
  }

  /**
   * Subscribe to the event system.
   * @param {String} event
   * @param {Function} listener
   */
  on(event = '', listener = () => {}) {
    if (!this.#events.hasOwnProperty(event)) this.#events[event] = [];
    return this.#events[event].push(listener);
  }

  /**
   * Fires the handlers of a specific event.
   * @param {String} event
   * @param {Object} data
   */
  emit(event = '', data = {}) {
    if (!this.#events[event]) return [];
    return this.#events[event].forEach((listener) => {
      listener(data);
    });
  }

  /**
   * Unsubscribe, by removing a specific
   * listener from an event.
   * @param {String} event
   * @param {Function} listener
   */
  removeListener(event = '', listener = () => {}) {
    if (!this.#events[event])
      throw new Error(`Can't remove listener. Event ${event} doesn't exist!`);
    return (this.#events[event] = this.#events[event].filter(
      (targetListener) => targetListener !== listener
    ));
  }
}

export default Emitter;
