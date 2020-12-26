import {TypedEmitter} from 'tiny-typed-emitter';

export interface ArduinoServiceEvents {
    connectionChange: (isConnected: boolean) => void
}

export interface AbstractArduinoService extends TypedEmitter<ArduinoServiceEvents> {
    isConnected: boolean
}
