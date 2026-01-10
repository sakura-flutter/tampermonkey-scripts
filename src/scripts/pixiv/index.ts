import Previewer from './previewer'
import attachPixels from './pixels'

// eslint-disable-next-line no-new
new Previewer('figure [role="presentation"] a img[width][height]', {
  includePathname: /^\/artworks\/(\w)+/,
})

attachPixels('figure [role="presentation"] a img[width][height]', {
  includePathname: /^\/artworks\/(\w)+/,
})
