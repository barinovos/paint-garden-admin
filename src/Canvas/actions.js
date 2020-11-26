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

export function addPin(pin, project_id) {
  if (pin.medium === '') delete pin.medium
  if (pin.description === '') delete pin.description
  if (pin.url === '') delete pin.url
  if (pin.link === '') delete pin.link
  const formData = new FormData()
  formData.append('headline', pin.headline)
  formData.append('posx', pin.posx)
  formData.append('posy', pin.posy)
  if (pin.image) formData.append('image', pin.image, pin.image.name)
  if (pin.medium) formData.append('medium', pin.medium)
  if (pin.description) formData.append('description', pin.description)
  if (pin.url) formData.append('url', pin.url)
  if (pin.link) formData.append('link', pin.link)
  formData.append('projectId', project_id)
  return dispatch =>
    api
      .post(Constants.API.PIN, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(resp => dispatch({ type: actionTypes.ADD_PIN, pin: resp.data.data }))
}

export function uploadImages(data, sectionId) {
  return dispatch => {
    const formData = new FormData()
    var images = data.images
    for (var i = 0; i < images.length; i++) {
      const file = images[i]
      // Check the file type.
      if (!file.type.includes('image') && !file.type.includes('video')) {
        // skip the API call for non-image or non-video file types
        // TODO: implement an error notification for a user for this case
        return
      }
      // Add the file to the request.
      formData.append('images[]', file, file.name)
    }
    formData.append('sectionId', sectionId)
    formData.append('projectId', data.project_id)
    return api
      .post('/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(resp => dispatch(fetchCanvasData(data.project_id)))
  }
}

export function editPin(pin) {
  return dispatch =>
    api
      .put(`${Constants.API.PIN}/${pin.id}`, pin)
      .then(resp => dispatch({ type: actionTypes.EDIT_PIN, pin: resp.data.data }))
}

export function deletePin(pinId) {
  return dispatch =>
    api.delete(`${Constants.API.PIN}/${pinId}`).then(() => dispatch({ type: actionTypes.REMOVE_PIN, pinId }))
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

export function uploadImageToPin(file, pinId) {
  return dispatch => {
    const formData = new FormData()

    // Add the file to the request.
    formData.append('image', file, file.name)
    formData.append('pinId', pinId)
    return api
      .post(`${Constants.API.PIN}/${pinId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(resp => dispatch({ type: actionTypes.EDIT_PIN, pin: resp.data.data }))
  }
}
