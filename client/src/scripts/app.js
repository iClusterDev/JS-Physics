import game from './store/game';

const loadResources = () => {
  setTimeout(() => {
    game.dispatch('loading', false);
  }, 2000);
};

export default () => {
  loadResources();
};
