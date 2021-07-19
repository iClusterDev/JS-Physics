import ECSComponent from '../lib/ECSComponent';

const components = {
  componentRect: new ECSComponent({
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

  componentGraphics: new ECSComponent({
    name: 'graphics',
    data: {
      color: 'transparent',
    },
  }),
};

export default components;
