<template>
    <v-container fluid fill-height class="align-stretch">
        <v-row class="flex-grow-1">
            <v-col cols="6">
                <h1 class="text-h4">Spirituosen</h1>
                <v-card class="mt-8">
                    <v-card-text>
                        <v-row>
                            <v-col cols="6" v-for="i in 4" :key="i">
                                <span class="d-block text-subtitle-1 text-uppercase font-weight-bold">
                                    Position {{ i }}
                                </span>
                                <v-btn block depressed large class="mt-4">Tralala</v-btn>
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
                            <v-col cols="6" v-for="i in 4" :key="i">
                                <span class="d-block text-subtitle-1 text-uppercase font-weight-bold">
                                    Position {{ i }}
                                </span>
                                <v-btn block depressed large class="mt-4">Tralala</v-btn>
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

    @Component
    export default class Setup extends Vue {

    }
</script>
