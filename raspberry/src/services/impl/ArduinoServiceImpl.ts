import {TypedEmitter} from 'tiny-typed-emitter';
import SerialPort, {OpenOptions} from 'serialport';
import {ArduinoServiceEvents, AbstractArduinoService} from '@/services/types/ArduinoServiceTypes';
import {AlcoholIngredient, JuiceIngredient} from '@/store/types/Cocktail';
import {LogModule} from '@/store/modules/LogModule';
import {getModule} from 'vuex-module-decorators';
import {store} from '@/store';

type Ingredients = Array<JuiceIngredient | AlcoholIngredient>;

export class ArduinoServiceImpl extends TypedEmitter<ArduinoServiceEvents> implements AbstractArduinoService {
    private static readonly DEFAULT_PORT = '/dev/ttyAMA0';
    private static readonly NEW_LINE = '\n';
    private static readonly TIMEOUT = 60000;

    private readonly serialPort: SerialPort;
    private readonly parser: SerialPort.parsers.Readline;
    private readonly logModule: LogModule;

    private _isConnected = false;

    constructor(port: string = ArduinoServiceImpl.DEFAULT_PORT, options?: OpenOptions) {
        super();

        this.logModule = getModule(LogModule, store);

        this.parser = new SerialPort.parsers.Readline({
            delimiter: '\n'
        });
        this.parser.on('data', msg => this.onSerialData(msg));

        this.serialPort = new SerialPort(port, options);
        this.serialPort
            .on('open', () => this.onSerialOpen())
            .on('error', err => this.onSerialError(err))
            .on('close', () => this.onSerialClose());
        this.serialPort.pipe(this.parser);
    }

    get isConnected(): boolean {
        return this._isConnected;
    }

    orderCocktail(ingredients: Ingredients): Promise<void> {
        if (!this.isConnected) {
            return Promise.reject(new Error('Arduino is not connected'));
        }
        return new Promise((resolve, reject) => {
            const message = ArduinoServiceImpl.convertIngredientToArduinoMessage(ingredients);
            this.serialPort.write(message);
            let timeoutId: number;

            function onCocktailFinish() {
                window.clearTimeout(timeoutId);
                resolve();
            }

            this.once('cocktailFinished', onCocktailFinish);
            timeoutId = window.setTimeout(() => {
                this.off('cocktailFinished', onCocktailFinish);
                reject(new Error('Timeout'));
            }, ArduinoServiceImpl.TIMEOUT);
        });
    }

    private static convertIngredientToArduinoMessage(ingredients: Ingredients): string {
        return ingredients.reduce((output, ingredient) => {
            let ingredientLine = `${ingredient.type} ${ingredient.position} ${ingredient.amount}`;
            ingredientLine += ArduinoServiceImpl.NEW_LINE;

            return output + ingredientLine;
        }, ingredients.length.toString() + ArduinoServiceImpl.NEW_LINE);
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
        this.logModule.addMessage(error);
        this.emit('connectionChange', this.isConnected);
    }

    private onSerialData(message: string) {
        this.logModule.addMessage(`Got Message from Arduino: ${message}`);
    }
}
