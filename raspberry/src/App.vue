<template>
    <v-app :style="{background: $vuetify.theme.currentTheme.background}">
        <v-app-bar app flat fixed height="80" color="transparent">
            <div class="d-flex align-center mt-3 px-3 justify-space-between" style="width:100%">
                <v-app-bar-nav-icon @click="menuVisible = true"/>
                <v-tooltip bottom>
                    <template v-slot:activator="{on,attrs}">
                        <v-btn icon v-on="on" v-bind="attrs" :color="connectionColor">
                            <v-icon v-if="arduinoConnected">network_cell</v-icon>
                            <v-icon v-else>signal_cellular_off</v-icon>
                        </v-btn>
                    </template>
                    <span v-if="arduinoConnected">Verbunden</span>
                    <span v-else>Nicht verbunden</span>
                </v-tooltip>
            </div>
        </v-app-bar>

        <v-navigation-drawer v-model="menuVisible" fixed width="300px">
            <v-list>
                <v-list-item :to="{name:ROUTES.DASHBOARD}">
                    <v-list-item-icon>
                        <v-icon>wine_bar</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            Mischen
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item :to="{name:ROUTES.SETUP}">
                    <v-list-item-icon>
                        <v-icon>settings_input_component</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            Einstellungen
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item :to="{name:ROUTES.LIQUIDS}">
                    <v-list-item-icon>
                        <v-icon>local_drink</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            Getränke
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <template v-slot:append>
                <v-list>
                    <v-list-item :to="{name:ROUTES.LOG}">
                        <v-list-item-icon>
                            <v-icon>history</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>
                                Logs
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </template>
        </v-navigation-drawer>

        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script lang="ts">
    import {ROUTES} from '@/router/Routes';
    import {Component, Vue} from 'vue-property-decorator';
    import {getArduinoService} from '@/services/ArduinoService';
    import {AbstractArduinoService} from '@/services/types/ArduinoServiceTypes';
    import {getModule} from 'vuex-module-decorators';
    import {LogModule} from '@/store/modules/LogModule';

    @Component
    export default class App extends Vue {
        private readonly ROUTES = ROUTES;
        private readonly logModule = getModule(LogModule, this.$store);

        private menuVisible = false;
        private arduinoConnected = false;
        private arduinoService: AbstractArduinoService | null = null;

        async mounted() {
            this.arduinoService = await getArduinoService();
            this.arduinoConnected = this.arduinoService.isConnected;
            this.arduinoService.on('connectionChange', isConnected => {
                this.arduinoConnected = isConnected;
                this.$forceUpdate();
            });

            window.addEventListener('error', event => {
                event.preventDefault();
                event.stopPropagation();
                this.logModule.addMessage(event.error);
                console.error(event.error);
            });

            window.addEventListener('unhandledrejection', event => {
                event.preventDefault();
                event.stopPropagation();
                this.logModule.addMessage(event.reason);
                console.error(event.reason);
            });

            Vue.config.errorHandler = (err, vm, info) => {
                console.error(err, vm, info);
                this.logModule.addMessage(err);
            };
        }

        private get connectionColor(): string {
            return this.arduinoConnected ? 'success' : 'error';
        }
    }
</script>

<style lang="scss">
    html, body {
        overflow: hidden !important;
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
        height: 4px;
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
