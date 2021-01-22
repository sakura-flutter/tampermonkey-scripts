export function parseToDOM(str) {
  const div = document.createElement('div')
  if (typeof str === 'string') {
    div.innerHTML = str
  }

  return div.childNodes
}
