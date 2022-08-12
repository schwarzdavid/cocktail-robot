<template>
    <CocktailIngredient :ingredient="ingredient" :subtitle="subtitle" v-if="ingredient"/>
    <v-card elevation="6" class="cocktail-ingredient" v-ripple>
        <div class="cocktail-ingredient__image">
            <v-icon class="d-block ml-auto" color="secondary">
                plus
            </v-icon>
        </div>
        <div class="cocktail-ingredient__content">
            <v-card-title class="cocktail-ingredient__title">
                Empty
            </v-card-title>
            <v-card-subtitle v-if="subtitle || $slots.subtitle" class="cocktail-ingredient__subtitle">
                <slot name="subtitle">
                    {{subtitle}}
                </slot>
            </v-card-subtitle>
        </div>
    </v-card>
</template>

<script lang="ts" setup>
    import CocktailIngredient from '@/components/misc/CocktailIngredient';
    import {Ingredient} from '@/store/types/Ingredient';

    defineProps<{
        ingredient: Ingredient | null,
        subtitle?: string
    }>()
</script>
