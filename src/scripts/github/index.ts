import { $ } from '@/utils/selector'

function insert1sButton() {
  const actions = $('.pagehead-actions')
  if (actions == null || $('#github1s-button')) return

  const btnHTML = '<li><a id="github1s-button" class="btn btn-sm" target="_blank">GitHub1s</a></li>'
  actions.insertAdjacentHTML('afterbegin', btnHTML)
  ;($('#github1s-button') as HTMLAnchorElement).onmouseenter = function(this: HTMLAnchorElement) {
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
