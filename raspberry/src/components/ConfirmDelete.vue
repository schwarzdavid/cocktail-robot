<template>
    <v-dialog v-model="dialogVisible" max-width="350">
        <template v-slot:activator="{on,attrs}">
            <slot v-bind="{on,attrs}"></slot>
        </template>
        <template v-slot:default>
            <v-card>
                <v-app-bar flat color="primary" dark>
                    <v-toolbar-title>Löschen bestätigen</v-toolbar-title>
                </v-app-bar>
                <v-card-text class="pt-5">
                    <p class="text--black">Möchten Sie {{ label }} wirklich löschen?</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn depressed @click="dialogVisible = false">Abbrechen</v-btn>
                    <v-btn color="error" class="ml-3" @click="confirmDelete">Löschen</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script lang="ts">

    import {Component, Emit, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class ConfirmDelete extends Vue {
        private dialogVisible = false;

        @Prop()
        private readonly label!: string;

        @Emit('delete')
        private confirmDelete(): void {
            this.dialogVisible = false;
            return undefined;
        }
    }
</script>
