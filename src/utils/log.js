const isDebug = process.env.NODE_ENV !== 'production'

function warn(...args) {
  isDebug && console.warn(...args)
}

function table(...args) {
  isDebug && console.table(...args)
}

export {
  warn,
  table,
}
