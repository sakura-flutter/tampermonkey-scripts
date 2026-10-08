import { describe, expect, it } from 'vite-plus/test'
import Queue from '../queue'

describe('Queue', () => {
  it('支持单个和批量入队，并正确报告队列长度', async () => {
    const queue = new Queue({ limit: 2 })
    const task = async () => undefined

    expect(queue.size).toBe(0)
    expect(queue.enqueue(task)).toBe(queue)
    expect(queue.enqueue([task, task])).toBe(queue)
    expect(queue.size).toBe(3)

    await queue.run()
    expect(queue.size).toBe(0)
  })

  it('空队列执行时不运行任何任务', async () => {
    await expect(new Queue().run()).resolves.toBeUndefined()
  })

  it('最多同时执行配置数量的任务，并在空出位置后继续补充任务', async () => {
    const queue = new Queue({ limit: 2 })
    const started: string[] = []
    const resolvers: Array<() => void> = []
    let active = 0
    let maximumActive = 0

    const task = (name: string) => () => {
      started.push(name)
      active++
      maximumActive = Math.max(maximumActive, active)
      return new Promise<void>(resolve => {
        resolvers.push(() => {
          active--
          resolve()
        })
      })
    }

    queue.enqueue([task('first'), task('second'), task('third'), task('fourth')])
    const running = queue.run()

    expect(started).toEqual(['first', 'second'])
    expect(queue.size).toBe(2)

    resolvers.shift()!()
    await Promise.resolve()
    await Promise.resolve()
    expect(started).toEqual(['first', 'second', 'third'])

    resolvers.shift()!()
    await Promise.resolve()
    await Promise.resolve()
    expect(started).toEqual(['first', 'second', 'third', 'fourth'])

    resolvers.shift()!()
    resolvers.shift()!()
    await running

    expect(maximumActive).toBe(2)
    expect(active).toBe(0)
    expect(queue.size).toBe(0)
  })

  it('默认最多同时执行三个任务', async () => {
    const queue = new Queue()
    const started: string[] = []
    const resolvers: Array<() => void> = []
    let active = 0
    let maximumActive = 0

    const task = (name: string) => () => {
      started.push(name)
      active++
      maximumActive = Math.max(maximumActive, active)
      return new Promise<void>(resolve => {
        resolvers.push(() => {
          active--
          resolve()
        })
      })
    }

    queue.enqueue([task('first'), task('second'), task('third'), task('fourth')])
    const running = queue.run()

    expect(started).toEqual(['first', 'second', 'third'])
    expect(queue.size).toBe(1)

    resolvers.splice(0, 3).forEach(resolve => resolve())
    await Promise.resolve()
    await Promise.resolve()
    expect(started).toEqual(['first', 'second', 'third', 'fourth'])

    resolvers.shift()!()
    await running
    expect(maximumActive).toBe(3)
  })
})
