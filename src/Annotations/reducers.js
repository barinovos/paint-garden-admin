import actionTypes from '../constants/actionTypes'

export function annotations(state = [], action) {
  switch (action.type) {
    case actionTypes.SET_PINS:
      return action.pins || state
    case actionTypes.ADD_PIN:
      return state.concat(action.annotation)
    case actionTypes.REMOVE_PIN:
      return state.filter(a => a.id !== action.pinId)
    case actionTypes.EDIT_PIN:
      return state.map(pin => (pin.id === action.pin.id ? action.pin : pin))
    default:
      return state
  }
}

export function activePin(state = null, action) {
  switch (action.type) {
    case actionTypes.SELECT_PIN:
      return action.pin
    case actionTypes.SET_PINS:
      return state && action.pins && action.pins.length ? action.pins.find(pin => pin.id === state.id) || null : null
    default:
      return state
  }
}
