/* eslint-disable camelcase */

interface IToast {
  (options: string, duration?: number): void
  info(options: string, duration?: number): void
  success(options: string, duration?: number): void
  warning(options: string, duration?: number): void
  error(options: string, duration?: number): void
}

interface Window {
  Toast: IToast
}

declare const Toast: IToast
declare module '*.scss'

/* tampermonkey */
declare function GM_getValue<T>(name: string, defaultValue?: T): T
declare function GM_setValue<T>(name: string, value: T | null)
declare function GM_deleteValue(name: string)
