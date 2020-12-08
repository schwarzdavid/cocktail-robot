<template>
    <v-app :style="{background: $vuetify.theme.currentTheme.background}">
        <v-app-bar app flat fixed height="80" color="transparent">
            <div class="d-flex align-center mt-3 px-3">
                <v-app-bar-nav-icon @click="menuVisible = true"/>
            </div>
        </v-app-bar>

        <v-navigation-drawer v-model="menuVisible" fixed width="80%">
            <h1>Test</h1>

            <router-link :to="{name: ROUTES.SETUP}">Setup</router-link><br>
            <router-link :to="{name: ROUTES.DASHBOARD}">Dashboard</router-link><br>
            <router-link :to="{name: ROUTES.LIQUIDS}">Liquids</router-link><br>
        </v-navigation-drawer>

        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script lang="ts">
    import {ROUTES} from '@/router';
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class App extends Vue {
        private readonly ROUTES = ROUTES;

        private menuVisible = false;
    }
</script>

<style lang="scss">
    html, body {
        overflow: hidden;
    }

    *, *:before, *:after {
        user-select: none;
        touch-action: manipulation;
        -webkit-touch-callout: none;
    }

    .v-navigation-drawer {
        transition-duration: .5s !important;
    }

    .container {
        padding-left: 32px !important;
        padding-right: 32px !important;
    }

    .v-app-bar__nav-icon .v-icon {
        height: 36px !important;
        width: 36px !important;
        font-size: 36px !important;
        color: rgba(0, 0, 0, 0.87) !important;
    }

    .v-btn:not(.v-btn--text):not(.v-btn--outlined):focus:before {
        opacity: 0 !important;
    }

    ::-webkit-scrollbar {
        width: 4px;
        overflow: visible;
    }

    ::-webkit-scrollbar-track {
        display: none;
    }

    ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.12);
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        overflow: visible;
    }
</style>