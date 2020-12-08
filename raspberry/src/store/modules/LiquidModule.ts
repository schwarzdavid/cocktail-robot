import {Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {Liquid} from '@/store/types/LiquidTypes';

export interface LiquidModuleState {
    juices: Liquid[],
    alcohols: Liquid[]
}

@Module({name: 'liquid'})
export class LiquidModule extends VuexModule implements LiquidModuleState {
    juices: Liquid[] = [];
    alcohols: Liquid[] = [];

    @Mutation
    addJuice(liquidName: string) {
        this.juices.push({
            id: Date.now(),
            name: liquidName
        });
    }

    @Mutation
    addAlcohol(liquidName: string) {
        this.alcohols.push({
            id: Date.now(),
            name: liquidName
        });
    }
}
