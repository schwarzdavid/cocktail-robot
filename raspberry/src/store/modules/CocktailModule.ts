import {Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {AlcoholIngredient, Cocktail, JuiceIngredient} from '@/store/types/Cocktail';
import Vue from 'vue';

@Module({
    name: 'cocktail'
})
export class CocktailModule extends VuexModule implements Cocktail {
    ingredients: Array<JuiceIngredient | AlcoholIngredient> = [];

    @Mutation
    addAlcohol(position: number) {
        const lastIngredient = this.ingredients[this.ingredients.length - 1];
        if (lastIngredient.type === 'alc' && lastIngredient.position === position) {
            lastIngredient.amount++;
            Vue.set(this.ingredients, this.ingredients.length - 1, lastIngredient);
            return;
        }
        this.ingredients.push({
            type: 'alc',
            amount: 1,
            position
        });
    }
}
