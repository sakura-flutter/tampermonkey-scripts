const isDebug = process.env.NODE_ENV !== 'production'

function warn(...args: any[]): void {
  isDebug && console.warn(...args)
}

function table(...args: any[]): void {
  isDebug && console.table(...args)
}

export {
  warn,
  table,
}
