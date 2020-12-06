interface Ingredient {
    type: string,
    amount: number,
    position: number
}

export interface JuiceIngredient extends Ingredient {
    type: 'soft'
}

export interface AlcoholIngredient extends Ingredient {
    type: 'alc'
}

export interface Cocktail {
    ingredients: Array<JuiceIngredient | AlcoholIngredient>
}
