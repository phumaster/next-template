import { createStore, applyMiddleware, combineReducers, StoreCreator, Middleware } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import logger from 'redux-logger'

import { reducer as home } from '@/containers/Home'

const rootReducer = combineReducers({
  home,
})

const middlewares: Middleware[] = [thunk]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

const store: StoreCreator = (initialState: any) => createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middlewares),
)

export type AppState = ReturnType<typeof rootReducer>
export interface StoreTypes extends StoreCreator {
  dispatch(action: ThunkAction<void, null, AppState, any>): void
  getState(): any
}

export default store
