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
      vx: 0,
      vy: 0,
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
    components: [components.rect, components.input, components.graphics],
  })
    .setComponent('rect', {
      x: globalConfig.display.width / 2 - 100 / 2,
      y: globalConfig.display.height - 20,
      vx: 0.5,
      vy: 0,
      width: 100,
      height: 10,
    })
    .setComponent('graphics', {
      color: 'red',
    }),

  new ECSEntity({
    name: 'ball',
    components: [components.rect, components.graphics],
  })
    .setComponent('rect', {
      x: 100,
      y: 100,
      vx: 0.4,
      vy: 0.4,
      width: 50,
      height: 50,
    })
    .setComponent('graphics', {
      color: 'white',
    }),
];

const systems = [
  new ECSSystem({
    name: 'input',
    use: ['rect', 'input'],
    onNext: (elapsedTime, store, context, entities) => {
      entities.forEach((target) => {
        let { rect, input } = target.components;
        let deltaX = 0;
        if (input.controller.left.isActive) deltaX = -rect.vx * elapsedTime;
        if (input.controller.right.isActive) deltaX = rect.vx * elapsedTime;
        rect.x += deltaX;
      });
    },
  }),

  new ECSSystem({
    name: 'move',
    use: ['rect'],
    ignore: ['input'],
    onNext: (elapsedTime, store, context, entities) => {
      entities.forEach((target) => {
        let { rect } = target.components;
        let deltaX = rect.vx * elapsedTime;
        let deltaY = rect.vy * elapsedTime;
        rect.x += deltaX;
        rect.y += deltaY;
      });
    },
  }),

  new ECSSystem({
    name: 'bounce',
    use: ['rect'],
    ignore: ['input'],
    onNext: (elapsedTime, store, context, entities) => {
      entities.forEach((target) => {
        let { rect } = target.components;
        if (rect.x < 0 || rect.x + rect.width > context.canvas.width) {
          rect.vx = -rect.vx;
        }
        if (rect.y < 0 || rect.y + rect.height > context.canvas.height) {
          rect.vy = -rect.vy;
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
