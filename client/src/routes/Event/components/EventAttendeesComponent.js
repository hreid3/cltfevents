/**
 * Created by hreid on 4/24/17.
 */

import React, { Component } from 'react'
import { Link } from 'react-router'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import AttendeeBookingComponent from './AttendeeBookingComponent'
import { getAttendeePaymentComponent } from './AttendeePaymentComponent'
import { attendeeBooking } from '../modules/constants'
import moment from 'moment'
import { currencyFormatterUs} from '../../../utils/common'

export default class EventAttendeesComponent extends Component {

  selected = []
  attendeePaymentComponents = {}
  constructor(props) {
    super(props)
    props.getEventAttendees()
  }

  attendInfoField = (cell, row) => (
    <div>
      <div>{cell.firstName + " " + cell.lastName}</div>
      <div>{cell.email} - {cell.contactMobile}</div>
    </div>
  )

  attendeeBookingComponent = initialValues => (
    <AttendeeBookingComponent
      onSubmit={values => this.props.doSubmitAttendeeForm(values)}
      initialValues={{...initialValues}}/>
  )

  attendeePaymentComponent = row => {
    console.log('setting attendeePayment')
    const AttendeePaymentComponent  = getAttendeePaymentComponent(row.eventBookingId)
    this.attendeePaymentComponents[row.eventBookingId] = { // Dynamic props
      message: "later"
    }
    return <AttendeePaymentComponent
      onSubmit={values => this.props.doSubmitPaymentForm(values, row, this.attendeePaymentComponents[row.eventBookingId])}
      payments={row.payments}
      eventBookingId={row.eventBookingId}
      {...this.attendeePaymentComponents[row.eventBookingId]}
    />
  }

  showActions = (cell, row) => {
    return (
      <div>
        <a className="pt-button pt-small"
           onClick={(e) => {
             e.stopPropagation()
             this.props.openBookingForm(this.attendeeBookingComponent(row))
           } }>Update Attendee</a>
        <a className="pt-button pt-small"
           onClick={(e) => this.selectRow = [row.eventBookingId]}>Add Payment</a>
      </div>
    )
  }

  selectRow = {
    selected: this.selected
  }

  render() {
    const slug = this.props.details.slug
    const tableOptions = {
      expandRowBgColor: 'rgb(242, 255, 163)',
      onlyOneExpanding: true,
    }
    return (
      <div>
        <div className="pt-button-group pt-large float-right">
          <a className="pt-button pt-small" onClick={(e) => this.props.openBookingForm(this.attendeeBookingComponent({
            ...attendeeBooking,
            eventId: slug
          }))}>Add Attendee</a>
        </div>
        <BootstrapTable
          data={this.props.attendees.data}
          remote={true}
          search={true}
          multiColumnSearch={true}
          options={tableOptions}
          expandComponent={ this.attendeePaymentComponent }
          expandableRow={ row => true}
          expandColumnOptions={ { expandColumnVisible: true } }
          selectRow={this.selectRow}
          tableContainerClass="attendees-events-booking-table"
          ref="attendeeEventBookingTable">
          <TableHeaderColumn dataField="eventBookingId" hidden={true}>Booking ID</TableHeaderColumn>
          <TableHeaderColumn dataField="attendeeId" isKey={true} hidden={true}>Attendee ID</TableHeaderColumn>
          <TableHeaderColumn dataField="eventId" hidden={true}>Event ID</TableHeaderColumn>
          <TableHeaderColumn dataField="attendee" dataFormat={this.attendInfoField} width="25%"  columnClassName="c-attendee">Attendee</TableHeaderColumn>
          <TableHeaderColumn dataField="bookingDate" dataFormat={cell => moment(cell).format('MMM Do, YYYY h:mm a')} width="15%"  columnClassName="c-bookingdate">Booking Date</TableHeaderColumn>
          <TableHeaderColumn dataField="status" width="5%" columnClassName="c-status">Status</TableHeaderColumn>
          <TableHeaderColumn dataField="numberSeatsReserved" width="5%" columnClassName="c-seats-reserved">TicketPurchased</TableHeaderColumn>
          <TableHeaderColumn dataField="totalCosts"
                             dataFormat={cell => currencyFormatterUs.format(cell)} width="10%" columnClassName="c-currency">TotalCost</TableHeaderColumn>
          <TableHeaderColumn dataField="amountPaid" dataFormat={cell => currencyFormatterUs.format(cell)} width="10%" columnClassName="c-amount-paid">Amount Paid</TableHeaderColumn>
          <TableHeaderColumn dataField="amountOwed" dataFormat={cell => currencyFormatterUs.format(cell)} width="10%" columnClassName="c-amount-owed">Amount Owed</TableHeaderColumn>
          <TableHeaderColumn hidden={false} dataFormat={this.showActions}  columnClassName="c-actions">Actions</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}
