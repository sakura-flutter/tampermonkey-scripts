const isDebug = process.env.NODE_ENV !== 'production'

function warn(...args: any[]) {
  isDebug && warn.force(...args)
}
warn.force = function (...args: any[]) {
  console.warn('%c      warn      ', 'background: #ffa500; padding: 1px; color: #fff;', ...args)
}

function error(...args: any[]) {
  isDebug && error.force(...args)
}
error.force = function (...args: any[]) {
  console.error('%c      error      ', 'background: red; padding: 1px; color: #fff;', ...args)
}

function table(...args: any[]): void {
  isDebug && console.table(...args)
}

export { warn, error, table }
