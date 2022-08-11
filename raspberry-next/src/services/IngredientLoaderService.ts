import {Ingredient, IngredientType} from '@/store/types/Ingredient';
import {v4 as uuidv4} from 'uuid'

export class IngredientLoaderService {
    private static readonly LIQUOR_FILENAME = 'liquors.json'
    private static readonly SOFTDRINKS_FILENAME = 'softdrinks.json'

    async loadAllIngredients(): Promise<Ingredient[]> {
        const [liquors, softdrinks] = await Promise.all([
            this.loadLiquors(),
            this.loadSoftdrinks()
        ])
        return [...liquors, ...softdrinks]
    }

    private async loadLiquors(): Promise<Ingredient[]> {
        const ingredients = await this.loadIngredients(IngredientLoaderService.LIQUOR_FILENAME)
        return ingredients.map(ingredient => ({
            ...ingredient,
            type: IngredientType.LIQUOR,
            uuid: uuidv4()
        }))
    }

    private async loadSoftdrinks(): Promise<Ingredient[]> {
        const ingredients = await this.loadIngredients(IngredientLoaderService.SOFTDRINKS_FILENAME)
        return ingredients.map(ingredient => ({
            ...ingredient,
            type: IngredientType.SOFTDRINK,
            uuid: uuidv4()
        }))
    }

    private async loadIngredients(filename: string): Promise<Omit<Ingredient, 'uuid' | 'type'>[]> {
        const {default: ingredients} = await import('../data/' + filename)
        return ingredients
    }
}
