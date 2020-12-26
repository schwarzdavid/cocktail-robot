import {Module, Mutation, VuexModule} from 'vuex-module-decorators';
import Vue from 'vue';
import {LiquidStorage, LiquidStoragePosition} from '@/store/types/Liquid';

export interface SettingsModuleState {
    installedAlcohols: LiquidStorage<number | undefined>,
    installedJuices: LiquidStorage<number | undefined>,
    readonly cupSize: number
}

@Module({
    name: 'settings'
})
export class SettingsModule extends VuexModule implements SettingsModuleState {
    readonly cupSize = 250;

    installedAlcohols: LiquidStorage<number | undefined> = [undefined, undefined, undefined, undefined];

    installedJuices: LiquidStorage<number | undefined> = [undefined, undefined, undefined, undefined];

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
