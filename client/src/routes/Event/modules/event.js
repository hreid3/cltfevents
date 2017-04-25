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
  EVENT_DETAIL_SHOW,
  EVENT_ADD_ATTENDEE,
  attendeeBooking
} from './constants'

import {doGet, EVENT_API_ENDPOINT_BASE, defaultHeaders, request} from '../../../utils/rest-client'
import { initialize as reduxFormInitialize } from 'redux-form'
// ------------------------------------
// Actions
// ------------------------------------

export const addEvent = () => {
  return (dispatch, getState) => {
    fetchEventLookupData(dispatch).then(() =>{
      dispatch(eventFormReady(Object.assign({}, initialState.details)));
      dispatch(reduxFormInitialize('eventForm', getState().eventData))
    })
  }
};

export const editEvent = (slug) => {
  return (dispatch, getState) => {
    return Promise.all([doGet('/event/' + slug), fetchEventLookupData(dispatch)])
      .then((fullData) => {
        const [details] = fullData;
        dispatch(eventFormReady(details.payload));
        dispatch(reduxFormInitialize('eventForm', getState().eventData))
      })
  }
};

export const deleteEvent = (slug) => {
  return (dispatch, getState) => {
    const options = {
      method: 'DELETE',
      headers: defaultHeaders,
      mode: 'cors',
      cache: 'default',
    };

    return request('/event/' + slug, options)
      .then(data => {
        fetchEvents(dispatch)
      })
      .catch(errors => {
        throw new SubmissionError(errors)
      })
  }
};

export const fetchEventLookupData = (dispatch) => {
  return Promise.all([doGet('/church'), doGet('/status'), doGet('/type'), doGet('/level')])
    .then((fullData) => {
      const [churches, statuses, types, levels] = fullData;
      dispatch(setLookupData('hostingChurches', churches.payload));
      dispatch(setLookupData('statuses', statuses.payload));
      dispatch(setLookupData('types', types.payload));
      dispatch(setLookupData('levels', levels.payload))
    })
};

export const loadEventData = (filter = []) => { // TODO: Need Filter
  return (dispatch, getState) => {
    fetchEvents(dispatch, filter).then(() => {
    })
  }
};

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
};

const showEventDetails = (details) => {
  details.attendees = [];
  return {
    type: EVENT_DETAIL_SHOW,
    payload: {
      details: details
    }
  }
};

const fetchEvents = (dispatch, filter = []) => {
  return Promise.all([doGet('/event')])
    .then((fullData) => {
    const [results] = fullData;
    dispatch(showEventsGrid(results.payload, filter))
  })
};

export const eventFormReady = (details) => {
  return {
    type: EVENT_ACTION_ADD,
    payload: {
      selectedTabId: 'eventsDetails',
      details: details
    }
  }
};

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
};

export const setLookupData = (key, values) =>{
  return {
    type: EVENT_SET_LOOKUP_DATA,
    payload: {
      key: key,
      values: values
    }
  }
};

export const doSubmitEventForm = (values) => {
  return (dispatch, getState) => {
    values.details.startDateTime = moment(values.details.startDateTime , "DD/MM/YYYY hh:mm a");//;Date.parse(value)
    const options = {
      method: 'POST',
      headers: defaultHeaders,
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(values.details)
    };

    return request('/event', options)
      .then(data => {
        dispatch(showEventsGrid());
        dispatch(reset('eventForm'));
        browserHistory.push('/events')
      })
      .catch(errors => {
        throw new SubmissionError(errors)
      })
  }
}

export const addEventAttendee = eventId => {
  const anAttendeeBooking = {...attendeeBooking};
  anAttendeeBooking.eventId = eventId;
  return {
    type: EVENT_ADD_ATTENDEE,
    payload: anAttendeeBooking
  }
}

export const getAvailableAttendees = (slug) => {
  return async (searchText) => {
    // export const getAvailableAttendees = async (searchText, slug) => {
    if (searchText.length >= 3) {
      try {
        const results = await
        doGet('/events/' + slug + '/attendee?q=' + encodeURI(searchText))
        return results
      } catch (err) {
        console.error(err)
      }
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export const eventReducer  = (state = initialState, action) => {
  const payload = action.payload;
  // console.log('payload', payload)
  switch(action.type) {
    case EVENT_SET_LOOKUP_DATA:
      const lookupDataVal = Object.assign({}, state.lookupData);
      lookupDataVal[payload.key] = payload.values;
      return {
        ...state,  lookupData: lookupDataVal // property copy
      };
    case EVENT_ACTION_ADD:
    case EVENT_SHOW_LANDING_PAGE:
    case EVENT_DETAIL_SHOW:
      return Object.assign({}, state, payload); // Object copy
    case EVENT_ADD_ATTENDEE:
      const details = state.details;
      details.attendees.push(payload);
      const payload2 = details;
      console.log('payload2', payload2);
      return Object.assign({}, state, payload2); // Object copy
    default:
      return state
  }
};

export default eventReducer

