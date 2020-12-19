import Vue from 'vue';
import Vuex from 'vuex';
import {SettingsModule, SettingsModuleState} from '@/store/modules/SettingsModule';
import {createPersistedState} from 'vuex-electron';
import {LiquidModule, LiquidModuleState} from '@/store/modules/LiquidModule';
import {Cocktail} from '@/store/types/Cocktail';
import {CocktailModule} from '@/store/modules/CocktailModule';

Vue.use(Vuex);

export interface RootState {
    settings: SettingsModuleState,
    liquid: LiquidModuleState,
    cocktail: Cocktail
}

export const store = new Vuex.Store<RootState>({
    modules: {
        settings: SettingsModule,
        liquid: LiquidModule,
        cocktail: CocktailModule
    },
    plugins: [createPersistedState()]
});
