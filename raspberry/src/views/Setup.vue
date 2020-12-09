<template>
    <v-container fluid fill-height class="align-stretch">
        <v-row class="flex-grow-1">
            <v-col cols="6">
                <h1 class="text-h4">Spirituosen</h1>
                <v-card class="mt-8">
                    <v-card-text>
                        <v-row>
                            <v-col cols="6" v-for="(alc, index) in installedAlcohols" :key="index">
                                <span class="d-block text-subtitle-1 text-uppercase font-weight-bold">
                                    Position {{ parseInt(index) + 1 }}
                                </span>
                                <select-liquid v-slot:default="{on, attr}" :liquids="alcohols">
                                    <v-btn block depressed large class="mt-4" v-on="on" v-bind="attr">
                                        <span v-if="alc">{{ alc.name }}</span>
                                        <span v-else>Leer</span>
                                    </v-btn>
                                </select-liquid>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="6">
                <h1 class="text-h4">Mischgetränke</h1>
                <v-card class="mt-8">
                    <v-card-text>
                        <v-row>
                            <v-col cols="6" v-for="(juice, index) in installedJuices" :key="index">
                                <span class="d-block text-subtitle-1 text-uppercase font-weight-bold">
                                    Position {{ parseInt(index) + 1 }}
                                </span>
                                <v-btn block depressed large class="mt-4">
                                    <span v-if="juice">{{ juice.name }}</span>
                                    <span v-else>Leer</span>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <div class="d-flex align-center justify-end mt-3" style="width:100%;">
            <v-btn color="primary" large>Anpumpen</v-btn>
            <v-btn color="primary" class="ml-5" large>Reinigen</v-btn>
        </div>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Liquid, LiquidStorage} from '@/store/types/LiquidTypes';
    import {getModule} from 'vuex-module-decorators';
    import {LiquidModule} from '@/store/modules/LiquidModule';
    import {SettingsModule} from '@/store/modules/SettingsModule';
    import SelectLiquid from '@/components/SelectLiquid.vue';

    @Component({
        components: {
            SelectLiquid
        }
    })
    export default class Setup extends Vue {
        private readonly liquidModule = getModule(LiquidModule, this.$store);
        private readonly settingsModule = getModule(SettingsModule, this.$store);

        private get installedAlcohols(): LiquidStorage<Liquid | null> {
            return {
                0: this.getAlcoholById(this.settingsModule.installedAlcohols[0]),
                1: this.getAlcoholById(this.settingsModule.installedAlcohols[1]),
                2: this.getAlcoholById(this.settingsModule.installedAlcohols[2]),
                3: this.getAlcoholById(this.settingsModule.installedAlcohols[3])
            };
        }

        private get installedJuices(): LiquidStorage<Liquid | null> {
            return {
                0: this.getJuiceById(this.settingsModule.installedJuices[0]),
                1: this.getJuiceById(this.settingsModule.installedJuices[1]),
                2: this.getJuiceById(this.settingsModule.installedJuices[2]),
                3: this.getJuiceById(this.settingsModule.installedJuices[3])
            };
        }

        private get alcohols(): Liquid[] {
            return this.liquidModule.alcohols;
        }

        private get juices(): Liquid[] {
            return this.liquidModule.juices;
        }

        private getAlcoholById(id: number | null): Liquid | null {
            if (id === null) {
                return null;
            }
            return this.liquidModule.alcohols.find(alcohol => alcohol.id === id) || null;
        }

        private getJuiceById(id: number | null): Liquid | null {
            if (id === null) {
                return null;
            }
            return this.liquidModule.juices.find(juice => juice.id === id) || null;
        }
    }
</script>
