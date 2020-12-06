import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Dashboard from '../views/Dashboard.vue';

Vue.use(VueRouter);

export enum ROUTES {
    DASHBOARD = 'DASHBOARD'
}

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: ROUTES.DASHBOARD,
        component: Dashboard
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '*',
        redirect: {name: ROUTES.DASHBOARD}
    }
];

export const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
});
