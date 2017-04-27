/**
 * Created by hreid on 4/27/17.
 */
import React from 'react'
import {
  textField,
  selectField
} from '../../../components/ReduxFormRenderedFields'

import { reduxForm, Field } from 'redux-form'
import DataObjectParser from 'dataobject-parser'
const validator = require('validate.js')

const AttendeePaymentComponent = props => {

  const paymentMethods = [
    {"id": "Cash", "title": "Cash"},
    {"id": "Check", "title": "Check"},
    {"id": "Gift", "title": "Gift"},
    {"id": "Credit Card", "title": "Credit Card"},
  ]

  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    payments,
    eventBookingId,
  } = props

  return (
    <div>
      <form onSubmit={handleSubmit} className="attendee-payment-form">
        <div className="row">
          <div className="col-12">
            <Field name="amount" type="number" component={textField} label="Payment Amount"
                   placeholder="1" id="amount" autoFocus={true}  min="0" max="9999" step="0.01" size="5"  />
          </div>
          <div className="row">
            <div className="col-12">
              <Field name="method" type="text" component={selectField} placeholder="Payment Method"
                     label="Payment Method" options={paymentMethods} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <hr/>
            <div>
              <button type="submit" disabled={submitting} className="pt-button pt-intent-primary">Submit<span
                className="pt-icon-standard pt-icon-arrow-right pt-align-right"></span></button>
            </div>
          </div>
        </div>
      </form>
      <div>Payment Grid will go here.</div>
    </div>
  )
}

const constraints = {
  "method": {presence: {message: "was not selected"}},
  "amount": {numericality: {greaterThanOrEqualTo: true}, presence: true},

}

const validate = values => {
  const d = new DataObjectParser()
  const errors = validator(values, constraints)
  if (errors) {
    _.forIn(errors, (val, key) => d.set(key, val))
  }
  return { ...d.data() }
}


export const getAttendeePaymentComponent = name => (
  reduxForm(
    {
      form: 'attendeePaymentForm_' + name,
      validate: validate
    })(AttendeePaymentComponent)
)
