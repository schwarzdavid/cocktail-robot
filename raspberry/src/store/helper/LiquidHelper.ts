import {store} from '@/store';
import {Store} from 'vuex';
import {LiquidModule} from '@/store/modules/LiquidModule';
import {SettingsModule} from '@/store/modules/SettingsModule';
import {getModule} from 'vuex-module-decorators';
import {RootState} from '@/store/types/RootState';
import {Liquid, LiquidStoragePosition} from '@/store/types/Liquid';

class LiquidHelper {
    private readonly liquidModule: LiquidModule;
    private readonly settingsModule: SettingsModule;

    constructor(storeInstance: Store<RootState>) {
        this.liquidModule = getModule(LiquidModule, storeInstance);
        this.settingsModule = getModule(SettingsModule, storeInstance);
    }

    getAlcoholById(id: number | undefined): Liquid | null {
        if (id === undefined) {
            return null;
        }
        return this.liquidModule.alcohols.find(alcohol => alcohol.id === id) || null;
    }

    getJuiceById(id: number | undefined): Liquid | null {
        if (id === undefined) {
            return null;
        }
        return this.liquidModule.juices.find(juice => juice.id === id) || null;
    }

    getInstalledAlcohol(position: LiquidStoragePosition): Liquid | null {
        const alcoholId = this.settingsModule.installedAlcohols[position];
        return this.getAlcoholById(alcoholId);
    }

    getInstalledJuice(position: LiquidStoragePosition): Liquid | null {
        const juiceId = this.settingsModule.installedJuices[position];
        return this.getJuiceById(juiceId);
    }
}

const liquidHelper = new LiquidHelper(store);

export {liquidHelper as LiquidHelper};
