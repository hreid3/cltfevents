import { combineReducers } from 'redux'
import locationReducer from './location'
import userReducer from './user'
import { reducer as formReducer } from 'redux-form'
import { modalReducer} from './modal'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    user: userReducer,
    form: formReducer,
    modal: modalReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
