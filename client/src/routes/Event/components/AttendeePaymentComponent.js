/**
 * Created by hreid on 4/27/17.
 */
import React from 'react'
import {
  numberTextField,
  selectField
} from '../../../components/ReduxFormRenderedFields'

import { reduxForm, Field } from 'redux-form'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import DataObjectParser from 'dataobject-parser'
import moment from 'moment'
import { currencyFormatterUs} from '../../../utils/common'

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
    <div className="">
      <form onSubmit={handleSubmit} className="attendee-payment-form">
        <div className="row">
          <div className="col-md-3">
            <Field name="amount" type="number" component={numberTextField} label="Payment Amount"
                   placeholder="1" id="amount" autoFocus={true}  min="0" max="9999" step="0.01" size="5"  />
          </div>
          <div className="col-md-6">
            <Field name="method" type="text" component={selectField} placeholder="Payment Method"
                   label="Payment Method" options={paymentMethods} />
          </div>
          <div className="col-md-3">
            <div>
              <button type="submit" disabled={submitting} className="btn btn-warning btn-sm book-attendee-btn">Submit<span
                className="pt-icon-standard pt-icon-arrow-right pt-align-right"></span></button>
            </div>
          </div>
        </div>
      </form>
      <div>
        <BootstrapTable
          data={props.payments}
          remote={true}
          tableContainerClass="attendee-payment-table">
          <TableHeaderColumn dataField="_id" hidden={true} isKey={true} >Booking ID</TableHeaderColumn>
          <TableHeaderColumn dataField="method" width="40%" columnClassName="c-amount-paid">Amount Paid</TableHeaderColumn>
          <TableHeaderColumn dataField="txDate" dataSort dataFormat={cell => moment(cell).format('MMM Do, YYYY h:mm a')} width="35%"  columnClassName="c-bookingdate">Transaction Date</TableHeaderColumn>
          <TableHeaderColumn dataField="amount" dataSort dataFormat={cell => currencyFormatterUs.format(cell)} width="" columnClassName="c-amount-paid">Amount Paid</TableHeaderColumn>
        </BootstrapTable>
      </div>
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
