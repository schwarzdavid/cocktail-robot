<template>
    <v-container fluid fill-height style="align-items: stretch">
        <v-row align="center">
            <v-col cols="6">
                <h2 class="text-h5">Spirituosen</h2>
                <v-row>
                    <v-col cols="6" v-for="(alcohol, index) in alcohols" :key="index">
                        <v-btn large block color="dark" depressed class="white" :disabled="!alcohol"
                               @click="addAlcohol(index)">
                            {{ alcohol ? alcohol.name : 'Leer' }}
                        </v-btn>
                    </v-col>
                </v-row>
                <h2 class="text-h5 mt-5">Mischgetränke</h2>
                <v-row>
                    <v-col cols="6" v-for="(juice, index) in juices" :key="index">
                        <juice-edit>
                            <template v-slot:default="{on, attrs}">
                                <v-btn large block color="dark" depressed class="white" v-bind="attrs" v-on="on"
                                       :disabled="!juice">
                                    {{ juice ? juice.name : 'Leer' }}
                                </v-btn>
                            </template>
                        </juice-edit>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="6" align-self="stretch">
                <div class="elevation-3 white px-5 py-5 d-flex flex-column" style="height:100%">
                    <h2 class="text-h4">Cocktail</h2>
                    <div class="flex-grow-1 mt-3">
                        <div v-if="!cocktail.ingredients.length" class="d-flex align-center justify-center"
                             style="height:100%;">
                            <p class="text-uppercase">Keine Getränke ausgewählt</p>
                        </div>
                        <div v-else v-sortable>
                            <div v-for="(ingredient, index) in cocktail.ingredients" :key="index">
                                {{ ingredient.type }} - {{ ingredient.position }} - {{ ingredient.amount }}
                            </div>
                        </div>
                    </div>
                    <div class="d-flex">
                        <v-btn color="primary" icon large>
                            <v-icon>save</v-icon>
                        </v-btn>
                        <v-spacer/>
                        <v-btn color="error" text large>Reset</v-btn>
                        <v-btn color="primary" class="ml-3" large>Mischen</v-btn>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import JuiceEdit from '@/components/JuiceEdit.vue';
    import {SettingsModule} from '@/store/modules/SettingsModule';
    import {getModule} from 'vuex-module-decorators';
    import {Cocktail} from '@/store/types/Cocktail';
    import {Liquid, LiquidStorage, LiquidStoragePosition} from '@/store/types/LiquidTypes';
    import {LiquidHelper} from '@/store/helper/LiquidHelper';
    import {CocktailModule} from '@/store/modules/CocktailModule';

    @Component({
        components: {
            JuiceEdit
        }
    })
    export default class Dashboard extends Vue {
        private readonly settingsModule: SettingsModule = getModule(SettingsModule, this.$store);
        private readonly cocktailModule: CocktailModule = getModule(CocktailModule, this.$store);

        private get cocktail(): Cocktail {
            return this.cocktailModule;
        }

        // eslint-disable-next-line class-methods-use-this
        private get juices(): LiquidStorage<Liquid | null> {
            const output: LiquidStorage<Liquid | null> = [null, null, null, null];
            for (let i = 0; i < 4; i++) {
                output[i as LiquidStoragePosition] = LiquidHelper.getInstalledJuice(i as LiquidStoragePosition);
            }
            return output;
        }

        // eslint-disable-next-line class-methods-use-this
        private get alcohols(): LiquidStorage<Liquid | null> {
            const output: LiquidStorage<Liquid | null> = [null, null, null, null];
            for (let i = 0; i < 4; i++) {
                output[i as LiquidStoragePosition] = LiquidHelper.getInstalledAlcohol(i as LiquidStoragePosition);
            }
            return output;
        }

        private addAlcohol(position: number) {
            this.cocktailModule.addAlcohol(position);
        }
    }
</script>
