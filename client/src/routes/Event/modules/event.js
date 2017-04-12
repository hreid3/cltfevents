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
  return Promise.all([doGet('/church'), doGet('/status'), doGet('/type'), doGet('/level')])
    .then((fullData) => {
      const [churches, statuses, types, levels] = fullData
      dispatch(setLookupData('hostingChurches', churches.payload))
      dispatch(setLookupData('statuses', statuses.payload))
      dispatch(setLookupData('types', types.payload))
      dispatch(setLookupData('levels', levels.payload))
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

export const doSubmitEventForm = (values) => {
  // First convert values into eventData store before sending to server
    console.log('submit', values)
    return {
      type: '@cltfevent/TEMP',
      payload: {}
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

