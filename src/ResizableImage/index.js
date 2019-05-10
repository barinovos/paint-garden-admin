import React from 'react'
import PropTypes from 'prop-types'
import Resizable from 're-resizable'
import api from '../utils/api'
import { calcSizeWithZoom, reCalcSizeWithZoom } from '../utils/calcZoom'
import colors from '../constants/colors'

const ResizableImage = ({ item, onSelect, selectedItemId, zoomLevel, onResize }) => {
  const height = calcSizeWithZoom(item.height, zoomLevel)
  const width = calcSizeWithZoom(item.width, zoomLevel)
  const x = calcSizeWithZoom(item.x, zoomLevel)
  const y = calcSizeWithZoom(item.y, zoomLevel)
  const onResizeStop = (e, direction, ref, d) =>
    onResize(item.id, {
      ...item,
      width: reCalcSizeWithZoom(width + d.width),
      height: reCalcSizeWithZoom(height + d.height),
    })

  return (
    <Resizable
      defaultSize={{ width, height }}
      style={{
        background: `url(${api.getImageUrl(item.path)})`,
        backgroundSize: 'contain',
        top: y,
        left: x,
        border: selectedItemId === item.id ? `2px dashed ${colors.darkGrey}` : 'none',
        position: 'absolute',
      }}
      maxWidth={width * 3}
      maxHeight={height * 3}
      minHeight={height / 3}
      minWidth={width / 3}
      lockAspectRatio={true}
      onClick={() => onSelect(item.id)}
      onResizeStop={onResizeStop}
    />
  )
}

ResizableImage.propTypes = {
  item: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  selectedItemId: PropTypes.string,
  zoomLevel: PropTypes.number,
  onResize: PropTypes.func,
}

export default ResizableImage
