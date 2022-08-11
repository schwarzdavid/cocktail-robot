<template>
    <v-row class="h-100">
        <v-col cols="6">
            <span class="d-block text-overline mb-4">Liquors</span>
            <v-row>
                <v-col cols="6" v-for="liquor in ingredientStore.liquors" :key="liquor.uuid">
                    <CocktailIngredient :ingredient="liquor"/>
                </v-col>
            </v-row>
        </v-col>
        <v-divider vertical/>
        <v-col cols="6">
            <span class="d-block text-overline mb-4">Softdrinks</span>
            <v-row>
                <v-col cols="6" v-for="softdrink in ingredientStore.softdrinks" :key="softdrink.uuid">
                    <CocktailIngredient :ingredient="softdrink"/>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
    import CocktailIngredient from '@/components/misc/CocktailIngredient.vue';
    import {useIngredientStore} from '@/store/modules/IngredientStore';

    const ingredientStore = useIngredientStore()
</script>
