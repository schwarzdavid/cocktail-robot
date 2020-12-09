<template>
    <v-dialog v-model="dialogActive" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{on, attr}">
            <slot v-bind="{on, attr}"></slot>
        </template>
        <template v-slot:default>
            <v-card style="height:100%" class="d-flex flex-column align-stretch justify-start" rounded="0">
                <v-app-bar color="primary" dark flat class="flex-grow-0">
                    <v-toolbar-title>Getränk auswählen</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn fab @click="dialogActive=false" small color="error">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-app-bar>
                <v-card-text class="flex-grow-1 pa-0">
                    <v-row style="height:100%;align-items: stretch;" no-gutters>
                        <v-col cols="4">
                            <div class="d-flex align-stretch justify-space-between" style="height:100%;">
                                <v-list style="width:100%;height:calc(100vh - 64px);overflow:scroll" class="pr-1 pl-2">
                                    <v-list-item>
                                        <v-list-item-title class="text-uppercase font-italic">
                                            Nichts auswählen
                                        </v-list-item-title>
                                    </v-list-item>
                                    <div v-if="sortedLiquids.length">
                                        <div v-for="liquid in sortedLiquids" :key="liquid.id">
                                            <v-divider></v-divider>
                                            <v-list-item>
                                                <v-list-item-title>{{ liquid.name }}</v-list-item-title>
                                            </v-list-item>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <v-list-item>
                                            <v-list-item-title disabled class="text-uppercase">
                                                Keine Getränke gefunden
                                            </v-list-item-title>
                                        </v-list-item>
                                    </div>
                                </v-list>
                                <v-divider vertical/>
                            </div>
                        </v-col>
                        <v-col cols="8" style="padding-top: 0;padding-bottom:0;">
                            <div class="pa-5 d-flex flex-column align-stretch justify-space-between"
                                 style="height:100%;">
                                <div class="px-10">
                                    <span class="d-block text-h4 font-weight-light mb-10 mt-3">
                                        Nach Anfangsbuchstaben filtern
                                    </span>
                                    <div v-for="i in Math.ceil(alphabet.length / charsInRow)" :key="i"
                                         class="d-flex justify-start mb-5 mx-n3">
                                        <div v-for="j in charsInRow" :key="j">
                                            <template v-if="alphabet[(i-1)*charsInRow+j-1]">
                                                <v-btn :outlined="charFilter !== alphabet[(i-1)*charsInRow+j-1]"
                                                       :color="charFilter === alphabet[(i-1)*charsInRow+j-1] ? 'primary' : ''"
                                                       style="width:48px;height:48px;min-width:unset;"
                                                       class="pa-0 mx-3"
                                                       @click="toggleCharFilter(alphabet[(i-1)*charsInRow+j-1])">
                                                    {{ alphabet[(i - 1) * charsInRow + j - 1] }}
                                                </v-btn>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <v-divider></v-divider>
                                    <div class="d-flex align-center mt-5">
                                        <v-btn large color="success">Hinzufügen</v-btn>
                                        <v-spacer></v-spacer>
                                        <v-btn large text color="error">Abbrechen</v-btn>
                                        <v-btn large color="primary" class="ml-3">Auswahl bestätigen</v-btn>
                                    </div>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </template>
    </v-dialog>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {Liquid} from '@/store/types/LiquidTypes';

    @Component
    export default class SelectLiquid extends Vue {
        @Prop()
        private readonly liquids!: Liquid[];

        private readonly alphabet = 'abcdefghijklmnopqrstuvwxyzäöü'.toUpperCase().split('');
        private readonly charsInRow = 8;

        private dialogActive = false;
        private charFilter = '';

        private get sortedLiquids(): Liquid[] {
            return this.liquids
                .filter(liquid => !this.charFilter.length || this.charFilter === liquid.name.trim()[0].toUpperCase())
                .sort((a, b) => (a.name > b.name ? 1 : -1));
        }

        private toggleCharFilter(char: string) {
            if (this.charFilter === char) {
                this.charFilter = '';
            } else {
                this.charFilter = char;
            }
        }
    }
</script>
