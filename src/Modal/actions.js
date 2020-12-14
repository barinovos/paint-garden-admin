import actionTypes from '../constants/actionTypes'

export const MODAL_TYPES = {
  DELETE: 'delete',
}

export function showDeleteModal(onConfirm, message) {
  return {
    type: actionTypes.SHOW_CONFIRM,
    payload: {
      modalType: MODAL_TYPES.DELETE,
      message,
      onConfirm,
    },
  }
}

export function onClose() {
  return {
    type: actionTypes.HIDE_CONFIRM,
    payload: {
      message: '',
      onConfirm: null,
    },
  }
}
