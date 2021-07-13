import Store from './lib/Store';
import Display from './lib/Display';
import Engine from './lib/Engine';
import Controller from './lib/Controller';
import ECSEntity from './lib/ECSEntity';
import ECSSystem from './lib/ECSSystem';
import ECSComponent from './lib/ECSComponent';

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

const componentInput = new ECSComponent({
  name: 'input',
  data: {
    controller: new Controller([
      { code: 'KeyA', action: 'moveLeft' },
      { code: 'KeyD', action: 'moveRight' },
    ]),
  },
});

// entities setup
const player = new ECSEntity({
  name: 'player',
  components: [
    componentGraphics,
    componentPhysics,
    componentInput,
    componentRect,
  ],
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

const enemy1 = new ECSEntity({
  name: 'enemy',
  components: [componentGraphics, componentPhysics, componentRect],
})
  .setComponent('rect', {
    x: 200,
    y: 700,
    width: 25,
    height: 25,
  })
  .setComponent('physics', {
    vx: 0.0,
    vy: 0.7,
  })
  .setComponent('graphics', {
    colour: 'black',
  });

const enemy2 = new ECSEntity({
  name: 'enemy',
  components: [componentGraphics, componentPhysics, componentRect],
})
  .setComponent('rect', {
    x: 500,
    y: 0,
    width: 50,
    height: 50,
  })
  .setComponent('physics', {
    vx: 0.0,
    vy: 0.8,
  })
  .setComponent('graphics', {
    colour: 'blue',
  });

const entities = [player, enemy1, enemy2];

// systems setup
const systemInputMove = new ECSSystem({
  name: 'systemMove',
  onNext: (elapsedTime, entities) => {
    entities.forEach((entity) => {
      let { rect = null, physics = null, input = null } = entity.components;
      if (rect && physics && input) {
        let deltaX = 0;
        if (input.controller.moveLeft.isActive)
          deltaX = -physics.vx * elapsedTime;
        if (input.controller.moveRight.isActive)
          deltaX = physics.vx * elapsedTime;

        rect.x += deltaX;
      }
    });
  },
});

const systemBounce = new ECSSystem({
  name: 'systemBounce',
  onNext: (context, elapsedTime, entities) => {
    entities.forEach((entity) => {
      let { rect = null, physics = null, input = null } = entity.components;
      if (rect && physics && !input) {
        let deltaX = physics.vx * elapsedTime;
        let deltaY = physics.vy * elapsedTime;
        let newX = rect.x + deltaX;
        let newY = rect.y + deltaY;

        rect.x += deltaX;
        rect.y += deltaY;

        if (newX < 0) {
          physics.vx = -physics.vx;
          rect.x = 0;
        } else if (newX + rect.width > context.canvas.width) {
          physics.vx = -physics.vx;
          rect.x = context.canvas.width - rect.width;
        } else if (newY < 0) {
          physics.vy = -physics.vy;
          rect.y = 0;
        } else if (newY + rect.height > context.canvas.height) {
          physics.vy = -physics.vy;
          rect.y = context.canvas.height - rect.height;
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

export default () => {
  // display setup
  const display = new Display({
    id: 'canvas',
    width: 832,
    height: 640,
  });

  // engine setup
  const engine = new Engine(
    (elapsedTime) => {
      systemInputMove.next(elapsedTime, entities);
      systemBounce.next(display.context, elapsedTime, entities);
    },
    () => {
      systemRender.next(display.context, entities);
    }
  );

  // start
  engine.start();
};
