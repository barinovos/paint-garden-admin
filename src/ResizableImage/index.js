import React from 'react'
import PropTypes from 'prop-types'
import api from '../utils/api'
import { calcSizeWithZoom, reCalcSizeWithZoom } from '../utils/calcZoom'
import colors from '../constants/colors'
import { Rnd } from 'react-rnd'

const ResizableImage = ({ item, onSelect, selectedItemId, zoomLevel, onResize }) => {
  const height = calcSizeWithZoom(item.height, zoomLevel)
  const width = calcSizeWithZoom(item.width, zoomLevel)
  const x = calcSizeWithZoom(item.x, zoomLevel)
  const y = calcSizeWithZoom(item.y, zoomLevel)

  const onResizeStop = (e, direction, ref, d) =>
    onResize(item.id, {
      width: reCalcSizeWithZoom(width + d.width, zoomLevel),
      height: reCalcSizeWithZoom(height + d.height, zoomLevel),
      x: item.x,
      y: item.y,
    })

  return (
    <Rnd
      style={{
        background: `url(${api.getImageUrl(item.path)}) no-repeat`,
        backgroundSize: 'contain',
        margin: 0,
        height: '100%',
        resize: 'both',
        border: selectedItemId === item.id ? `2px dashed ${colors.darkGrey}` : 'none',
        position: 'absolute',
      }}
      size={{ width, height }}
      position={{ x, y }}
      maxWidth={width * 3}
      maxHeight={height * 3}
      minHeight={height / 3}
      minWidth={width / 3}
      lockAspectRatio={true}
      onClick={() => onSelect(item.id)}
      dragAxis={'none'}
      bounds="window"
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
