import { ref } from 'vue'
import { $, $$ } from '@/utils/selector'
import { mountComponent } from '@/utils/mount-component'
import { warn } from '@/utils/log'
import './catalogue.scss'

export default class Catalogue {
  #scope = ''
  #cat = ref<{ id: HTMLElement['id']; text: string }[]>([])

  constructor({ scope }: { scope: string }) {
    this.#scope = scope
    this.#createUI()
  }

  update() {
    const els = this.#getElements()
    const cat = els.map(el => {
      const catItem = {
        id: el.id,
        text: '',
      }
      // 仅显示文本节点内容
      el.childNodes.forEach(node => {
        if (node.nodeName === '#text') {
          catItem.text += node.nodeValue
        }
      })
      catItem.text = catItem.text.trim()
      return catItem
    })
    warn(els, cat)
    this.#cat.value = cat
  }

  #getElements() {
    return [...$$(this.#scope)]
  }

  #createUI() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this

    mountComponent({
      setup() {
        function intoView(item: { id: HTMLElement['id'] }) {
          $('#' + item.id)?.scrollIntoView({ block: 'center' })
        }

        return () => (
          <div id="catalogue-js">
            <ul>
              {self.#cat.value.map(item => (
                <li key={item.id} title={item.text} onClick={() => intoView(item)}>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        )
      },
    })
  }
}
