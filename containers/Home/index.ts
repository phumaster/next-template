import Axios from 'axios'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AppState } from '@/base/store'

import Home from './Home'

/**
 * Constants
 */
const GET_HOME_DATA = 'GET_HOME_DATA'
const GET_HOME_DATA_SUCCESS = 'GET_HOME_DATA_SUCCESS'
const GET_HOME_DATA_FAILED = 'GET_HOME_DATA_FAILED'

/**
 * Types
 */
interface User {
  gender: number
  name: any
  [key: string]: any
}

interface Data {
  results: User[] | any
  info: any
}

export interface HomeState {
  fetching: boolean
  data: Data | null
  error: boolean
}

interface GetHomeDataAction {
  type: typeof GET_HOME_DATA
}

interface GetHomeDataSuccess {
  type: typeof GET_HOME_DATA_SUCCESS
  data: User[] | any
}

interface GetHomeDataFailed {
  type: typeof GET_HOME_DATA_FAILED
  error: any
}

type HomeActionTypes = GetHomeDataAction | GetHomeDataSuccess | GetHomeDataFailed

function getHomeDataRequest(): HomeActionTypes {
  return {
    type: GET_HOME_DATA
  }
}

function getHomeDataSuccess(data: User[] | any): HomeActionTypes {
  return {
    type: GET_HOME_DATA_SUCCESS,
    data
  }
}

function getHomeDataFailed(error: any): HomeActionTypes {
  return {
    type: GET_HOME_DATA_FAILED,
    error
  }
}

/**
 * Actions
 */
export const getHomeData = (): ThunkAction<void, null, AppState, Action<string>> => async dispatch => {
  dispatch(getHomeDataRequest());
  try {
    const { data } = await Axios.get('https://randomuser.me/api');
    dispatch(getHomeDataSuccess(data));
  } catch (e) {
    dispatch(getHomeDataFailed(e));
  }
}

/**
 * Reducer
 */
const initialState: HomeState = {
  fetching: false,
  data: null,
  error: false,
}

export const reducer = (state = initialState, action: HomeActionTypes): HomeState => {
  switch (action.type) {
    case GET_HOME_DATA:
      return {
        ...state,
        fetching: true,
      };
    case GET_HOME_DATA_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: false,
        data: action.data,
      };
    case GET_HOME_DATA_FAILED:
      return {
        ...state,
        fetching: false,
        error: true,
      };
    default:
      return state;
  }
}

/**
 * map to component
 */
const mapStateToProps = (state: AppState) => ({ ...state.home })
const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, null, any>) => ({ getData: () => dispatch(getHomeData()) })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
