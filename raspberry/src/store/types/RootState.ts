import {SettingsModuleState} from '@/store/modules/SettingsModule';
import {LiquidModuleState} from '@/store/modules/LiquidModule';
import {Cocktail} from '@/store/types/Cocktail';
import {LogModuleState} from '@/store/modules/LogModule';

export interface RootState {
    settings: SettingsModuleState,
    liquid: LiquidModuleState,
    cocktail: Cocktail,
    log: LogModuleState
}
