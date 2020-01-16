import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { calcSizeWithZoom, reCalcSizeWithZoom } from '../utils/calcZoom'
import colors from '../constants/colors'
import { Rnd } from 'react-rnd'

const ResizableImage = ({ item, onSelect, selectedItemId, zoomLevel, onResize, onDrop }) => {

  const [x, setX] = useState(calcSizeWithZoom(item.posx, zoomLevel));
  const [y, setY] = useState(calcSizeWithZoom(item.posy, zoomLevel));
  const [height, setHeight] = useState(calcSizeWithZoom(item.height, zoomLevel));
  const [width, setWidth] = useState(calcSizeWithZoom(item.width, zoomLevel));

  const onDragStop = (e, d) => {
    // setX(reCalcSizeWithZoom(d.x, zoomLevel));
    // setY(reCalcSizeWithZoom(d.y, zoomLevel));
    onDrop(item.id, {
      width: item.width,
      height: item.height,
      posx: reCalcSizeWithZoom(d.x, zoomLevel),
      posy: reCalcSizeWithZoom(d.y, zoomLevel),
    })
  }

  const onResizeStop = (e, direction, ref, d) => {
    setHeight(reCalcSizeWithZoom(height + d.height, zoomLevel));
    setWidth(reCalcSizeWithZoom(width + d.width, zoomLevel));
    onResize(item.id, {
      width: width,//reCalcSizeWithZoom(width + d.width, zoomLevel),
      height: height,//reCalcSizeWithZoom(height + d.height, zoomLevel),
      posx: item.posx,
      posy: item.posy,
    })
  }

    // const onResizing = (e, d) => {
    //   setHeight(reCalcSizeWithZoom(height + d.height, zoomLevel));
    //   setWidth(reCalcSizeWithZoom(width + d.width, zoomLevel));
    // }

  return (
    <Rnd
      style={{
        // background: `url(${item.path}) no-repeat`,
        // backgroundSize: width + 'px ' + height + 'px',
        margin: 0,
        height: '100%',
        resize: 'both',
        border: selectedItemId === item.id ? `2px dashed ${colors.darkGrey}` : 'none',
        position: 'absolute',
      }}
      // size={{ width, height }}
      // position={{ x: x , y: y }}
      default = {{
        x: x,
        y: y,
        width: width,
        height: height
      }}
      // maxWidth={width * 3}
      // maxHeight={height * 3}
      // minHeight={height / 3}
      // minWidth={width / 3}
      //lockAspectRatio={true}
      onClick={() => onSelect(item.id)}
      //dragAxis={'both'}
      bounds="window"
      onResizeStop={onResizeStop}
      onDragStop={onDragStop}
    >
      <figure
        style = {{
          width: '100%',
          height: '100%',
        }}
      >
        <img alt = "{item.path}" src = {item.path} width = "100%" height = "100%" />
      </figure>
    </Rnd>
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
