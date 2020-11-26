import axios from 'axios'
import actionTypes from '../constants/actionTypes'
import { getAuthToken, navigateToSSO, getLogoutURL } from './auth'

const apiUrl = process.env.REACT_APP_API_URL || 'https://api.paint.garden/api/v2'

const getHeader = customHeaders => {
  if (!customHeaders) {
    return {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  } else {
    return {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  }
}

const api = {
  apiUrl,

  projectId: '',

  get(url, params) {
    let path = `${apiUrl}${url}`
    if (params) {
      Object.keys(params).forEach(key => {
        path += `&${key}=${encodeURIComponent(params[key])}`
      })
    }
    return axios.get(path, getHeader())
  },

  post(url, data) {
    // return axios.post(`${apiUrl}${url}`, data, getHeader())
    return axios.post(`${apiUrl}${url}`, data, getHeader())
  },

  put(url, data) {
    return axios.put(`${apiUrl}${url}`, data, getHeader())
  },

  delete(url) {
    return axios.delete(`${apiUrl}${url}`, getHeader())
  },

  patch(url, data) {
    return axios.patch(`${apiUrl}${url}`, data, getHeader())
  },

  all(values) {
    return axios.all(values)
  },

  logout() {
    return axios.post(getLogoutURL(), null, getHeader()).then(navigateToSSO)
  },

  setProjectId(id) {
    api.projectId = id
  },

  setupInterceptors: store => {
    axios.interceptors.response.use(
      response => {
        // simply return the response if there is no error
        return response
      },
      error => {
        // in this case we only care about unauthorized errors
        if (error.response && (error.response.status === 401 || error.response.status === 429)) {
          // send the user to the login page since the user/token is not valid
          navigateToSSO()
        } else store.dispatch({ type: actionTypes.API_ERROR, error: error.response })
        return Promise.reject(error)
      },
    )
  },
}

export default api
