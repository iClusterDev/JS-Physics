// BOUNCER
// player needs to bounce back the bouncing square
// every bounce back score increase
// win condition: score go up to 10
// loose condition: bouncing square touches the ground
// import { entities, systems } from './config/ecs.config';
import display from './config/display.config';
import engine from './config/engine.config';
import level from './config/level.config';
import store from './config/store.config';

export default () => {
  window.addEventListener('keydown', (event) => {
    let { status } = store.state;
    switch (event.code) {
      case 'Enter':
        store.dispatch('start');
        if (status === 'ready' || status === 'paused') engine.start();
        break;
      case 'Escape':
        store.dispatch('quit');
        if (status === 'paused') {
          // entities = init();
          display.context.clearRect(0, 0, display.width, display.height);
        }
        break;
      case 'KeyP':
        store.dispatch('pause');
        if (status === 'running') engine.stop();
        break;
    }
  });

  engine.onUpdate((elapsedTime) => {
    level.next(elapsedTime, store, display.context);
  });
};
