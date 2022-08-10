import {RouteRecordRaw} from 'vue-router';
import {MaintenanceRouteNames} from '@/router/constants';
import MaintenanceView from '../../views/maintenance/MaintenanceView.vue'

export const maintenanceRoutes: RouteRecordRaw[] = [
    {
        path: '/maintenance',
        name: MaintenanceRouteNames.MAINTENANCE,
        component: MaintenanceView
    }
]
