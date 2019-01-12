import actionTypes from '../constants/actionTypes';

export function canvasReducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.UPDATE_CANVAS:
      return action.canvas;
    default:
      return state;
  }
}