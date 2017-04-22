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

export const initialAttendeeForm = () => {
  return (dispatch, getState) => {
    return Promise.all([doGet('/church'), doGet('/attendee/roles'), doGet('/attendee/status')])
      .then((fullData) => {
        const[churches, roles, statuses] = fullData
        dispatch(setData('homeChurches', churches))
        dispatch(setData('statuses', statuses))
        dispatch(setData('roles', roles))
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
        console.log('success1')
        dispatch(reset('attendeeForm'))
        console.log('success2')
        browserHistory.push('/attendee')
        console.log('success3')
      })
      .catch(errors => {
        console.log(errors)
        throw new SubmissionError(errors)
      })
  }
}


// ------------------------------------
// Reducer
// ------------------------------------
export const attendeeReducer  = (state = initialState, action) => {
  const payload = action.payload
  switch(action.type) {
    case ATTENDEE_INITIALIZE:
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
