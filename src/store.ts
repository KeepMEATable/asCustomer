import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Router from './router';
import UuidV4 from 'uuid/v4';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uid: UuidV4(),
    started: false,
    waiting: false,
    ready: false,
  },
  mutations: {
    toggleWaiting(state, position: boolean) {
      state.waiting = position;
    },
    toggleReady(state, position: boolean) {
      state.ready = position;
    },
    setStarted(state) {
      state.started = true;
    },
  },
  actions: {
    start({commit}) {
      commit('setStarted');
      Router.push({name: 'qrCode'});
    },
    hasBeenFlashed({commit}) {
      commit('toggleWaiting', true);
      commit('toggleReady', false);
      Router.push({name: 'waiting'});
    },
    cancelFlash({commit}) {
      commit('toggleWaiting', false);
      Router.push({name: 'qrCode'});
    },
    tableIsReady({commit}) {
      commit('toggleWaiting', false);
      commit('toggleReady', true);
      Router.push({name: 'ready'});
    },
    dismiss({commit}) {
      commit('toggleWaiting', false);
      commit('toggleReady', false);
      Router.push({name: 'qrCode'});
    },
  },
  plugins: [
    createPersistedState({
      key: 'takeMEATable',
    }),
  ],
});
