import {defineStore} from 'pinia';
import {Ingredient, IngredientType} from '@/store/types/Ingredient';
import {getService} from '@/lib/ServiceRegistry';
import {IngredientLoaderService} from '@/services/IngredientLoaderService';

export interface IngredientStoreState {
    ingredients: Ingredient[]
}

const ingredientLoaderService = getService(IngredientLoaderService)

export const useIngredientStore = defineStore('ingredients', {
    state: (): IngredientStoreState => ({
        ingredients: []
    }),
    getters: {
        liquors(): Ingredient[] {
            return this.ingredients.filter(ingredient => ingredient.type === IngredientType.LIQUOR)
        },
        softdrinks(): Ingredient[] {
            return this.ingredients.filter(ingredient => ingredient.type === IngredientType.SOFTDRINK)
        }
    },
    actions: {
        async loadDrinksFromDatabase(): Promise<void> {
            this.ingredients = await ingredientLoaderService.loadAllIngredients()
        }
    }
})
