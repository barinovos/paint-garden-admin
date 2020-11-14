import { combineReducers } from 'redux'
import { imagesReducer, sectionsReducer } from '../Sections/reducers'
import { projectReducer, canvasesReducer, activeProjectReducer } from '../Projects/reducers'
import { isCanvasGridViewReducer, editModeReducer, webviewReducer, pinsReducer } from '../Canvas/reducers'
import { userReducer } from '../Main/reducer'

const reducers = combineReducers({
  images: imagesReducer,
  sections: sectionsReducer,
  isCanvasGridView: isCanvasGridViewReducer,
  editMode: editModeReducer,
  webview: webviewReducer,
  pins: pinsReducer,
  projects: projectReducer,
  canvases: canvasesReducer,
  activeProject: activeProjectReducer,
  user: userReducer,
})

export default reducers
