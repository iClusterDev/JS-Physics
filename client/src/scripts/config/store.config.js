import Store from '../lib/Store';

const state = {
  status: 'ready',
  message: {
    text: 'start a new game',
    subtext: 'press enter',
  },
};

const actions = {
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
};

const mutations = {
  setStatus: (state, payload) => {
    state.status = payload;
  },

  setMessage: (state, payload) => {
    state.message = payload;
  },
};

// TODO
// make messages in a constant?
// ensure creation of new object when passed in
export default new Store({ state, actions, mutations });
