import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Pin from './Pin'
import PinModal from './PinModal'
import { PinViewWrapper } from './Styled'
import { reCalcSizeWithZoom } from '../utils/calcZoom'

const Pins = ({ pins, addPin, deletePin, editPin, zoomLevel, user, activePin, selectPin }) => {
  const [showModal, setShowModal] = useState(false)
  const [isAdd, setIsAdd] = useState(true)
  const [position, setPosition] = useState(null)

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
    setPosition({
      x: pin.position.x,
      y: pin.position.y,
    })
    selectPin(pin)
    setIsAdd(false)
    setShowModal(true)
  }

  const onComment = isAdd
    ? data => {
        selectPin(null)
        setShowModal(false)
        addPin({ ...data, position })
      }
    : data => {
        delete data.media
        selectPin(null)
        setShowModal(false)
        editPin(data)
      }

  return (
    <PinViewWrapper onClick={onAddPin}>
      {pins.map((pin, i) => (
        <Pin key={i} data={pin} onPinClick={onShowModalForEdit} zoomLevel={zoomLevel} />
      ))}
      {(showModal || activePin) && (
        <PinModal
          data={activePin}
          user={user}
          position={(activePin && activePin.position) || position}
          onComment={onComment}
          onDelete={() => {
            deletePin(activePin)
            selectPin(null)
          }}
          onClose={() => {
            setShowModal(false)
            selectPin(null)
          }}
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
  selectPin: PropTypes.func,
  activePin: PropTypes.object,
}

export default Pins
