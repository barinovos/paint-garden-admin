import actionTypes from '../constants/actionTypes'
import api from '../utils/api'
import Constants from '../constants'

const {
  API: { PROJECT },
} = Constants

export function fetchData(project_id) {
  let url = PROJECT;
    if (project_id !== undefined) {
     url =  url + '/' + project_id;
    }
    return dispatch => api.get(`${url}`)
        .then(resp => dispatch(updateProjects(resp.data)));
}

export function fetchCanvases(parent_id) {
  let url = PROJECT;
    if (parent_id !== undefined) {
     url =  url + '/' + parent_id;
    }
    return dispatch => api.get(`${url}`)
        .then(resp => dispatch(updateCanvases(resp.data)));

}

export function sendInvites (project) {
  const formData = new FormData()
  if (project.shared_with.length > 0) {
    formData.append('shared_with', JSON.stringify(project.shared_with));
  }

  return dispatch =>
    api
      .post(`${PROJECT}/${project.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(resp => dispatch(refreshData(resp.data)))
}

export function createProject(project) {
  const formData = new FormData();
  formData.append('title', project.title);
  formData.append('image', project.image, project.image.name);
  if (project.parentId !== undefined && project.parentId !== null) {
    formData.append('parent_id', project.parentId);
  }

  if (project.shared_with.length > 0) {
    formData.append('shared_with', JSON.stringify(project.shared_with));
  }
  return dispatch => api.post(`${PROJECT}`,formData,
  { headers: { 'Content-Type': 'multipart/form-data' } }
  ).then(resp => dispatch(createdProject(resp.data)));
}

export function updateProject(project) {
  const formData = new FormData()
  formData.append('title', project.title)
  if (project.image !== "") {
    formData.append('image', project.image, project.image.name)
  }
  return dispatch =>
    api
      .post(`${PROJECT}/${project.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(resp => dispatch(refreshData(resp.data)))
}

export function deleteProject(project_id) {
  return dispatch => api.delete(`${PROJECT}/${project_id}`).then(resp => {
    dispatch(refreshData(resp.data))
    dispatch({ type: actionTypes.DELETE_PROJECT })
  }
  )
}

const updateProjects = projects => ({
  type: actionTypes.UPDATE_PROJECTS,
  projects,
})

const updateCanvases = canvases => ({
  type: actionTypes.UPDATE_CANVASES,
  canvases,
})

const createdProject = project => ({
  type: actionTypes.CREATED_PROJECT,
  project,
})

const refreshData = data => fetchData()
