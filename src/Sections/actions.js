import actionTypes from '../constants/actionTypes'
import api from '../utils/api'
import Constants from '../constants'
const {
  API: { DB, SECTION },
} = Constants

export function fetchData() {
  return dispatch =>
    api
      .get(DB)
      .then(resp => dispatch(updateDb(resp.data)))
      .catch(err => console.log(err))
}

export function createSection(data) {
  return dispatch =>
    api
      .post(SECTION, data)
      .then(resp => dispatch(updateSections(resp.data)))
      .catch(err => console.log(err))
}

export function addToCanvas(id) {
  return dispatch =>
    api
      .put(`${SECTION}/${id}`, {
        canvas: {
          x: 0,
          y: 0,
          width: 500,
          height: 300,
        },
      })
      .then(resp => dispatch(updateSections(resp.data)))
      .catch(err => console.log(err))
}

export function removeFromCanvas(id) {
  return dispatch =>
    api
      .delete(`${SECTION}/${id}`, { canvas: null })
      .then(resp => dispatch(updateSections(resp.data)))
      .catch(err => console.log(err))
}

export function deleteSection(id) {
  return dispatch =>
    api
      .delete(`${SECTION}/${id}`)
      .then(resp => dispatch(updateDb(resp.data)))
      .catch(err => console.log(err))
}

export function updateSection(data) {
  return dispatch =>
    api
      .put(`${SECTION}/${data.id}`, data)
      .then(resp => dispatch(updateSections(resp.data)))
      .catch(err => console.log(err))
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
      .catch(err => console.log(err))
  }
}

const updateDb = ({ images, sections }) => ({ type: actionTypes.UPDATE_DB, images, sections })

const updateSections = ({ sections }) => ({ type: actionTypes.UPDATE_SECTIONS, sections })
