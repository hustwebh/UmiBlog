// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
interface LifeCycles {
    bootstrap?: (props?: any) => Promise<any>
    mount?: (props?: any) => Promise<any>
    unmount?: (props?: any) => Promise<any>
    update?: (props?: any) => Promise<any>
}
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T)
interface SlaveOption extends LifeCycles {
    enable?: boolean
}
interface Config {
    slave?: SlaveOption
}
export interface IRuntimeConfig {
    qiankun?: XOR<Config, LifeCycles>
}
