import globalConfig from './global.config';
import ecsConfig from './ecs.config';
import Buffer from '../lib/Buffer';

/**
 * TODO
 * this should be named better?
 */
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
  #buffer;
  #systems;

  constructor(
    { width = 832, height = 640, systems = [], entities = [] } = {
      width: 832,
      height: 640,
      systems: [],
      entities: [],
    }
  ) {
    this.#buffer = new Buffer({ width, height });
    this.#systems = systems.map((system) => {
      let { use = [], ignore = [] } = system;
      let targets = new Picker({
        include: [...use],
        exclude: [...ignore],
      }).pick(entities);

      return { targets, system };
    });
  }

  get buffer() {
    return this.#buffer.canvas;
  }

  next(elapsedTime, store, context) {
    this.#buffer.clear();
    this.#systems.forEach((systemElement) => {
      let { targets, system } = systemElement;
      system.next(elapsedTime, store, this.#buffer.context, targets);
    });
  }
}

let { display } = globalConfig;
export default new ECSLevel({
  width: display.width,
  height: display.height,
  systems: ecsConfig.systems,
  entities: ecsConfig.entities,
});
