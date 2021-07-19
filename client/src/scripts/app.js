import game from './game';
import Engine from './lib/Engine';
import Display from './lib/Display';
import systems from './assets/systems';
import init from './assets/entities';

export default () => {
  let entities = init();

  /**
   * Game listeners
   * setup the keydown events
   */
  window.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'Enter':
        game.dispatch('start');
        engine.start();
        break;
      case 'Escape':
        game.dispatch('quit');
        entities = init();
        display.context.clearRect(0, 0, display.width, display.height);
        break;
      case 'KeyP':
        game.dispatch('pause');
        engine.stop();
        break;
    }
  });

  const display = new Display({
    canvas: document.querySelector('gui-display').canvas,
  });

  // TODO
  // pass updateSystems, renderSystems as arguments for engine constructor
  const engine = new Engine((elapsedTime) => {
    systems.forEach((system) => {
      system.next(elapsedTime, display.context, entities);
    });
  });
};
