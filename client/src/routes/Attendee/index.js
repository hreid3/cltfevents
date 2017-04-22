import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'attendee(/:slug)(/:action)',
  getComponent (nextState, cb) {
      const Attendee = require('./containers/AttendeeContainer').default
      const reducer = require('./modules/attendee').default
      injectReducer(store, { key: 'attendeeData', reducer })
      cb(null, Attendee)
  },
})
