import actionTypes from '../constants/actionTypes'
import api from '../utils/api'
import Constants from '../constants'
const {
  API: { DB, SECTION, IMAGE },
} = Constants

export function fetchData(project_id) {
  return dispatch => api.get(`${DB}/${project_id}`)
    .then(resp => dispatch(updateDb(resp.data)))
}

export function createSection(data, project_id) {
  return dispatch =>
    api
      .post(SECTION, {
        ...data,
        posx: 0,
        posy: 0,
        projectId: project_id
      })
      .then(resp => dispatch({ type: actionTypes.CREATE_SECTION, section: { ...resp.data, imageIds: [] } }))
}

export function addToCanvas(section) {
  return (dispatch, getState) => {
    const images = getState().images
    const activeImage = images.find(im => im.id === section.imageIds[section.imageIds.length - 1])
    return api
      .put(`${SECTION}/${section.id}`, {
        posx: 0,
        posy: 0,
        width: section.width || activeImage.width,
        height: activeImage.height,
        canvas: true,
      })
      .then(resp => dispatch(updateSectionsAction(resp.data)))
  }
}

export function removeFromCanvas(sectionId) {
  return dispatch =>
    api.put(`${SECTION}/${sectionId}`, { canvas: false }).then(resp => dispatch(updateSectionsAction(resp.data)))
}

export function deleteSection(id) {
  return dispatch =>
    api.delete(`${SECTION}/${id}`).then(resp =>
      dispatch({
        type: actionTypes.DELETE_SECTION,
        id,
      }),
    )
}

export function deleteImage(id) {
  return dispatch =>
    api.delete(`${IMAGE}/${id}`).then(resp =>
      dispatch({
        type: actionTypes.DELETE_IMAGE,
        id,
      }),
    )
}



export function updateSection(data) {
  return dispatch => api.put(`${SECTION}/${data.id}`, data).then(resp => dispatch(updateSectionsAction(resp.data)))
}

export function uploadImages(files, sectionId, projectId) {
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
    formData.append('projectId', projectId)
    return api.post('/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(resp =>
      dispatch({
        type: actionTypes.CREATE_IMAGE,
        images: resp.data,
        sectionId
      }),
    )
  }
}

const updateDb = ({ images, sections, project, annotations, user }) => ({
  type: actionTypes.UPDATE_DB,
  images,
  sections,
  project,
  user,
  pins: annotations,
})


export const  clearData = () => {
  return{
    type: "CLEAR"
  };
};

const updateSectionsAction = section => ({
  type: actionTypes.UPDATE_SECTION,
  section: { ...section, imageIds: section.imageIds || [] },
})
