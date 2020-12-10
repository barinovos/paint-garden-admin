import actionTypes from '../constants/actionTypes'
import Constants from '../constants'

export function activeCanvasReducer(state = null, action) {
  switch (action.type) {
    case actionTypes.SET_CANVAS:
      return action.canvas
    default:
      return state
  }
}

export function sectionsReducer(state = null, action) {
  switch (action.type) {
    case actionTypes.SET_CANVAS:
      return action.canvas ? action.canvas.sections : null
    case actionTypes.CREATE_SECTIONS:
      return state.concat(action.sections)
    case actionTypes.DELETE_SECTION:
      return state.filter(s => s.id !== action.id)
    case actionTypes.UPDATE_SECTION:
      return state.map(s => (s.id === action.section.id ? action.section : s))
    default:
      return state
  }
}

export function editModeReducer(state = Constants.EDIT_MODES.default, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CANVAS_MODE:
      return action.mode
    default:
      return state
  }
}

export function zoom(state = 0, action) {
  switch (action.type) {
    case actionTypes.SET_ZOOM:
      return action.zoom
    default:
      return state
  }
}
