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
      console.log('churches',churches)
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
  console.log('churches',values)
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
      const lookupDataVal = state.lookupData
      lookupDataVal[payload.key] = payload.values
      return {
        ...state,  lookupData: lookupDataVal
      }
    case EVENT_ACTION_ADD:
      return Object.assign({}, state, payload);
    default:
      return state
  }
}

// export function increment (value = 1) {
//   return {
//     type    : EVENT_FORM_INCREMENT,
//     payload : value
//   }
// }

/*  This is a thunk, meaning it is a function that immediately
 returns a function for lazy evaluation. It is incredibly useful for
 creating async actions, especially when combined with redux-thunk! */

// export const doubleAsync = () => {
//   return (dispatch, getState) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         dispatch({
//           type    : EVENT_FORM_DOUBLE_ASYNC,
//           payload : getState().counter
//         })
//         resolve()
//       }, 200)
//     })
//   }
// }

// export const actions = {
//   increment,
//   doubleAsync
// }

export default eventReducer

