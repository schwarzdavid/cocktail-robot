<template>
    <v-app :style="{background: $vuetify.theme.currentTheme.background}">
        <v-app-bar app flat fixed height="80" color="transparent">
            <div class="d-flex align-center mt-3 px-3">
                <v-app-bar-nav-icon @click="menuVisible = true"/>
            </div>
        </v-app-bar>

        <v-navigation-drawer v-model="menuVisible" fixed width="80%">
            <h1>Test</h1>
        </v-navigation-drawer>

        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class App extends Vue {
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
</style>
