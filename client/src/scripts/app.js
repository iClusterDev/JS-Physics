import ECSEntity from './lib/ECSEntity';
import ECSComponent from './lib/ECSComponent';

const health = new ECSComponent({
  name: 'health',
  data: {
    value: 100,
    max: 200,
    min: 0,
  },
});

const physics = new ECSComponent({
  name: 'physics',
  data: {
    x: 100,
    y: 200,
    vx: 0,
    vy: 0,
  },
});

const graphics = new ECSComponent({
  name: 'graphics',
  data: {
    spritesheet: 'image',
    columns: 3,
    rows: 3,
  },
});

const entity = new ECSEntity();
entity
  .addComponent(health)
  .addComponent(physics)
  .addComponent(graphics)
  .print();
