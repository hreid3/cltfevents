/**
 * Created by hreid on 4/24/17.
 */
import React from 'react'
import {
  textField,
  asyncSelectField,
  selectField
} from '../../../components/ReduxFormRenderedFields'
import { reduxForm, Field } from 'redux-form'
import { getAvailableAttendees } from '../modules/event'
import DataObjectParser from 'dataobject-parser'
const validator = require('validate.js')

const statusOptions = [
  {'id': 'Active', 'title': 'Active'},
  {'id': 'Cancelled', 'title': 'Cancelled'},
]

const AttendeeBookingComponent = props => {
  const attendeeId = ''
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    ticketPurchased
  } = props
  // The form will be be in new mode if attendeeId is empty
  return (
    <div>
      <form onSubmit={handleSubmit} className="attendee-booking-form">
        <div className="row">
          <div className="col-12">
            <Field name="attendeeId" type="text" component={asyncSelectField} placeholder="Attendee"
                   label="Select an attendee" loadOptions={getAvailableAttendees(props.initialValues.eventId)}/>
          </div>
        </div>

        <div className="row">
          <div className="col-12 ">
            <Field name="ticketPurchased" type="number" component={textField} label="Ticket Purchased"
                   placeholder="1" id="ticketPurchased" autoFocus={true} size="5" />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Field name="status" type="text" component={selectField} placeholder="Status"
                   label="Status" options={statusOptions}/>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <hr/>
            <div>
              <button type="submit" disabled={submitting} className="pt-button pt-intent-primary">Submit <span
                className="pt-icon-standard pt-icon-arrow-right pt-align-right"></span></button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

const constraints = {
  "status": {presence: {message: "was not selected"}},
  "attendeeId": {presence: {message: "was not selected"}},
  "ticketPurchased": {numericality: {onlyInteger: true, greaterThanOrEqualTo: true}},

}

export const validate = values => {
  const d = new DataObjectParser()
  const errors = validator(values, constraints)
  if (errors) {
    _.forIn(errors, (val, key) => d.set(key, val))
  }
  return { ...d.data() }
}

export default reduxForm(
  {
    form: 'attendeeBookingForm',
    validate: validate
  })(AttendeeBookingComponent)
