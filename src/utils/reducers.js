import { combineReducers } from 'redux'
import { imagesReducer, sectionsReducer } from '../Sections/reducers'
import { projectReducer } from '../Projects/reducers'
import { isCanvasGridViewReducer, editModeReducer, webviewReducer, pinsReducer } from '../Canvas/reducers'
import { authReducer, userReducer } from '../Main/reducer'

const reducers = combineReducers({
  images: imagesReducer,
  sections: sectionsReducer,
  isCanvasGridView: isCanvasGridViewReducer,
  editMode: editModeReducer,
  webview: webviewReducer,
  pins: pinsReducer,
  auth: authReducer,
  project: projectReducer,
  user: userReducer,
})

export default reducers
