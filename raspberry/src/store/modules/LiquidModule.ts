import {Module, VuexModule} from 'vuex-module-decorators';
import {Liquid} from '@/store/types/LiquidTypes';

export interface LiquidModuleState {
    juices: Liquid[],
    alcohols: Liquid[]
}

@Module({
    name: 'liquid'
})
export class LiquidModule extends VuexModule implements LiquidModuleState {
    juices: Liquid[] = [];
    alcohols: Liquid[] = [];
}
