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
    api
      .put(`${Constants.API.SECTION}/${sectionId}`, { canvas })
      .then(resp => {
        dispatch(updateSections(resp.data))
        dispatch({ type: actionTypes.UPDATE_CANVAS })
      })
      .catch(err => console.log(err))
}

export function updateWebview(webview) {
  return dispatch =>
    api
      .put(Constants.API.WEBVIEW, webview)
      .then(resp => dispatch({ type: actionTypes.UPDATE_WEBVIEW, webview: resp.data }))
      .catch(err => console.log(err))
}

export function addPin(pin) {
  return dispatch =>
    api
      .post(Constants.API.PIN, pin)
      .then(resp => dispatch({ type: actionTypes.ADD_PIN, pins: resp.data }))
      .catch(err => console.log(err))
}

export function editPin(pin) {
  return dispatch =>
    api
      .put(`${Constants.API.PIN}/${pin.id}`, pin)
      .then(resp => dispatch({ type: actionTypes.EDIT_PIN, pins: resp.data }))
      .catch(err => console.log(err))
}

export function deletePin(pinId) {
  return dispatch =>
    api
      .delete(`${Constants.API.PIN}/${pinId}`)
      .then(resp => dispatch({ type: actionTypes.REMOVE_PIN, pins: resp.data }))
      .catch(err => console.log(err))
}

const updateSections = ({ sections }) => ({ type: actionTypes.UPDATE_SECTIONS, sections })
