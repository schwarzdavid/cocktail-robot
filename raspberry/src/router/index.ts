import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Setup from '@/views/Setup.vue';
import Liquids from '@/views/Liquids.vue';
import {ROUTES} from '@/router/Routes';
import Dashboard from '../views/Dashboard.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/dashboard',
        name: ROUTES.DASHBOARD,
        component: Dashboard
    },
    {
        path: '/setup',
        name: ROUTES.SETUP,
        component: Setup
    },
    {
        path: '/liquids',
        name: ROUTES.LIQUIDS,
        component: Liquids
    },
    {
        path: '*',
        redirect: {
            name: ROUTES.SETUP,
            params: {
                initial: 'true'
            }
        }
    }
];

export const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
});
