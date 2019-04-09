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

export function editModeReducer(state = Constants.EDIT_MODES.dnd, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CANVAS_MODE:
      return action.mode
    default:
      return state
  }
}
