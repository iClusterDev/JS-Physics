import ecsConfig from './ecs.config';

// entityPicker
class Picker {
  #filters = [];

  constructor({ include = [], exclude = [] } = { include: [], exclude: [] }) {
    this.include([...include]);
    this.exclude([...exclude]);
  }

  #evaluate(obj) {
    return this.#filters.reduce((result, filter) => {
      result *= filter(obj);
      return result;
    }, true);
  }

  include(keys = []) {
    keys.forEach((key) => {
      this.#filters.push((obj) => obj.components.hasOwnProperty(key));
    });
    return this;
  }

  exclude(keys = []) {
    keys.forEach((key) => {
      this.#filters.push((obj) => !obj.components.hasOwnProperty(key));
    });
    return this;
  }

  pick(data) {
    if (!Array.isArray(data))
      throw new Error('Picker: invalid input data type (must be an Array)');
    let self = this;
    return data.reduce((result, dataItem) => {
      if (self.#evaluate(dataItem)) result.push(dataItem);
      return result;
    }, []);
  }
}

// ECSLevel
class ECSLevel {
  #systems;

  constructor({ entities = [], systems = [] } = { entities: [], systems: [] }) {
    this.id = 0;
    this.#systems = systems.map((system) => {
      let { use = [], ignore = [] } = system;
      let targets = new Picker({
        include: [...use],
        exclude: [...ignore],
      }).pick(entities);
      return { targets, next: system.next };
    });
  }

  next(elapsedTime, store, context) {
    this.#systems.forEach((system) =>
      system.next(elapsedTime, store, context, system.targets)
    );
  }
}

export default new ECSLevel(ecsConfig.entities, ecsConfig.systems);
