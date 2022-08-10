import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import LoadingView from '../views/LoadingView.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: LoadingView
    }
];

export const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});
