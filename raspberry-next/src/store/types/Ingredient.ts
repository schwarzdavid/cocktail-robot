export const enum IngredientType {
    LIQUOR = 'liquor',
    SOFTDRINK = 'softdrink'
}

export interface Ingredient {
    uuid: string,
    name: string,
    type: IngredientType,
    image: string
}
