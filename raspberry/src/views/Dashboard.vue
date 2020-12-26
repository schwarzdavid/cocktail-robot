<template>
    <v-container fluid fill-height style="align-items: stretch" class="mb-5">
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
                        <add-juice :label="juice.name" :max="amountLeft" @save="amount => addJuice(index, amount)">
                            <template v-slot:default="{on, attrs}">
                                <v-btn large block color="dark" depressed class="white" v-bind="attrs" v-on="on"
                                       :disabled="!juice">
                                    {{ juice ? juice.name : 'Leer' }}
                                </v-btn>
                            </template>
                        </add-juice>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="6" align-self="stretch">
                <div class="elevation-3 white">
                    <v-progress-linear height="5" :value="amountValue" :color="amountColor"></v-progress-linear>
                    <div class="py-5 d-flex flex-column" style="height:100%">
                        <div class="d-flex align-center justify-space-between px-5">
                            <h2 class="text-h4">Cocktail</h2>
                            <span class="text-subtitle-1 text--disabled">{{ amountText }}</span>
                        </div>
                        <div class="my-3 px-3" style="height:313px;overflow-y: scroll">
                            <div v-if="!cocktail.ingredients.length" class="d-flex align-center justify-center"
                                 style="height:100%;">
                                <p class="text-uppercase">Keine Getränke ausgewählt</p>
                            </div>
                            <v-list v-else>
                                <template v-for="(ingredient, index) in cocktail.ingredients">
                                    <v-list-item :key="index">
                                        <template v-if="ingredient.type === 'alc'">
                                            <v-list-item-icon>
                                                <v-icon>local_bar</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title>{{ ingredient.label }}</v-list-item-title>
                                                <v-list-item-subtitle>
                                                    {{ ingredient.amount }}x {{ shotSizeInCl }}cl
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                            <v-list-item-action class="d-flex flex-row">
                                                <v-btn icon class="mr-3">
                                                    <v-icon>add</v-icon>
                                                </v-btn>
                                                <v-btn icon class="mr-3" :disabled="ingredient.amount === 1">
                                                    <v-icon>remove</v-icon>
                                                </v-btn>
                                                <v-btn icon color="error">
                                                    <v-icon>delete</v-icon>
                                                </v-btn>
                                            </v-list-item-action>
                                        </template>
                                        <template v-else>
                                            <v-list-item-icon>
                                                <v-icon>science</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title>{{ ingredient.label }}</v-list-item-title>
                                                <v-list-item-subtitle>
                                                    {{ ingredient.amount }}ml
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                            <v-list-item-action class="d-flex flex-row">
                                                <v-btn icon class="mr-3">
                                                    <v-icon>edit</v-icon>
                                                </v-btn>
                                                <v-btn icon color="error">
                                                    <v-icon>delete</v-icon>
                                                </v-btn>
                                            </v-list-item-action>
                                        </template>
                                    </v-list-item>
                                    <v-divider :key="index + '_divider'"
                                               v-if="index < cocktail.ingredients.length - 1"></v-divider>
                                </template>
                            </v-list>
                        </div>
                        <div class="d-flex px-5">
                            <v-spacer/>
                            <v-btn color="error" text large @click="resetCocktail">Reset</v-btn>
                            <v-btn color="primary" class="ml-3" large>Mischen</v-btn>
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import AddJuice from '@/components/AddJuice.vue';
    import {SettingsModule} from '@/store/modules/SettingsModule';
    import {getModule} from 'vuex-module-decorators';
    import {Cocktail} from '@/store/types/Cocktail';
    import {Liquid, LiquidStorage, LiquidStoragePosition} from '@/store/types/Liquid';
    import {LiquidHelper} from '@/store/helper/LiquidHelper';
    import {CocktailModule} from '@/store/modules/CocktailModule';
    import {ColorService} from '@/services/ColorService';

    @Component({
        components: {
            AddJuice
        }
    })
    export default class Dashboard extends Vue {
        private readonly settingsModule: SettingsModule = getModule(SettingsModule, this.$store);
        private readonly cocktailModule: CocktailModule = getModule(CocktailModule, this.$store);
        private readonly colorService = new ColorService(
            this.$vuetify?.theme?.currentTheme?.success?.toString() || '#3ddd0b',
            this.$vuetify?.theme?.currentTheme?.error?.toString() || '#c60303'
        );

        private get cocktail(): Cocktail {
            return this.cocktailModule;
        }

        private get amountText(): string {
            return `${this.cocktailModule.amount}/${this.settingsModule.cupSize}ml`;
        }

        private get amountValue(): number {
            return (this.cocktailModule.amount / this.settingsModule.cupSize) * 100;
        }

        private get amountColor(): string {
            return this.colorService.getColorByMappedValue(this.cocktailModule.amount, this.settingsModule.cupSize);
        }

        private get amountLeft(): number {
            return this.settingsModule.cupSize - this.cocktailModule.amount;
        }

        // eslint-disable-next-line class-methods-use-this
        private get shotSizeInCl(): number {
            return CocktailModule.ALC_DOSE_SIZE / 10;
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

        private addAlcohol(position: LiquidStoragePosition) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this.cocktailModule.addAlcohol(position);
        }

        private addJuice(position: LiquidStoragePosition, amount: number) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this.cocktailModule.addJuice({
                position,
                amount
            });
        }

        private resetCocktail() {
            this.cocktailModule.reset();
        }
    }
</script>
