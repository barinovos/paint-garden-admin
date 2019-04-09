import actionTypes from '../constants/actionTypes'
import api from '../utils/api'
import Constants from '../constants'

export function changeCanvasGridMode(isCanvasGridView) {
  return { type: actionTypes.CHANGE_CANVAS_GRID_MODE, isCanvasGridView }
}

export function changeCanvasMode(mode) {
  return { type: actionTypes.CHANGE_CANVAS_MODE, mode }
}

export function updateCanvas(sectionId, canvas) {
  return dispatch =>
    api
      .put(`${Constants.API.SECTION}/${sectionId}`, { canvas })
      .then(resp => dispatch(updateSections(resp.data)))
      .catch(err => console.log(err))
}

const updateSections = ({ sections }) => ({ type: actionTypes.UPDATE_SECTIONS, sections })
