import actionTypes from '../constants/actionTypes'
import api from '../utils/api'
import Constants from '../constants'

const {
  API: { PROJECT },
} = Constants

export function fetchData(project_id) {
  let url = PROJECT
  if (project_id !== undefined) {
    url = url + '/' + project_id
  }
  return dispatch =>
    api.get(`${url}`).then(resp => {
      console.log({ resp })
      return dispatch(updateProjects(resp.data.data))
    })
}

export function sendInvites({ id, shared_with }) {
  return dispatch =>
    api
      .put(`${PROJECT}/${id}`, {
        shared_with,
      })
      .then(resp => dispatch(refreshData(resp.data.data)))
}

export function createProject(project) {
  const formData = new FormData()
  formData.append('title', project.title)
  // formData.append('image', project.image, project.image.name)
  // if (project.parentId !== undefined && project.parentId !== null) {
  //   formData.append('parent_id', project.parentId)
  // }

  if (project.shared_with.length > 0) {
    formData.append('shared_with', JSON.stringify(project.shared_with))
  }
  return dispatch =>
    api
      .post(`${PROJECT}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(resp => dispatch(createdProject(resp.data.data)))
}

export function updateProject(project) {
  return dispatch =>
      api
          .put(`${PROJECT}/${project.id}`, {'title': project.title})
          .then(resp => dispatch(refreshData(resp.data.data)))
}

export function deleteProject(project_id) {
  return dispatch =>
    api.delete(`${PROJECT}/${project_id}`).then(resp => {
      dispatch(refreshData(resp.data.data))
      dispatch({ type: actionTypes.DELETE_PROJECT })
    })
}

const updateProjects = projects => {
  return { type: actionTypes.UPDATE_PROJECTS, projects }
}

const createdProject = project => ({
  type: actionTypes.CREATED_PROJECT,
  project,
})

const refreshData = () => fetchData()
