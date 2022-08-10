import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import LoadingView from '../views/LoadingView.vue';
import ApplicationLayout from '../layouts/ApplicationLayout.vue';
import {maintenanceRoutes} from '@/router/routes/maintenanceRoutes';
import {assetsRoutes} from '@/router/routes/assetsRoutes';
import {cocktailRoutes} from '@/router/routes/cocktailRoutes';

const routes: RouteRecordRaw[] = [
    {
        path: '/app',
        component: ApplicationLayout,
        children: [
            ...maintenanceRoutes,
            ...assetsRoutes,
            ...cocktailRoutes
        ]
    },
    {
        path: '/',
        component: LoadingView
    }
];

export const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});
