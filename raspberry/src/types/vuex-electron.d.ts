declare module 'vuex-electron' {
    import {Plugin} from 'vuex';

    type MutationFilter = (mutation: string) => boolean;

    export interface CreatePersistedStateOption {
        whitelist: string[] | MutationFilter,
        blacklist: string[] | MutationFilter
    }

    export function createPersistedState<S>(options?: CreatePersistedStateOption): Plugin<S>;
    export function createSharedMutations<S>(): Plugin<S>;
}
