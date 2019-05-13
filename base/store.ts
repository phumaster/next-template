import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { reducer as home } from '@/containers/Home';

const reducers = combineReducers({
  home,
});

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export default initialState => createStore(
  reducers,
  initialState,
  applyMiddleware(...middlewares),
);
