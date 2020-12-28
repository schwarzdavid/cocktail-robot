import 'reflect-metadata';
import Vue from 'vue';
import {registerErrorHandler} from '@/errorHandling';
import App from './App.vue';
import {router} from './router';
import {store} from './store';
import {vuetify} from './plugins/vuetify';

Vue.config.productionTip = false;

registerErrorHandler();

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
