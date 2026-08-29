function continueExternalLink() {
  const modal = document.querySelector('.external-link-modal')?.closest('.d-modal')

  modal?.querySelector<HTMLButtonElement>('.d-modal__footer .btn-primary')?.click()
}

export const linuxDo = () => {
  new MutationObserver(continueExternalLink).observe(document.documentElement, {
    childList: true,
    subtree: true,
  })

  continueExternalLink()

  return {}
}
