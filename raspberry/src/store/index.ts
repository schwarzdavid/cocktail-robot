import Vue from 'vue';
import Vuex from 'vuex';
import {SettingsModule} from '@/store/modules/SettingsModule';
import {createPersistedState} from 'vuex-electron';
import {LiquidModule} from '@/store/modules/LiquidModule';
import {CocktailModule} from '@/store/modules/CocktailModule';
import {RootState} from '@/store/types/RootState';

Vue.use(Vuex);

export const store = new Vuex.Store<RootState>({
    modules: {
        settings: SettingsModule,
        liquid: LiquidModule,
        cocktail: CocktailModule
    },
    plugins: [createPersistedState()]
});
