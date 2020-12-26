export interface Ingredient {
    type: string,
    amount: number,
    position: number,
    label: string
}

export interface JuiceIngredient extends Ingredient {
    type: 'soft'
}

export interface AlcoholIngredient extends Ingredient {
    type: 'alc'
}

export type Ingredients = Array<JuiceIngredient | AlcoholIngredient>

export interface Cocktail {
    ingredients: Ingredients
}
