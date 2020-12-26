export interface LiquidStorage<T> {
    0: T,
    1: T,
    2: T,
    3: T
}

export interface Liquid {
    id: number,
    name: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LiquidStoragePosition = keyof LiquidStorage<any>;
