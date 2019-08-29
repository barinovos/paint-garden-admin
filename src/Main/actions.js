import api from '../utils/api'
import Constants from '../constants'
import actionTypes from '../constants/actionTypes'

export function authCheck() {
  return dispatch => api.get(Constants.API.AUTH_CHECK).then(() => dispatch({ type: actionTypes.AUTHORISE }))
}
