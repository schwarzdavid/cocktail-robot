<template>
    <v-app>
        <router-view v-slot="{Component}">
            <transition mode="out-in" name="fade-transition">
                <component :is="Component"/>
            </transition>
        </router-view>
    </v-app>
</template>

<style src="@/assets/scss/main.scss" lang="scss"></style>
