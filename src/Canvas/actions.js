import actionTypes from '../constants/actionTypes'
import api from '../utils/api'
import { reCalcSizeWithZoom } from '../utils/calcZoom'
import { showDeleteModal } from '../Modal/actions'
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

export const setZoom = zoom => ({
  type: actionTypes.SET_ZOOM,
  zoom,
})

export const uploadMedia = (files, userId, projectId, canvasId, zoom = 0) => {
  return api.all(
    Array.from(files).map(file => {
      const { height, width } = window.screen
      const x = Math.floor(reCalcSizeWithZoom(Math.random() * width, zoom))
      const y = Math.floor(reCalcSizeWithZoom(Math.random() * height, zoom))
      const formData = new FormData()
      formData.append('media', file, file.name)
      formData.append('user_id', userId)
      formData.append('project_id', projectId)
      formData.append('canvas_id', canvasId)
      formData.append('position[x]', '' + x)
      formData.append('position[y]', '' + y)
      return api.post('/section', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    }),
  )
}

export function uploadMediaToSection(sectionId, files) {
  return dispatch => {
    Array.from(files).forEach(file => {
      const formData = new FormData()
      formData.append('media', file, file.name)
      return api
        .post(`${SECTION}/${sectionId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(resp =>
          dispatch({
            type: actionTypes.UPDATE_SECTION,
            section: resp.data.data,
          }),
        )
    })
  }
}

export const addSection = (files, userId, projectId, canvasId) => (dispatch, getState) =>
  uploadMedia(files, userId, projectId, canvasId, getState().zoom).then(resp =>
    dispatch({ type: actionTypes.CREATE_SECTIONS, sections: resp.map(r => r.data.data) }),
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
  return dispatch => {
    dispatch(
      showDeleteModal(() => {
        api.delete(`${Constants.API.SECTION}/${id}`).then(() =>
          dispatch({
            type: actionTypes.DELETE_SECTION,
            id,
          }),
        )
      }, 'Deleting this section will remove all layers, are you sure?'),
    )
  }
}

export function deleteImage(imageId, sectionId) {
  return dispatch =>
    dispatch(
      showDeleteModal(() => {
        // TODO: do API call once Mubi will implement history update possible
      }, 'Do you really want to delete this fancy layer?'),
    )
}
