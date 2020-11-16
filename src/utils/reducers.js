import { combineReducers } from 'redux'
import { projectReducer, canvasesReducer, activeProjectReducer } from '../Projects/reducers'
import { isCanvasGridViewReducer, editModeReducer, pinsReducer, activeCanvasReducer } from '../Canvas/reducers'
import { userReducer } from '../Main/reducer'

const reducers = combineReducers({
  isCanvasGridView: isCanvasGridViewReducer,
  editMode: editModeReducer,
  pins: pinsReducer,
  projects: projectReducer,
  canvases: canvasesReducer,
  activeProject: activeProjectReducer,
  activeCanvas: activeCanvasReducer,
  user: userReducer,
})

export default reducers
