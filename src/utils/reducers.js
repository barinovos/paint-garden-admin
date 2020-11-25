import { combineReducers } from 'redux'
import { projectReducer, canvasesReducer, activeProjectReducer } from '../Projects/reducers'
import { editModeReducer, pinsReducer, activeCanvasReducer, sectionsReducer } from '../Canvas/reducers'
import { userReducer } from '../Main/reducer'

const reducers = combineReducers({
  editMode: editModeReducer,
  pins: pinsReducer,
  projects: projectReducer,
  canvases: canvasesReducer,
  sections: sectionsReducer,
  activeProject: activeProjectReducer,
  activeCanvas: activeCanvasReducer,
  user: userReducer,
})

export default reducers
