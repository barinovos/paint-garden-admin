import api from '../utils/api'
import Constants from '../constants'
import actionTypes from '../constants/actionTypes'

export function authCheck() {
  return dispatch =>
    api.post(Constants.API.AUTH_CHECK, {}).then(resp => dispatch({ type: actionTypes.AUTHORISE, user: resp.data.user }))
}

export function logout(history) {
  return dispatch =>
    api.post(Constants.API.LOGOUT, {}).then(() => {
      dispatch({ type: actionTypes.LOGOUT })
      history.replace(Constants.ROUTES.LOGIN)
    })
}
