import actionTypes from '../constants/actionTypes';
import api from '../utils/api';

export function fetchImages() {
  return dispatch =>
    api.get('/')
      .then(resp => resp.data)
      .then(images => dispatch({ type: actionTypes.IMAGES_LOADED, images }))
      .catch(err => console.log(err))
}
