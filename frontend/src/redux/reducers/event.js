// eventReducer.js

import * as actionTypes from "../actions/ActionTypesEvent";

const initialState = {
  isLoading: false,
  events: [],
  error: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EVENT_CREATE_REQUEST:
    case actionTypes.GET_ALL_EVENTS_REQUEST:
    case actionTypes.DELETE_EVENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypes.EVENT_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        events: [...state.events, action.payload],
      };
    case actionTypes.GET_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        events: action.payload,
      };
    case actionTypes.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        events: state.events.filter((event) => event.id !== action.payload),
      };
    case actionTypes.EVENT_CREATE_FAIL:
    case actionTypes.GET_ALL_EVENTS_FAILED:
    case actionTypes.DELETE_EVENT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default eventReducer;
