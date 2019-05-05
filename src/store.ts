/*tslint:disable:no-shadowed-variable no-console*/

import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Router from './router';
import UuidV4 from 'uuid/v4';
import WaitingLine from './models/WaitingLine';
import Api from '@/lib/Api';
import Fingerprint2 from 'fingerprintjs2';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uid: null,
    started: false,
    waiting: false,
    ready: false,
  },
  mutations: {
    setFingerprint(state) {
      Fingerprint2.get((components) => {
        state.uid = Fingerprint2.x64hash128(components.map((pair) => pair.value).join(), 31);
      });
    },
    toggleWaiting(state, position: boolean) {
      state.waiting = position;
    },
    toggleReady(state, position: boolean) {
      state.ready = position;
    },
    setStarted(state) {
      state.started = true;
    },
    synchronizeState(state, waitingLine) {
      state.started = waitingLine.started;
      state.ready = waitingLine.ready;
      state.waiting = waitingLine.waiting;

      // table is ready
      if (true === waitingLine.started && false === waitingLine.waiting && true === waitingLine.ready) {
        if (false === state.waiting && true ===  state.ready) {
          Router.push({name: 'ready'});
          return;
        }

        const options = {
          body: 'You can go!',
          vibrate: [5000, 1000, 5000, 1000, 5000],
        };

        Notification.requestPermission().then(() => {
          if (Notification.permission !== 'granted') {
            return;
          }

          navigator.serviceWorker.getRegistration().then((reg) => {
            reg.showNotification('Table\'s ready!', options);
          });
        });

        state.waiting = false;
        state.ready = true;
        Router.push({name: 'ready'});
      }

      // dismiss message // reset.
      if (true === waitingLine.started && false === waitingLine.waiting && false === waitingLine.ready) {
        state.waiting = false;
        state.ready = false;
        Router.push({name: 'qrCode'});
      }

      // has been flashed
      if (true === waitingLine.started && true === waitingLine.waiting && false === waitingLine.ready) {
        state.waiting = true;
        state.ready = false;
        Router.push({name: 'waiting'});
      }
    },
  },
  actions: {
    setFingerprint({commit}) {
      setTimeout(() => commit('setFingerprint'), 500);
    },
    start({commit, state}) {
      Api
        .get(`waiting_lines/${state.uid}`)
        .then(({data}) => {
          commit('synchronizeState', data);
        })
        .catch((error: any) => {
          if (404 !== error.response.status) {
            return;
          }

          Api
            .post(`waiting_lines`, {
              customerId: state.uid,
            })
            .then((response: WaitingLine) => {
              commit('setStarted');
              Router.push({name: 'qrCode'});
            });
        });

      Notification.requestPermission().then(() => {
          if (Notification.permission !== 'granted') {
            return;
          }

          navigator.serviceWorker.getRegistration().then((reg) => {
            if (undefined === reg) { return; }

            const baseUrl = `${process.env.VUE_APP_MERCURE_HUB_ENTRYPOINT}?topic=`;
            const baseTopic = `${process.env.VUE_APP_API_ENTRYPOINT}/waiting_lines/`;
            const es = new EventSource(`${baseUrl}${baseTopic}${state.uid}`);

            es.onmessage = ({data}) => {
              const waitingLine = JSON.parse(data);
              commit('synchronizeState', waitingLine);
            };
          });
        });
    },
    reset({commit, state}) {
      Api
        .patch(`waiting_lines/${state.uid}/state`, {
          state: 'reset',
        })
        .then((response: WaitingLine) => {
          commit('synchronizeState', response);
        });
    },
  },
  plugins: [
    createPersistedState({
      key: 'takeMEATable',
    }),
  ],
});
