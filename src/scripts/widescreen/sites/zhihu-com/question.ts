import { $ } from '@/utils/selector'
import * as readyState from '@/utils/ready-state'
import styles from './question.lazy.scss'
import type { Site } from '../../types'

export const zhihuQuestion:Site['use'] = ({ store, createControl }) => ({
  handler() {
    function execute() {
      readyState.DOMContentLoaded(() => {
        const process = new WeakSet()
        const observer = new MutationObserver(mutationsList => {
          mutationsList.forEach(mutation => {
            const { target, oldValue } = mutation as unknown as {
              target: HTMLImageElement,
              oldValue: string
            }
            if (
              process.has(target) ||
              target.tagName !== 'IMG' ||
              !oldValue.startsWith('data:image/') ||
              // 不对非文章图片处理
              !$('.ListShortcut')!.contains(target) ||
              // 与知乎同样的选择器判断
              !(target.classList.contains('lazy') && !target.classList.contains('data-thumbnail'))
            ) return
            process.add(target)
            // 替换原图
            target.dataset.original && (target.src = target.dataset.original)
          })
        })
        // 查看全部回答时知乎会替换Question-mainColumn标签，只能往更父级监听
        observer.observe($('.QuestionPage')!, { subtree: true, attributeFilter: ['src'], attributeOldValue: true })
      })

      styles.use()
    }

    createControl({ store, execute })
  },
})
