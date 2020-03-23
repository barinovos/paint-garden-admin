import axios from 'axios'
import Constants from '../constants'
import actionTypes from '../constants/actionTypes'
import { getAuthToken, navigateToLogin } from './auth'

// const apiUrl = process.env.REACT_APP_API_URL || 'https://anth-api.herokuapp.com';
const API_VERSION = '/api/v1'
const apiUrl = `${process.env.REACT_APP_API_URL || 'https://api.paint.garden'}${API_VERSION}`

// TODO: replace later with fetch of projects
//const defaultProjectId = 'ad48b0f8-ac28-4197-878c-bd0ae12afbed';
const defaultProjectId = 'ad48b0f8-ac28-4197-878c-bd0ae12afbed';

const getHeader = () => ({
  headers: { Authorization: `Bearer ${getAuthToken()}` },
})

const api = {
  apiUrl,

  projectId: defaultProjectId,

  get(url, params) {
    let path = `${apiUrl}${url}${api.getQueryParam()}`
    if (params) {
      Object.keys(params).forEach(key => {
        path += `&${key}=${encodeURIComponent(params[key])}`
      })
    }
    return axios.get(path, getHeader())
  },

  post(url, data) {
    return axios.post(`${apiUrl}${url}${api.getQueryParam()}`, data, getHeader())
  },

  put(url, data) {
    return axios.put(`${apiUrl}${url}${api.getQueryParam()}`, data, getHeader())
  },

  delete(url) {
    return axios.delete(`${apiUrl}${url}${api.getQueryParam()}`, getHeader())
  },

  patch(url, data) {
    return axios.patch(`${apiUrl}${url}${api.getQueryParam()}`, data, getHeader())
  },

  all(values) {
    return axios.all(values)
  },

  getImageUrl(path) {
    return `${apiUrl}/${path}`
  },

  setProjectId(id) {
    api.projectId = id;
  },

  getQueryParam() {
    return `?projectId=${api.projectId}`
  },

  setupInterceptors: store => {
    axios.interceptors.response.use(
      response => {
        // simply return the response if there is no error
        return response
      },
      error => {
        console.log(error);
        // in this case we only care about unauthorized errors
        // ignore errors on Login page (targeted to /login)
        if (error.request.responseURL.indexOf(Constants.API.LOGIN) === -1) {
          if (error.response.status === 401 || error.response.status === 429) {
            store.dispatch({ type: actionTypes.AUTH_ERROR })
            // send the user to the login page since the user/token is not valid
            console.dir(error)
            navigateToLogin()
          } else store.dispatch({ type: actionTypes.API_ERROR, error: error.response })
        }
        return Promise.reject(error)
      },
    )
  },
}

export default api
