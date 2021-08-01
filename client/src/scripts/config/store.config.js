import globalConfig from './global.config';
import Store from '../lib/Store';

const state = {
  status: 'ready',
  message: globalConfig.message.start,
  lives: 3,
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
      context.commit('setMessage', globalConfig.message.pause);
    }
  },

  quit: (context) => {
    let { status } = context.state;
    if (status === 'paused') {
      context.commit('setStatus', 'ready');
      context.commit('setMessage', globalConfig.message.start);
    }
  },

  hit: (context) => {
    context.commit('decreaseLives');
  },
};

const mutations = {
  setStatus: (state, payload) => {
    state.status = payload;
  },

  setMessage: (state, payload) => {
    state.message = payload;
  },

  decreaseLives: (state) => {
    state.lives--;
  },
};

export default new Store({ state, actions, mutations });
