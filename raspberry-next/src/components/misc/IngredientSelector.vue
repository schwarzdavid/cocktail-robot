<template>
    <v-dialog fullscreen transition="scroll-x-transition">
        <template #activator="{props}">
            <slot :props="props">
                <v-btn v-bind="props">
                    Open
                </v-btn>
            </slot>
        </template>
        <v-card>
            <v-container fluid>
                <h1 class="text-h4 my-5">
                    Asset Selection
                </h1>
                <div class="ingredient-view">
                    <CocktailIngredient v-for="ingredient in ingredients" :key="ingredient.uuid" :ingredient="ingredient"/>
                </div>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
    import {Ingredient} from '@/store/types/Ingredient';
    import CocktailIngredient from '@/components/misc/CocktailIngredient.vue';

    defineProps<{
        ingredients: Ingredient[]
    }>()
</script>

<style lang="scss" scoped>
    .ingredient-view {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        grid-auto-flow: column;
        grid-auto-columns: minmax(160px, 1fr);
        overflow-x: auto;
    }
</style>
