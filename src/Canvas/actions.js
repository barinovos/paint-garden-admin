import actionTypes from '../constants/actionTypes'
import api from '../utils/api'
import Constants from '../constants'

const {
  API: { CANVAS, SECTION },
} = Constants

export function fetchCanvasData(id) {
  return dispatch =>
    api.get(`${CANVAS}/${id}?includes[sections]=1`).then(resp =>
      dispatch({
        type: actionTypes.SET_CANVAS,
        canvas: resp.data.data,
      }),
    )
}

export function resetCanvasData() {
  return {
    type: actionTypes.SET_CANVAS,
    canvas: null,
  }
}

export const uploadMedia = (file, userId, projectId, canvasId) => {
  const formData = new FormData()
  formData.append('media', file, file.name)
  formData.append('user_id', userId)
  formData.append('project_id', projectId)
  formData.append('canvas_id', canvasId)
  return api.post('/section', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export const addSection = (file, userId, projectId, canvasId) => dispatch =>
  uploadMedia(file, userId, projectId, canvasId).then(resp =>
    dispatch({ type: actionTypes.CREATE_SECTION, section: resp.data.data }),
  )

export function changeCanvasMode(mode) {
  return { type: actionTypes.CHANGE_CANVAS_MODE, mode }
}

export function updateSection(sectionId, data) {
  return dispatch =>
    api.post(`${SECTION}/${sectionId}`, data).then(resp =>
      dispatch({
        type: actionTypes.UPDATE_SECTION,
        section: resp.data.data,
      }),
    )
}

export function deleteSection(id) {
  return dispatch =>
    api.delete(`${Constants.API.SECTION}/${id}`).then(() =>
      dispatch({
        type: actionTypes.DELETE_SECTION,
        id,
      }),
    )
}

export function deleteImage(id, section_id) {
  return dispatch =>
    api.delete(`${Constants.API.IMAGE}/${id}`).then(
      resp =>
        dispatch({
          type: actionTypes.DELETE_IMAGE,
          id,
        }),

      dispatch({
        type: actionTypes.DELETE_IMAGE_SECTION,
        id,
        section_id,
      }),
    )
}
