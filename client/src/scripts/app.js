import Store from './lib/Store';
import Engine from './lib/Engine';
import Display from './lib/Display';

/**
 * store
 */
const game = new Store({
  state: {
    loading: true,
    running: false,
  },

  actions: {
    loading: (context, payload) => {
      context.commit('loading', payload);
    },

    start: (context) => {
      context.commit('start');
    },

    stop: (context) => {
      context.commit('stop');
    },

    pause: (context) => {
      context.commit('pause');
    },
  },

  mutations: {
    loading: (state, payload) => {
      state.loading = payload;
    },

    start: (state) => {
      if (!state.loading && !state.running) {
        state.running = true;
        console.log('DEBUG ~ state.running', state.running);
      }
    },

    stop: (state) => {
      if (!state.loading && state.running) {
        state.running = false;
        console.log('DEBUG ~ state.running', state.running);
      }
    },

    pause: (state) => {
      if (!state.loading && state.running) {
        state.running = false;
        console.log('DEBUG ~ state.running', state.running);
      }
    },
  },
});

/**
 * loading message
 */
class LoadingMessage {
  #element;

  constructor() {
    this.#element = document.createElement('div');
    this.#element.id = 'loadingMessage';
    this.#element.classList.add('message');

    this.#create();
    this.#render();
  }

  #create() {
    document.querySelector('#game').appendChild(this.#element);

    let self = this;
    game.on('loading-change', () => {
      game.state.loading
        ? self.#element.classList.toggle('hidden', false)
        : self.#element.classList.toggle('hidden', true);
    });
  }

  #render() {
    this.#element.innerHTML = `<span class="message-text message-pulse">LOADING</span>`;
  }
}

/**
 * start message
 */
class StartMessage {
  #element;

  constructor() {
    this.#element = document.createElement('div');
    this.#element.id = 'startMessage';
    this.#element.classList.add('message', 'hidden');

    this.#create();
    this.#render();
  }

  #create() {
    document.querySelector('#game').appendChild(this.#element);

    let self = this;
    game.on('loading-change', () => {
      game.state.loading
        ? self.#element.classList.toggle('hidden', true)
        : self.#element.classList.toggle('hidden', false);
    });
  }

  #render() {
    this.#element.innerHTML = `
      <div class="message-text">START A NEW GAME</div>
      <small class="message-text">PRESS SPACE</small>
    `;
  }
}

const loadGUI = () => {
  new LoadingMessage();
  new StartMessage();
};

const loadResources = () => {
  setTimeout(() => {
    game.dispatch('loading', false);
  }, 2000);
};

const loadListeners = () => {
  window.addEventListener('keydown', (e) => {
    e.preventDefault();
    switch (e.code) {
      case 'Space':
        game.dispatch('start');
        break;
      case 'Escape':
        game.dispatch('stop');
        break;
      case 'KeyP':
        game.dispatch('pause');
        break;
    }
  });
};

export default () => {
  loadGUI();
  loadListeners();
  loadResources();
  // new StartButton();
  // const display = new Display({
  //   id: 'canvas',
  //   width: 832,
  //   height: 640,
  //   color: 'cyan',
  // });
  // const engine = new Engine(
  //   () => console.log(),
  //   () => console.log('render')
  // );
  // game.on('isRunning-change', () => {
  //   game.state.isReady && game.state.isRunning ? engine.start() : engine.stop();
  // });
};
