// ------------------------------------
// Constants
// ------------------------------------

import {SubmissionError, reset} from 'redux-form'
import {browserHistory} from 'react-router'
import moment from 'moment'


import {
  initialEventState as initialState,
  EVENT_ACTION_ADD,
  EVENT_SET_LOOKUP_DATA,
  EVENT_SHOW_LANDING_PAGE,
  EVENT_DETAIL_SHOW
} from './constants'

import {doGet, EVENT_API_ENDPOINT_BASE, defaultHeaders} from '../../../utils/rest-client'
import { initialize as reduxFormInitialize } from 'redux-form'
// ------------------------------------
// Actions
// ------------------------------------

export const addEvent = () => {
  return (dispatch, getState) => {
    fetchEventLookupData(dispatch).then(() =>{
      dispatch(eventFormReady(Object.assign({}, initialState.details)))
      dispatch(reduxFormInitialize('eventForm', getState().eventData))
    })
  }
}

export const editEvent = (slug) => {
  return (dispatch, getState) => {
    return Promise.all([doGet('/event/' + slug), fetchEventLookupData(dispatch)])
      .then((fullData) => {
        const [details] = fullData
        dispatch(eventFormReady(details.payload))
        dispatch(reduxFormInitialize('eventForm', getState().eventData))
      })
  }
}

export const deleteEvent = (slug) => {
  return (dispatch, getState) => {
    const options = {
      method: 'DELETE',
      headers: defaultHeaders,
      mode: 'cors',
      cache: 'default',
    }

    return request('/event/' + slug, options)
      .then(data => {
        fetchEvents(dispatch)
        // dispatch(showEventsGrid())
        // browserHistory.push('/events')
      })
      .catch(errors => {
        throw new SubmissionError(errors)
      })
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

export const loadEventData = (filter = []) => { // TODO: Need Filter
  return (dispatch, getState) => {
    fetchEvents(dispatch, filter).then(() => {
    })
  }
}

export const loadEventDetailData = (slug) => { // TODO: Need Filter
  return (dispatch, getState) => {
    doGet('/event/' + slug)
      .then((fullData) => {
        dispatch(showEventDetails(fullData.payload))
      })
      .catch((e) => {
        console.log('show 404', e)
      })
  }
}

const showEventDetails = (details) => {
  return {
    type: EVENT_DETAIL_SHOW,
    payload: {
      details: details
    }
  }
}

const fetchEvents = (dispatch, filter = []) => {
  return Promise.all([doGet('/event')])
    .then((fullData) => {
    const [results] = fullData
    dispatch(showEventsGrid(results.payload, filter))
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

export const showEventsGrid = (results = [], filter = [] ) => {
  return {
      type: EVENT_SHOW_LANDING_PAGE,
      payload: {
        selectedTabId: 'eventsGrid',
        grid: {
          results: results,
          filter: filter
        }
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
  return (dispatch, getState) => {
    values.details.startDateTime = moment(values.details.startDateTime , "DD/MM/YYYY hh:mm a")//;Date.parse(value)
    const options = {
      method: 'POST',
      headers: defaultHeaders,
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(values.details)
    }

    return request('/event', options)
      .then(data => {
        dispatch(showEventsGrid())
        dispatch(reset('eventForm'))
        browserHistory.push('/events')
      })
      .catch(errors => {
        throw new SubmissionError(errors)
      })
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
    case EVENT_SHOW_LANDING_PAGE:
    case EVENT_DETAIL_SHOW:
      console.log('payload', payload)
      return Object.assign({}, state, payload); // Object copy
    default:
      return state
  }
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON, status from the response
 */
function parseJSON(response) {
  return new Promise((resolve) => response.json()
    .then((json) => resolve({
      status: response.status,
      ok: response.ok,
      json,
    })));
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {Promise}           The request promise
 */
export function request(url, options) {
  return new Promise((resolve, reject) => {
    fetch(EVENT_API_ENDPOINT_BASE  + url, options)
      .then(parseJSON)
      .then((response) => {
        if (response.ok) {
          return resolve(response.json);
        }
        // extract the error from the server's json
        return reject(response.json.reason.errors);
      })
      .catch((error) => reject({
        networkError: error.message,
      }));
  });
}
export default eventReducer

