import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Pin from './Pin'
import PinModal from './PinModal'
import { PinViewWrapper } from './Styled'
import { reCalcSizeWithZoom } from '../utils/calcZoom'

const Pins = ({ pins, addPin, deletePin, editPin, zoomLevel, user }) => {
  const [showModal, setShowModal] = useState(false)
  const [isAdd, setIsAdd] = useState(true)
  const [position, setPosition] = useState(null)
  const [editedPin, setEditedPin] = useState(null)

  const onAddPin = ev => {
    const x = reCalcSizeWithZoom(ev.clientX, zoomLevel)
    const y = reCalcSizeWithZoom(ev.clientY, zoomLevel)
    setPosition({
      x,
      y,
    })
    setIsAdd(true)
    setShowModal(true)
  }

  const onShowModalForEdit = pin => {
    setEditedPin(pin)
    setIsAdd(false)
    setShowModal(true)
  }

  return (
    <PinViewWrapper onClick={onAddPin}>
      {pins.map((pin, i) => (
        <Pin key={i} data={pin} onPinClick={onShowModalForEdit} zoomLevel={zoomLevel} />
      ))}
      {showModal && (
        <PinModal
          user={user}
          position={position}
          onComment={isAdd ? text => addPin({ text, position }) : editPin}
          onDelete={deletePin}
          onClose={() => setShowModal(false)}
        />
      )}
    </PinViewWrapper>
  )
}

Pins.propTypes = {
  pins: PropTypes.arrayOf(PropTypes.object),
  addPin: PropTypes.func,
  deletePin: PropTypes.func,
  editPin: PropTypes.func,
  zoomLevel: PropTypes.number,
  user: PropTypes.object,
}

export default Pins
