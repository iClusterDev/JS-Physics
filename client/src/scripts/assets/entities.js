import ECSEntity from '../lib/ECSEntity';
import components from './components';

const entities = [
  {
    name: 'player',
    components: [components.rect, components.graphics],
    defaults: [
      {
        component: 'rect',
        data: {
          x: 10,
          y: 20,
          vx: 0.4,
          vy: 0.4,
          width: 50,
          height: 50,
        },
      },
      {
        component: 'graphics',
        data: {
          color: 'red',
        },
      },
    ],
  },
  {
    name: 'enemy',
    components: [components.rect, components.graphics],
    defaults: [
      {
        component: 'rect',
        data: {
          x: 600,
          y: 200,
          vx: 0.0,
          vy: 0.5,
          width: 15,
          height: 100,
        },
      },
      {
        component: 'graphics',
        data: {
          color: 'white',
        },
      },
    ],
  },
];

const init = () => {
  return entities.map((entity) => {
    let { name, components, defaults } = entity;
    let ecsEntity = new ECSEntity({ name, components });
    defaults.forEach((entry) => {
      let { component, data } = entry;
      ecsEntity.setComponent(component, data);
    });
    return ecsEntity;
  });
};

export default init;
