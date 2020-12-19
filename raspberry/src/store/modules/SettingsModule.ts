import {Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {LiquidStorage, LiquidStoragePosition} from '@/store/types/LiquidTypes';
import {Cocktail} from '@/store/types/Cocktail';
import Vue from 'vue';

export interface SettingsModuleState {
    installedAlcohols: LiquidStorage<number | null>,
    installedJuices: LiquidStorage<number | null>,
    cupSize: number
}

@Module({
    name: 'settings'
})
export class SettingsModule extends VuexModule implements SettingsModuleState {
    readonly cupSize = 250;

    installedAlcohols: LiquidStorage<number | null> = [null, null, null, null];

    installedJuices: LiquidStorage<number | null> = [null, null, null, null];

    @Mutation
    setInstalledAlcohol({position, alcoholId}: {position: LiquidStoragePosition, alcoholId: number | null}) {
        if (position < 0 || position >= 4) {
            return;
        }
        Vue.set(this.installedAlcohols, position, alcoholId);
    }

    @Mutation
    setInstalledJuice({position, juiceId}: {position: LiquidStoragePosition, juiceId: number | null}) {
        if (position < 0 || position >= 4) {
            return;
        }
        Vue.set(this.installedJuices, position, juiceId);
    }
}
