import {IArduinoService} from '@/services/types/ArduinoServiceTypes';
import {MockArduinoService} from '@/services/mock/MockArduinoService';
import {ArduinoServiceImpl} from '@/services/impl/ArduinoServiceImpl';

let arduinoService: IArduinoService;

if (process.env.NODE_ENV === 'development') {
    console.log('Returning mock service');
    arduinoService = new MockArduinoService();
} else {
    console.log('Returning service impl');
    arduinoService = new ArduinoServiceImpl();
}

export const ArduinoService = arduinoService;
