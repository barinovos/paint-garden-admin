import actionTypes from '../constants/actionTypes'
import api from '../utils/api'
import Constants from '../constants'

const {
  API: { CANVAS, ANNOTATION },
} = Constants

export function fetchAnnotations(canvasId) {
  return dispatch =>
    api.get(`${CANVAS}/${canvasId}${ANNOTATION}s`).then(resp =>
      dispatch({
        type: actionTypes.SET_PINS,
        pins: resp.data.data,
      }),
    )
}

export function addAnnotation(data) {
  return dispatch => api.post(ANNOTATION, data).then(() => fetchAnnotations(data.canvas_id)(dispatch))
}

export function selectAnnotation(pin) {
  return {
    type: actionTypes.SELECT_PIN,
    pin,
  }
}

export function editAnnotation(a) {
  return dispatch =>
    api.put(`${ANNOTATION}/${a.id}`, a).then(resp => dispatch({ type: actionTypes.EDIT_PIN, pin: resp.data.data }))
}

export function deleteAnnotation(id) {
  return dispatch => api.delete(`${ANNOTATION}/${id}`).then(() => dispatch({ type: actionTypes.REMOVE_PIN, pinId: id }))
}
