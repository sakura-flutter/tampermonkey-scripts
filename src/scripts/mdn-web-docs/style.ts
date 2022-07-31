const stylesheet = `
/* 让搜索框一直展开 */
@media screen and (min-width: 1220px) {
  .header-search .search-input-field {
    width: inherit !important;
  }
}
`

const style = document.createElement('style')
style.appendChild(document.createTextNode(stylesheet))
document.head.appendChild(style)
