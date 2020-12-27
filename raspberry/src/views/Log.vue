<template>
    <v-data-table :headers="headers" :items="messages" show-expand item-key="timestamp"
                  no-data-text="Keine Logs gefunden" single-expand sort-by="timestamp" :sort-desc="true" class="mx-5"
                  height="380px" fixed-header>
        <template v-slot:item.timestamp="{item}">
            <span>{{ formatDate(item.timestamp) }}</span>
        </template>
        <template v-slot:expanded-item="{item, headers}">
            <td :colspan="headers.length">
                <pre v-if="item.stacktrace" class="py-4" style="width:942px;overflow-x:scroll;">{{
                        item.stacktrace
                    }}</pre>
                <span v-else class="font-italic">Kein Stacktrace vorhanden</span>
            </td>
        </template>
        <template v-slot:top>
            <div class="d-flex align-center px-4 py-2">
                <span class="text-h6">Logs</span>
                <v-spacer></v-spacer>
                <v-btn text color="warning" @click="triggerError">Test Error</v-btn>
                <v-btn text color="warning" @click="triggerException">Test Exception</v-btn>
                <v-btn @click="deleteAllLogs" depressed color="error">Alle löschen</v-btn>
            </div>
        </template>
    </v-data-table>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {getModule} from 'vuex-module-decorators';
    import {LogMessage, LogModule} from '@/store/modules/LogModule';
    import {DataTableHeader} from 'vuetify';

    @Component
    export default class Log extends Vue {
        private readonly logModule = getModule(LogModule, this.$store);
        private readonly headers: DataTableHeader[] = [
            {
                text: 'Zeit',
                value: 'timestamp',
                sortable: false
            },
            {
                text: 'Nachricht',
                value: 'message',
                sortable: false
            },
            {
                text: '',
                value: 'data-table-expand'
            }
        ];

        private get messages(): LogMessage[] {
            return this.logModule.messages;
        }

        // eslint-disable-next-line class-methods-use-this
        private formatDate(timestamp: number): string {
            const date = new Date(timestamp);

            // eslint-disable-next-line prefer-template
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString('de-DE');
        }

        private deleteAllLogs() {
            this.logModule.deleteAll();
        }

        // eslint-disable-next-line class-methods-use-this
        private triggerError() {
            throw new Error('Im done with this shit');
        }

        // eslint-disable-next-line class-methods-use-this
        private triggerException() {
            Promise.reject(new Error('Promise handling herst'));
        }
    }
</script>

<style>
    .v-data-table > .v-data-table__wrapper tbody tr.v-data-table__expanded__content {
        box-shadow: inset 0 4px 8px -7px rgba(50, 50, 50, 0.5), inset 0 -4px 8px -6px rgba(50, 50, 50, 0.5) !important;
        background: #f8f8f8;
    }
</style>
