import actionTypes from '../constants/actionTypes';
import api from '../utils/api';
import Constants from '../constants';
const { API } = Constants;

export function fetchImages() {
  return dispatch =>
    api.get(API.IMAGES)
      .then(resp => resp.data)
      .then(images => dispatch(updateImages(images)))
      .catch(err => console.log(err))
}

export function addToCanvas(id) {
  return dispatch =>
    api.put(`${API.ADD_TO_CANVAS}/${id}`)
      .then(resp => resp.data)
      .then(images => dispatch(updateImages(images)))
      .catch(err => console.log(err))
}

export function removeFromCanvas(id) {
  return dispatch =>
    api.delete(`${API.REMOVE_FROM_CANVAS}/${id}`)
      .then(resp => resp.data)
      .then(images => dispatch(updateImages(images)))
      .catch(err => console.log(err))
}

export function deleteImage(id) {
  return dispatch =>
    api.delete(`${API.IMAGE}/${id}`)
      .then(resp => resp.data)
      .then(images => dispatch(updateImages(images)))
      .catch(err => console.log(err))
}

export function updateImage(id, data) {
  return dispatch =>
    api.put(`${API.IMAGE}/${id}`, data)
      .then(resp => resp.data)
      .then(images => dispatch(updateImages(images)))
      .catch(err => console.log(err))
}

const updateImages = images => ({ type: actionTypes.IMAGES_LOADED, images });