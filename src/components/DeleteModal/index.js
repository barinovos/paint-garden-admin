import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../Modal'
import Button from '../Button'
import styled from 'styled-components'

const Header = styled.div`
  font-weight: 800;
  text-align: center;
  margin-bottom: 1em;
`

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const DeleteModal = ({ onClose, onConfirm }) => (
  <Modal onClick={onClose}>
    <Header>Are you sure?</Header>
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
