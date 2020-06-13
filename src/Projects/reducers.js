import actionTypes from '../constants/actionTypes'


export function projectReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.UPDATE_PROJECTS:
      return action.projects || []
    case actionTypes.CREATED_PROJECT:
      return [...state, action.project]
    case actionTypes.DELETE_PROJECT:
      state.map(project => 
          project.children.filter(child => child !== action.id)
      )
      return state.filter(project => project.id !== action.id)
    case actionTypes.CHANGE_PROJECT:
    return action.project || {}
    default:
      return state
  }
}

export function canvasesReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.UPDATE_CANVASES:
      return action.canvases || []
    case actionTypes.CREATED_CANVASES:
      return [...state, action.canvas]
    case actionTypes.DELETE_CANVASES:
      return state.filter(canvases => canvases.id !== action.id)
    case actionTypes.CHANGE_CANVASES:
    return action.canvas || {}
    default:
      return state
  }
}