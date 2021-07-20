// BOUNCER
// player needs to bounce back the bouncing square
// every bounce back score increase
// win condition: score go up to 10
// loose condition: bouncing square touches the ground
import ecsConfig from './config/ecs.config';
import levelsConfig from './config/levels.config';

import ECSComponent from './lib/ECSComponent';
import ECSSystem from './lib/ECSSystem';
import ECSEntity from './lib/ECSEntity';

const loadSystemsFromMap = (ecsConfig, map) => {
  // sort the components first
  let components = {};
  ecsConfig.components.forEach((component) => {
    let { name, data } = component;
    components[name] = new ECSComponent({ name, data });
  });

  // now sort the entities
  let entities = [];
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const symbol = map[row][col];
      if (symbol !== '.') {
        const entityConfig = ecsConfig.entities.find(
          (entity) => entity.symbol === symbol
        );
        if (entityConfig) {
        }
      }
    }
  }
};

class GAMELevelLayer {
  constructor(
    { name, columns, rows, unit, map } = { name, columns, rows, unit, map }
  ) {
    this.name = name;
    this.canvas = new OffscreenCanvas(columns * unit, rows * unit);
    this.systems = loadSystemsFromMap(ecsConfig, map);
  }

  get context() {
    return this.canvas.getContext('2d');
  }
}

class GAMELevel {
  constructor({ id, layers } = { id, layers }) {
    this.id = id;
    this.layers = layers.map((layer) => new GAMELevelLayer({ ...layer }));
  }
}

const gameLevels = levelsConfig.map((level) => new GAMELevel({ ...level }));

export default () => {};
