import React from 'react'
import PropTypes from 'prop-types'
import { PinWrapper } from './Styled'
import { calcSizeWithZoom } from '../utils/calcZoom'
import PinIcon from '../assets/Pin_active.svg'
import Constants from '../constants'
const { EDIT_MODES } = Constants

const AnnotationIcon = ({ data, onPinClick, zoomLevel, onChangeCanvasMode }) => (
  <PinWrapper x={calcSizeWithZoom(data.position.x, zoomLevel)} y={calcSizeWithZoom(data.position.y, zoomLevel)}>
    <img
      src={PinIcon}
      alt={data.text}
      onClick={ev => {
        ev.stopPropagation()
        onChangeCanvasMode(EDIT_MODES?.annotation)
        onPinClick(data)
      }}
    />
  </PinWrapper>
)

AnnotationIcon.propTypes = {
  data: PropTypes.object,
  onPinClick: PropTypes.func,
  zoomLevel: PropTypes.number,
  onChangeCanvasMode: PropTypes.func,
}

export default AnnotationIcon
