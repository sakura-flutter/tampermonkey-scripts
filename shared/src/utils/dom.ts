export function parseToDOM(str: string | null): NodeListOf<ChildNode> {
  const div = document.createElement('div')
  if (typeof str === 'string') {
    div.innerHTML = str
  }

  return div.childNodes
}
