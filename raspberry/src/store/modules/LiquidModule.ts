import {Module, Mutation, VuexModule} from 'vuex-module-decorators';
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

    @Mutation
    addJuice(liquidName: string) {
        this.juices.push({
            id: Date.now(),
            name: liquidName
        });
    }

    @Mutation
    updateJuice({id, name}: Liquid) {
        const foundJuice = this.juices.find(juice => juice.id === id);
        if (foundJuice) {
            foundJuice.name = name;
        }
    }

    @Mutation
    deleteJuice(id: number) {
        const index = this.juices.findIndex(juice => juice.id === id);
        if (index >= 0) {
            this.juices.splice(index, 1);
        }
    }

    @Mutation
    addAlcohol(liquidName: string) {
        this.alcohols.push({
            id: Date.now(),
            name: liquidName
        });
    }

    @Mutation
    updateAlcohol({id, name}: Liquid) {
        const foundAlcohol = this.alcohols.find(alcohol => alcohol.id === id);
        if (foundAlcohol) {
            foundAlcohol.name = name;
        }
    }

    @Mutation
    deleteAlcohol(id: number) {
        const index = this.alcohols.findIndex(alcohol => alcohol.id === id);
        if (index >= 0) {
            this.alcohols.splice(index, 1);
        }
    }
}
