import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

Vue.use(Router);

const router =  new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
        },
        {
            path: '/qr',
            name: 'qrCode',
            component: () => import(/* webpackChunkName: "qrcode" */ './views/QrCode.vue'),
        },
        {
            path: '/waiting',
            name: 'waiting',
            component: () => import(/* webpackChunkName: "waiting" */ './views/Waiting.vue'),
        },
        {
            path: '/ready',
            name: 'ready',
            component: () => import(/* webpackChunkName: "ready" */ './views/Ready.vue'),
        },
    ],
});

router.beforeEach((to, from, next) => {
    // @todo change this for a state machine and add a route to list the restaurants seen.
    if (to.name !== 'home' && !store.state.started) {
        next('/');
    } else if (to.name !== 'ready' && store.state.ready) {
        next('/ready');
    } else if (to.name !== 'waiting' && store.state.waiting) {
        next('/waiting');
    } else if (to.name !== 'qrCode' && store.state.started && !store.state.waiting && !store.state.ready) {
        next('/qr');
    } else {
        next();
    }
});

export default router;
