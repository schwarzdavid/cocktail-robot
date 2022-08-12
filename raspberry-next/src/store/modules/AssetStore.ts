import {defineStore} from 'pinia';

export type AssetPosition = null | string
export type AssetPositions = [AssetPosition, AssetPosition, AssetPosition, AssetPosition]

export interface AssetStoreState {
    liquors: AssetPositions,
    softdrinks: AssetPositions
}

export const useAssetStore = defineStore('asset', {
    state: (): AssetStoreState => ({
        liquors: [null, null, null, null],
        softdrinks: [null, null, null, null]
    })
})
