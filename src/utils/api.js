import axios from 'axios';
import actionTypes from '../constants/actionTypes';
const config = require('../../config.json');
const apiUrl = `${config.apiUrl}${config.prefix}`;

const api = {
  get(url, params, noLang) {
    let path = noLang ? `${apiUrl}${url}` : `${apiUrl}${url}?language=${api.language}`;
    if (params) {
      Object.keys(params).forEach(key => {
        path += `&${key}=${encodeURIComponent(params[key])}`;
      });
    }
    return axios.get(path);
  },

  post(url, data) {
    return axios.post(`${apiUrl}${url}?lang=${api.language}`, data);
  },

  put(url, data) {
    return axios.put(`${apiUrl}${url}?lang=${api.language}`, data);
  },

  delete(url) {
    return axios.delete(`${apiUrl}${url}?lang=${api.language}`);
  },

  patch(url, data) {
    return axios.patch(`${apiUrl}${url}?lang=${api.language}`, data);
  },

  all(values) {
    return axios.all(values);
  },

  getLang() {
    return api.language;
  },

  setLang(l) {
    api.language = l;
  },

  // the catch handler to dispatch the error to the State
  /*
   Example:
     dispatch => api.get("some_url").catch(api.catch(dispatch));
   */
  catch(dispatch) {
    return error => dispatch({ type: actionTypes.API_ERROR, error });
  },

  catchNotFound() {
    // location.href = Constants.ROUTES.NOT_FOUND;
  },

  getImageUrl(path, size = 'medium') {
    // console.log("Image Request: ",`${config.cdnUrl}${config.imagesPrefix}/${config.dimensions[size]}/${path}`);
    return `${config.cdnUrl}${config.imagesPrefix}/${config.dimensions[size]}/${path}`;
  },
};

export default api;
