import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../Modal'
import Button from '../Button'
import styled from 'styled-components'

const DeleteModalStyled = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  min-height: 160px;
`

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const DeleteModal = ({ message, onClose, onConfirm }) => (
  <Modal onClick={onClose}>
    <DeleteModalStyled>
      <h2>Warning</h2>
      <span style={{ fontSize: 11, fontWeight: 500 }}>{message || 'Are you sure?'}</span>
      <Buttons>
        <Button onClick={onConfirm} alarm>
          Okay
        </Button>
        <Button onClick={onClose} secondary>
          Cancel
        </Button>
      </Buttons>
    </DeleteModalStyled>
  </Modal>
)

DeleteModal.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
}

export default DeleteModal
