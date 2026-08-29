type CSSLazyStyle = {
  readonly use: () => void
  readonly unuse: () => void
}

declare module '*.lazy.scss' {
  const style: CSSLazyStyle
  export default style
}
