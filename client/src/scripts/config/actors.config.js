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
        { code: 'ArrowLeft', action: 'left' },
        { code: 'ArrowRight', action: 'right' },
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
    name: 'collider',
    use: ['rect', 'physics'],
    onNext: (elapsedTime, store, context, entities) => {
      function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
        if (x2 > x1 + w1 || x1 > x2 + w2 || y2 > y1 + h1 || y1 > y2 + h2) {
          return false;
        } else {
          return true;
        }
      }

      for (let i = 0; i < entities.length; i++) {
        for (let j = i + 1; j < entities.length; j++) {
          let { name: name1 } = entities[i];
          let { name: name2 } = entities[j];
          let { rect: rect1, physics: physics1 } = entities[i].components;
          let { rect: rect2, physics: physics2 } = entities[j].components;

          if (
            physics1.solid &&
            physics2.solid &&
            rectIntersect(
              rect1.x,
              rect1.y,
              rect1.width,
              rect1.height,
              rect2.x,
              rect2.y,
              rect2.width,
              rect2.height
            )
          ) {
            if (name1 === 'ball') physics1.vy = -physics1.vy;
            if (name2 === 'ball') physics2.vy = -physics2.vy;
          }
        }
      }
    },
  }),

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

        if (rect.y < 0) {
          physics.vy = -physics.vy;
        }

        if (rect.y + rect.height > context.canvas.height) {
          store.dispatch('hit');
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

// function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
//   if (x2 > x1 + w1 || x1 > x2 + w2 || y2 > y1 + h1 || y1 > y2 + h2) {
//     return false;
//   } else {
//     return true;
//   }
// }

// function collisionDetect() {
//   let square1;
//   let square2;

//   squares.forEach((square) => (square.collision = false));
//   for (let i = 0; i < squares.length; i++) {
//     square1 = squares[i];
//     for (let j = i + 1; j < squares.length; j++) {
//       square2 = squares[j];
//       // if rectIntersect
//       // emit collision with payload (square1, square2)
//       if (
//         rectIntersect(
//           square1.x,
//           square1.y,
//           square1.size,
//           square1.size,
//           square2.x,
//           square2.y,
//           square2.size,
//           square2.size
//         )
//       ) {
//         square1.collision = true;
//         square2.collision = true;

//         // compute the collision vector
//         let vCollision = {
//           x: square2.cx - square1.cx,
//           y: square2.cy - square1.cy,
//         };

//         let vCollisionDist = Math.sqrt(
//           (square2.cx - square1.cx) * (square2.cx - square1.cx) +
//             (square2.cy - square1.cy) * (square2.cy - square1.cy)
//         );

//         let vCollisionNorm = {
//           x: vCollision.x / vCollisionDist,
//           y: vCollision.y / vCollisionDist,
//         };

//         let vRelativeVelocity = {
//           x: square1.vx - square2.vx,
//           y: square1.vy - square2.vy,
//         };

//         let speed =
//           vRelativeVelocity.x * vCollisionNorm.x +
//           vRelativeVelocity.y * vCollisionNorm.y;

//         if (speed > 0) {
//           let dSpeed1 = {
//             x: -speed * vCollisionNorm.x,
//             y: -speed * vCollisionNorm.y,
//           };

//           let dSpeed2 = {
//             x: speed * vCollisionNorm.x,
//             y: speed * vCollisionNorm.y,
//           };

//           square1.onCollision(dSpeed1);
//           square2.onCollision(dSpeed2);
//         }
//       }
//     }
//   }
// }
