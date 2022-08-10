import {RouteRecordRaw} from 'vue-router';
import {AssetsRouteNames} from '@/router/constants';
import AssetsView from '../../views/assets/AssetsView.vue'

export const assetsRoutes: RouteRecordRaw[] = [
    {
        path: '/assets',
        name: AssetsRouteNames.ASSETS,
        component: AssetsView
    }
]
