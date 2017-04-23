/**
 * Created by hreid on 4/19/17.
 */
import {SubmissionError, reset} from 'redux-form'
import {browserHistory} from 'react-router'
import { initialize as reduxFormInitialize } from 'redux-form'

import { initialState } from './constants'
import {doGet, EVENT_API_ENDPOINT_BASE, defaultHeaders, request} from '../../../utils/rest-client'

const ATTENDEE_INITIALIZE = '@cltf/INITIALIZE'
const ATTENDEE_LOOKUP_DATA = '@cltf/LOOKUP_DATA'
const ATTENDEE_SEARCH_RESULTS = '@cltf/SEARCH_RESULTS'
const ATTENDEE_SET_DETAILS = '@cltf/ATTENDEE_SET_DETAILS'

export const initialAttendeeForm = _id => {
  return (dispatch, getState) => {
    const promisesAll = [doGet('/church'), doGet('/attendee/roles'), doGet('/attendee/status')]
    if (_id) {
      promisesAll.push(doGet('/attendee/' + _id))
    }
    const promises = Promise.all(promisesAll)
    return promises.then((fullData) => {
      console.log(fullData)
      const[churches, roles, statuses, details] = fullData
      dispatch(setData('homeChurches', churches))
      dispatch(setData('statuses', statuses))
      dispatch(setData('roles', roles))
      if (_id && details) {
        dispatch(setAttendeeForm(details.payload))
      } else {
        // Clear form
        dispatch(setAttendeeForm(initialState.details))
      }
      dispatch(reduxFormInitialize('attendeeForm', getState().attendeeData))
    })
  }
}

export const setData = (key, values) => {
  return {
    type: ATTENDEE_LOOKUP_DATA,
    payload: {
      key: key,
      values: values.payload
    }
  }
}

export const doSubmitAttendeeForm = values => {
  return (dispatch, getState) => {
    const options = {
      method: 'POST',
      headers: defaultHeaders,
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(values.details)
    }
    return request('/attendee', options)
      .then(data => {
        dispatch(reset('attendeeForm'))
        browserHistory.push('/attendee')
      })
      .catch(errors => {
        console.error(errors)
        throw new SubmissionError(errors)
      })
  }
}

export const doAttendeeSearch = (searchText, colInfos, multiColumnSearch) => {
  return (dispatch, getState) => {
    if (searchText.length == 0 || searchText.length >= 3) {
      return Promise.all([doGet('/attendee/search?q=' + encodeURI(searchText))])
        .then((fullData) => {
          const [results] = fullData
          dispatch(showAttendeeGrid(results.payload))
        })
        .catch(errors => {
          console.error(errors)
        })
    }
  }
}

export const showAttendeeGrid = (results = []) => {
  return {
    type: ATTENDEE_SEARCH_RESULTS,
    payload: {
      grid: {
        results: results,
        filter: []
      }
    }
  }
}

export const setAttendeeForm = details => {
  console.log('setAttendeeForm', details)
  return {
    type: ATTENDEE_SET_DETAILS,
    payload: {
      details: details
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export const attendeeReducer  = (state = initialState, action) => {
  const payload = action.payload
  switch(action.type) {
    case ATTENDEE_INITIALIZE:
    case ATTENDEE_SEARCH_RESULTS:
    case ATTENDEE_SET_DETAILS:
      return Object.assign({}, state, payload);
    case ATTENDEE_LOOKUP_DATA:
      const lookupDataVal = Object.assign({}, state.lookupData)
      lookupDataVal[payload.key] = payload.values
      return {
        ...state,  lookupData: lookupDataVal // property copy
      }
    default:
      return state
  }
}

export default attendeeReducer
