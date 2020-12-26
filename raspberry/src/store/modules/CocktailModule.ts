import {Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {AlcoholIngredient, Cocktail, JuiceIngredient} from '@/store/types/Cocktail';
import Vue from 'vue';
import {LiquidStoragePosition} from '@/store/types/Liquid';
import {RootState} from '@/store/types/RootState';

@Module({
    name: 'cocktail'
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class CocktailModule extends VuexModule<any, RootState> implements Cocktail {
    static readonly ALC_DOSE_SIZE = 20;

    ingredients: Array<JuiceIngredient | AlcoholIngredient> = [];

    get amount(): number {
        return this.ingredients.reduce((amount, ingredient) => {
            const amountMultiplier = ingredient.type === 'alc' ? CocktailModule.ALC_DOSE_SIZE : 1;
            return amount + (ingredient.amount * amountMultiplier);
        }, 0);
    }

    @Mutation
    addAlcohol(position: LiquidStoragePosition) {
        const lastIngredient = this.ingredients[this.ingredients.length - 1];
        if (lastIngredient && lastIngredient.type === 'alc' && lastIngredient.position === position) {
            lastIngredient.amount++;
            Vue.set(this.ingredients, this.ingredients.length - 1, lastIngredient);
            return;
        }
        console.log(this);
        const installedAlcoholId = this.context.rootState.settings.installedAlcohols[position];
        if (!installedAlcoholId) {
            return;
        }
        const alcohol = this.context.rootState.liquid.alcohols[installedAlcoholId];
        if (!alcohol) {
            return;
        }
        this.ingredients.push({
            type: 'alc',
            amount: 1,
            label: alcohol.name,
            position
        });
    }

    @Mutation
    reset() {
        this.ingredients = [];
    }
}
