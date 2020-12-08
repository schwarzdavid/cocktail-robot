<template>
    <v-container fluid fill-height style="align-items: stretch">
        <v-row align="center">
            <v-col cols="6">
                <h2 class="text-h5">Alkohol</h2>
                <v-row>
                    <v-col cols="6" v-for="i in 4" :key="i">
                        <v-btn large block color="dark" depressed class="white">Item {{ i }}</v-btn>
                    </v-col>
                </v-row>
                <h2 class="text-h5 mt-5">Mischgetränke</h2>
                <v-row>
                    <v-col cols="6" v-for="i in 4" :key="i">
                        <juice-edit>
                            <template v-slot:default="{on, attrs}">
                                <v-btn large block color="dark" depressed class="white" v-bind="attrs" v-on="on">
                                    Item {{ i }}
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
                                {{ ingredient.type }} - {{ ingredient.amount }}
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
    import {LiquidModule} from '@/store/modules/LiquidModule';

    @Component({components: {JuiceEdit}})
    export default class Dashboard extends Vue {
        private settingsModule: SettingsModule = getModule(SettingsModule, this.$store);
        private liquidModule: LiquidModule = getModule(LiquidModule, this.$store);

        private get cocktail(): Cocktail {
            return this.settingsModule.preparedCocktail;
        }
    }
</script>

<style lang="scss" scoped>

</style>
