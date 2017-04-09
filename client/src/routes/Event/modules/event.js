// ------------------------------------
// Constants
// ------------------------------------

const EVENT_STATUS_PUBLISHED = 'published'
const EVENT_STATUS_CLOASED = 'closed'
const EVENT_STATUS_DRAFT = 'draft'
const EVENT_STATUS_CANCELED = 'canceled'
const EVENT_STATUS_UNDER_REVIEW = 'under-review'

const EVENT_TYPE_PUBLIC = 'Public'
const EVENT_TYPE_PRIVATE = 'Private'
const EVENT_TYPE_SPECIAL = 'Special'

const EVENT_LEVEL_FELLOWSHIP = 'Fellowship'
const EVENT_LEVEL_CHURCH = 'Church'
const EVENT_LEVEL_EXTERNAL = 'External'

const EVENT_ACTION_ADD = "EVENT_ADD"
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

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [EVENT_ACTION_ADD] : (state, action) => Object.assign({}, state, action.payload),
  // [EVENT_FORM_INCREMENT]    : (state, action) => state + action.payload,
  // [EVENT_FORM_DOUBLE_ASYNC] : (state, action) => state * 2
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  selectedTabId: 'eventsGrid',
  grid: {
    results: [],
    filter: [],
  },
  details: {
    title: '',
    description: '',
    hostingChurch: {
      id: -1,
      title: ''
    },
    location: {
      id: -1,
      street: '',
      city: '',
      state: '',
      postal: '',
      country: {
        code: -1,
        title: ''
      }
    },
    numberOfSeats: 0,
    titlePrice: 0.00,
    guestSpeakers: [],
    suppliers: [],
    contacts: [],
    status: EVENT_STATUS_DRAFT,
    type: EVENT_TYPE_PUBLIC,
    level: EVENT_LEVEL_CHURCH,
    images: [],
    notes: ''
  }
}
export default function eventReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
