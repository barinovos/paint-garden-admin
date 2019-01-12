import actionTypes from '../constants/actionTypes';
import api from '../utils/api';
import Constants from '../constants';
const { API } = Constants;

export function fetchCanvas() {
  return dispatch =>
    api.get(API.CANVAS)
      .then(resp => resp.data)
      .then(canvas => dispatch(refresh(canvas)))
      .catch(err => console.log(err))
}

export function updateCanvas(id, data) {
  return dispatch =>
    api.put(`${API.CANVAS}/${id}`, data)
      .then(resp => resp.data)
      .then(canvas => dispatch(refresh(canvas)))
      .catch(err => console.log(err))
}

const refresh = canvas => ({ type: actionTypes.UPDATE_CANVAS, canvas });