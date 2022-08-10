import {RouteRecordRaw} from 'vue-router';
import {CocktailRouteNames} from '@/router/constants';
import CocktailBuilderView from '../../views/cocktail/CocktailBuilder.vue'

export const cocktailRoutes: RouteRecordRaw[] = [
    {
        path: '/cocktail',
        name: CocktailRouteNames.BUILDER,
        component: CocktailBuilderView
    }
]
