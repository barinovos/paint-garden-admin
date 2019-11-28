import actionTypes from '../constants/actionTypes'

export function authReducer(state = { isAuthenticated: false }, action) {
  switch (action.type) {
    case actionTypes.AUTHORISE:
      return { isAuthenticated: true }
    case actionTypes.AUTH_ERROR:
      return { isAuthenticated: false }
    default:
      return state
  }
}

export function projectReducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.UPDATE_DB:
    case actionTypes.CHANGE_PROJECT:
      return action.project || {}
    default:
      return state
  }
}

export function userReducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.UPDATE_DB:
      return action.user || {}
    default:
      return state
  }
}