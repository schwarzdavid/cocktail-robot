<template>
    <v-card elevation="6" height="120px">
        <v-img :src="imageSrc" width="100%" height="100%"/>
        <v-card-title>{{props.ingredient.name}}</v-card-title>
    </v-card>
</template>

<script lang="ts" setup>
    import {Ingredient} from '@/store/types/Ingredient';
    import {computed} from 'vue';

    const props = defineProps<{ingredient: Ingredient}>()

    const imageSrc = computed(() => require('@/assets/images/ingredients/' + props.ingredient.image))
</script>
