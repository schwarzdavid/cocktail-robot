import {TypedEmitter} from 'tiny-typed-emitter';
import {AlcoholIngredient, JuiceIngredient} from '@/store/types/Cocktail';

export interface ArduinoServiceEvents {
    connectionChange: (isConnected: boolean) => void,
    cocktailFinished: () => void
}

export interface AbstractArduinoService extends TypedEmitter<ArduinoServiceEvents> {
    isConnected: boolean,

    orderCocktail(ingredients: Array<AlcoholIngredient | JuiceIngredient>): Promise<void>
}
