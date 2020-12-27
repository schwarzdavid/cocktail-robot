<template>
    <v-dialog v-model="dialogVisible" max-width="350">
        <template v-slot:activator="{on,attrs}">
            <slot v-bind="{on,attrs}"></slot>
        </template>
        <template v-slot:default>
            <v-card>
                <v-card-text>
                    <p class="text-subtitle-1 text--black pt-10">Stellen Sie sicher, dass sich ein Glas auf dem weißen
                        Untersetzer befindet.</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn depressed @click="dialogVisible=false">Abbrechen</v-btn>
                    <v-btn color="success" class="ml-3" @click="confirmCocktail">Mischen</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script lang="ts">
    import {Component, Emit, Vue} from 'vue-property-decorator';

    @Component
    export default class ConfirmCocktail extends Vue {
        private dialogVisible = false;

        @Emit('confirm')
        private confirmCocktail() {
            this.dialogVisible = false;
        }
    }
</script>
