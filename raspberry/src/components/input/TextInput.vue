<template>
    <v-dialog fullscreen hide-overlay v-model="dialogActive" transition="dialog-bottom-transition">
        <template v-slot:activator="{on, attr}">
            <slot v-bind="{on, attr}"></slot>
        </template>
        <template v-slot:default>
            <v-card rounded="0" style="background-color:#EEEEEE;">
                <div class="white">
                    <v-container>
                        <div class="d-flex align-center justify-space-between">
                            <span class="d-block text-h3 font-weight-light py-8 white text-uppercase"
                                  v-if="textContent">
                                {{ textContent }}
                            </span>
                            <span class="d-block text-h3 font-weight-light py-8 font-italic white grey--text" v-else>
                                Text eingeben...
                            </span>
                            <div>
                                <v-btn color="success" fab @click="onConfirm">
                                    <v-icon>check</v-icon>
                                </v-btn>
                                <v-btn color="error" fab class="ml-5" @click="onCancel">
                                    <v-icon>close</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </v-container>
                </div>
                <v-divider class="mb-10"></v-divider>
                <v-container>
                    <div class="d-flex align-center justify-center">
                        <div v-for="letter in firstRow" :key="letter" class="mx-3">
                            <v-btn outlined large class="letter" @click="addCharacter(letter)">{{ letter }}</v-btn>
                        </div>
                        <div class="mx-3">
                            <v-btn outlined class="letter" large>
                                <v-icon style="font-size:1.25rem;" @click="removeLastCharacter()">backspace</v-icon>
                            </v-btn>
                        </div>
                    </div>
                    <div class="d-flex align-center justify-center mt-6">
                        <div v-for="letter in secondRow" :key="letter" class="mx-3">
                            <v-btn outlined large class="letter" @click="addCharacter(letter)">{{ letter }}</v-btn>
                        </div>
                    </div>
                    <div class="d-flex align-center justify-center mt-6">
                        <div v-for="letter in thirdRow" :key="letter" class="mx-3">
                            <v-btn outlined large class="letter" @click="addCharacter(letter)">{{ letter }}</v-btn>
                        </div>
                    </div>
                    <div class="d-flex align-center justify-center mt-6">
                        <div v-for="letter in fourthRow" :key="letter" class="mx-3">
                            <v-btn outlined large class="letter" @click="addCharacter(letter)">{{ letter }}</v-btn>
                        </div>
                    </div>
                    <div class="d-flex align-center justify-center mt-6">
                        <v-btn outlined large @click="addCharacter(' ')"
                               style="width:450px;background:#fff;height:52px !important;font-size:1.1rem;">
                            SPACE
                        </v-btn>
                    </div>
                </v-container>
            </v-card>
        </template>
    </v-dialog>
</template>

<script lang="ts">
    import {Component, Emit, ModelSync, Vue} from 'vue-property-decorator';

    @Component
    export default class TextInput extends Vue {
        private readonly firstRow = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
        private readonly secondRow = ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Ü']
        private readonly thirdRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö', 'Ä']
        private readonly fourthRow = ['Y', 'X', 'C', 'V', 'B', 'N', 'M']

        @ModelSync('value', 'input')
        textContent!: string;

        private dialogActive = false;

        @Emit('input')
        private addCharacter(char: string): string {
            return this.textContent + char;
        }

        @Emit('input')
        private removeLastCharacter(): string {
            return this.textContent.slice(0, -1);
        }

        @Emit('confirm')
        private onConfirm(): string {
            this.dialogActive = false;
            return this.textContent;
        }

        @Emit('cancel')
        private onCancel(): void {
            this.dialogActive = false;
        }
    }
</script>

<style lang="scss" scoped>
    .letter {
        padding: 0 !important;
        width: 52px;
        height: 52px !important;
        font-size: 1.1rem;
        min-width: unset !important;
        background-color: #FFF;
    }
</style>
