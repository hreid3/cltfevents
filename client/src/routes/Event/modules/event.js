// ------------------------------------
// Constants
// ------------------------------------

import {
  initialEventState as initialState,
  EVENT_ACTION_ADD,
  EVENT_SET_LOOKUP_DATA
} from './constants'

import {doGet} from '../../../utils/rest-client'

// ------------------------------------
// Actions
// ------------------------------------

export const addEvent = () => {
  return (dispatch, getState) => {
    fetchEventLookupData(dispatch).then(
      dispatch(eventFormReady(initialState.details))
    )
  }
}

export const fetchEventLookupData = (dispatch) => {
  return Promise.all([doGet('/church')])
    .then((fullData) => {
      const [churches] = fullData
      dispatch(setLookupData('hostingChurches', churches.payload))
    })
}

export const eventFormReady = (details) => {
  return {
    type: EVENT_ACTION_ADD,
    payload: {
      selectedTabId: 'eventsDetails',
      details: details
    }
  }
}

export const setLookupData = (key, values) =>{
  return {
    type: EVENT_SET_LOOKUP_DATA,
    payload: {
      key: key,
      values: values
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export const eventReducer  = (state = initialState, action) => {
  const payload = action.payload
  switch(action.type) {
    case EVENT_SET_LOOKUP_DATA:
      const lookupDataVal = Object.assign({}, state.lookupData)
      lookupDataVal[payload.key] = payload.values
      return {
        ...state,  lookupData: lookupDataVal // property copy
      }
    case EVENT_ACTION_ADD:
      return Object.assign({}, state, payload); // Object copy
    default:
      return state
  }
}

export default eventReducer

