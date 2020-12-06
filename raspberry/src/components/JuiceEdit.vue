<template>
    <v-dialog max-width="400">
        <template v-slot:activator="{on, attr}">
            <slot v-bind="{on, attr}"></slot>
        </template>
        <template v-slot:default>
            <v-card>
                <v-app-bar color="primary" flat dark>
                    <v-toolbar-title>Mischgetränk</v-toolbar-title>
                </v-app-bar>
                <v-card-text class="pt-5">
                    <div class="d-flex align-center justify-space-between">
                        <span class="text-h6">Testshizzl:</span>
                        <v-text-field readonly outlined hide-details dense value="100" suffix="ml"
                                      style="width:80px;flex-grow:0;"></v-text-field>
                    </div>
                    <v-divider class="my-7"></v-divider>
                    <div class="d-flex align-center justify-space-between">
                        <v-btn outlined color="primary">-100</v-btn>
                        <v-btn outlined color="primary">-50</v-btn>
                        <v-btn outlined color="primary">+50</v-btn>
                        <v-btn outlined color="primary">+100</v-btn>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text large>Abbrechen</v-btn>
                    <v-btn color="primary" large>Speichern</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class JuiceEdit extends Vue {

    }
</script>
