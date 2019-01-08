import actionTypes from '../constants/actionTypes';

export function imagesReducer(state = null, action) {
  switch (action.type) {
    case actionTypes.IMAGES_LOADED:
      return action.images;
    case actionTypes.IMAGE_UPLOADED:
      return (state || []).concat(action.images);
    default:
      return state;
  }
}