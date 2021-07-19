import ECSEntity from '../lib/ECSEntity';
import components from './components';

const entities = [
  {
    name: 'player',
    components: [components.componentRect, components.componentGraphics],
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
