import actionTypes from '../constants/actionTypes'
import accessManager from '../utils/accessManager'

export function userReducer(state = null, action) {
  switch (action.type) {
    case actionTypes.AUTHORISE:
      return accessManager(action.user)
    case actionTypes.AUTH_ERROR:
      return null
    default:
      return state
  }
}
