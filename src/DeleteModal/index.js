import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, ContentWrapper, Header, Buttons } from './Styled'
import { Button } from '../Common/Styled'

const DeleteModal = ({ onClose, onConfirm }) => (
  <Wrapper onClick={onClose}>
    <ContentWrapper onClick={ev => ev.stopPropagation()}>
      <Header>Are you sure?</Header>
      <Buttons>
        <Button onClick={onClose} secondary>
          Cancel
        </Button>
        <Button onClick={onConfirm} alarm>
          Delete
        </Button>
      </Buttons>
    </ContentWrapper>
  </Wrapper>
)

DeleteModal.propTypes = {
  onCloser: PropTypes.func,
  onConfirm: PropTypes.func,
}

export default DeleteModal
