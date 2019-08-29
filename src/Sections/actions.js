import actionTypes from '../constants/actionTypes'
import api from '../utils/api'
import Constants from '../constants'
const {
  API: { DB, SECTION, IMAGE },
} = Constants

export function fetchData() {
  return dispatch => api.get(DB).then(resp => dispatch(updateDb(resp.data)))
}

export function createSection(data) {
  return dispatch => api.post(SECTION, data).then(resp => dispatch(updateSections(resp.data)))
}

export function addToCanvas(section) {
  return (dispatch, getState) => {
    const images = getState().images
    const activeImage = images.find(im => im.id === section.imageIds[section.imageIds.length - 1])
    return api
      .put(`${SECTION}/${section.id}`, {
        canvas: {
          x: 0,
          y: 0,
          width: section.width || activeImage.width,
          height: activeImage.height,
          depth: section.depth || 0,
        },
      })
      .then(resp => dispatch(updateSections(resp.data)))
  }
}

export function removeFromCanvas(sectionId) {
  return dispatch =>
    api.put(`${SECTION}/${sectionId}`, { canvas: null }).then(resp => dispatch(updateSections(resp.data)))
}

export function deleteSection(id) {
  return dispatch => api.delete(`${SECTION}/${id}`).then(resp => dispatch(updateDb(resp.data)))
}

export function deleteImage(id) {
  return dispatch => api.delete(`${IMAGE}/${id}`).then(resp => dispatch(updateDb(resp.data)))
}

export function updateSection(data) {
  return dispatch => api.put(`${SECTION}/${data.id}`, data).then(resp => dispatch(updateSections(resp.data)))
}

export function uploadImages(files, sectionId) {
  return dispatch => {
    const formData = new FormData()
    for (var i = 0; i < files.length; i++) {
      const file = files[i]
      // Check the file type.
      if (!file.type.match('image.*')) {
        continue
      }
      // Add the file to the request.
      formData.append('images[]', file, file.name)
    }
    formData.append('sectionId', sectionId)
    return api
      .post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(resp => dispatch(updateDb(resp.data)))
  }
}

const updateDb = ({ images, sections, webview, pins }) => ({
  type: actionTypes.UPDATE_DB,
  images,
  sections,
  webview,
  pins,
})

const updateSections = ({ sections }) => ({ type: actionTypes.UPDATE_SECTIONS, sections })
