import Previewer from './previewer'
import attachPixels from './pixels'

new Previewer('figure [role="presentation"] a img[width][height]', {
  includePathname: /^\/artworks\/(\w)+/,
})

attachPixels('figure [role="presentation"] a img[width][height]', {
  includePathname: /^\/artworks\/(\w)+/,
})
