import {TypedEmitter} from 'tiny-typed-emitter';
import {AbstractArduinoService, ArduinoServiceEvents} from '@/services/types/ArduinoServiceTypes';
import {LogModule} from '@/store/modules/LogModule';
import {getModule} from 'vuex-module-decorators';
import {store} from '@/store';

/* eslint class-methods-use-this: 0 */

export class MockArduinoService extends TypedEmitter<ArduinoServiceEvents> implements AbstractArduinoService {
    private _isConnected = false;
    private logModule: LogModule;

    constructor() {
        super();

        this.logModule = getModule(LogModule, store);

        setTimeout(() => {
            this._isConnected = true;
            this.logModule.addMessage('MockArduinoService prepared');
        }, 2000);
    }

    get isConnected(): boolean {
        return this._isConnected;
    }

    orderCocktail(): Promise<void> {
        return new Promise((resolve => setTimeout(resolve, 5000)));
    }
}
