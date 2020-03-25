import actionTypes from '../constants/actionTypes'

export function imagesReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.UPDATE_DB:
      return action.images || []
    case actionTypes.CREATE_IMAGE:
      return [...state, ...action.images]
    case actionTypes.DELETE_IMAGE:
      return state.filter(im => im.id !== action.id)
    default:
      return state
  }
}

export function sectionsReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.UPDATE_DB:
      return action.sections || []
    case actionTypes.UPDATE_SECTION:
      return state.map(s => (s.id === action.section.id ? action.section : s))
    case actionTypes.CREATE_SECTION:
      return state.concat(action.section)
    case actionTypes.DELETE_SECTION:
      return state.filter(s => s.id !== action.id)
    case actionTypes.CREATE_IMAGE:
      return state.map(s =>
        s.id === action.sectionId ? {
          ...s,
          imageIds: [...s.imageIds, ...action.images.map(im => im.id)]
        } : s)
    default:
      return state
  }
}
