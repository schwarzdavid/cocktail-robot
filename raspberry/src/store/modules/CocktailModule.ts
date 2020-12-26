import {Module, Mutation, MutationAction, VuexModule} from 'vuex-module-decorators';
import {AlcoholIngredient, Cocktail, JuiceIngredient} from '@/store/types/Cocktail';
import {LiquidStoragePosition} from '@/store/types/Liquid';
import {RootState} from '@/store/types/RootState';
import {ActionContext} from 'vuex';

type IngredientActionMutationValue = { ingredients: Array<JuiceIngredient | AlcoholIngredient> };

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

    @MutationAction({
        mutate: ['ingredients']
    })
    // eslint-disable-next-line max-len
    async addAlcohol(this: ActionContext<Cocktail, RootState>, position: LiquidStoragePosition): Promise<IngredientActionMutationValue> {
        const {ingredients} = this.state;
        const lastIngredient = this.state.ingredients[this.state.ingredients.length - 1];
        if (lastIngredient && lastIngredient.type === 'alc' && lastIngredient.position === position) {
            lastIngredient.amount++;
            ingredients[ingredients.length - 1] = lastIngredient;
        } else {
            const installedAlcoholId = this.rootState.settings.installedAlcohols[position];
            if (installedAlcoholId) {
                const alcohol = this.rootState.liquid.alcohols.find(currAlc => currAlc.id === installedAlcoholId);
                if (alcohol) {
                    ingredients.push({
                        type: 'alc',
                        amount: 1,
                        label: alcohol.name,
                        position
                    });
                }
            }
        }
        return {
            ingredients
        };
    }

    @MutationAction({
        mutate: ['ingredients']
    })
    // eslint-disable-next-line max-len
    async addJuice(this: ActionContext<Cocktail, RootState>, {
        position,
        amount
    }: { position: LiquidStoragePosition, amount: number }): Promise<IngredientActionMutationValue> {
        const {ingredients} = this.state;
        const lastIngredient = ingredients[ingredients.length - 1];
        if (lastIngredient && lastIngredient.type === 'soft' && lastIngredient.position === position) {
            lastIngredient.amount += amount;
            ingredients[ingredients.length - 1] = lastIngredient;
        } else {
            const installedJuiceId = this.rootState.settings.installedJuices[position];
            if (installedJuiceId) {
                const juice = this.rootState.liquid.juices.find(currJuice => currJuice.id === installedJuiceId);
                if (juice) {
                    ingredients.push({
                        type: 'soft',
                        label: juice.name,
                        amount,
                        position
                    });
                }
            }
        }
        return {
            ingredients
        };
    }

    @Mutation
    reset() {
        this.ingredients = [];
    }
}
