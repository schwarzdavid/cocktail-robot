<template>
    <div class="custom-navigation-drawer">
        <v-navigation-drawer permanent rail elevation="6" border="0" rail-width="56">
            <v-list>
                <v-list-item prepend-icon="cocktail"
                             :to="{name: CocktailRouteNames.BUILDER}"/>
                <v-list-item prepend-icon="list-alt"
                             :to="{name: AssetsRouteNames.ASSETS}"/>
                <v-list-item prepend-icon="user-settings"
                             :to="{name: MaintenanceRouteNames.MAINTENANCE}"/>
                <v-divider/>
                <v-list-item prepend-icon="power-switch" to="/"/>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts" setup>
    import {CocktailRouteNames, AssetsRouteNames, MaintenanceRouteNames} from '@/router/constants'
</script>

<style lang="scss" scoped>
    .custom-navigation-drawer {
        &:deep(.v-navigation-drawer) {
            z-index: 0;
        }

        &:deep(.v-list-item__prepend > .v-icon) {
            margin-inline-end: 0;
        }
    }
</style>
