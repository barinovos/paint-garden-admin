import React, { useEffect, useState } from 'react'
import { Rnd } from 'react-rnd'
import PropTypes from 'prop-types'
import { calcSizeWithZoom, reCalcSizeWithZoom } from '../../utils/calcZoom'
import colors from '../../constants/colors'
import UploadRibbon from '../UploadRibbon'
import { getWidth, getHeight, getX, getY } from '../utils'

const ResizableImage = ({ item, onSelect, isActive, zoomLevel, onUpdate, deleteSection, deleteImage, uploadMedia }) => {
  const [x, setX] = useState(calcSizeWithZoom(getX(item), zoomLevel))
  const [y, setY] = useState(calcSizeWithZoom(getY(item), zoomLevel))
  const [aspectRatio, setAspectRatio] = useState(false)
  const [height, setHeight] = useState(calcSizeWithZoom(getHeight(item), zoomLevel))
  const [width, setWidth] = useState(calcSizeWithZoom(getWidth(item), zoomLevel))
  const [media, setMedia] = useState(item.media)

  useEffect(() => {
    const height = calcSizeWithZoom(getHeight(item), zoomLevel)
    const width = calcSizeWithZoom(getWidth(item), zoomLevel)
    setHeight(height)
    setWidth(width)
    setX(calcSizeWithZoom(getX(item), zoomLevel))
    setY(calcSizeWithZoom(getY(item), zoomLevel))
  }, [zoomLevel, item])

  const onHistoryClick = i => setMedia(item.history[i])

  const onDragStop = (e, d) => {
    setX(d.x)
    setY(d.y)
    const position = {
      x: reCalcSizeWithZoom(d.x, zoomLevel),
      y: reCalcSizeWithZoom(d.y, zoomLevel),
    }
    if (getX(item) !== position.x || getY(item) !== position.y) {
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

  const onResize = (e, direction, ref, delta, position) => {
    if (event?.shiftKey) {
      setAspectRatio(true)
    } else {
      setAspectRatio(false)
      setWidth(ref.offsetWidth)
      setHeight(ref.offsetHeight)
      setX(position.x)
      setY(position.y)
    }
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
        onResize(e, direction, ref, delta, position)
      }}
      lockAspectRatio={aspectRatio}
    >
      {isActive && (
        <UploadRibbon
          item={item}
          activeMediaId={media.id}
          uploadMedia={uploadMedia}
          onHistoryIndexChange={onHistoryClick}
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
        {media.mime_type && media.mime_type.includes('video') ? (
          <video controls style={{ userDrag: 'none', userSelect: 'none' }}>
            <source src={media.url} type={media.mime_type} />
          </video>
        ) : (
          <img
            alt={media.url}
            draggable="false"
            src={media.url}
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
  isActive: PropTypes.bool,
  zoomLevel: PropTypes.number,
  onUpdate: PropTypes.func,
  onChangeActiveImageIndex: PropTypes.func,
  deleteSection: PropTypes.func,
  deleteImage: PropTypes.func,
  uploadMedia: PropTypes.func,
  projectId: PropTypes.string,
}

export default ResizableImage
