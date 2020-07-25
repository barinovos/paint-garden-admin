import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Pin from './Pin'
import PinModal from './PinModal'
import { PinViewWrapper } from './Styled'
import { canvasTopOffset, canvasLeftOffset, reCalcSizeWithZoom } from '../utils/calcZoom'
import Constants from '../constants'

const { EDIT_MODES } = Constants;

const Pins = ({ pins, addPin, deletePin, editPin, uploadImage, zoomLevel, editMode }) => {
  const [modal, triggerModal] = useState({})

  const onAddPin = ev => {
    const x = reCalcSizeWithZoom(ev.clientX - canvasLeftOffset, zoomLevel)
    const y = reCalcSizeWithZoom(ev.clientY, zoomLevel)
    if (editMode === EDIT_MODES.annotation) {
      triggerModal({
        open: true,
        onSave: data => addPin({ ...data, posx: x, posy: y }),
      })
    }
  }

  const onShowModalForEdit = pin =>
    triggerModal({
      open: true,
      pin,
      onSave: editPin,
      onDelete: deletePin,
    })

  return (
    <PinViewWrapper onClick={onAddPin}>
      {pins.map((pin, i) => (
        <Pin key={i} data={pin} onPinClick={onShowModalForEdit} zoomLevel={zoomLevel} />
      ))}
      {modal.open && (
        <PinModal
          onSave={modal.onSave}
          onDelete={modal.onDelete}
          onClose={() => triggerModal({ open: false })}
          onImageUpload={uploadImage}
          pin={modal.pin}
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
  uploadImage: PropTypes.func,
  zoomLevel: PropTypes.number,
}

export default Pins
