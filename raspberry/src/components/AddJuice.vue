<template>
    <v-dialog max-width="500" v-model="dialogVisible">
        <template v-slot:activator="{on, attr}">
            <slot v-bind="{on, attr}"></slot>
        </template>
        <template v-slot:default>
            <v-card>
                <v-app-bar color="primary" flat dark>
                    <v-toolbar-title>Mischgetränk</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <span class="text-right" style="color:rgba(255,255,255,.87);font-size:.9rem;">
                        Min: {{ min }}ml<br>
                        Max: {{ max }}ml
                    </span>
                </v-app-bar>
                <v-card-text class="pt-5">
                    <div class="d-flex align-center justify-space-between">
                        <span class="text-h6">{{ label }}:</span>
                        <v-text-field readonly outlined hide-details dense :value="valueWorkingCopy" suffix="ml"
                                      style="width:80px;flex-grow:0;pointer-events:none;"></v-text-field>
                    </div>
                    <v-divider class="my-7"></v-divider>
                    <div class="d-flex align-center justify-space-between">
                        <v-btn outlined color="primary" @click="valueWorkingCopy=min"
                               :disabled="valueWorkingCopy===min">Min
                        </v-btn>
                        <v-btn outlined color="primary" @click="valueWorkingCopy-=50"
                               :disabled="valueWorkingCopy - 50 < min">-50
                        </v-btn>
                        <v-btn outlined color="primary" @click="valueWorkingCopy-=10"
                               :disabled="valueWorkingCopy - 10 < min">-10
                        </v-btn>
                        <v-btn outlined color="primary" @click="valueWorkingCopy+=10"
                               :disabled="valueWorkingCopy + 10 > max">+10
                        </v-btn>
                        <v-btn outlined color="primary" @click="valueWorkingCopy+=50"
                               :disabled="valueWorkingCopy + 50 > max">+50
                        </v-btn>
                        <v-btn outlined color="primary" @click="valueWorkingCopy=max"
                               :disabled="valueWorkingCopy===max">Max
                        </v-btn>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text large @click="dialogVisible=false">Abbrechen</v-btn>
                    <v-btn color="primary" large @click="onSave">Speichern</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';

    @Component
    export default class JuiceEdit extends Vue {
        @Prop()
        private readonly label!: string;

        @Prop()
        private readonly max!: number;

        @Prop({
            default: 10
        })
        private readonly min!: number;

        @Prop()
        private readonly value?: number;

        private valueWorkingCopy = this.min;
        private dialogVisible = false;

        mounted() {
            this.onValueChange();
        }

        @Watch('value')
        onValueChange() {
            if (typeof this.value === 'number') {
                this.valueWorkingCopy = this.value;
            }
        }

        @Watch('dialogVisible')
        onVisibilityChange() {
            if (this.dialogVisible) {
                this.valueWorkingCopy = this.min;
                this.onValueChange();
            }
        }

        @Emit('save')
        onSave(): number {
            this.dialogVisible = false;
            return this.valueWorkingCopy;
        }
    }
</script>
