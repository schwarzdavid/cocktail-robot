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
                                <select-liquid v-slot:default="{on, attr}" :liquids="alcohols"
                                               :value="alc ? alc.id : null"
                                               @select="alcId => setSelectedAlcohol(index, alcId)">
                                    <v-btn block depressed large class="mt-4" v-on="on" v-bind="attr" color="accent">
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
                                <select-liquid v-slot:default="{on, attr}" :liquids="juices"
                                               :value="juice ? juice.id : null"
                                               @select="juiceId => setSelectedJuice(index, juiceId)">
                                    <v-btn block depressed large class="mt-4" v-on="on" v-bind="attr" color="accent">
                                        <span v-if="juice">{{ juice.name }}</span>
                                        <span v-else>Leer</span>
                                    </v-btn>
                                </select-liquid>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <div class="d-flex align-center justify-end mt-3" style="width:100%;">
            <v-btn color="primary" large>Anpumpen</v-btn>
            <v-btn color="primary" class="ml-5" large>Reinigen</v-btn>
            <v-btn color="success" class="ml-5" large v-if="isInitial" :to="{name:ROUTES.DASHBOARD}">Weiter</v-btn>
        </div>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Liquid, LiquidStorage, LiquidStoragePosition} from '@/store/types/LiquidTypes';
    import {getModule} from 'vuex-module-decorators';
    import {LiquidModule} from '@/store/modules/LiquidModule';
    import {SettingsModule} from '@/store/modules/SettingsModule';
    import SelectLiquid from '@/components/SelectLiquid.vue';
    import {LiquidHelper} from '@/store/helper/LiquidHelper';
    import {ROUTES} from '@/router/Routes';

    @Component({
        components: {
            SelectLiquid
        }
    })
    export default class Setup extends Vue {
        private readonly ROUTES = ROUTES;
        private readonly liquidModule = getModule(LiquidModule, this.$store);
        private readonly settingsModule = getModule(SettingsModule, this.$store);

        private get isInitial(): boolean {
            return this.$route.params.initial === 'true';
        }

        // eslint-disable-next-line class-methods-use-this
        private get installedAlcohols(): LiquidStorage<Liquid | null> {
            const output: LiquidStorage<Liquid | null> = [null, null, null, null];
            for (let i = 0; i < 4; i++) {
                output[i as LiquidStoragePosition] = LiquidHelper.getInstalledAlcohol(i as LiquidStoragePosition);
            }
            return output;
        }

        // eslint-disable-next-line class-methods-use-this
        private get installedJuices(): LiquidStorage<Liquid | null> {
            const output: LiquidStorage<Liquid | null> = [null, null, null, null];
            for (let i = 0; i < 4; i++) {
                output[i as LiquidStoragePosition] = LiquidHelper.getInstalledJuice(i as LiquidStoragePosition);
            }
            return output;
        }

        private get alcohols(): Liquid[] {
            return this.liquidModule.alcohols;
        }

        private get juices(): Liquid[] {
            return this.liquidModule.juices;
        }

        private setSelectedAlcohol(position: keyof LiquidStorage<number | null>, alcoholId: number | null) {
            this.settingsModule.setInstalledAlcohol({
                position,
                alcoholId
            });
        }

        private setSelectedJuice(position: keyof LiquidStorage<number | null>, juiceId: number) {
            this.settingsModule.setInstalledJuice({
                position,
                juiceId
            });
        }
    }
</script>
