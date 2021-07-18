import Store from '../lib/Store';

const game = new Store({
  state: {
    notifications: '',
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
      }
    },

    stop: (state) => {
      if (!state.loading && state.running) {
        state.running = false;
      }
    },

    pause: (state) => {
      if (!state.loading && state.running) {
        state.running = false;
      }
    },
  },
});

export default game;
