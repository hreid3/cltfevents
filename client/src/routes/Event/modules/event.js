// ------------------------------------
// Constants
// ------------------------------------

import {SubmissionError, reset} from 'redux-form'
import {browserHistory} from 'react-router'
import moment from 'moment'
import { hideModal} from '../../../store/modal'
import _ from 'lodash'

import {
  initialEventState as initialState,
  EVENT_ACTION_ADD,
  EVENT_SET_LOOKUP_DATA,
  EVENT_SHOW_LANDING_PAGE,
  EVENT_DETAIL_SHOW,
  EVENT_SHOW_EVENT_ATTENDEES,
  EVENT_INITIAL_DETAILS_STATE,
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
}

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
}

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
    dispatch(initialDetailsState())
    doGet('/event/' + slug)
      .then((fullData) => {
        dispatch(showEventDetails(fullData.payload))
        dispatch(getEventAttendees())
      })
      .catch((e) => {
        console.log('show 404', e)
      })
  }
}

const showEventDetails = (details) => (
  {
    type: EVENT_DETAIL_SHOW,
    payload: {
      details: details
  }
})

const fetchEvents = (dispatch, filter = []) => {
  return Promise.all([doGet('/event')])
    .then((fullData) => {
    const [results] = fullData;
    dispatch(showEventsGrid(results.payload, filter))
  })
};

export const initialDetailsState = () => (
  {
    type: EVENT_INITIAL_DETAILS_STATE,
    payload: {
      details: Object.assign({}, initialState.details)
    }
  }
)
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
        },
        details: Object.assign({}, initialState.details)
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
}

export const doSubmitEventForm = (values) => {
  return (dispatch, getState) => {
    values.details.startDateTime = moment(values.details.startDateTime , "DD/MM/YYYY hh:mm a");//;Date.parse(value)
    const options = {
      method: 'POST',
      headers: defaultHeaders,
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(values.details)
    }

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

export const doSubmitAttendeeForm = values => (dispatch, getState) => {
  values.attendeeId = _.isObject(values.attendeeId) ? values.attendeeId.value : values.attendeeId
  values.status = _.isObject(values.status) ? values.status.id : values.status
  const options = {
    method: 'POST',
    headers: defaultHeaders,
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify(values)
  }
  return request('/event/' + getState().eventData.details.slug + '/attendees', options)
    .then(data => {
      dispatch(getEventAttendees())
      dispatch(hideModal())
    })
    .catch(errors => {
      throw new SubmissionError(errors)
    })
}

export const doSubmitPaymentForm = (values, row, props) => (dispatch, getState) => {
  values.method = _.isObject(values.method) ? values.method.id : values.method
  const options = {
    method: 'POST',
    headers: defaultHeaders,
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify(values)
  }
  return request('/event/' + row.eventId + '/event-booking/' + row.eventBookingId, options)
    .then(data => {
      props.message = "Payment Added" // Not using store.
      dispatch(getEventAttendees())
      // dispatch(hideModal())
    })
    .catch(errors => {
      throw new SubmissionError(errors)
    })
}

export const getEventAttendees = () => (dispatch, getState) => doGet('/event/' + getState().eventData.details.slug + "/attendees")
    .then(data => dispatch(setEventAttendees(data.payload.map(val => {
      console.log(val.payments)
      const total = val.numberSeatsReserved * val.event.ticketPrice
      const amtPaid = val.payments.reduce((a, b) => ({amount: a.amount + b.amount}), {amount: 0}).amount
      return {
        ...val,
        attendeeId: val.attendee._id,
        slug: val.event.slug,
        totalCosts:total,
        eventId: val.event.slug,
        amountPaid: amtPaid,
        amountOwed: total - amtPaid,
        eventBookingId: val._id
      }
    }
    ))))
    .catch(err => console.error(err))

export const setEventAttendees = values => (
  {
    type: EVENT_SHOW_EVENT_ATTENDEES,
    payload: values
  })

export const getAvailableAttendees = (slug) => (searchText, cb) => doGet('/event/' + slug + '/available-attendees?q=' + encodeURI(searchText))
      .then(data => data.payload.map(val => ({
        value: val._id,
        label: val.firstName + " " + val.lastName + "-" + val.email
      }))).then(data => cb(null, {options: data}))
      .catch((err) =>  console.error(err))

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
    case EVENT_INITIAL_DETAILS_STATE:
      return Object.assign({}, state, payload); // Object copy
    case EVENT_SHOW_EVENT_ATTENDEES:
      state.attendees = {data: payload}
      let temp = {...state}
      temp.off = Math.random() // TODO:  Immutable.js
      return temp
    default:
      return state
  }
};

export default eventReducer

