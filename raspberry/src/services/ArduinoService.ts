import {MockArduinoService} from '@/services/mock/MockArduinoService';
import {ArduinoServiceImpl} from '@/services/impl/ArduinoServiceImpl';
import {IArduinoService} from '@/services/types/ArduinoServiceTypes';

let arduinoService: IArduinoService;

export async function getArduinoService(): Promise<IArduinoService> {
    if (!arduinoService) {
        let ArduinoService: typeof MockArduinoService | typeof ArduinoServiceImpl;
        if (process.env.NODE_ENV === 'development') {
            ArduinoService = await import('@/services/mock/MockArduinoService')
                .then(exports => exports.MockArduinoService);
        } else {
            ArduinoService = await import('@/services/impl/ArduinoServiceImpl')
                .then(exports => exports.ArduinoServiceImpl);
        }
        arduinoService = new ArduinoService();
    }
    return arduinoService;
}
