<template>
    <v-container fluid>
        <v-row>
            <v-col cols="6">
                <h1 class="text-h4">Spirituosen</h1>
                <v-card class="mt-8 flex-grow-1" style="height:380px;">
                    <div v-if="alcohols.length" class="d-flex flex-column align-start">
                        <div class="flex-grow-1 align-self-stretch pt-1 ml-2">
                            <v-list style="height:308px;overflow-y:scroll;overflow-x:hidden;" class="pr-1">
                                <div v-for="alcohol in alcohols" :key="alcohol.id">
                                    <v-list-item>
                                        <v-list-item-title>{{ alcohol.name }}</v-list-item-title>
                                        <v-list-item-action>
                                            <v-btn icon color="error">
                                                <v-icon>delete</v-icon>
                                            </v-btn>
                                        </v-list-item-action>
                                    </v-list-item>
                                    <v-divider/>
                                </div>
                            </v-list>
                        </div>
                        <text-input v-model="newAlcohol" @cancel="newAlcohol = ''" @confirm="addAlcohol">
                            <template v-slot:default="{on, attr}">
                                <v-btn color="primary" v-on="on" v-bind="attr" class="ma-4">
                                    Spirituose hinzufügen
                                </v-btn>
                            </template>
                        </text-input>
                    </div>
                    <div v-else class="d-flex align-center justify-center flex-column" style="height:100%;">
                        <span class="text-subtitle-1 text-uppercase">Noch keine Spirituosen hinzugefügt</span>
                        <text-input v-model="newAlcohol" @cancel="newAlcohol = ''" @confirm="addAlcohol">
                            <template v-slot:default="{on, attr}">
                                <v-btn outlined color="primary" large class="mt-3" v-on="on" v-bind="attr">
                                    Spirituose hinzufügen
                                </v-btn>
                            </template>
                        </text-input>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';
    import {getModule} from 'vuex-module-decorators';
    import {LiquidModule} from '@/store/modules/LiquidModule';
    import {Liquid} from '@/store/types/LiquidTypes';
    import TextInput from '@/components/input/TextInput.vue';

    @Component({components: {TextInput}})
    export default class Liquids extends Vue {
        private readonly liquidModule = getModule(LiquidModule, this.$store);

        private newAlcohol = '';
        private newSoftdrink = '';

        private get alcohols(): Liquid[] {
            return this.liquidModule.alcohols;
        }

        private get juices(): Liquid[] {
            return this.liquidModule.juices;
        }

        private addSoftdrink(): void {
            if (this.newSoftdrink.trim()) {
                this.liquidModule.addJuice(this.newSoftdrink);
            }
            this.newSoftdrink = '';
        }

        private addAlcohol(): void {
            if (this.newAlcohol.trim()) {
                this.liquidModule.addAlcohol(this.newAlcohol);
            }
            this.newAlcohol = '';
        }
    }
</script>
