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