import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { addEvent, doSubmitEventForm, loadEventData, loadEventDetailData } from '../modules/event'
import {utc} from 'moment';
import EventLanding from '../components/EventLandingComponent'
import DataObjectParser from 'dataobject-parser'
import _ from 'lodash'
import moment from 'moment'

const validator = require('validate.js')

validator.extend(validator.validators.datetime, {
  parse: (value, options) => {
    const val = moment(value, "DD/MM/YYYY hh:mm a")//;Date.parse(value)
    console.log("valueOut", val)
    return val
  },
  format: (value, options) => {
    console.log('valueIn', value)
    return utc(value).format('DD/MM/YYYY hh:mm a')
  }
})

const constraints = {
  title: {
    presence: true,
    length: {
      minimum: 6,
      message: 'must be at least 6 characters'
    }
  },
  description: {
    presence: true,
    length: {
      minimum: 5,
      tooShort: "needs to have %{count} words or more",
      tokenizer: (value) => value.split(/\s+/g)
    }
  },
  "hostingChurch": {presence: {message: "was not selected"}},
  "location.label": {presence: true},
  "location.street": {presence: true},
  "location.city": {presence: true},
  "location.state": {presence: true},
  "location.postal": {presence: true},
  startDateTime: {
    datetime: {earliest: utc().subtract(1, 'day'), message: "must occur in the future."},
  },
  "eventStatus": {presence: {message: "was not selected"}},
  "eventType":   {presence: {message: "was not selected"}},
  "eventLevel":  {presence: {message: "was not selected"}},
  "totalPrice": {numericality: {greaterThanOrEqualTo: true}},
  "numberOfSeats": {numericality: {onlyInteger: true, greaterThanOrEqualTo: true}},
  "guestSpeakers": {presence: true},
}

export const validate = values => {
  const { details } = values
  const errors = validator(details, constraints)
  const d = new DataObjectParser();
  if (errors) {
    _.forIn(errors, (val, key) => d.set(key, val))
  }
  return {details: d.data()}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addEvent: () => dispatch(addEvent()),
    onSubmit: (values) => dispatch(doSubmitEventForm(values)),
    loadEventData: () => dispatch(loadEventData()),
    loadEventDetailsData: (slug) => dispatch(loadEventDetailData(slug)),//console.log("loadEventDetailData", slug),
    validate: validate
  }
}

const mapStateToProps = (state) => {
  return {...state.eventData, initialValues: state.eventData}
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'eventForm'})(EventLanding))
