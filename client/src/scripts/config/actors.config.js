import globalConfig from './global.config';
import Controller from '../lib/Controller';
import ECSComponent from '../lib/ECSComponent';
import ECSSystem from '../lib/ECSSystem';
import ECSEntity from '../lib/ECSEntity';

const components = {
  rect: new ECSComponent({
    name: 'rect',
    data: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
  }),

  input: new ECSComponent({
    name: 'input',
    data: {
      controller: new Controller([
        { code: 'KeyA', action: 'left' },
        { code: 'KeyD', action: 'right' },
      ]),
    },
  }),

  physics: new ECSComponent({
    name: 'physics',
    data: {
      vx: 0,
      vy: 0,
      solid: false,
    },
  }),

  graphics: new ECSComponent({
    name: 'graphics',
    data: {
      color: 'transparent',
    },
  }),
};

const entities = [
  new ECSEntity({
    name: 'player',
    // prettier-ignore
    components: [
      components.rect,
      components.input,
      components.physics,
      components.graphics,
    ],
  })
    .setComponent('rect', {
      x: globalConfig.display.width / 2 - 100 / 2,
      y: globalConfig.display.height - 20,
      vx: 0.5,
      vy: 0,
      width: 100,
      height: 10,
    })
    .setComponent('physics', {
      vx: 0.5,
      vy: 0,
      solid: true,
    })
    .setComponent('graphics', {
      color: 'red',
    }),

  new ECSEntity({
    name: 'ball',
    // prettier-ignore
    components: [
      components.rect, 
      components.physics, 
      components.graphics
    ],
  })
    .setComponent('rect', {
      x: 100,
      y: 100,
      vx: 0.4,
      vy: 0.4,
      width: 50,
      height: 50,
    })
    .setComponent('physics', {
      vx: 0.4,
      vy: 0.4,
      solid: true,
    })
    .setComponent('graphics', {
      color: 'white',
    }),
];

const systems = [
  new ECSSystem({
    name: 'input',
    use: ['rect', 'input', 'physics'],
    onNext: (elapsedTime, store, context, entities) => {
      entities.forEach((target) => {
        let { rect, input, physics } = target.components;

        // computes deltas
        let deltaX = 0;
        if (input.controller.left.isActive) deltaX = -physics.vx * elapsedTime;
        if (input.controller.right.isActive) deltaX = physics.vx * elapsedTime;

        // check for boudary collision & resolve
        let newRectX = rect.x + deltaX;
        if (newRectX < 0) newRectX = 0.1;
        if (newRectX + rect.width > context.canvas.width)
          newRectX = context.canvas.width - rect.width - 0.1;

        rect.x = newRectX;
      });
    },
  }),

  new ECSSystem({
    name: 'move',
    use: ['rect', 'physics'],
    ignore: ['input'],
    onNext: (elapsedTime, store, context, entities) => {
      entities.forEach((target) => {
        let { rect, physics } = target.components;
        let deltaX = physics.vx * elapsedTime;
        let deltaY = physics.vy * elapsedTime;
        rect.x += deltaX;
        rect.y += deltaY;
      });
    },
  }),

  new ECSSystem({
    name: 'bounce',
    use: ['rect', 'physics'],
    ignore: ['input'],
    onNext: (elapsedTime, store, context, entities) => {
      entities.forEach((target) => {
        let { rect, physics } = target.components;
        if (rect.x < 0 || rect.x + rect.width > context.canvas.width) {
          physics.vx = -physics.vx;
        }
        if (rect.y < 0 || rect.y + rect.height > context.canvas.height) {
          physics.vy = -physics.vy;
        }
      });
    },
  }),

  new ECSSystem({
    name: 'render',
    use: ['rect', 'graphics'],
    onNext: (elapsedTime, store, context, entities) => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      entities.forEach((target) => {
        let { rect, graphics } = target.components;
        context.fillStyle = graphics.color;
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
      });
    },
  }),
];

export default { components, entities, systems };
