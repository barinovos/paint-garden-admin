import actionTypes from '../constants/actionTypes';

export function imagesReducer(state = null, action) {
  switch (action.type) {
    case actionTypes.IMAGES_LOADED:
    case actionTypes.ADD_TO_CANVAS:
    case actionTypes.REMOVE_FROM_CANVAS:
    case actionTypes.DELETE_IMAGE:
    case actionTypes.UPDATE_IMAGE:
    case actionTypes.IMAGE_UPLOADED:
      return action.images;
    default:
      return state;
  }
}