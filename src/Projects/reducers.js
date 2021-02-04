import actionTypes from '../constants/actionTypes'

export function projectReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.UPDATE_PROJECTS:
      return action.projects || []
    case actionTypes.CREATED_PROJECT:
      state
        .filter(project => project.id === action.project.parent_id)
        .map(project => (project.children = [...project.children, action.project]))
      return [...state, action.project]
    case actionTypes.DELETE_PROJECT:
      return state.filter(project => project.id !== action.id)
    case actionTypes.CHANGE_PROJECT:
      return state.map(project => (project.id !== action.project.id ? project : action.project))
    default:
      return state
  }
}

export function activeProjectReducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.UPDATE_PROJECTS:
      const PreviousProjectID = sessionStorage.getItem('activeProject')
      const PreviousProjectIndex =
        action.projects.findIndex(proj => proj.id === PreviousProjectID) > 0
          ? action.projects.findIndex(proj => proj.id === PreviousProjectID)
          : 0
      // return PreviousProjectID > 0 ? action.projects[PreviousProjectIndex] : action.projects[0]
      return action.projects.length ? action.projects[PreviousProjectIndex] : {}
    case actionTypes.SET_ACTIVE_PROJECT:
      return action.project
    case actionTypes.DELETE_PROJECT:
      return state.id === action.id ? {} : state
    case actionTypes.CHANGE_PROJECT:
      return state.id === action.project.id ? action.project : state
    default:
      return state
  }
}

export function canvasesReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.UPDATE_PROJECTS:
      const PreviousProjectID = sessionStorage.getItem('activeProject')
      const PreviousProjectIndex =
        action.projects.findIndex(proj => proj.id === PreviousProjectID) > 0
          ? action.projects.findIndex(proj => proj.id === PreviousProjectID)
          : 0
      return action.projects.length ? action.projects[PreviousProjectIndex].canvas : state
    case actionTypes.UPDATE_CANVASES:
      return action.canvases || []
    case actionTypes.SET_ACTIVE_PROJECT:
      // it is Array, weird name
      return action.project.canvas
    case actionTypes.CREATE_CANVAS:
      return [...state, action.canvas]
    case actionTypes.DELETE_CANVAS:
      return state.filter(canvases => canvases.id !== action.id)
    case actionTypes.UPDATE_CANVAS:
      return state.map(c => (c.id !== action.canvas.id ? c : action.canvas))
    default:
      return state
  }
}
