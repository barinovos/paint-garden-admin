import actionTypes from '../constants/actionTypes'
import api from '../utils/api'
import Constants from '../constants'
import { fetchData } from '../Sections/actions'

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

export function addPin(pin, project_id) {
  if (pin.medium === '') delete pin.medium
  if (pin.description === '') delete pin.description
  if (pin.url === '') delete pin.url
  if (pin.link === '') delete pin.link
  const formData = new FormData()
  formData.append('headline', pin.headline)
  formData.append('posx', pin.posx)
  formData.append('posy', pin.posy)
  formData.append('image', pin.image, pin.image.name)
  if (pin.medium) formData.append('medium', pin.medium)
  if (pin.description) formData.append('description', pin.description)
  if (pin.url) formData.append('url', pin.url)
  if (pin.link) formData.append('link', pin.link)
  formData.append('projectId', project_id)
  return dispatch =>
    api
      .post(Constants.API.PIN, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(resp => dispatch({ type: actionTypes.ADD_PIN, pin: resp.data }))
}

export function addSection(data) {
  return dispatch =>
    api
      .post(Constants.API.SECTION, {
        title: data.title,
        posx: data.x,
        posy: data.y,
        canvas: true,
        width: data.width,
        height: data.height,
        depth: data.depth,
        year: data.year,
        synopisis: data.synopisis,
        medium: data.medium,
        projectId: data.project_id,
      })
      .then(resp => {
        dispatch({ type: actionTypes.CREATE_SECTION, section: { ...resp.data, imageIds: [] } })
        dispatch(uploadImages(data, resp.data.id))
      })
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
      .then(resp => dispatch(fetchData(data.project_id)))
  }
}

export function editPin(pin) {
  return dispatch =>
    api
      .put(`${Constants.API.PIN}/${pin.id}`, pin)
      .then(resp => dispatch({ type: actionTypes.EDIT_PIN, pin: resp.data }))
}

export function deletePin(pinId) {
  return dispatch =>
    api.delete(`${Constants.API.PIN}/${pinId}`).then(resp => dispatch({ type: actionTypes.REMOVE_PIN, pinId }))
}

export function deleteSection(id) {
  return dispatch =>
    api.delete(`${Constants.API.SECTION}/${id}`).then(resp =>
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
      .then(resp => dispatch({ type: actionTypes.EDIT_PIN, pin: resp.data }))
  }
}

const updateSection = section => ({
  type: actionTypes.UPDATE_SECTION,
  section: { ...section, imageIds: section.imageIds || [] },
})
