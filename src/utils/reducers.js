import { combineReducers } from 'redux';
import { imagesReducer } from '../ImagesList/reducers';

const reducers = combineReducers({
  images: imagesReducer,
});

export default reducers;
