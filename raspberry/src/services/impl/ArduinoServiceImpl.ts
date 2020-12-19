import {TypedEmitter} from 'tiny-typed-emitter';
import SerialPort, {OpenOptions} from 'serialport';
import {ArduinoServiceEvents, IArduinoService} from '@/services/types/ArduinoServiceTypes';

export class ArduinoServiceImpl extends TypedEmitter<ArduinoServiceEvents> implements IArduinoService {
    private static readonly DEFAULT_PORT = '/dev/ttyAMA0';

    private readonly serialPort: SerialPort;

    private _isConnected = false;

    constructor(port: string = ArduinoServiceImpl.DEFAULT_PORT, options?: OpenOptions) {
        super();

        this.serialPort = new SerialPort(port, options);
        this.serialPort
            .on('open', () => this.onSerialOpen())
            .on('error', err => this.onSerialError(err))
            .on('close', () => this.onSerialClose());
    }

    get isConnected(): boolean {
        return this._isConnected;
    }

    private onSerialOpen() {
        this._isConnected = true;
        this.emit('connectionChange', this.isConnected);
    }

    private onSerialClose() {
        this._isConnected = false;
        this.emit('connectionChange', this.isConnected);
    }

    private onSerialError(error: string | Error) {
        this._isConnected = false;
        this.emit('connectionChange', this.isConnected);
        console.log(error);
    }
}
