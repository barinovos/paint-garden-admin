import actionTypes from '../constants/actionTypes'

export function modalReducer(state = { show: false }, action) {
  switch (action.type) {
    case actionTypes.SHOW_CONFIRM:
      return {
        ...state,
        ...action.payload,
        show: true,
      }
    case actionTypes.HIDE_CONFIRM:
      return {
        show: false,
      }
    default:
      return state
  }
}
