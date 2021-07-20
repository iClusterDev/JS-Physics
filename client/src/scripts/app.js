import game from './game';
import Engine from './lib/Engine';
import Display from './lib/Display';

import systems from './assets/systems';
import entities from './assets/entities';
import ECSEntity from './lib/ECSEntity';
import ECSSystem from './lib/ECSSystem';
import ECSComponent from './lib/ECSComponent';

// Level
// → entities
// → systems
// → id
class Level {
  constructor({ entities, systems } = { entities, systems }) {
    const loadEntities = (entities) => {
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

    const loadSystems = (entities, systems) => {
      let ecsEntities = loadEntities(entities);
      return systems.map((system) => {
        let { name, use, onNext } = system;
        let ecsSystem = new ECSSystem({ name, onNext });
        let ecsTargets = [];
        use.forEach((componentName) => {
          ecsEntities.forEach((entity) => {
            if (entity.components.hasOwnProperty(componentName)) {
              ecsTargets.push(entity);
            }
          });
        });
        return { ecsTargets, ecsSystem };
      });
    };

    this.systems = loadSystems(entities, systems);
  }

  next(elapsedTime, context) {
    this.systems.forEach((item) =>
      item.ecsSystem.next(elapsedTime, context, item.ecsTargets)
    );
  }
}

let level = new Level({ entities, systems });

export default () => {
  // let entities = init();
  /**
   * Game listeners
   * setup the keydown events
   */
  window.addEventListener('keydown', (event) => {
    let { status } = game.state;
    switch (event.code) {
      case 'Enter':
        game.dispatch('start');
        if (status === 'ready' || status === 'paused') engine.start();
        break;
      case 'Escape':
        game.dispatch('quit');
        if (status === 'paused') {
          // entities = init();
          display.context.clearRect(0, 0, display.width, display.height);
        }
        break;
      case 'KeyP':
        game.dispatch('pause');
        if (status === 'running') engine.stop();
        break;
    }
  });

  /**
   * hook to the display context
   * this is the destination canvas
   */
  const display = new Display({
    canvas: document.querySelector('gui-display').canvas,
  });

  // TODO
  // pass updateSystems, renderSystems as arguments for engine constructor
  const engine = new Engine((elapsedTime) => {
    level.next(elapsedTime, display.context);
    // systems.forEach((system) => {
    //   system.next(elapsedTime, display.context, entities);
    // });
  });
};
