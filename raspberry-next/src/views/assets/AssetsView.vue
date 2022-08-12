<template>
    <div>
        <h1 class="text-h4 my-5">
            Asset Selection
        </h1>
        <v-row class="h-100">
            <v-col cols="6">
                <span class="d-block text-overline mb-4">Liquors</span>
                <v-row>
                    <v-col cols="6" v-for="(liquor, index) in assetStore.liquors" :key="index">
                        <IngredientSelector :ingredients="ingredientStore.liquors" v-slot="{props}">
                            <div v-bind="props">
                                <OptionalCocktailIngredient :ingredient="liquor" :subtitle="'Position ' + (index + 1)"/>
                            </div>
                        </IngredientSelector>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="6">
                <span class="d-block text-overline mb-4">Softdrinks</span>
                <v-row>
                    <v-col cols="6" v-for="(softdrink, index) in assetStore.softdrinks" :key="index">
                        <IngredientSelector :ingredients="ingredientStore.liquors" v-slot="{props}">
                            <div v-bind="props">
                                <OptionalCocktailIngredient :ingredient="softdrink" :subtitle="'Position ' + (index + 1)"/>
                            </div>
                        </IngredientSelector>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
    import {useAssetStore} from '@/store/modules/AssetStore';
    import OptionalCocktailIngredient from '@/components/misc/OptionalCocktailIngredient.vue';
    import IngredientSelector from '@/components/misc/IngredientSelector.vue';
    import {useIngredientStore} from '@/store/modules/IngredientStore';

    const ingredientStore = useIngredientStore()
    const assetStore = useAssetStore()
</script>
