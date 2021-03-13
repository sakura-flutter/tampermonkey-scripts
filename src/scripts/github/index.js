import { $ } from '@/utils/selector'

function insert1sButton() {
  const actions = $('.pagehead-actions')
  if (actions == null || $('#github1s-button')) return

  const btnHTML = '<li><a id="github1s-button" class="btn btn-sm" target="_blank">Github1s</a></li>'
  actions.insertAdjacentHTML('afterBegin', btnHTML)
  $('#github1s-button').onmouseenter = function() {
    const github1sURL = new URL(location)
    github1sURL.host = 'github1s.com'
    this.href = github1sURL.href
  }
}

insert1sButton()
window.addEventListener('urlchange', info => {
  setTimeout(insert1sButton, 200)
})
