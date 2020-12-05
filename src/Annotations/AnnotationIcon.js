import React from 'react'
import PropTypes from 'prop-types'
import { PinWrapper } from './Styled'
import { calcSizeWithZoom } from '../utils/calcZoom'
import PinIcon from '../assets/Pin_active.svg'

const AnnotationIcon = ({ data, onPinClick, zoomLevel }) => (
  <PinWrapper x={calcSizeWithZoom(data.position.x, zoomLevel)} y={calcSizeWithZoom(data.position.y, zoomLevel)}>
    <img
      src={PinIcon}
      alt={data.text}
      onClick={ev => {
        ev.stopPropagation()
        onPinClick(data)
      }}
    />
  </PinWrapper>
)

AnnotationIcon.propTypes = {
  data: PropTypes.object,
  onPinClick: PropTypes.func,
  zoomLevel: PropTypes.number,
}

export default AnnotationIcon
