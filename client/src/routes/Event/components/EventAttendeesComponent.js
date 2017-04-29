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
import { getAvailableAttendees } from '../modules/event'

export default class EventAttendeesComponent extends Component {

  selected = []
  attendeePaymentComponents = {}
  constructor(props) {
    super(props)
    props.getEventAttendees()
  }

  attendInfoField = (cell, row) => (
    <div>
      <div><Link to={"/attendee/" + row.attendeeId}>{cell.firstName + " " + cell.lastName}</Link></div>
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
        <div>
          <a className="btn btn-success btn-xs"
             onClick={(e) => {
               e.stopPropagation()
               this.props.openBookingForm(this.attendeeBookingComponent(row))
             } }>Update</a>
          &nbsp;
        <a className="btn btn-success btn-xs"
           onClick={(e) => this.selectRow = [row.eventBookingId]}>Add Payment</a>
        </div>
      </div>
    )
  }

  selectRow = {
    selected: this.selected
  }

  sortAttendees = (a, b, order) => {
    const aAtt = new String(a.attendee.firstName+a.attendee.lastName)
    return (order == 'desc' ? -1 : 1) * aAtt.localeCompare(b.attendee.firstName+b.attendee.lastName)
  }

  render() {
    const slug = this.props.details.slug
    const tableOptions = {
      expandRowBgColor: '#ecf0f1',
      onlyOneExpanding: true,
    }
    return (
      <div className="row">
        <div className="book-attendee-btn">
          <a className="btn btn-warning" onClick={(e) => this.props.openBookingForm(this.attendeeBookingComponent({
            ...attendeeBooking,
            eventId: slug
          }))}>Book Attendee</a>
        </div>
        <BootstrapTable
          data={this.props.attendees.data}
          remote={false}
          search={false}
          multiColumnSearch={false}
          options={tableOptions}
          expandComponent={ this.attendeePaymentComponent }
          expandableRow={ row => true}
          expandColumnOptions={ { expandColumnVisible: false } }
          selectRow={this.selectRow}
          containerClass="atteendees-events-booking-container"
          tableContainerClass="attendees-events-booking-table "
          ref="attendeeEventBookingTable">
          <TableHeaderColumn
            dataField="eventBookingId"
            hidden={true}>Booking ID</TableHeaderColumn>
          <TableHeaderColumn
            dataField="attendeeId"
            isKey={true}
            hidden={true}>Attendee ID</TableHeaderColumn>
          <TableHeaderColumn
            dataField="eventId"
            hidden={true}>Event ID</TableHeaderColumn>
          <TableHeaderColumn
            dataField="attendee"
            sortFunc={this.sortAttendees }
            dataSort
            dataFormat={this.attendInfoField}
            width="25%"
            columnClassName="c-attendee">Attendee</TableHeaderColumn>
          <TableHeaderColumn
            dataField="bookingDate"
            dataSort dataFormat={cell => moment(cell).format('MMM Do, YYYY h:mm a')}
            width="11%"
            columnClassName="c-bookingdate">Booking Date</TableHeaderColumn>
          <TableHeaderColumn
            dataField="status"
            width="7%"
            filter={ { type: 'SelectFilter', options: {"Active": "Active", "Cancelled": "Cancelled"}, selectText: 'Choose'} }
            dataSort
            columnClassName="c-status">Status</TableHeaderColumn>
          <TableHeaderColumn
            dataField="numberSeatsReserved"
            dataSort width="5%"
            columnClassName="c-seats-reserved">TicketPurchased</TableHeaderColumn>
          <TableHeaderColumn
            dataField="totalCosts"
            dataFormat={cell => currencyFormatterUs.format(cell)}
            dataSort width="10%"
            columnClassName="c-currency">TotalCost</TableHeaderColumn>
          <TableHeaderColumn
            dataField="amountPaid"
            dataSort
            dataFormat={cell => currencyFormatterUs.format(cell)}
            width="8%"
            columnClassName="c-amount-paid">Amount Paid</TableHeaderColumn>
          <TableHeaderColumn
            dataField="amountOwed"
            dataSort
            dataFormat={cell => currencyFormatterUs.format(cell)}
            width="8%"
            columnClassName="c-amount-owed">Amount Owed</TableHeaderColumn>
          <TableHeaderColumn
            dataField="paymentStatus"
            dataSort
            width="7%"
            filter={ { type: 'SelectFilter', options: {"Paid-Full": "Paid-Full", "Balance Due": "Balance Due"}, selectText: 'Choose'} }
            columnClassName="c-amount-owed">*</TableHeaderColumn>
          <TableHeaderColumn hidden={false} dataFormat={this.showActions}  columnClassName="c-actions">Actions</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}
