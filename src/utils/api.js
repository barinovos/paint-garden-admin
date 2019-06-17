import axios from 'axios'
import actionTypes from '../constants/actionTypes'
const apiUrl = process.env.REACT_APP_API_URL || 'https://anth-api.herokuapp.com';

const api = {
  get(url, params) {
    let path = `${apiUrl}${url}`
    if (params) {
      Object.keys(params).forEach(key => {
        path += `&${key}=${encodeURIComponent(params[key])}`
      })
    }
    return axios.get(path)
  },

  post(url, data) {
    return axios.post(`${apiUrl}${url}`, data)
  },

  put(url, data) {
    return axios.put(`${apiUrl}${url}`, data)
  },

  delete(url) {
    return axios.delete(`${apiUrl}${url}`)
  },

  patch(url, data) {
    return axios.patch(`${apiUrl}${url}`, data)
  },

  all(values) {
    return axios.all(values)
  },

  catch(dispatch) {
    return error => dispatch({ type: actionTypes.API_ERROR, error })
  },

  getImageUrl(path) {
    return `${apiUrl}/${path}`
  },
}

export default api
