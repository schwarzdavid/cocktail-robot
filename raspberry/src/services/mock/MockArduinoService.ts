import {TypedEmitter} from 'tiny-typed-emitter';
import {ArduinoServiceEvents, IArduinoService} from '@/services/types/ArduinoServiceTypes';

/* eslint class-methods-use-this: 0 */

export class MockArduinoService extends TypedEmitter<ArduinoServiceEvents> implements IArduinoService {
    get isConnected(): boolean {
        return false;
    }
}
