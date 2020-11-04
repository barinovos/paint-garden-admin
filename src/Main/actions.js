import api from '../utils/api'
import Constants from '../constants'
import actionTypes from '../constants/actionTypes'

export function getUserInfo(cb) {
  return dispatch =>
    api
      .get(Constants.API.USER)
      .then(resp => dispatch({ type: actionTypes.AUTHORISE, user: resp.data.data }))
      .then(() => (cb && typeof cb === 'function' ? cb() : null))
}

export function logout(history) {
  return dispatch =>
    api.post(Constants.API.LOGOUT, {}).then(() => {
      dispatch({ type: actionTypes.LOGOUT })
      history.replace(Constants.ROUTES.LOGIN)
    })
}
