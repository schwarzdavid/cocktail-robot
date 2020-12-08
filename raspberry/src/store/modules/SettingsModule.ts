import {Module, VuexModule} from 'vuex-module-decorators';
import {LiquidStorage} from '@/store/types/LiquidTypes';
import {Cocktail} from '@/store/types/Cocktail';

export interface SettingsModuleState {
    installedAlcohols: LiquidStorage,
    installedJuices: LiquidStorage,
    cupSize: number,
    preparedCocktail: Cocktail
}

@Module({name: 'settings'})
export class SettingsModule extends VuexModule implements SettingsModuleState {
    installedAlcohols: LiquidStorage = [null, null, null, null];

    installedJuices: LiquidStorage = [null, null, null, null];

    cupSize = 250;

    preparedCocktail = SettingsModule.createEmptyCocktail();

    private static createEmptyCocktail(): Cocktail {
        return {ingredients: []};
    }
}
