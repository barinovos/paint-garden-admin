import api from '../utils/api'
import Constants from '../constants'
import actionTypes from '../constants/actionTypes'

export function authCheck() {
  return dispatch =>
    api.post(Constants.API.AUTH_CHECK, {}).then(resp => dispatch({ type: actionTypes.AUTHORISE, user: resp.data.user }))
}
