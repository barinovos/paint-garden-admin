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
