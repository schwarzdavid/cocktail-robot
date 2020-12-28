import {Vue} from 'vue-property-decorator';
import {getModule} from 'vuex-module-decorators';
import {LogModule} from '@/store/modules/LogModule';
import {store} from '@/store';

const logModule = getModule(LogModule, store);

export function registerErrorHandler() {
    window.addEventListener('error', event => {
        event.preventDefault();
        event.stopPropagation();
        logModule.addMessage(event.error);
        console.error(event.error);
    });

    window.addEventListener('unhandledrejection', event => {
        event.preventDefault();
        event.stopPropagation();
        logModule.addMessage(event.reason);
        console.error(event.reason);
    });

    Vue.config.errorHandler = (err, vm, info) => {
        console.error(err, vm, info);
        logModule.addMessage(err);
    };
}
