import { $ } from '@/utils/selector'
import * as readyState from '@/utils/ready-state'
import styles from './index.lazy.scss'

export const zhihuZhuanlan = ({ store, createControl }) => ({
  handler() {
    function execute() {
      readyState.DOMContentLoaded(() => {
        const process = new WeakSet()
        const observer = new MutationObserver(mutationsList => {
          mutationsList.forEach(mutation => {
            const { target, oldValue } = mutation
            if (
              process.has(target) ||
              target.tagName !== 'IMG' ||
              !oldValue.startsWith('data:image/') ||
              // 与知乎同样的选择器判断
              !(target.classList.contains('lazy') && !target.classList.contains('data-thumbnail'))
            ) return
            process.add(target)
            // 替换原图
            target.dataset.original && (target.src = target.dataset.original)
          })
        })
        observer.observe($('.Post-RichTextContainer'), { subtree: true, attributeFilter: ['src'], attributeOldValue: true })
      })

      styles.use()
    }

    createControl({ store, execute })
  },
})
