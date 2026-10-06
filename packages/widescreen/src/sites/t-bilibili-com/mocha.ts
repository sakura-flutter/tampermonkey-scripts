import styles from './mocha.lazy.scss'
import { strawberry } from './strawberry'
import type { PageContext } from '../../core/types'

const MOCHA_ID = '212535360'

export async function activateMochaGift(context: PageContext, mode: 'opus' | 'space') {
  const body = await context.waitFor('body')
  if (!(body instanceof HTMLElement) || context.signal.aborted) return

  if (mode === 'opus') {
    const author = await context.waitFor('.opus-module-author, .main-content .user-name a[href]')
    if (!(author instanceof HTMLElement) || context.signal.aborted) return

    const uploader = author instanceof HTMLAnchorElement ? author : author.querySelector<HTMLAnchorElement>('a[href]')

    if (!uploader) {
      const marker = `"uid":"${MOCHA_ID}"`
      const state = (window as typeof window & { __INITIAL_STATE__?: unknown }).__INITIAL_STATE__
      const serializedState = state ? JSON.stringify(state) : ''
      const hasMatchingState =
        serializedState.includes(marker) ||
        Array.from(document.scripts).some(script => script.textContent?.includes(marker))
      if (!hasMatchingState) return
    }

    if (uploader) {
      let uploaderPath: string
      try {
        uploaderPath = new URL(uploader.href, location.href).pathname
      } catch {
        return
      }

      const segments = uploaderPath.split('/').filter(Boolean)
      if (segments[segments.length - 1] !== MOCHA_ID) return
    }
  }

  if (context.signal.aborted || body.querySelector('.mocha-strawberry')) return

  const template = document.createElement('template')
  template.innerHTML = strawberry
  const gift = template.content.firstElementChild
  if (!gift) return

  styles.use()
  body.append(gift)
  context.onBeforeDispose(() => {
    gift.remove()
    styles.unuse()
  })
}
