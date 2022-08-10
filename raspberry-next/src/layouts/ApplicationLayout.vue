<template>
    <div>
        <NavigationDrawer/>
        <v-main>
            <v-container fluid>
                <router-view v-slot="{Component}">
                    <transition mode="out-in" appear name="slide-y-reverse-transition">
                        <component :is="Component"/>
                    </transition>
                </router-view>
            </v-container>
        </v-main>
    </div>
</template>

<script lang="ts" setup>
    import NavigationDrawer from '@/components/page/NavigationDrawer';
</script>
