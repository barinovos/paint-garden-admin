import actionTypes from '../constants/actionTypes'


export function projectReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.UPDATE_PROJECTS:
      return action.projects || []
    case actionTypes.CREATED_PROJECT:
      return [...state, action.project]
    case actionTypes.DELETE_PROJECT:
      return state.filter(projects => projects.id !== action.id)
    case actionTypes.CHANGE_PROJECT:
    return action.project || {}
    default:
      return state
  }
}