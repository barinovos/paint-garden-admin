import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../Modal'
import Button from '../Button'
import styled from 'styled-components'

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const DeleteModal = ({ onClose, onConfirm }) => (
  <Modal onClick={onClose}>
    <h2 style={{ textAlign: 'center', marginBottom: '1em' }}>Are you sure?</h2>
    <Buttons>
      <Button onClick={onClose} secondary>
        Cancel
      </Button>
      <Button onClick={onConfirm} alarm>
        Delete
      </Button>
    </Buttons>
  </Modal>
)

DeleteModal.propTypes = {
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
}

export default DeleteModal
