import Vue from 'vue';
import Vuex from 'vuex';
import {SettingsModule, SettingsModuleState} from '@/store/modules/SettingsModule';
import {createPersistedState} from 'vuex-electron';
import {LiquidModule, LiquidModuleState} from '@/store/modules/LiquidModule';

Vue.use(Vuex);

export interface RootState {
    settings: SettingsModuleState,
    liquid: LiquidModuleState
}

export const store = new Vuex.Store<RootState>({
    modules: {
        settings: SettingsModule,
        liquid: LiquidModule
    },
    plugins: [createPersistedState()]
});
