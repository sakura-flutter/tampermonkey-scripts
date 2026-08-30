function openExternalLink(event: MouseEvent) {
  const target = event.target
  if (!(target instanceof Element)) return

  const link = target.closest<HTMLAnchorElement>('a.normal-external-link-icon[href]')
  if (!link) return

  event.stopImmediatePropagation()
  event.preventDefault()
  window.open(link.href)
}

export const linuxDo = () => {
  document.addEventListener('click', openExternalLink, true)
}
