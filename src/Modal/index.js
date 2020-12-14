import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { onClose, MODAL_TYPES } from './actions'
import DeleteModal from '../components/DeleteModal'

const Modal = ({ type, show, message, onConfirm, onClose }) => {
  if (!show) {
    return null
  }
  if (type === MODAL_TYPES.DELETE) {
    return (
      <DeleteModal
        onClose={onClose}
        onConfirm={() => {
          onConfirm()
          onClose()
        }}
        message={message}
      />
    )
  }
  return null
}

Modal.propTypes = {
  type: PropTypes.string,
  show: PropTypes.bool,
  message: PropTypes.string,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
}

export default connect(
  ({ modal }) => ({ show: modal.show, message: modal.message, onConfirm: modal.onConfirm, type: modal.modalType }),
  dispatch => bindActionCreators({ onClose }, dispatch),
)(Modal)
