import React, { useEffect, useState } from 'react'
import { Rnd } from 'react-rnd'
import PropTypes from 'prop-types'
import { calcSizeWithZoom, reCalcSizeWithZoom } from '../../utils/calcZoom'
import colors from '../../constants/colors'
import UploadRibbon from '../UploadRibbon'

const ResizableImage = ({
  item,
  onSelect,
  selectedItemId,
  zoomLevel,
  onUpdate,
  onChangeActiveImageIndex,
  deleteSection,
  deleteImage,
  uploadMedia,
  projectId,
}) => {
  const [x, setX] = useState(calcSizeWithZoom(item.position.x, zoomLevel))
  const [y, setY] = useState(calcSizeWithZoom(item.position.y, zoomLevel))
  const [height, setHeight] = useState(
    calcSizeWithZoom((item.dimensions || item.media.custom_properties).height, zoomLevel),
  )
  const [width, setWidth] = useState(
    calcSizeWithZoom((item.dimensions || item.media.custom_properties).width, zoomLevel),
  )
  const isActive = selectedItemId === item.id

  useEffect(() => {
    setHeight(calcSizeWithZoom((item.dimensions || item.media.custom_properties).height, zoomLevel))
    setWidth(calcSizeWithZoom((item.dimensions || item.media.custom_properties).width, zoomLevel))
    setX(calcSizeWithZoom(item.position.x, zoomLevel))
    setY(calcSizeWithZoom(item.position.y, zoomLevel))
  }, [zoomLevel, item])

  const onDragStop = (e, d) => {
    setX(d.x)
    setY(d.y)
    const position = {
      x: reCalcSizeWithZoom(d.x, zoomLevel),
      y: reCalcSizeWithZoom(d.y, zoomLevel),
    }
    if (item.position.x !== position.x || item.position.y !== position.y) {
      onUpdate(item.id, {
        position,
      })
    }
  }

  const onResizeStop = (e, direction, ref, d) => {
    const new_height = reCalcSizeWithZoom(ref.offsetHeight, zoomLevel)
    const new_width = reCalcSizeWithZoom(ref.offsetWidth, zoomLevel)
    setHeight(calcSizeWithZoom(new_height, zoomLevel))
    setWidth(calcSizeWithZoom(new_width, zoomLevel))

    onUpdate(item.id, {
      dimensions: {
        width: new_width, //calcSizeWithZoom(new_width, zoomLevel),
        height: new_height, // RalcSizeWithZoom(new_height, zoomLevel),
      },
    })
  }

  return (
    <Rnd
      style={{
        display: 'flex',
        margin: 0,
        height: '100%',
        resize: 'both',
        border: isActive ? `2px dashed ${colors.darkGrey}` : 'none',
        position: 'absolute',
      }}
      size={{ width, height }}
      position={{ x: x, y: y }}
      onClick={() => onSelect(item)}
      dragAxis={'both'}
      onResizeStop={onResizeStop}
      onDragStop={onDragStop}
      onResize={(e, direction, ref, delta, position) => {
        setWidth(ref.offsetWidth)
        setHeight(ref.offsetHeight)
        setX(position.x)
        setY(position.y)
      }}
    >
      {isActive && (
        <UploadRibbon
          item={item}
          uploadMedia={uploadMedia}
          projectId={projectId}
          selectedItemId={selectedItemId}
          onChangeActiveImageIndex={onChangeActiveImageIndex}
          deleteSection={deleteSection}
          deleteImage={deleteImage}
        />
      )}
      <figure
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {item.media.mime_type.includes('video') ? (
          <video controls style={{ userDrag: 'none', userSelect: 'none' }}>
            <source src={item.media.url} type={item.media.mime_type} />
          </video>
        ) : (
          <img
            alt="{item.media.url}"
            draggable="false"
            src={item.media.url}
            style={{ userDrag: 'none', userSelect: 'none' }}
            width="100%"
            height="100%"
          />
        )}
      </figure>
    </Rnd>
  )
}

ResizableImage.propTypes = {
  item: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  selectedItemId: PropTypes.string,
  zoomLevel: PropTypes.number,
  onUpdate: PropTypes.func,
  onChangeActiveImageIndex: PropTypes.func,
  deleteSection: PropTypes.func,
  deleteImage: PropTypes.func,
  uploadMedia: PropTypes.func,
  projectId: PropTypes.string,
}

export default ResizableImage
