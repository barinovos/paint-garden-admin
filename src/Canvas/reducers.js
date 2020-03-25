import actionTypes from '../constants/actionTypes'
import Constants from '../constants'

export function isCanvasGridViewReducer(state = true, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CANVAS_GRID_MODE:
      return action.isCanvasGridView
    default:
      return state
  }
}

export function editModeReducer(state = Constants.EDIT_MODES.resize, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CANVAS_MODE:
      return action.mode
    default:
      return state
  }
}

export function webviewReducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.UPDATE_WEBVIEW:
      return action.webview || state
    default:
      return state
  }
}

export function pinsReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.UPDATE_DB:
      return action.pins || state
    case actionTypes.ADD_PIN:
      return state.concat(action.pin)
    case actionTypes.REMOVE_PIN:
      return state.filter(pin => pin.id !== action.pinId)
    case actionTypes.EDIT_PIN:
      return state.map(pin => (pin.id === action.pin.id ? action.pin : pin))
    default:
      return state
  }
}
