import Game from '../lib/Game';

// TODO
// make messages in a constant?
// ensure creation of new object when passed in
const game = new Game({
  state: {
    status: 'ready',
    message: {
      text: 'start a new game',
      subtext: 'press enter',
    },
  },

  actions: {
    start: (context) => {
      let { status } = context.state;
      if (status === 'ready' || status === 'paused') {
        context.commit('setStatus', 'running');
        context.commit('setMessage', {});
      }
    },

    pause: (context) => {
      let { status } = context.state;
      if (status === 'running') {
        context.commit('setStatus', 'paused');
        context.commit('setMessage', {
          text: 'press "enter" to resume',
          subtext: 'or "esc" to quit',
        });
      }
    },

    quit: (context) => {
      let { status } = context.state;
      if (status === 'paused') {
        context.commit('setStatus', 'ready');
        context.commit('setMessage', {
          text: 'start a new game',
          subtext: 'press enter',
        });
      }
    },
  },

  mutations: {
    setStatus: (state, payload) => {
      // TODO
      // validate message payload
      state.status = payload;
    },

    setMessage: (state, payload) => {
      // TODO
      // validate message payload
      state.message = payload;
    },
  },
});

export default game;
