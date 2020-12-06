import { combineReducers } from 'redux'
import { projectReducer, canvasesReducer, activeProjectReducer } from '../Projects/reducers'
import { editModeReducer, activeCanvasReducer, sectionsReducer, zoom } from '../Canvas/reducers'
import { annotations, activePin } from '../Annotations/reducers'
import { userReducer } from '../Main/reducer'

const reducers = combineReducers({
  editMode: editModeReducer,
  annotations,
  projects: projectReducer,
  canvases: canvasesReducer,
  sections: sectionsReducer,
  activeProject: activeProjectReducer,
  activeCanvas: activeCanvasReducer,
  user: userReducer,
  activePin,
  zoom,
})

export default reducers
