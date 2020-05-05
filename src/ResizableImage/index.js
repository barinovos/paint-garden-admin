import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { calcSizeWithZoom, reCalcSizeWithZoom } from '../utils/calcZoom'
import colors from '../constants/colors'
import { Rnd } from 'react-rnd'

const ResizableImage = ({ item, onSelect, selectedItemId, zoomLevel, onResize, onDrop }) => {

  const [x, setX] = useState(calcSizeWithZoom(item.posx, zoomLevel));
  const [y, setY] = useState(calcSizeWithZoom(item.posy, zoomLevel));
  const [height, setHeight] = useState(calcSizeWithZoom(item.height, zoomLevel));
  const [width, setWidth] = useState(calcSizeWithZoom(item.width, zoomLevel));

  useEffect(() => {
    setHeight(calcSizeWithZoom(item.height, zoomLevel));
    setWidth(calcSizeWithZoom(item.width, zoomLevel));
    setX(calcSizeWithZoom(item.posx, zoomLevel));
    setY(calcSizeWithZoom(item.posy, zoomLevel));
  }, [zoomLevel]);

  const onDragStop = (e, d) => {
    setX(d.x);
    setY(d.y);
    onDrop(item.id, {
      width: item.width,
      height: item.height,
      posx: reCalcSizeWithZoom(d.x, zoomLevel),
      posy: reCalcSizeWithZoom(d.y, zoomLevel),
    })
  }

  const onResizeStop = (e, direction, ref, d) => {
    const new_height = reCalcSizeWithZoom(ref.offsetHeight, zoomLevel);
    const new_width  = reCalcSizeWithZoom(ref.offsetWidth, zoomLevel);
    setHeight(calcSizeWithZoom(new_height, zoomLevel));
    setWidth(calcSizeWithZoom(new_width, zoomLevel));
    onResize(item.id, {
      width:  new_width,//calcSizeWithZoom(new_width, zoomLevel),
      height: new_height,// RalcSizeWithZoom(new_height, zoomLevel),
      posx: item.posx,
      posy: item.posy,
    })
  }

    // const onResizing = (e, d) => {
    //   setHeight(reCalcSizeWithZoom(height + d.height, zoomLevel));
    //   setWidth(reCalcSizeWithZoom(width + d.width, zoomLevel));
    // }

  console.log(item.mime);
  return (
    <Rnd
      style={{
        // background: `url(${item.path}) no-repeat`,
        // backgroundSize: width + 'px ' + height + 'px',
        display: 'flex',
        margin: 0,
        height: '100%',
        resize: 'both',
        border: selectedItemId === item.id ? `2px dashed ${colors.darkGrey}` : 'none',
        position: 'absolute',
      }}
      size={{ width, height}}
      position={{ x: x , y: y }}
      //default={{ x: x, y: y }}
      // maxWidth={width * 3}
      // maxHeight={height * 3}
      // minHeight={height / 3}
      // minWidth={width / 3}
      //lockAspectRatio={true}
      onClick={() => onSelect(item.id)}
      dragAxis={'both'}
      onResizeStop={onResizeStop}
      onDragStop={onDragStop}
      onResize={(e, direction, ref, delta, position) => {
        setWidth(ref.offsetWidth);
        setHeight(ref.offsetHeight)
        setX(position.x)
        setY(position.y)
      }}
    >
      <figure
        style = {{
          width: '100%',
          height: '100%',
        }}
      >
        {item.mime === 'video'
            ? <video controls style={{userDrag: 'none', userSelect: 'none'}}>
                <source src={item.path} type={item.mimeType}/>
              </video>
            :
            <img alt = "{item.path}" draggable = "false" src = {item.path} style={{userDrag: 'none', userSelect: 'none'}} width = "100%" height = "100%" />
        }

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
