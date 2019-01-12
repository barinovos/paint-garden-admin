import { combineReducers } from 'redux';
import { imagesReducer } from '../ImagesList/reducers';
import { canvasReducer } from '../Canvas/reducers';

const reducers = combineReducers({
  images: imagesReducer,
  canvas: canvasReducer,
});

export default reducers;
