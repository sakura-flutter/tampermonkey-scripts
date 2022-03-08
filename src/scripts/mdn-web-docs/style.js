const stylesheet = `
header.top-navigation {
  position: sticky;/* 顶部吸顶 */
  top: 0;
}

#sidebar-quicklinks {
  position: sticky;
  top: 65px;
  max-height: calc(100vh - 65px);/* 减去顶部高度 */
}

.toc > .document-toc-container {
  top: 7.1rem !important;
}
`

const style = document.createElement('style')
style.appendChild(document.createTextNode(stylesheet))
document.head.appendChild(style)
