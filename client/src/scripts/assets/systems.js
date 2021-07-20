import ECSSystem from '../lib/ECSSystem';

const systems = [
  new ECSSystem({
    name: 'systemMove',
    onNext: (elapsedTime, context, entities) => {
      entities.forEach((entity) => {
        let { rect = null } = entity.components;
        if (rect) {
          let deltaX = rect.vx * elapsedTime;
          let deltaY = rect.vy * elapsedTime;
          rect.x += deltaX;
          rect.y += deltaY;
        }
      });
    },
  }),

  new ECSSystem({
    name: 'systemBounce',
    onNext: (elapsedTime, context, entities) => {
      entities.forEach((entity) => {
        let { rect = null } = entity.components;
        if (rect && rect) {
          if (rect.x < 0 || rect.x + rect.width > context.canvas.width) {
            rect.vx = -rect.vx;
          }
          if (rect.y < 0 || rect.y + rect.height > context.canvas.height) {
            rect.vy = -rect.vy;
          }
        }
      });
    },
  }),

  new ECSSystem({
    name: 'systemRender',
    onNext: (elapsedTime, context, entities) => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      entities.forEach((entity) => {
        let { rect = null, graphics = null } = entity.components;
        if (rect && graphics) {
          context.fillStyle = graphics.color;
          context.fillRect(rect.x, rect.y, rect.width, rect.height);
        }
      });
    },
  }),
];

export default systems;