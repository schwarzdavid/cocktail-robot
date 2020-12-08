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
                                            <div class="d-flex align-center">
                                                <text-input v-model="newAlcohol" @cancel="newAlcohol=''"
                                                            @confirm="updateAlcohol(alcohol.id)"
                                                            v-slot:default="{on, attr}">
                                                    <v-btn icon @click="newAlcohol = alcohol.name" v-on="on"
                                                           v-bind="attr">
                                                        <v-icon>edit</v-icon>
                                                    </v-btn>
                                                </text-input>
                                                <confirm-delete v-slot:default="{on,attr}" :label="alcohol.name"
                                                                @delete="deleteAlcohol(alcohol.id)">
                                                    <v-btn icon color="error" class="ml-2" v-on="on" v-bind="attr">
                                                        <v-icon>delete</v-icon>
                                                    </v-btn>
                                                </confirm-delete>
                                            </div>
                                        </v-list-item-action>
                                    </v-list-item>
                                    <v-divider/>
                                </div>
                            </v-list>
                        </div>
                        <text-input v-model="newAlcohol" @cancel="newAlcohol = ''" @confirm="addAlcohol"
                                    v-slot:default="{on, attr}">
                            <v-btn color="primary" v-on="on" v-bind="attr" class="ma-4">
                                Spirituose hinzufügen
                            </v-btn>
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
            <v-col cols="6">
                <h1 class="text-h4">Mischgetränke</h1>
                <v-card class="mt-8 flex-grow-1" style="height:380px;">
                    <div v-if="juices.length" class="d-flex flex-column align-start">
                        <div class="flex-grow-1 align-self-stretch pt-1 ml-2">
                            <v-list style="height:308px;overflow-y:scroll;overflow-x:hidden;" class="pr-1">
                                <div v-for="juice in juices" :key="juice.id">
                                    <v-list-item>
                                        <v-list-item-title>{{ juice.name }}</v-list-item-title>
                                        <v-list-item-action>
                                            <div class="d-flex align-center">
                                                <text-input v-model="newSoftdrink" @cancel="newSoftdrink=''"
                                                            @confirm="updateJuice(juice.id)"
                                                            v-slot:default="{on, attr}">
                                                    <v-btn icon @click="newJuice = juice.name" v-on="on"
                                                           v-bind="attr">
                                                        <v-icon>edit</v-icon>
                                                    </v-btn>
                                                </text-input>
                                                <confirm-delete v-slot:default="{on,attr}" :label="juice.name"
                                                                @delete="deleteJuice(juice.id)">
                                                    <v-btn icon color="error" class="ml-2" v-on="on" v-bind="attr">
                                                        <v-icon>delete</v-icon>
                                                    </v-btn>
                                                </confirm-delete>
                                            </div>
                                        </v-list-item-action>
                                    </v-list-item>
                                    <v-divider/>
                                </div>
                            </v-list>
                        </div>
                        <text-input v-model="newJuice" @cancel="newJuice = ''" @confirm="addJuice"
                                    v-slot:default="{on, attr}">
                            <v-btn color="primary" v-on="on" v-bind="attr" class="ma-4">
                                Mischgetränk hinzufügen
                            </v-btn>
                        </text-input>
                    </div>
                    <div v-else class="d-flex align-center justify-center flex-column" style="height:100%;">
                        <span class="text-subtitle-1 text-uppercase">Noch keine Mischgetränke hinzugefügt</span>
                        <text-input v-model="newJuice" @cancel="newJuice = ''" @confirm="addJuice">
                            <template v-slot:default="{on, attr}">
                                <v-btn outlined color="primary" large class="mt-3" v-on="on" v-bind="attr">
                                    Mischgetränk hinzufügen
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
    import ConfirmDelete from '@/components/ConfirmDelete.vue';

    @Component({
        components: {
            ConfirmDelete, TextInput
        }
    })
    export default class Liquids extends Vue {
        private readonly liquidModule = getModule(LiquidModule, this.$store);

        private newAlcohol = '';
        private newJuice = '';

        private get alcohols(): Liquid[] {
            return this.liquidModule.alcohols;
        }

        private get juices(): Liquid[] {
            return this.liquidModule.juices;
        }

        private addJuice(): void {
            if (this.newJuice.trim()) {
                this.liquidModule.addJuice(this.newJuice);
            }
            this.newJuice = '';
        }

        private updateJuice(id: number): void {
            if (!this.newJuice.trim()) {
                return;
            }
            this.liquidModule.updateJuice({
                id,
                name: this.newJuice
            });
            this.newJuice = '';
        }

        private deleteJuice(id: number): void {
            this.liquidModule.deleteJuice(id);
        }

        private addAlcohol(): void {
            if (this.newAlcohol.trim()) {
                this.liquidModule.addAlcohol(this.newAlcohol);
            }
            this.newAlcohol = '';
        }

        private updateAlcohol(id: number): void {
            if (!this.newAlcohol.trim()) {
                return;
            }
            this.liquidModule.updateAlcohol({
                id,
                name: this.newAlcohol
            });
            this.newAlcohol = '';
        }

        private deleteAlcohol(id: number): void {
            this.liquidModule.deleteAlcohol(id);
        }
    }
</script>
