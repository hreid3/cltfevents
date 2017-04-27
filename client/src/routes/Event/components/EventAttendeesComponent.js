/**
 * Created by hreid on 4/24/17.
 */

import React, { Component } from 'react'
import { Link } from 'react-router'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import AttendeeBookingComponent from './AttendeeBookingComponent'
import { attendeeBooking } from '../modules/constants'
import moment from 'moment'
import { currencyFormatterUs} from '../../../utils/common'

export default class EventAttendeesComponent extends Component {

  constructor(props) {
    super(props)
    props.getEventAttendees()
  }

  attendInfoField = (cell, row) => (
    <div>
      <div>{cell.firstName + " " + cell.lastName}</div>
      <div>{cell.email}</div>
      <div>{cell.contactMobile}</div>
    </div>
  )

  attendeeBookingComponent = initialValues => (
    <AttendeeBookingComponent
      onSubmit={values => this.props.doSubmitAttendeeForm(values)}
      initialValues={{...initialValues}}/>
  )

  showActions = (cell, row) => {
    return (
      <div>
        <a className="pt-button pt-icon-th"
           onClick={(e) => this.props.openBookingForm(this.attendeeBookingComponent(row))}>Update Attendee</a>
        <a className="pt-button pt-icon-th"
           onClick={(e) => this.props.openBookingForm(this.attendeeBookingComponent(row))}>Add Payment</a>
      </div>
    )
  }

  render() {
    const slug = this.props.details.slug
    return (
      <div>
        <div className="pt-button-group pt-large float-right">
          <a className="pt-button pt-icon-th" onClick={(e) => this.props.openBookingForm(this.attendeeBookingComponent({
            ...attendeeBooking,
            eventId: slug
          }))}>Add Attendee</a>
        </div>
        <BootstrapTable
          data={this.props.attendees.data}
          remote={true}
          search={true}
          multiColumnSearch={true}
          ref="attendeeEventBookingTable">
          <TableHeaderColumn dataField="eventBookingId" hidden={true}>Booking ID</TableHeaderColumn>
          <TableHeaderColumn dataField="attendeeId" isKey={true} hidden={true}>Attendee ID</TableHeaderColumn>
          <TableHeaderColumn dataField="eventId" hidden={true}>Event ID</TableHeaderColumn>
          <TableHeaderColumn dataField="attendee" dataFormat={this.attendInfoField}>Attendee</TableHeaderColumn>
          <TableHeaderColumn dataField="bookingDate" dataFormat={cell => moment(cell).format('MMM Do, YYYY h:mm a')}>Booking Date</TableHeaderColumn>
          <TableHeaderColumn dataField="status">Status</TableHeaderColumn>
          <TableHeaderColumn dataField="numberSeatsReserved">TicketPurchased</TableHeaderColumn>
          <TableHeaderColumn dataField="totalCosts"
                             dataFormat={cell => currencyFormatterUs.format(cell)}>TotalCost</TableHeaderColumn>
          <TableHeaderColumn dataField="amountOwed">Amount Owed</TableHeaderColumn>
          <TableHeaderColumn hidden={false} dataFormat={this.showActions}>Actions</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}
