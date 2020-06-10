import actionTypes from '../constants/actionTypes'
import api from '../utils/api'
import Constants from '../constants'

const {
  API: { PROJECT },
} = Constants

export function fetchData() {
  return dispatch => api.get(`${PROJECT}`).then(resp => dispatch(updateProjects(resp.data)))
}

export function createProject(project) {
  const formData = new FormData()
  formData.append('title', project.title)
  formData.append('image', project.image, project.image.name)
  return dispatch =>
    api
      .post(`${PROJECT}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(resp => dispatch(createdProject(resp.data)))
}

export function updateProject(project) {
  const formData = new FormData()
  formData.append('title', project.title)
  formData.append('image', project.image, project.image.name)
  return dispatch =>
    api
      .post(`${PROJECT}/${project.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(resp => dispatch(refreshData(resp.data)))
}

export function deleteProject(project_id) {
  return dispatch => api.delete(`${PROJECT}/${project_id}`).then(resp => dispatch(refreshData(resp.data)))
}

const updateProjects = projects => ({
  type: actionTypes.UPDATE_PROJECTS,
  projects,
})

const createdProject = project => ({
  type: actionTypes.CREATED_PROJECT,
  project,
})

const refreshData = data => fetchData()
