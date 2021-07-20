const components = [
  {
    name: 'rect',
    data: {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      width: 0,
      height: 0,
    },
  },

  {
    name: 'graphics',
    data: {
      color: 'transparent',
    },
  },
];

const entities = [
  {
    name: 'ball',
    symbol: 'B',
    components: ['rect', 'graphics'],
    defaults: [
      {
        component: 'rect',
        data: {
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          width: 0,
          height: 0,
        },
      },
      {
        component: 'graphics',
        data: { color: 'white' },
      },
    ],
  },
];

const systems = [
  {
    name: 'move',
    use: ['rect'],
    onNext: (elapsedTime, store, context, targets) => {
      targets.forEach((target) => {
        let { rect } = target.components;
        let deltaX = rect.vx * elapsedTime;
        let deltaY = rect.vy * elapsedTime;
        rect.x += deltaX;
        rect.y += deltaY;
      });
    },
  },

  {
    name: 'bounce',
    use: ['rect'],
    onNext: (elapsedTime, store, context, targets) => {
      targets.forEach((target) => {
        let { rect } = target.components;
        if (rect.x < 0 || rect.x + rect.width > context.canvas.width) {
          rect.vx = -rect.vx;
        }
        if (rect.y < 0 || rect.y + rect.height > context.canvas.height) {
          rect.vy = -rect.vy;
        }
      });
    },
  },

  {
    name: 'render',
    use: ['rect', 'graphics'],
    onNext: (elapsedTime, store, context, targets) => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      targets.forEach((target) => {
        let { rect, graphics } = target.components;
        context.fillStyle = graphics.color;
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
      });
    },
  },
];

export default { components, entities, systems };
