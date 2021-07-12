import Display from './lib/Display';
import Engine from './lib/Engine';
import ECSEntity from './lib/ECSEntity';
import ECSSystem from './lib/ECSSystem';
import ECSComponent from './lib/ECSComponent';

// display setup
const UNIT = 32;
const DISPLAY_WIDTH = UNIT * 26; // 832
const DISPLAY_HEIGHT = UNIT * 20; // 640
const display = new Display({
  id: 'canvas',
  width: DISPLAY_WIDTH,
  height: DISPLAY_HEIGHT,
});

// components setup
const componentRect = new ECSComponent({
  name: 'rect',
  data: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
});

const componentPhysics = new ECSComponent({
  name: 'physics',
  data: {
    vx: 0.0,
    vy: 0.0,
  },
});

const componentGraphics = new ECSComponent({
  name: 'graphics',
  data: {
    colour: 'transparent',
  },
});

// entities setup
const player = new ECSEntity({
  name: 'player',
  components: [componentGraphics, componentPhysics, componentRect],
})
  .setComponent('rect', {
    x: 10,
    y: 20,
    width: 50,
    height: 50,
  })
  .setComponent('physics', {
    vx: 0.4,
    vy: 0.4,
  })
  .setComponent('graphics', {
    colour: 'red',
  });

const enemy = new ECSEntity({
  name: 'enemy',
  components: [componentGraphics, componentPhysics, componentRect],
})
  .setComponent('rect', {
    x: 200,
    y: 0,
    width: 25,
    height: 25,
  })
  .setComponent('physics', {
    vx: 0.0,
    vy: 0.5,
  })
  .setComponent('graphics', {
    colour: 'black',
  });

const entities = [player, enemy];

// systems setup
const systemMove = new ECSSystem({
  name: 'systemMove',
  onNext: (elapsedTime, entities) => {
    entities.forEach((entity) => {
      let { rect = null, physics = null } = entity.components;
      if (rect && physics) {
        let deltaX = physics.vx * elapsedTime;
        let deltaY = physics.vy * elapsedTime;
        rect.x += deltaX;
        rect.y += deltaY;
      }
    });
  },
});

const systemBounce = new ECSSystem({
  name: 'systemBounce',
  onNext: (context, entities) => {
    entities.forEach((entity) => {
      let { rect = null, physics = null, graphics = null } = entity.components;
      if (rect && physics && graphics) {
        if (rect.x < 0 || rect.x + rect.width > context.canvas.width) {
          physics.vx = -physics.vx;
          graphics.colour = `#${Math.floor(Math.random() * 16777215).toString(
            16
          )}`;
        }
        if (rect.y < 0 || rect.y + rect.height > context.canvas.height) {
          physics.vy = -physics.vy;
          graphics.colour = `#${Math.floor(Math.random() * 16777215).toString(
            16
          )}`;
        }
      }
    });
  },
});

const systemRender = new ECSSystem({
  name: 'systemRender',
  onNext: (context, entities) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    entities.forEach((entity) => {
      let { rect = null, graphics = null } = entity.components;
      if (rect && graphics) {
        context.fillStyle = graphics.colour;
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
      }
    });
  },
});

// engine setup
const engine = new Engine(
  (elapsedTime) => {
    systemMove.next(elapsedTime, entities);
    systemBounce.next(display.context, entities);
  },
  () => {
    systemRender.next(display.context, entities);
  }
);

export default () => {
  // engine.start();
};
