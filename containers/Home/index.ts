import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';

import Home from './Home';

const constants = {
  GET_DATA: 'home@get_data',
  GET_DATA_SUCCESS: 'home@get_data_success',
  GET_DATA_FAILED: 'home@get_data_failed'
};

const actions = {
  getHomeData() {
    return async dispatch => {
      dispatch({
        type: constants.GET_DATA,
      });
      try {
        const { data } = await Axios.get('https://randomuser.me/api');
        dispatch({
          type: constants.GET_DATA_SUCCESS,
          data,
        });
      } catch (e) {
        dispatch({
          type: constants.GET_DATA_FAILED,
          error: e,
        });
      }
    };
  },
};

const initialState = {
  fetching: false,
  data: null,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_DATA:
      return {
        ...state,
        fetching: true,
      };
    case constants.GET_DATA_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: false,
        data: action.data,
      };
    case constants.GET_DATA_FAILED:
      return {
        ...state,
        fetching: false,
        error: true,
      };
    default:
      return state;
  }
};

const mapStateToProps = state => ({ ...state.home });
const mapDispatchToProps = dispatch => ({ getData: () => dispatch(actions.getHomeData()) });

export {
  reducer,
  actions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
