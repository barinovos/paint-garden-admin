import React from 'react'
import PropTypes from 'prop-types'
import { calcSizeWithZoom, reCalcSizeWithZoom } from '../utils/calcZoom'
import colors from '../constants/colors'
import { Rnd } from 'react-rnd'

const ResizableImage = ({ item, onSelect, selectedItemId, zoomLevel, onResize, onDrop }) => {
  const height = calcSizeWithZoom(item.height, zoomLevel)
  const width = calcSizeWithZoom(item.width, zoomLevel)
  let x = calcSizeWithZoom(item.posx, zoomLevel)
  let y = calcSizeWithZoom(item.posy, zoomLevel)

  const onDragStop = (e, d) => {
    onDrop(item.id, {
      width: item.width,
      height: item.height,
      posx: reCalcSizeWithZoom(d.x, zoomLevel),
      posy: reCalcSizeWithZoom(d.y, zoomLevel),
    })
  }

  const onResizeStop = (e, direction, ref, d) =>
    onResize(item.id, {
      width: reCalcSizeWithZoom(width + d.width, zoomLevel),
      height: reCalcSizeWithZoom(height + d.height, zoomLevel),
      posx: item.posx,
      posy: item.posy,
    })

    const onDrag = (e, d) => {
      x = d.x;
      y = d.y;
    }

  return (
    <Rnd
      style={{
        background: `url(${item.path}) no-repeat`,
        backgroundSize: width + 'px ' + height + 'px',
        margin: 0,
        height: '100%',
        resize: 'both',
        border: selectedItemId === item.id ? `2px dashed ${colors.darkGrey}` : 'none',
        position: 'absolute',
      }}
      size={{ width, height }}
      position={{ x: x , y: y }}
      maxWidth={width * 3}
      maxHeight={height * 3}
      minHeight={height / 3}
      minWidth={width / 3}
      lockAspectRatio={true}
      onClick={() => onSelect(item.id)}
      dragAxis={'both'}
      bounds="window"
      onResizeStop={onResizeStop}
      onDragStop={onDragStop}
      onDrag={onDrag}
    />
  )
}

ResizableImage.propTypes = {
  item: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  selectedItemId: PropTypes.string,
  zoomLevel: PropTypes.number,
  onResize: PropTypes.func,
  onDrop: PropTypes.func,
}

export default ResizableImage
