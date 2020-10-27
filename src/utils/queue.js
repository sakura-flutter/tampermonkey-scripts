export default class Queue {
  // 默认同时进行5个任务
  constructor({ tasks, limit = 5 }) {
    this._tasks = [...tasks]
    this._limit = limit
    // 当前执行数
    this._count = 0
    // 任务数
    this._tasksCount = tasks.length
    // 已完成数
    this._finishedCount = 0
  }

  run() {
    return new Promise(resolve => {
      if (this._tasksCount === 0) {
        resolve()
        return
      }

      const { _tasks } = this
      const _run = function() {
        const idle = Math.min(_tasks.length, this._limit - this._count)
        for (let i = 0; i < idle; i++) {
          this._count++
          const task = _tasks.shift()
          task().finally(() => {
            this._count--
            this._finishedCount++
            if (this._finishedCount < this._tasksCount) {
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
