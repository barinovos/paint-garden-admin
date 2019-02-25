import actionTypes from '../constants/actionTypes'

export function imagesReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.UPDATE_DB:
      return action.images
    default:
      return state
  }
}

export function sectionsReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.UPDATE_DB:
    case actionTypes.UPDATE_SECTIONS:
      return action.sections
    default:
      return state
  }
}
