import globalConfig from './global.config';
import Store from '../lib/Store';

const state = {
  status: 'ready',
  message: globalConfig.message.start,
  lives: 3,
  score: 0,
};

const actions = {
  start: (context) => {
    let { status } = context.state;
    if (
      status === 'ready' ||
      status === 'paused' ||
      status === 'win' ||
      status === 'loose'
    ) {
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

  score: (context) => {
    context.commit('increaseScore');
  },

  hit: (context) => {
    context.commit('decreaseLives');
  },

  win: (context) => {
    context.commit('setStatus', 'win');
  },

  loose: (context) => {
    context.commit('setStatus', 'loose');
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

  increaseScore: (state) => {
    state.score++;
  },
};

export default new Store({ state, actions, mutations });
