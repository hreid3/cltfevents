// ------------------------------------
// Constants
// ------------------------------------

import {
  initialEventState as initialState,
  EVENT_ACTION_ADD,

} from './constants'

// ------------------------------------
// Actions
// ------------------------------------

export const addEvent = () => {
  return {
    type: EVENT_ACTION_ADD,
    payload: {
      selectedTabId: 'eventsDetails',
      details: initialState.details
    }
  }
}

export const fetchEventLookupData = () => {

}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [EVENT_ACTION_ADD] : (state, action) => Object.assign({}, state, action.payload),
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function eventReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
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

