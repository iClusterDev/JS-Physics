import game from './game';
import Engine from './lib/Engine';
import Display from './lib/Display';

export default () => {
  window.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'Enter':
        game.dispatch('start');
        // reset
        // starts the engine here
        engine.start();
        break;
      case 'Escape':
        game.dispatch('quit');
        // reset
        // engine should be already stopped
        break;
      case 'KeyP':
        game.dispatch('pause');
        // stop the engine here
        engine.stop();
        break;
    }
  });

  const display = new Display({
    canvas: document.querySelector('gui-display').canvas,
  });

  const engine = new Engine(
    () => {},
    () => {}
  );
};
