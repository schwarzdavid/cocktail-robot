import {Module, Mutation, VuexModule} from 'vuex-module-decorators';

export interface LogMessage {
    message: string,
    stacktrace?: string,
    timestamp: number
}

export interface LogModuleState {
    messages: LogMessage[]
}

@Module({
    name: 'log'
})
export class LogModule extends VuexModule implements LogModuleState {
    messages: LogMessage[] = [];

    @Mutation
    addMessage(message: string | Error) {
        const logMessage: LogMessage = {
            message: '',
            timestamp: Date.now()
        };

        if (message instanceof Error) {
            logMessage.message = message.message;
            logMessage.stacktrace = message.stack;
        } else {
            logMessage.message = message;
        }

        this.messages.push(logMessage);
    }

    @Mutation
    deleteAll() {
        this.messages = [];
    }
}
