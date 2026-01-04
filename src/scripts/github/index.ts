import { $ } from '@/utils/selector'

function insert1sButton() {
  const actions = $('.pagehead-actions')
  if (actions == null || $('#github1s-button')) return

  const btnHTML = `<li>
    <a id="github1s-button" class="btn btn-sm" target="_blank">
      <img src="https://github1s.com/favicon-light.svg" alt="" height="16" width="16" class="v-align-text-bottom d-inline-block mr-2" style="vertical-align: text-bottom;">
      <span class="d-inline">GitHub1s</span>
    </a>
  </li>`
  actions.insertAdjacentHTML('afterbegin', btnHTML)
    ; ($('#github1s-button') as HTMLAnchorElement).onmouseenter = function (this: HTMLAnchorElement) {
      const github1sURL = new URL(location.href)
      github1sURL.host = 'github1s.com'
      this.href = github1sURL.href
    } as any
}

insert1sButton()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
window.addEventListener('urlchange', info => {
  setTimeout(insert1sButton, 200)
})
