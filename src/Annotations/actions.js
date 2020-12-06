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

export function addAnnotation(data, mediaFiles) {
  return dispatch => {
    const promise =
      mediaFiles && mediaFiles.length
        ? api.all(
            mediaFiles.map(media =>
              api.post(ANNOTATION, {
                ...data,
                media,
              }),
            ),
          )
        : api.post(ANNOTATION, data)
    return promise.then(() => fetchAnnotations(data.canvas_id)(dispatch))
  }
}

export function selectAnnotation(pin) {
  return {
    type: actionTypes.SELECT_PIN,
    pin,
  }
}

export function editAnnotation(data, mediaFiles) {
  return dispatch => {
    const promise =
      mediaFiles && mediaFiles.length
        ? api.all(
            mediaFiles.map(media =>
              api.put(`${ANNOTATION}/${data.id}`, {
                ...data,
                media,
              }),
            ),
          )
        : api.put(`${ANNOTATION}/${data.id}`, data)
    return promise.then(resp => fetchAnnotations(data.canvas_id)(dispatch))
  }
}

export function deleteAnnotation(data) {
  return dispatch => api.delete(`${ANNOTATION}/${data.id}`).then(() => fetchAnnotations(data.canvas_id)(dispatch))
}
