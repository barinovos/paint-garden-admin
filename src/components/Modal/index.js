import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 2001;
`
export const ContentWrapper = styled.div`
  width: 300px;
  background: white;
  box-shadow: 2px 3px 22px rgba(0, 0, 0, 0.5);
  border-radius: 2px;
  padding: 18px 21px;
`

const Modal = ({ children, onClose = () => null }) => (
  <Wrapper onClick={onClose}>
    <ContentWrapper onClick={ev => ev.stopPropagation()}>{children}</ContentWrapper>
  </Wrapper>
)

Modal.propTypes = {
  onClose: PropTypes.func,
}

export default Modal
