import {TypedEmitter} from 'tiny-typed-emitter';

export interface ArduinoServiceEvents {
    connectionChange: (isConnected: boolean) => void
}

export interface IArduinoService extends TypedEmitter<ArduinoServiceEvents> {
    isConnected: boolean
}
