import React from 'react'
import PropTypes from 'prop-types'
import { Image } from '../../Common/Styled'
import { Wrapper } from './Styled'
import { calcSizeWithZoom } from '../../utils/calcZoom'
import UploadRibbon from '../../UploadRibbon'

const CanvasImage = ({
  item,
  onSelect,
  selectedItemId,
  zoomLevel,
  showRibbon = false,
  uploadImages = null,
  project_id,
  onChangeActiveImageIndex,
  deleteSection,
  deleteImage,
}) => {
  const height = calcSizeWithZoom(item.dimensions.height, zoomLevel)
  const width = calcSizeWithZoom(item.dimensions.width, zoomLevel)
  const x = calcSizeWithZoom(item.position.x, zoomLevel)
  const y = calcSizeWithZoom(item.position.y, zoomLevel)

  return (
    <Wrapper top={y} left={x} width={width} height={height}>
      {showRibbon && (
        <UploadRibbon
          item={item}
          uploadImages={uploadImages}
          project_id={project_id}
          selectedItemId={selectedItemId}
          onChangeActiveImageIndex={onChangeActiveImageIndex}
          deleteSection={deleteSection}
          deleteImage={deleteImage}
        />
      )}

      <Image
        src={item.media.url}
        selected={selectedItemId === item.id}
        alt={''}
        top={y}
        left={x}
        width={width}
        height={height}
        onClick={() => onSelect(item)}
      />
    </Wrapper>
  )
}

CanvasImage.propTypes = {
  item: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  selectedItemId: PropTypes.string,
  zoomLevel: PropTypes.number,
}

export default CanvasImage
