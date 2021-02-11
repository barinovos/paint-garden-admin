import Constants from '../constants'

export const calcSizeWithZoom = (val, zoomLevel) =>
  zoomLevel > 0
    ? Math.floor(val * (1 + zoomLevel * Constants.ZOOM_MULTIPLIER))
    : zoomLevel < 0
    ? Math.floor(val / (1 + Constants.ZOOM_MULTIPLIER * -zoomLevel))
    : val

export const reCalcSizeWithZoom = (val, zoomLevel) =>
  zoomLevel > 0
    ? Math.floor(val / (1 + zoomLevel * Constants.ZOOM_MULTIPLIER))
    : zoomLevel < 0
    ? Math.floor(val * (1 + Constants.ZOOM_MULTIPLIER * -zoomLevel))
    : val

export const percentCalc = (val, percent) => val * parseFloat(`0.${percent}`)

export const getPosition = (posY, posX, zoom) => {
  const windowHeight = window.innerHeight
  const windowWidth = window.innerWidth
  const centerWidth = percentCalc(windowWidth, 50)
  const centerHeight = percentCalc(windowHeight, 50)
  let top = 0
  let left = 0

  if (zoom === 0) {
    if (posY > centerHeight && posX > centerWidth) {
      top = centerHeight - posY
      left = centerWidth - posX
      return { top, left }
    } else if (posY < centerHeight && posX < centerWidth) {
      return { top, left }
    } else if (posY < centerHeight && posX > centerWidth) {
      top = centerHeight - posY
      left = centerWidth - posX
      return { top, left }
    } else if (posY > centerHeight && posX < centerWidth) {
      top = centerHeight - posY
      left = centerWidth - posX
      return { top, left }
    } else {
      return { top, left }
    }
  } else {
    if (posY > calcSizeWithZoom(centerHeight, zoom) && posX > calcSizeWithZoom(centerWidth, zoom)) {
      top = centerHeight - calcSizeWithZoom(posY, zoom)
      left = centerWidth - calcSizeWithZoom(posX, zoom)
      return { top, left }
    } else if (posY < calcSizeWithZoom(centerHeight, zoom) && posX < calcSizeWithZoom(centerWidth, zoom)) {
      top = centerHeight - calcSizeWithZoom(posY, zoom)
      left = centerWidth - calcSizeWithZoom(posX, zoom)
      return { top, left }
    } else if (posY < calcSizeWithZoom(centerHeight, zoom) && posX > calcSizeWithZoom(centerWidth, zoom)) {
      top = centerHeight - calcSizeWithZoom(posY, zoom)
      left = centerWidth - calcSizeWithZoom(posX, zoom)
      return { top, left }
    } else if (posY > calcSizeWithZoom(centerHeight, zoom) && posX < calcSizeWithZoom(centerWidth, zoom)) {
      top = centerHeight - calcSizeWithZoom(posY, zoom)
      left = centerWidth - calcSizeWithZoom(posX, zoom)
      return { top, left }
    } else {
      return { top, left }
    }
  }
}
