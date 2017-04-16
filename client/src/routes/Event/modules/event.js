// ------------------------------------
// Constants
// ------------------------------------

import {SubmissionError} from 'redux-form'

import {
  initialEventState as initialState,
  EVENT_ACTION_ADD,
  EVENT_SET_LOOKUP_DATA,
  EVENT_SHOW_LANDING_PAGE
} from './constants'

import {doGet, EVENT_API_ENDPOINT_BASE, defaultHeaders} from '../../../utils/rest-client'

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

export const showEventsGrid = () => {

  return {
      type: EVENT_SHOW_LANDING_PAGE,
      payload: {
        selectedTabId: 'eventsGrid'
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
    const options = {
      method: 'POST',
      headers: defaultHeaders,
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(values.details)
    }
    return request('/event', options)
      .then(data => {
        console.log('then', data)
      })
      .catch(errors => {
        throw new SubmissionError(errors)
      })
  }
}
// export const doSubmitEventForm = (values) => {
//   // First convert values into eventData store before sending to server
//   return (dispatch, getState) => {
//     const options = {
//       method: 'POST',
//       headers: defaultHeaders,
//       mode: 'cors',
//       cache: 'default',
//       body: JSON.stringify(values.details)
//     }
//     const request = new Request(`${EVENT_API_ENDPOINT_BASE}/event`, options)
//     return fetch(request)
//       .then(response =>  {
//         if (response.status === 400) {
//           console.log('notOk', response)
//           response.json().then(data => {
//             console.log('errors', data)
//             throw new SubmissionError(data.reason.errors)
//           })
//         } else {
//           dispatch(showEventsGrid())
//         }
//       })
//       .catch((error) => {
//         // console.log('error', uri, error)
//         return new Promise(error)
//       })
//   }
// }


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

