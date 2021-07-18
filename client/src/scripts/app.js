import game from './game';

let context = document
  .querySelector('gui-display')
  .shadowRoot.querySelector('canvas')
  .getContext('2d');

const loadResources = () => {
  setTimeout(() => {
    game.dispatch('loading', false);
  }, 2000);
};

export default () => {
  loadResources();
};
