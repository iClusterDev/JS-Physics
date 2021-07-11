import ECSEntity from './lib/ECSEntity';
import ECSSystem from './lib/ECSSystem';
import ECSComponent from './lib/ECSComponent';

const physics = new ECSComponent({
  name: 'physics',
  data: {
    x: 100,
    y: 200,
    vx: 0,
    vy: 0,
  },
});

const entity = new ECSEntity({ name: 'myEntity' });
entity.addComponent(physics);

const rectMoveSystem = new ECSSystem({
  name: 'moveSystem',
  onNext: (elapsedTime, ecsEntities) => {
    ecsEntities.forEach((entity) => {
      console.log(entity.components.physics.x++);
    });
  },
});

rectMoveSystem.next(16, [entity]);
rectMoveSystem.next(16, [entity]);
rectMoveSystem.next(16, [entity]);
rectMoveSystem.next(16, [entity]);
rectMoveSystem.next(16, [entity]);
rectMoveSystem.next(16, [entity]);

// const testNext = (...params) => {
//   console.log(params);
// };

// testNext(1, 2, 3);
