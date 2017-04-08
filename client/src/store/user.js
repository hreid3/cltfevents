// import browserHistory from 'react-router/lib/browserHistory'

// ------------------------------------
// Constants
// ------------------------------------
export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export const USER_LOGGED_OUT = "USER_LOGGED_OUT"

// ------------------------------------
// Actions
// ------------------------------------
export function doLogin (username, password) {
  return {
    type    : USER_LOGGED_IN,
    payload : {username: "john", email: "hreid@wgu.edu", loggedIn: false}
  }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
// export const updateLocation = ({ dispatch }) => {
//   return (nextLocation) => dispatch(locationChange(nextLocation))
// }

// ------------------------------------
// Reducer
// ------------------------------------yes
const initialState = {username: 'jay', email: "bell", loggedIn: false}
export default function userReducer (state = initialState, action) {
  switch(action.type) {
    case USER_LOGGED_IN:
      return Object.assign({}, state, {
        loggedIn: true
      });

    default:
      return state
  }
}
