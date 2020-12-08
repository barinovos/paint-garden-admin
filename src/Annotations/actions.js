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

const convertJsonToFormData = ({ user_id, project_id, canvas_id, section_id, text, parent_id, position, media }) => {
  const formData = new FormData()
  formData.append('user_id', user_id)
  formData.append('project_id', project_id)
  formData.append('canvas_id', canvas_id)
  formData.append('section_id', section_id)
  formData.append('text', text)
  if (position) {
    formData.append('position[x]', '' + position.x)
    formData.append('position[y]', '' + position.y)
  }
  if (media) {
    formData.append('media', media, media.name)
  }
  if (parent_id) {
    formData.append('parent_id', parent_id)
  }
  return formData
}

export function addAnnotation(data, mediaFiles) {
  return dispatch => {
    const promise =
      mediaFiles && mediaFiles.length
        ? api.post(
            ANNOTATION,
            convertJsonToFormData({
              ...data,
              media: mediaFiles[0],
            }),
            { headers: { 'Content-Type': 'multipart/form-data' } },
          )
        : api.post(ANNOTATION, data)
    return promise.then(pin => {
      if (!data.parent_id) {
        dispatch(selectAnnotation(pin.data.data))
      }
      return fetchAnnotations(data.canvas_id)(dispatch)
    })
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
        ? api.post(
            ANNOTATION,
            convertJsonToFormData({
              ...data,
              media: mediaFiles[0],
            }),
            { headers: { 'Content-Type': 'multipart/form-data' } },
          )
        : api.put(`${ANNOTATION}/${data.id}`, data)
    return promise.then(() => fetchAnnotations(data.canvas_id)(dispatch))
  }
}

export function deleteAnnotation(data) {
  return dispatch => api.delete(`${ANNOTATION}/${data.id}`).then(() => fetchAnnotations(data.canvas_id)(dispatch))
}
