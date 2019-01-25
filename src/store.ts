/*tslint:disable:no-shadowed-variable no-console*/

import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Router from './router';
import UuidV4 from 'uuid/v4';
import Queue from './models/queue';
import Api from '@/lib/Api';

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
    synchronizeState(state, queue, reg) {
      // table is ready
      if (true === queue.started && false === queue.waiting && true === queue.ready) {
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
      if (true === queue.started && false === queue.waiting && false === queue.ready) {
        state.waiting = false;
        state.ready = false;
        Router.push({name: 'qrCode'});
      }

      // has been flashed
      if (true === queue.started && true === queue.waiting && false === queue.ready) {
        state.waiting = true;
        state.ready = false;
        Router.push({name: 'waiting'});
      }
    },
  },
  actions: {
    start({commit, state}) {
      Api
        .get(`queues/${state.uid}`)
        .then(({data}) => {
          commit('synchronizeState', data);
        })
        .catch((error: any) => {
          if (404 !== error.response.status) {
            return;
          }

          Api
            .post(`queues`, {
              customerId: state.uid,
            })
            .then((response: Queue) => {
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
          const baseTopic = `${process.env.VUE_APP_API_ENTRYPOINT}/queues/`;
          const es = new EventSource(`${baseUrl}${baseTopic}${state.uid}`);

          es.onmessage = ({data}) => {
            const queue = JSON.parse(data);
            commit('synchronizeState', queue);
          };
        });
      });
    },
    reset({commit, state}) {
      Api
        .patch(`queues/${state.uid}/state`, {
          state: 'reset',
        })
        .then((response: Queue) => {
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
