/**
 * 跨 iframe 传递的统一命令协议。
 *
 * 不区分同源 / 跨域：父实例与各级 iframe 实例之间一律通过 postMessage 下发命令，
 * 由各实例在自己的文档内执行（或继续向下 relay）。
 */
export type Command =
  | { type: 'setRate'; rate: number }
  | { type: 'seek'; direction: 1 | -1 }
  | { type: 'boostStart'; rate: number; key: string }
  | { type: 'boostEnd' }
  | { type: 'seekStart'; direction: 1 | -1; key: string }
  | { type: 'seekEnd' }
  | { type: 'cancel' }

export interface CommandMessage {
  readonly __pbCmd: true
  readonly cmd: Command
}

export function isCommandMessage(data: unknown): data is CommandMessage {
  return (
    typeof data === 'object' &&
    data !== null &&
    (data as { __pbCmd?: unknown }).__pbCmd === true &&
    typeof (data as { cmd?: unknown }).cmd === 'object'
  )
}
