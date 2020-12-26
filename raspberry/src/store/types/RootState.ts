import {SettingsModuleState} from '@/store/modules/SettingsModule';
import {LiquidModuleState} from '@/store/modules/LiquidModule';
import {Cocktail} from '@/store/types/Cocktail';

export interface RootState {
    settings: SettingsModuleState,
    liquid: LiquidModuleState,
    cocktail: Cocktail
}
