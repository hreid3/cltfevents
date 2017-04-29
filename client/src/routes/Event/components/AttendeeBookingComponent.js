/**
 * Created by hreid on 4/24/17.
 */
import React from 'react'
import {
  textField,
  numberTextField,
  asyncSelectField,
  selectField,
  textareaField
} from '../../../components/ReduxFormRenderedFields'
import { reduxForm, Field } from 'redux-form'
import { getAvailableAttendees } from '../modules/event'
import DataObjectParser from 'dataobject-parser'
import { hideModal } from '../../../store/modal'

const validator = require('validate.js')

const statusOptions = [
  {'id': 'Active', 'title': 'Active'},
  {'id': 'Cancelled', 'title': 'Cancelled'},
]

const AttendeeBookingComponent = props => {
  // const attendeeId = ''
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    ticketPurchased,
  } = props

  const {
    attendeeId
  } = props.initialValues

  // The form will be be in new mode if attendeeId is empty
  let attendeeField = <div></div>
  if (!attendeeId) {
    attendeeField = <Field name="attendeeId" type="text" component={asyncSelectField} placeholder="Attendee"
           label="Select an attendee" loadOptions={getAvailableAttendees(props.initialValues.eventId)}/>
  } else {
    attendeeField = (
      <div className="attendee-booking-form__attendee-read-only text-center">
        <h3><span>{props.initialValues.attendee.firstName}</span> <span>{props.initialValues.attendee.lastName}</span></h3>
        <input type="hidden" name="attendeeId" value={attendeeId} />
      </div>
    )
  }
  return (
    <div className="attendee-booking-form container-fluid">
      <form onSubmit={handleSubmit} className="attendee-booking-form">
        <div className="rowWithFullWidth">
          <div className="col-md-12">
            {attendeeField}
          </div>
        </div>

        <div className="rowWithFullWidth">
          <div className="col-md-12 ">
            <Field name="numberSeatsReserved" type="number" component={numberTextField} label="Ticket Reserved"
                   placeholder="1" id="numberSeatsReserved" autoFocus={true}  min="0" max="99"  size="5" />
          </div>
        </div>
        <div className="rowWithFullWidth">
          <div className="col-md-12">
            <Field name="status" type="text" component={selectField} placeholder="Status"
                   label="Status" options={statusOptions}/>
          </div>
        </div>
        <div className="rowWithFullWidth">
          <div className="col-md-12">
            <Field name="notes" type="text" component={textareaField} placeholder="Optional notes may be entered here..."
                   label="Notes" options={statusOptions} rows="5"/>
          </div>
        </div>
        <div className="rowWithFullWidth">
          <div className="col-md-12 text-center">
            <hr/>
            <div>
              <button type="submit" disabled={submitting} className="btn btn-warning btn-sm">Submit</button>
              &nbsp;
              <button type="button" className="btn btn-default btn-sm"  onClick={e => props.dispatch(hideModal())}>Cancel</button>
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
