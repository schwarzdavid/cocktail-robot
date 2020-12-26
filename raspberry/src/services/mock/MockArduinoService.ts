import {TypedEmitter} from 'tiny-typed-emitter';
import {ArduinoServiceEvents, AbstractArduinoService} from '@/services/types/ArduinoServiceTypes';

/* eslint class-methods-use-this: 0 */

export class MockArduinoService extends TypedEmitter<ArduinoServiceEvents> implements AbstractArduinoService {
    get isConnected(): boolean {
        return false;
    }
}
