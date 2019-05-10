import { combineReducers } from 'redux'
import { imagesReducer, sectionsReducer } from '../Sections/reducers'
import { isCanvasGridViewReducer, editModeReducer, webviewReducer, pinsReducer } from '../Canvas/reducers'

const reducers = combineReducers({
  images: imagesReducer,
  sections: sectionsReducer,
  isCanvasGridView: isCanvasGridViewReducer,
  editMode: editModeReducer,
  webview: webviewReducer,
  pins: pinsReducer,
})

export default reducers
