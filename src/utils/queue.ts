export default class Queue {
  private tasks: (() => Promise<unknown>)[]
  /** 同时进行任务数 默认 5 个 */
  private limit: number
  /** 当前执行数 */
  private count: number
  /** 任务数 */
  private tasksCount: number
  /** 已完成数 */
  private finishedCount: number

  constructor({ tasks, limit = 5 }: {
    tasks: Queue['tasks'],
    limit?: Queue['limit'],
  }) {
    this.tasks = [...tasks]
    this.limit = limit
    this.count = 0
    this.tasksCount = tasks.length
    this.finishedCount = 0
  }

  run(): Promise<void> {
    return new Promise(resolve => {
      if (this.tasksCount === 0) {
        resolve()
        return
      }

      const { tasks } = this
      const _run = function(this: Queue) {
        const idle = Math.min(tasks.length, this.limit - this.count)
        for (let i = 0; i < idle; i++) {
          this.count++
          const task = tasks.shift()!
          task().finally(() => {
            this.count--
            this.finishedCount++
            if (this.finishedCount < this.tasksCount) {
              _run()
            } else {
              resolve()
            }
          })
        }
      }.bind(this)

      _run()
    })
  }
}
