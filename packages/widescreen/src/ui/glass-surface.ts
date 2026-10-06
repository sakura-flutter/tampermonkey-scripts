const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'

export interface GlassSurfaceOptions {
  borderRadius: number
  borderWidth: number
  brightness: number
  opacity: number
  blur: number
  displace: number
  backgroundOpacity: number
  saturation: number
  distortionScale: number
  redOffset: number
  greenOffset: number
  blueOffset: number
  xChannel: 'R' | 'G' | 'B' | 'A'
  yChannel: 'R' | 'G' | 'B' | 'A'
  mixBlendMode: string
}

const defaultOptions: GlassSurfaceOptions = {
  borderRadius: 20,
  borderWidth: 0.07,
  brightness: 50,
  opacity: 0.93,
  blur: 11,
  displace: 0,
  backgroundOpacity: 0,
  saturation: 1,
  distortionScale: -180,
  redOffset: 0,
  greenOffset: 10,
  blueOffset: 20,
  xChannel: 'R',
  yChannel: 'G',
  mixBlendMode: 'difference',
}

let surfaceId = 0

export function mountGlassSurface(element: HTMLElement, options: Partial<GlassSurfaceOptions> = {}): () => void {
  const settings = { ...defaultOptions, ...options }
  const filterId = `widescreen-glass-filter-${surfaceId++}`
  const filter = createFilter(filterId)
  const supported = supportsSvgBackdropFilter(filterId)

  element.classList.add('glass-surface')
  element.classList.toggle('glass-surface--svg', supported)
  element.classList.toggle('glass-surface--fallback', !supported)
  element.style.setProperty('--glass-frost', String(settings.backgroundOpacity))
  element.style.setProperty('--glass-saturation', String(settings.saturation))

  if (!supported) return () => removeGlassSurface(element)

  element.prepend(filter.svg)
  const updateFilter = () => updateFilterMap(filter, element, settings)
  const resizeObserver = new ResizeObserver(updateFilter)
  resizeObserver.observe(element)
  updateFilter()

  return () => {
    resizeObserver.disconnect()
    filter.svg.remove()
    removeGlassSurface(element)
  }
}

function removeGlassSurface(element: HTMLElement) {
  element.classList.remove('glass-surface', 'glass-surface--svg', 'glass-surface--fallback')
  element.style.removeProperty('--glass-frost')
  element.style.removeProperty('--glass-saturation')
  element.style.removeProperty('--filter-id')
}

function createFilter(filterId: string) {
  const svg = document.createElementNS(SVG_NAMESPACE, 'svg')
  svg.classList.add('glass-filter')
  svg.setAttribute('aria-hidden', 'true')
  svg.setAttribute('focusable', 'false')

  const defs = document.createElementNS(SVG_NAMESPACE, 'defs')
  const filter = document.createElementNS(SVG_NAMESPACE, 'filter')
  filter.id = filterId
  filter.setAttribute('color-interpolation-filters', 'sRGB')
  filter.setAttribute('x', '0%')
  filter.setAttribute('y', '0%')
  filter.setAttribute('width', '100%')
  filter.setAttribute('height', '100%')

  const image = document.createElementNS(SVG_NAMESPACE, 'feImage')
  image.setAttribute('x', '0')
  image.setAttribute('y', '0')
  image.setAttribute('width', '100%')
  image.setAttribute('height', '100%')
  image.setAttribute('preserveAspectRatio', 'none')
  image.setAttribute('result', 'map')

  const channels = ['red', 'green', 'blue'].map(channel => {
    const displacement = document.createElementNS(SVG_NAMESPACE, 'feDisplacementMap')
    displacement.id = `${filterId}-${channel}`
    displacement.setAttribute('in', 'SourceGraphic')
    displacement.setAttribute('in2', 'map')
    displacement.setAttribute('result', `disp-${channel}`)

    const matrix = document.createElementNS(SVG_NAMESPACE, 'feColorMatrix')
    matrix.setAttribute('type', 'matrix')
    matrix.setAttribute(
      'values',
      channel === 'red'
        ? '1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'
        : channel === 'green'
          ? '0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0'
          : '0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0',
    )
    matrix.setAttribute('in', `disp-${channel}`)
    matrix.setAttribute('result', channel)
    filter.append(displacement, matrix)
    return displacement
  })

  const redGreen = document.createElementNS(SVG_NAMESPACE, 'feBlend')
  redGreen.setAttribute('in', 'red')
  redGreen.setAttribute('in2', 'green')
  redGreen.setAttribute('mode', 'screen')
  redGreen.setAttribute('result', 'rg')

  const output = document.createElementNS(SVG_NAMESPACE, 'feBlend')
  output.setAttribute('in', 'rg')
  output.setAttribute('in2', 'blue')
  output.setAttribute('mode', 'screen')
  output.setAttribute('result', 'output')

  const blur = document.createElementNS(SVG_NAMESPACE, 'feGaussianBlur')
  blur.setAttribute('in', 'output')
  blur.setAttribute('stdDeviation', '0')

  filter.prepend(image)
  filter.append(redGreen, output, blur)
  defs.append(filter)
  svg.append(defs)

  return { svg, image, channels, blur }
}

function updateFilterMap(filter: ReturnType<typeof createFilter>, element: HTMLElement, settings: GlassSurfaceOptions) {
  const rect = element.getBoundingClientRect()
  const width = Math.max(1, rect.width)
  const height = Math.max(1, rect.height)
  const edgeSize = Math.min(width, height) * (settings.borderWidth * 0.5)
  const map = `
    <svg viewBox="0 0 ${width} ${height}" xmlns="${SVG_NAMESPACE}">
      <defs>
        <linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#0000" />
          <stop offset="100%" stop-color="red" />
        </linearGradient>
        <linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0000" />
          <stop offset="100%" stop-color="blue" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="black" />
      <rect width="${width}" height="${height}" rx="${settings.borderRadius}" fill="url(#red)" />
      <rect width="${width}" height="${height}" rx="${settings.borderRadius}" fill="url(#blue)" style="mix-blend-mode:${settings.mixBlendMode}" />
      <rect x="${edgeSize}" y="${edgeSize}" width="${Math.max(1, width - edgeSize * 2)}" height="${Math.max(1, height - edgeSize * 2)}" rx="${settings.borderRadius}" fill="hsl(0 0% ${settings.brightness}% / ${settings.opacity})" style="filter:blur(${settings.blur}px)" />
    </svg>
  `

  filter.image.setAttribute('href', `data:image/svg+xml,${encodeURIComponent(map)}`)
  filter.channels.forEach((channel, index) => {
    const offset = [settings.redOffset, settings.greenOffset, settings.blueOffset][index]
    channel.setAttribute('scale', String(settings.distortionScale + offset))
    channel.setAttribute('xChannelSelector', settings.xChannel)
    channel.setAttribute('yChannelSelector', settings.yChannel)
  })
  filter.blur.setAttribute('stdDeviation', String(settings.displace))
  element.style.setProperty('--filter-id', `url(#${filter.svg.querySelector('filter')?.id})`)
}

function supportsSvgBackdropFilter(filterId: string) {
  const userAgent = navigator.userAgent
  const isWebkit = /Safari/.test(userAgent) && !/Chrome/.test(userAgent)
  const isFirefox = /Firefox/.test(userAgent)

  if (isWebkit || isFirefox) return false

  const probe = document.createElement('div')
  probe.style.backdropFilter = `url(#${filterId})`
  return probe.style.backdropFilter !== ''
}
