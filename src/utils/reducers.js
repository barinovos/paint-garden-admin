import { combineReducers } from 'redux';

const reducers = combineReducers({
  basic: (state = 123) => state,
});

export default reducers;
