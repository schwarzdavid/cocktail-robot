import 'reflect-metadata';
import Vue from 'vue';
import Sortable from 'vue-sortable';
import App from './App.vue';
import {router} from './router';
import {store} from './store';
import {vuetify} from './plugins/vuetify';

Vue.use(Sortable);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
