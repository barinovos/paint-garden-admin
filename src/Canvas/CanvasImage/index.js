import React from 'react'
import PropTypes from 'prop-types'
import { Image } from '../../Common/Styled'
import { Wrapper } from './Styled'
import { calcSizeWithZoom } from '../../utils/calcZoom'
import { getWidth, getHeight, getX, getY } from '../utils'

const CanvasImage = ({ item, zoomLevel }) => {
  const height = calcSizeWithZoom(getHeight(item), zoomLevel)
  const width = calcSizeWithZoom(getWidth(item), zoomLevel)
  const x = calcSizeWithZoom(getX(item), zoomLevel)
  const y = calcSizeWithZoom(getY(item), zoomLevel)

  return (
    <Wrapper top={y} left={x} width={width} height={height}>
      <Image src={item.media.url} alt={''} top={y} left={x} width={width} height={height} />
    </Wrapper>
  )
}

CanvasImage.propTypes = {
  item: PropTypes.object.isRequired,
  zoomLevel: PropTypes.number,
}

export default CanvasImage
