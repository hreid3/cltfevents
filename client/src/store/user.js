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
  console.log('doLogin called', username, password)
  return {
    type    : USER_LOGGED_IN,
    payload : {username: username, email: "hreid@wgu.edu", loggedIn: true}
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
export const initialUserState =
  {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    loggedIn: false

  }
export default function userReducer (state = initialUserState, action) {
  switch(action.type) {
    case USER_LOGGED_IN:
      return Object.assign({}, state, action.payload);
    default:
      return state
  }
}
