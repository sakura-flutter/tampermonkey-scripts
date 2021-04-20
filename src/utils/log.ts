const isDebug = process.env.NODE_ENV !== 'production'

function warn(...args: any[]): void {
  isDebug && console.warn(
    '%c      warn      ',
    'background: #ffa500; padding: 1px; color: #fff;',
    ...args,
  )
}

function table(...args: any[]): void {
  isDebug && console.table(...args)
}

export {
  warn,
  table,
}
