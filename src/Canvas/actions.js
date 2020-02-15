import actionTypes from '../constants/actionTypes'
import api from '../utils/api'
import Constants from '../constants'

export function changeCanvasGridMode(isCanvasGridView) {
  return { type: actionTypes.CHANGE_CANVAS_GRID_MODE, isCanvasGridView }
}

export function changeCanvasMode(mode) {
  return { type: actionTypes.CHANGE_CANVAS_MODE, mode }
}

export function updateCanvas(sectionId, canvas) {
  return dispatch =>
    api.put(`${Constants.API.SECTION}/${sectionId}`, { ...canvas }).then(resp => {
      dispatch(updateSection(resp.data))
      dispatch({ type: actionTypes.UPDATE_CANVAS })
    })
}

export function updateWebview(webview) {
  return dispatch =>
    api
      .put(Constants.API.WEBVIEW, webview)
      .then(resp => dispatch({ type: actionTypes.UPDATE_WEBVIEW, webview: resp.data }))
}

export function addPin(pin) {
  if (pin.medium === "")  delete pin.medium;
  if (pin.description === "") delete pin.description;
  if (pin.description === "") delete pin.description;
  if (pin.url === "") delete pin.url;
  if (pin.link === "") delete pin.link;
  console.log(pin);
  return (dispatch, getState) =>
    api.post(Constants.API.PIN, { ...pin, projectId: getState().project.id }).then(resp => dispatch({ type: actionTypes.ADD_PIN, pin: resp.data }))
}

export function editPin(pin) {
  return dispatch =>
    api
      .put(`${Constants.API.PIN}/${pin.id}`, pin)
      .then(resp => dispatch({ type: actionTypes.EDIT_PIN, pin: resp.data }))
}

export function deletePin(pinId) {
  return dispatch =>
    api
      .delete(`${Constants.API.PIN}/${pinId}`)
      .then(resp => dispatch({ type: actionTypes.REMOVE_PIN, pinId }))
}

export function uploadImageToPin(file, pinId) {
  return dispatch => {
    const formData = new FormData()
    if (!file.type.match('image.*')) {
      return
    }
    // Add the file to the request.
    formData.append('image', file, file.name)
    formData.append('pinId', pinId)
    return api
      .post('/pin-upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(resp => dispatch({ type: actionTypes.EDIT_PIN, pin: resp.data }))
  }
}

const updateSection = section => ({
  type: actionTypes.UPDATE_SECTION,
  section: { ...section, imageIds: section.imageIds || [] },
})
