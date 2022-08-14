export default class Queue {
  private tasks: (() => Promise<unknown>)[] = []
  /** 同时进行任务数 默认 3 个 */
  private limit: number
  /** 当前执行数 */
  private count = 0

  constructor({ limit = 3 }: {
    limit?: Queue['limit'],
  } = {}) {
    this.limit = limit
  }

  /** 任务数 */
  get size() {
    return this.tasks.length
  }

  enqueue(tasks: Queue['tasks'][number] | Queue['tasks']): this {
    if (Array.isArray(tasks)) {
      this.tasks.push(...tasks)
    } else {
      this.tasks.push(tasks)
    }
    return this
  }

  run(): Promise<void> {
    return new Promise(resolve => {
      if (this.size === 0) {
        resolve()
        return
      }

      const { tasks } = this
      const _run = function(this: Queue) {
        const idle = Math.min(this.size, this.limit - this.count)
        for (let i = 0; i < idle; i++) {
          this.count++
          const task = tasks.shift()!
          task().finally(() => {
            this.count--
            if (this.size > 0) {
              _run()
              // fix: 队列为空且当前执行的任务也为空才是结束状态
            } else if (this.size === 0 && this.count === 0) {
              resolve()
            }
          })
        }
      }.bind(this)

      _run()
    })
  }
}
