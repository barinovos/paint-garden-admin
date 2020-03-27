import actionTypes from '../constants/actionTypes'
import api from '../utils/api'
import Constants from '../constants'
const {
  API: { DB, PROJECT},
} = Constants

export function fetchData() {
    return dispatch => api.get(`${PROJECT}`)
        .then(resp => dispatch(updateProjects(resp.data)));
}

export function createProject(project) {
  console.log('create project');
  console.log(project);
  console.log(project.title);
  return dispatch => api.post(`${PROJECT}`, {
    title: project.title
  }).then(resp => dispatch(createdProject(resp.data)));
}


export function updateProject(project) {
  console.log('update project');
}

const updateProjects = projects => ({
  type: actionTypes.UPDATE_PROJECTS,
  projects,
})

const createdProject = project => ({
  type: actionTypes.CREATED_PROJECT,
  project
})
