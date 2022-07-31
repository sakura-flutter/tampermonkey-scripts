import { type ToastApi } from '@/helpers/toast'

type CSSLazyClasses = {
  readonly use(): void
  readonly unuse(): void
}

declare global {
  interface Window {
    Toast: ToastApi
  }

  const Toast: ToastApi

  module '*.lazy.scss' {
    const classes: CSSLazyClasses
    export default classes
  }
  module '*.scss' {
    const css: string
    export default css
  }
}
